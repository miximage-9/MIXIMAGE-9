import { generateGeminiImage } from "../../server/gemini-image.js";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: getHeaders(),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return sendJson(405, { error: "รองรับเฉพาะ POST เท่านั้น" });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const result = await generateGeminiImage(body, process.env);
    return sendJson(200, result);
  } catch (error) {
    return sendJson(error.statusCode || 500, {
      detail: error.detail,
      error: error.message || "สร้างภาพไม่สำเร็จ",
    });
  }
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
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
  };
}
