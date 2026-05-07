import http from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || process.env.OPENAI_PROXY_PORT || 8787);
const HOST = process.env.HOST || "0.0.0.0";
const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";
const MAX_BODY_BYTES = 12 * 1024 * 1024;
const DIST_DIR = path.resolve(fileURLToPath(new URL("../dist", import.meta.url)));
const SYNC_FILE = path.resolve(
  fileURLToPath(new URL("../.sync-data.json", import.meta.url))
);

const server = http.createServer(async (request, response) => {
  setCorsHeaders(response, request);
  const requestUrl = new URL(
    request.url || "/",
    `http://${request.headers.host || "localhost"}`
  );
  const pathname = requestUrl.pathname;

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      model: MODEL,
      hasKey: Boolean(process.env.OPENAI_API_KEY),
    });
    return;
  }

  if (pathname === "/api/sync") {
    await handleLocalSync(request, response);
    return;
  }

  if (request.method !== "POST" || pathname !== "/api/generate") {
    if (pathname.startsWith("/api/")) {
      sendJson(response, 404, { error: "ไม่พบ endpoint นี้" });
      return;
    }

    if (request.method === "GET" || request.method === "HEAD") {
      await serveStatic(request, response, pathname);
      return;
    }

    sendJson(response, 404, { error: "ไม่พบหน้านี้" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(response, 401, {
      error: "ยังไม่ได้ตั้งค่า OPENAI_API_KEY",
    });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const openAiPayload = buildOpenAiPayload(body);

    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(openAiPayload),
    });

    const data = await openAiResponse.json();

    if (!openAiResponse.ok) {
      sendJson(response, openAiResponse.status, {
        error: data?.error?.message || "เรียก OpenAI API ไม่สำเร็จ",
      });
      return;
    }

    sendJson(response, 200, {
      text: extractText(data),
      model: data.model || MODEL,
    });
  } catch (error) {
    sendJson(response, 500, {
      error: error.message || "เกิดข้อผิดพลาด",
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`MIX IMAGE TOOL ready: http://${HOST}:${PORT}`);
});

function buildOpenAiPayload(body) {
  const { tool, payload = {} } = body ?? {};
  const task = toolPrompts[tool];

  if (!task) {
    throw new Error("ยังไม่รองรับเครื่องมือนี้");
  }

  const input = task.createInput(payload);

  return {
    model: MODEL,
    input,
    reasoning: { effort: "minimal" },
    text: { verbosity: tool === "youtube" || tool === "suno" ? "medium" : "low" },
    max_output_tokens: getMaxOutputTokens(tool, payload),
  };
}

function getMaxOutputTokens(tool, payload) {
  const requested = Number(payload.maxOutputTokens);
  if (Number.isFinite(requested) && requested > 0) {
    return Math.min(requested, 3000);
  }

  if (tool === "youtube") return 2400;
  if (tool === "suno") return 2800;
  if (tool === "image" || tool === "enhancer") return 1200;
  return 900;
}

