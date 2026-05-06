import { connectLambda, getStore } from "@netlify/blobs";

const STORE_NAME = "workspace-data";
const WORKSPACE_KEY = "workspace";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: getHeaders(),
      body: "",
    };
  }

  const authError = validateSyncKey(event.headers || {});
  if (authError) {
    return authError;
  }

  try {
    connectLambda(event);
    const store = getStore(STORE_NAME);

    if (event.httpMethod === "GET") {
      const data = await store.get(WORKSPACE_KEY, { type: "json" });
      return sendJson(200, { data: data || createEmptyWorkspace() });
    }

    if (event.httpMethod === "POST") {
      const payload = JSON.parse(event.body || "{}");
      const data = normalizeWorkspace(payload);

      await store.setJSON(WORKSPACE_KEY, data);
      return sendJson(200, { ok: true, updatedAt: data.updatedAt });
    }

    return sendJson(405, { error: "รองรับเฉพาะ GET และ POST เท่านั้น" });
  } catch (error) {
    return sendJson(500, {
      error: error.message || "ซิงก์ข้อมูลไม่สำเร็จ",
    });
  }
}

function validateSyncKey(headers) {
  const secret = process.env.SYNC_SECRET;
  if (!secret) {
    return sendJson(500, { error: "ยังไม่ได้ตั้งค่า SYNC_SECRET ใน Netlify" });
  }

  const providedKey =
    headers["x-sync-key"] ||
    headers["X-Sync-Key"] ||
    headers["X-SYNC-KEY"];

  if (providedKey !== secret) {
    return sendJson(401, { error: "รหัสซิงก์ไม่ถูกต้อง" });
  }

  return null;
}

function normalizeWorkspace(payload) {
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

function createEmptyWorkspace() {
  return {
    clipboardHistory: [],
    prompts: [],
    updatedAt: null,
    version: 1,
    youtubePreset: null,
  };
}

function sendJson(statusCode, data) {
  return {
    statusCode,
    headers: getHeaders(),
    body: JSON.stringify(data),
  };
}

function getHeaders() {
  return {
    "Access-Control-Allow-Headers": "Content-Type,X-Sync-Key",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
  };
}
