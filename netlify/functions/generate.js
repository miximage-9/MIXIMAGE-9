const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

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

  if (!process.env.OPENAI_API_KEY) {
    return sendJson(401, { error: "ยังไม่ได้ตั้งค่า OPENAI_API_KEY ใน Netlify" });
  }

  try {
    const body = JSON.parse(event.body || "{}");
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
      return sendJson(openAiResponse.status, {
        error: data?.error?.message || "เรียก OpenAI API ไม่สำเร็จ",
      });
    }

    return sendJson(200, {
      text: extractText(data),
      model: data.model || MODEL,
    });
  } catch (error) {
    return sendJson(500, {
      error: error.message || "เกิดข้อผิดพลาด",
    });
  }
}

function buildOpenAiPayload(body) {
  const { tool, payload = {} } = body ?? {};
  const task = toolPrompts[tool];

  if (!task) {
    throw new Error("ยังไม่รองรับเครื่องมือนี้");
  }

  return {
    model: MODEL,
    input: task.createInput(payload),
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