const toolPrompts = {
  caption: {
    createInput(payload) {
      return [
        {
          role: "developer",
          content:
            "คุณคือผู้ช่วยเขียนคอนเทนต์ภาษาไทย ตอบให้พร้อมใช้งาน กระชับ เป็นธรรมชาติ และไม่ใส่คำอธิบายเกินจำเป็น",
        },
        {
          role: "user",
          content: `สร้างแคปชันภาษาไทยสำหรับ${payload.platform}
โทน: ${payload.tone}
ความยาว: ${payload.length}
หัวข้อหรือสินค้า: ${payload.topic}

จัดรูปแบบเป็น:
แคปชัน:
...

แฮชแท็ก:
...`,
        },
      ];
    },
  },
  youtube: {
    createInput(payload) {
      return [
        {
          role: "developer",
          content:
            "คุณคือผู้เชี่ยวชาญด้าน YouTube SEO ภาษาไทย เขียนคำอธิบายที่พร้อมใช้งานจริง เป็นธรรมชาติ ชัดเจน ไม่ยัดคีย์เวิร์ด และเลือกแฮชแท็ก/แท็กให้เกี่ยวข้องกับคลิปมากที่สุด",
        },
        {
          role: "user",
          content: `สร้างคำอธิบาย YouTube ภาษาไทยสำหรับคลิปนี้

ประเภทคลิป: ${payload.contentType}
ชื่อคลิปหรือหัวข้อ: ${payload.title}
รายละเอียดคลิป: ${payload.details}
กลุ่มเป้าหมาย: ${payload.audience || "ผู้ชมทั่วไป"}
ข้อมูลเสริม / ตัวกรอง / ข้อมูลร้าน / ช่องทางติดต่อ / คำที่ต้องใส่หรือห้ามใส่:
${payload.extraInfo || "-"}

ข้อกำหนด:
- เขียนคำอธิบายที่พร้อมวางใต้คลิปได้จริง
- เปิดด้วย 1-2 บรรทัดแรกที่ดึงดูดคนดู
- ใส่รายละเอียดสำคัญแบบอ่านง่าย
- ใส่ CTA ที่เหมาะกับประเภทคลิป เช่น ชวนกดติดตาม ดูคลิปต่อ สั่งซื้อ ทักแชท หรือคอมเมนต์ โดยต้องไม่เกินจริง
- ถ้ามีชื่อร้าน แบรนด์ เบอร์ ลิงก์ หรือโปรโมชัน ให้ใส่เฉพาะเท่าที่ผู้ใช้ให้มา
- ห้ามใส่ placeholder เช่น (ใส่ลิงก์), (ดูรายละเอียดในคลิป), เครดิตถ้าไม่ได้ให้ข้อมูลมา
- ห้ามแต่งเครดิต เบอร์โทร ราคา ลิงก์ หรือข้อมูลร้านเอง
- เลือก Top 3 hashtags ที่คาดว่าเกี่ยวข้องและมีการใช้งานกว้างที่สุดจากความนิยมทั่วไป โดยไม่อ้างตัวเลขหรือบอกว่าตรวจแบบเรียลไทม์
- เพิ่มแฮชแท็กเสริมอีก 7-12 อันที่เกี่ยวข้องกับคลิป
- ตรวจคำสะกดแฮชแท็กให้ถูกต้องและไม่ซ้ำกัน
- สร้างแท็ก YouTube เพิ่ม 12-18 คำ เป็นคำหรือวลีค้นหา คั่นด้วย comma
- สร้าง pinned comment 1 ข้อ ให้คนดูอยากตอบหรือกดต่อ
- ทุกส่วนต้องพร้อมคัดลอกไปใช้งาน ห้ามมีคำอธิบายวิธีใช้

จัดรูปแบบเป็น:
คำอธิบายพร้อมวาง:
...

CTA:
...

Top 3 Hashtags:
1. ...
2. ...
3. ...

Hashtags เสริม:
...

YouTube Tags:
...

Pinned Comment:
...`,
        },
      ];
    },
  },
  suno: {
    createInput(payload) {
      return [
        {
          role: "developer",
          content:
            "คุณคือนักแต่งเพลงมืออาชีพที่เขียนเพลงให้มนุษย์ร้องได้จริง เข้าใจ subtext อารมณ์ ความสัมพันธ์ และภาพจำ ห้ามเขียนเหมือน AI ห้ามใช้ถ้อยคำสำเร็จรูป ห้ามลอกหรือเลียนแบบศิลปินเฉพาะ ให้สร้างงานต้นฉบับที่พร้อมใช้กับ Suno",
        },
        {
          role: "user",
          content: `แต่งเพลงต้นฉบับสำหรับ Suno 5.5 Pro จากข้อมูลนี้

ภาษา: ${payload.language}
แนวเพลง / Sound: ${payload.genre}
ระดับความซับซ้อน: ${payload.complexity}
อารมณ์เพลง: ${payload.mood}
เรื่องที่จะเล่า: ${payload.story}
มุมมองคนร้อง: ${payload.perspective}
ฮุกที่อยากให้จำ: ${payload.hook}
เสียงร้อง / การร้อง: ${payload.vocal}
สิ่งที่ไม่อยากได้: ${payload.avoid || "-"}

มาตรฐานงาน:
- เขียนเหมือนคนมีประสบการณ์จริง ไม่ใช่ประโยคสวยลอย ๆ
- ใช้ภาพจำเฉพาะเจาะจง สถานการณ์เล็ก ๆ และความรู้สึกที่ไม่ได้พูดตรง ๆ
- ให้เพลงมีพัฒนาการทางอารมณ์จากต้นไปจบ ไม่วนความหมายเดิม
- โครงสร้างเพลงต้องพร้อมใช้กับ Suno โดยใช้ section tag เช่น [Intro], [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Bridge], [Final Chorus], [Outro]
- Hook ต้องจำง่าย ร้องได้จริง และไม่เชย
- ถ้าภาษาไทย ให้ใช้สัมผัส/จังหวะอย่างเป็นธรรมชาติ ไม่ฝืนคล้องจองทุกบรรทัด
- ห้ามใช้คำซ้ำซาก เช่น เจ็บปวดหัวใจ, น้ำตาไหล, รักเธอมากมาย ถ้าไม่ได้ทำให้สดใหม่
- ห้ามใส่คำอธิบายยาวนอกเพลง ทุกอย่างต้องพร้อมคัดลอกใช้งาน

จัดรูปแบบเป็น:
Song Title:
...

Suno Style Prompt:
...

Custom Lyrics:
...

Vocal / Arrangement Notes:
...

Negative Prompt:
...`,
        },
      ];
    },
  },
  enhancer: {
    createInput(payload) {
      return [
        {
          role: "developer",
          content:
            "คุณคือผู้เชี่ยวชาญด้านการเขียนพรอมป์ภาษาไทย ปรับพรอมป์ให้ชัดเจน ใช้งานได้จริง และคุมผลลัพธ์ได้ดี",
        },
        {
          role: "user",
          content: `ปรับพรอมป์นี้ให้ดีขึ้น
โหมด: ${payload.mode}

พรอมป์เดิม:
${payload.prompt}

ส่งกลับเฉพาะพรอมป์เวอร์ชันใหม่ภาษาไทย ไม่ต้องอธิบาย`,
        },
      ];
    },
  },
  ideas: {
    createInput(payload) {
      return [
        {
          role: "developer",
          content:
            "คุณคือผู้ช่วยระดมไอเดียภาษาไทย ตอบแบบสั้น ชัด และนำไปใช้ต่อได้ทันที",
        },
        {
          role: "user",
          content: `สุ่ม${payload.kind} จำนวน 8 ข้อ
หัวข้อ: ${payload.topic || "เครื่องมือเอไอส่วนตัวและคอนเทนต์สร้างสรรค์"}

ให้แต่ละข้อมีชื่อสั้น ๆ และคำอธิบายหนึ่งบรรทัด`,
        },
      ];
    },
  },
  image: {
    createInput(payload) {
      if (!payload.imageDataUrl) {
        throw new Error("ยังไม่ได้อัปโหลดภาพ");
      }

      return [
        {
          role: "developer",
          content:
            "คุณคือผู้ช่วยวิเคราะห์ภาพและสร้างพรอมป์ภาษาไทย ตอบให้เป็นโครงสร้างชัดเจน",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `วิเคราะห์ภาพนี้เป็นภาษาไทย แล้วจัดรูปแบบเป็น:
คำอธิบาย:
...

สไตล์:
...

อารมณ์:
...

คีย์เวิร์ด:
...

พรอมป์สร้างภาพ:
...`,
            },
            {
              type: "input_image",
              image_url: payload.imageDataUrl,
            },
          ],
        },
      ];
    },
  },
};

