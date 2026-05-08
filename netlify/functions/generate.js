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
    text: { verbosity: getTextVerbosity(tool) },
    max_output_tokens: getMaxOutputTokens(tool, payload),
  };
}

function getMaxOutputTokens(tool, payload) {
  const requested = Number(payload.maxOutputTokens);
  if (Number.isFinite(requested) && requested > 0) {
    return Math.min(requested, 3000);
  }

  if (tool === "youtube") return 2400;
  if (tool === "content" || tool === "imagePrompt" || tool === "promptTune") return 2200;
  if (tool === "image" || tool === "enhancer") return 1200;
  return 900;
}

function getTextVerbosity(tool) {
  if (tool === "youtube" || tool === "content" || tool === "imagePrompt" || tool === "promptTune") return "medium";
  return "low";
}

const toolPrompts = {
  content: {
    createInput(payload) {
      return [
        {
          role: "developer",
          content:
            "คุณคือครีเอทีฟไดเรกเตอร์และนักเขียนคอนเทนต์ภาษาไทย เขียนให้เหมือนคนทำงานจริง ไม่แข็ง ไม่เว่อร์ ไม่ใส่ข้อมูลที่ผู้ใช้ไม่ได้ให้ และทำให้พร้อมคัดลอกไปใช้ทันที",
        },
        {
          role: "user",
          content: `สร้างคอนเทนต์ภาษาไทยจากบรีฟนี้

แพลตฟอร์ม: ${payload.platform}
ประเภทคอนเทนต์: ${payload.contentType}
หัวข้อ / สินค้า / บริการ: ${payload.topic}
กลุ่มเป้าหมาย: ${payload.audience || "ผู้ชมทั่วไป"}
เป้าหมาย: ${payload.goal || "ให้คนสนใจและลงมือทำ"}
โทนภาษา: ${payload.tone || "เป็นธรรมชาติ"}
ข้อมูลขาย / โปร / จุดเด่น / ช่องทางติดต่อ:
${payload.offer || "-"}
ข้อกำหนด / คำที่ห้ามใช้:
${payload.constraints || "-"}

ข้อกำหนดผลลัพธ์:
- เขียนให้เหมาะกับแพลตฟอร์มจริง
- เปิดด้วย hook ที่ดึงความสนใจแต่ไม่หลอก
- เนื้อหาต้องอ่านแล้วเข้าใจทันที
- ถ้าไม่มีข้อมูลราคา เบอร์ ลิงก์ หรือโปร ห้ามแต่งเอง
- มี CTA ที่ตรงกับเป้าหมาย
- ใส่ hashtag ที่เกี่ยวข้อง ไม่ยัดเกินจำเป็น
- เพิ่มอีก 3 มุมคอนเทนต์สำรองแบบสั้น

จัดรูปแบบเป็น:
คอนเทนต์พร้อมโพสต์:
...

CTA:
...

Hashtags:
...

ไอเดียต่อยอด 3 แบบ:
1. ...
2. ...
3. ...`,
        },
      ];
    },
  },
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
  imagePrompt: {
    createInput(payload) {
      if (!payload.imageDataUrl) {
        throw new Error("ยังไม่ได้อัปโหลดภาพ");
      }

      return [
        {
          role: "developer",
          content:
            "คุณคือผู้เชี่ยวชาญการวิเคราะห์ภาพและเขียนพรอมต์สำหรับ GPT Image 2 ให้ใช้งานได้จริง คุม subject, composition, lighting, material, camera, style และข้อห้ามอย่างชัดเจน",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `วิเคราะห์ภาพอ้างอิงนี้แล้วแตกเป็นพรอมต์สำหรับ GPT Image 2

บรีฟ: ${payload.brief || "-"}
เอาไปใช้กับ: ${payload.subject || payload.targetUse || "-"}
รูปแบบงาน: ${payload.targetUse || "-"}
สไตล์ผลลัพธ์: ${payload.outputStyle || "-"}
สัดส่วนภาพ: ${payload.ratio || "-"}
สิ่งที่ต้องคงไว้: ${payload.mustKeep || "-"}

ข้อกำหนด:
- วิเคราะห์เฉพาะสิ่งที่มองเห็นหรืออนุมานจากภาพได้อย่างสมเหตุสมผล
- สร้างพรอมต์ที่เอาไปใช้กับ GPT Image 2 ได้ทันที
- แยกส่วนให้ผู้ใช้คัดลอกง่าย
- ถ้ามีคน/ตัวละคร/สินค้า ให้เน้น identity-safe description โดยไม่อ้างชื่อบุคคลจริง
- ระบุว่าควรใช้ภาพนี้เป็น reference อย่างไร
- ใส่ negative prompt เพื่อกันภาพเพี้ยน
- ห้ามบรรยายเกินจริงหรือแต่งรายละเอียดสำคัญที่ไม่มีในภาพ

จัดรูปแบบเป็น:
สรุปภาพ:
...

องค์ประกอบสำคัญ:
...

Prompt พร้อมใช้กับ GPT Image 2:
...

Reference instruction:
...

Negative prompt:
...

Short prompt:
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
  promptTune: {
    createInput(payload) {
      if (!payload.originalPrompt && !payload.imageDataUrl) {
        throw new Error("ต้องมีพรอมต์เดิมหรือภาพอ้างอิงอย่างน้อย 1 อย่าง");
      }

      const content = [
        {
          type: "input_text",
          text: `จูนพรอมต์นี้ให้ใช้งานจริงกับ GPT Image 2

พรอมต์เดิม:
${payload.originalPrompt || "-"}

ความต้องการ:
${payload.requirements || "-"}

ใช้กับ:
${payload.targetUse || "-"}

ระดับการปรับ:
${payload.intensity || "-"}

รูปแบบผลลัพธ์:
${payload.outputStyle || "-"}

ข้อกำหนด:
- รักษาเจตนาหลักของพรอมต์เดิม
- ปรับภาษาให้ชัด คุมภาพได้ดี และลดความกำกวม
- ถ้ามีภาพอ้างอิง ให้จูนให้สอดคล้องกับภาพ
- ระบุ subject, composition, lighting, style, camera/framing, detail, constraints ให้ครบ
- ใส่ negative prompt เฉพาะสิ่งที่ช่วยลดภาพเสีย
- ห้ามใส่ข้อมูลที่ขัดกับบรีฟหรือภาพ
- ส่งผลลัพธ์ที่คัดลอกไปใช้ได้ทันที

จัดรูปแบบเป็น:
Prompt ที่จูนแล้ว:
...

Reference instruction:
...

Negative prompt:
...

Short version:
...`,
        },
      ];

      if (payload.imageDataUrl) {
        content.push({
          type: "input_image",
          image_url: payload.imageDataUrl,
        });
      }

      return [
        {
          role: "developer",
          content:
            "คุณคือ prompt engineer สำหรับ GPT Image 2 งานของคุณคือจูนพรอมต์ให้แม่นขึ้น ใช้ได้จริง และไม่ทำให้ผลลัพธ์หลุดเจตนาเดิม",
        },
        {
          role: "user",
          content,
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
