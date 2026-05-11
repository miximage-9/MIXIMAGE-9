import { getGeminiImageStatus } from "../../server/gemini-image.js";

export async function handler() {
  return sendJson(200, {
    ok: true,
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    imageGeneration: getGeminiImageStatus(process.env),
  });
}

function sendJson(statusCode, data) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  };
}