function extractText(data) {
  if (typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  return (data.output || [])
    .flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .join("")
    .trim();
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        request.destroy();
        reject(new Error("ไฟล์หรือข้อมูลใหญ่เกินไป"));
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("รูปแบบ JSON ไม่ถูกต้อง"));
      }
    });

    request.on("error", reject);
  });
}

async function handleLocalSync(request, response) {
  const authError = validateLocalSyncKey(request);
  if (authError) {
    sendJson(response, authError.statusCode, { error: authError.error });
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, { data: await readLocalSyncData() });
    return;
  }

  if (request.method === "POST") {
    const payload = await readJsonBody(request);
    const data = normalizeSyncData(payload);
    await writeFile(SYNC_FILE, JSON.stringify(data, null, 2), "utf8");
    sendJson(response, 200, { ok: true, updatedAt: data.updatedAt });
    return;
  }

  sendJson(response, 405, { error: "รองรับเฉพาะ GET และ POST เท่านั้น" });
}

function validateLocalSyncKey(request) {
  const secret = process.env.SYNC_SECRET;
  if (!secret) {
    return { statusCode: 500, error: "ยังไม่ได้ตั้งค่า SYNC_SECRET" };
  }

  if (request.headers["x-sync-key"] !== secret) {
    return { statusCode: 401, error: "รหัสซิงก์ไม่ถูกต้อง" };
  }

  return null;
}

async function readLocalSyncData() {
  try {
    return JSON.parse(await readFile(SYNC_FILE, "utf8"));
  } catch {
    return createEmptySyncData();
  }
}

function normalizeSyncData(payload) {
  return {
    clipboardHistory: Array.isArray(payload.clipboardHistory)
      ? payload.clipboardHistory.slice(0, 20)
      : [],
    prompts: Array.isArray(payload.prompts) ? payload.prompts : [],
    updatedAt: new Date().toISOString(),
    version: 1,
    youtubePreset:
      payload.youtubePreset && typeof payload.youtubePreset === "object"
        ? payload.youtubePreset
        : null,
  };
}

function createEmptySyncData() {
  return {
    clipboardHistory: [],
    prompts: [],
    updatedAt: null,
    version: 1,
    youtubePreset: null,
  };
}

async function serveStatic(request, response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(
    DIST_DIR,
    `.${decodeURIComponent(requestedPath)}`
  );

  const relativePath = path.relative(DIST_DIR, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      throw new Error("Not a file");
    }
    sendFile(response, filePath, request.method === "HEAD");
  } catch {
    if (path.extname(filePath)) {
      sendText(response, 404, "Not found");
      return;
    }

    const indexPath = path.join(DIST_DIR, "index.html");
    try {
      await stat(indexPath);
      sendFile(response, indexPath, request.method === "HEAD");
    } catch {
      sendText(response, 404, "Build the app first with npm run build");
    }
  }
}

function sendFile(response, filePath, headOnly = false) {
  response.writeHead(200, {
    "Content-Type": getContentType(filePath),
    "Cache-Control": filePath.includes(`${path.sep}assets${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  });

  if (headOnly) {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };

  return contentTypes[extension] || "application/octet-stream";
}

function setCorsHeaders(response, request) {
  const origin = request.headers.origin;
  const allowedOrigins = new Set([
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://xn--72c0cfk8azcc4p.xyz",
    "https://xn--72c0cfk8azcc4p.xyz",
    "http://www.xn--72c0cfk8azcc4p.xyz",
    "https://www.xn--72c0cfk8azcc4p.xyz",
  ]);

  if (allowedOrigins.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(text);
}
