import { createSign } from "node:crypto";

export const DEFAULT_VERTEX_IMAGE_MODEL = "gemini-3.1-flash-image-preview";

const MAX_REFERENCE_IMAGE_BYTES = 5 * 1024 * 1024;
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CLOUD_PLATFORM_SCOPE = "https://www.googleapis.com/auth/cloud-platform";

export function getGeminiImageStatus(env = process.env) {
  const hasApiKey = Boolean(getEnv(env, "GOOGLE_API_KEY") || getEnv(env, "GEMINI_API_KEY"));
  const hasServiceAccount = Boolean(parseServiceAccount(env, false));

  return {
    configured: hasApiKey || hasServiceAccount,
    authMode: hasServiceAccount ? "service-account" : hasApiKey ? "api-key" : null,
    hasApiKey,
    hasServiceAccount,
    model: getEnv(env, "VERTEX_IMAGE_MODEL") || DEFAULT_VERTEX_IMAGE_MODEL,
    projectConfigured: Boolean(getEnv(env, "GOOGLE_CLOUD_PROJECT")),
    location: getEnv(env, "GOOGLE_CLOUD_LOCATION") || "global",
  };
}

export async function generateGeminiImage(input, env = process.env) {
  const normalized = normalizeImageInput(input);
  const status = getGeminiImageStatus(env);

  if (!status.configured) {
    throw createHttpError(
      401,
      "ยังไม่ได้ตั้งค่า Google API สำหรับสร้างภาพ",
      "ตั้งค่า GOOGLE_API_KEY หรือ GOOGLE_APPLICATION_CREDENTIALS_JSON ใน Netlify ก่อนใช้งาน",
    );
  }

  const requestBody = buildGenerateContentBody(normalized);
  const rawResponse = status.hasServiceAccount
    ? await callVertexWithServiceAccount(requestBody, env)
    : await callGeminiWithApiKey(requestBody, env);

  const images = extractImages(rawResponse);
  if (!images.length) {
    throw createHttpError(502, "Gemini ไม่ได้ส่งรูปภาพกลับมา", extractText(rawResponse) || undefined);
  }

  return {
    createdAt: new Date().toISOString(),
    images,
    model: status.model,
    prompt: normalized.prompt,
    provider: status.hasServiceAccount ? "vertex-ai" : "gemini-api",
    text: extractText(rawResponse),
  };
}

function normalizeImageInput(input) {
  const prompt = String(input?.prompt || "").trim();
  if (!prompt) {
    throw createHttpError(400, "กรุณาใส่พรอมต์ก่อนสร้างภาพ");
  }

  const aspectRatio = allowedValue(input?.aspectRatio, ["1:1", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9"], "1:1");
  const imageSize = allowedValue(input?.imageSize, ["1K", "2K", "4K"], "1K");
  const reference = input?.referenceImageDataUrl
    ? parseDataUrl(String(input.referenceImageDataUrl))
    : null;

  return {
    aspectRatio,
    imageSize,
    prompt,
    reference,
  };
}

function buildGenerateContentBody(input) {
  const parts = [
    {
      text: [
        input.prompt,
        "",
        "Create exactly one high-quality image.",
        `Aspect ratio: ${input.aspectRatio}.`,
        `Image size: ${input.imageSize}.`,
        input.reference
          ? "Use the attached reference image only as visual guidance. Preserve intent, but follow the written prompt."
          : "",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ];

  if (input.reference) {
    parts.push({
      inlineData: {
        data: input.reference.base64,
        mimeType: input.reference.mimeType,
      },
    });
  }

  return {
    contents: [
      {
        role: "user",
        parts,
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: input.aspectRatio,
        imageSize: input.imageSize,
      },
    },
  };
}

async function callGeminiWithApiKey(requestBody, env) {
  const apiKey = getEnv(env, "GOOGLE_API_KEY") || getEnv(env, "GEMINI_API_KEY");
  const model = getEnv(env, "VERTEX_IMAGE_MODEL") || DEFAULT_VERTEX_IMAGE_MODEL;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:generateContent`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(requestBody),
  });

  return readGoogleResponse(response);
}

async function callVertexWithServiceAccount(requestBody, env) {
  const model = getEnv(env, "VERTEX_IMAGE_MODEL") || DEFAULT_VERTEX_IMAGE_MODEL;
  const project = getEnv(env, "GOOGLE_CLOUD_PROJECT");
  const location = getEnv(env, "GOOGLE_CLOUD_LOCATION") || "global";

  if (!project) {
    throw createHttpError(401, "ยังไม่ได้ตั้งค่า GOOGLE_CLOUD_PROJECT สำหรับ Vertex AI");
  }

  const accessToken = await createAccessToken(env);
  const host = location === "global" ? "aiplatform.googleapis.com" : `${location}-aiplatform.googleapis.com`;
  const endpoint = `https://${host}/v1/projects/${encodeURIComponent(
    project,
  )}/locations/${encodeURIComponent(location)}/publishers/google/models/${encodeURIComponent(
    model,
  )}:generateContent`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return readGoogleResponse(response);
}

async function createAccessToken(env) {
  const serviceAccount = parseServiceAccount(env, true);
  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwt(
    { alg: "RS256", typ: "JWT" },
    {
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
      iss: serviceAccount.client_email,
      scope: CLOUD_PLATFORM_SCOPE,
    },
    serviceAccount.private_key,
  );

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      assertion,
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw createHttpError(response.status || 401, "ขอสิทธิ์เข้า Vertex AI ไม่สำเร็จ", data.error_description || data.error);
  }

  return data.access_token;
}

function parseServiceAccount(env, throwOnError) {
  const raw = getEnv(env, "GOOGLE_APPLICATION_CREDENTIALS_JSON");
  if (!raw) return null;

  const candidates = [raw, decodeBase64(raw)].filter(Boolean);
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed?.client_email && parsed?.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: String(parsed.private_key).replace(/\\n/g, "\n"),
        };
      }
    } catch {
      // Try the next candidate.
    }
  }

  if (throwOnError) {
    throw createHttpError(401, "GOOGLE_APPLICATION_CREDENTIALS_JSON ไม่ถูกต้อง");
  }

  return null;
}

async function readGoogleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw createHttpError(
      response.status,
      data?.error?.message || "เรียก Google image API ไม่สำเร็จ",
      data?.error?.status,
    );
  }

  return data;
}

function extractImages(data) {
  return (data?.candidates || [])
    .flatMap((candidate) => candidate?.content?.parts || [])
    .map((part) => part.inlineData || part.inline_data)
    .filter((inlineData) => inlineData?.data)
    .map((inlineData, index) => {
      const mimeType = inlineData.mimeType || inlineData.mime_type || "image/png";
      return {
        dataUrl: `data:${mimeType};base64,${inlineData.data}`,
        filename: `miximage-gemini-${Date.now()}-${index + 1}.${extensionForMime(mimeType)}`,
        mimeType,
      };
    });
}

function extractText(data) {
  return (data?.candidates || [])
    .flatMap((candidate) => candidate?.content?.parts || [])
    .map((part) => part.text || "")
    .join("\n")
    .trim();
}

function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw createHttpError(400, "รูปอ้างอิงต้องเป็นไฟล์ภาพแบบ data URL");
  }

  const mimeType = match[1];
  const base64 = match[2];
  const decodedBytes = Buffer.byteLength(base64, "base64");

  if (!mimeType.startsWith("image/")) {
    throw createHttpError(400, "ไฟล์อ้างอิงต้องเป็นรูปภาพ");
  }

  if (decodedBytes > MAX_REFERENCE_IMAGE_BYTES) {
    throw createHttpError(413, "รูปอ้างอิงใหญ่เกินไป", "แนะนำไม่เกิน 5MB");
  }

  return { base64, mimeType };
}

function signJwt(header, payload, privateKey) {
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey);
  return `${unsignedToken}.${base64Url(signature)}`;
}

function base64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function decodeBase64(value) {
  try {
    return Buffer.from(String(value).trim(), "base64").toString("utf8");
  } catch {
    return "";
  }
}

function allowedValue(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function extensionForMime(mimeType) {
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return "jpg";
  if (mimeType.includes("webp")) return "webp";
  return "png";
}

function getEnv(env, key) {
  return globalThis.Netlify?.env?.get?.(key) || env?.[key] || "";
}

function createHttpError(statusCode, message, detail) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.detail = detail;
  return error;
}
