export const previewStyles = [
  {
    id: "rose-sky",
    name: "ฟ้าอมชมพู",
    className: "bg-gradient-to-br from-rose-100 via-sky-100 to-white",
  },
  {
    id: "mint-cream",
    name: "มินต์นุ่ม",
    className: "bg-gradient-to-br from-emerald-100 via-white to-lime-100",
  },
  {
    id: "violet-fog",
    name: "ม่วงหมอก",
    className: "bg-gradient-to-br from-violet-100 via-white to-sky-100",
  },
  {
    id: "honey-mist",
    name: "น้ำผึ้งบาง",
    className: "bg-gradient-to-br from-amber-100 via-white to-rose-100",
  },
];

export const defaultPrompts = [
  {
    id: "prompt-ux-polish",
    title: "ตรวจประสบการณ์ผู้ใช้ให้เนียน",
    text: "ทำหน้าที่เป็นนักออกแบบผลิตภัณฑ์อาวุโส ตรวจหน้าจอนี้ด้านความชัดเจน ระยะห่าง ลำดับความสำคัญ และไมโครอินเทอร์แอ็กชัน แล้วสรุปเฉพาะจุดที่แก้แล้วเห็นผลมากที่สุด",
    tags: ["ดีไซน์", "ประสบการณ์ผู้ใช้", "รีวิว"],
    previewStyle: "rose-sky",
    updatedAt: "2026-05-05T00:00:00.000Z",
  },
  {
    id: "prompt-refactor",
    title: "คู่หูรีแฟกเตอร์โค้ด",
    text: "รีแฟกเตอร์คอมโพเนนต์นี้โดยคงพฤติกรรมเดิมไว้ ทำ API ให้เรียบง่าย ลดความซ้ำซ้อน และอธิบายเหตุผลกับข้อแลกเปลี่ยนด้วยภาษาที่เข้าใจง่าย",
    tags: ["โค้ด", "สร้าง"],
    previewStyle: "mint-cream",
    updatedAt: "2026-05-04T00:00:00.000Z",
  },
  {
    id: "prompt-caption",
    title: "เริ่มแคปชัน",
    text: "เขียนแคปชันโซเชียล 3 แบบจากไอเดียนี้ ให้ฟังเป็นธรรมชาติ ใส่คำชวนลงมือทำแบบนุ่ม ๆ หนึ่งจุด และเพิ่มแฮชแท็กที่เข้ากัน",
    tags: ["แคปชัน", "โซเชียล"],
    previewStyle: "violet-fog",
    updatedAt: "2026-05-03T00:00:00.000Z",
  },
  {
    id: "prompt-image",
    title: "สร้างพรอมป์จากภาพ",
    text: "เปลี่ยนคอนเซปต์ภาพนี้ให้เป็นพรอมป์สร้างภาพแบบละเอียด โดยระบุวัตถุหลัก ฉาก แสง สไตล์ อารมณ์ และรายละเอียดกล้อง",
    tags: ["ภาพ", "ครีเอทีฟ"],
    previewStyle: "honey-mist",
    updatedAt: "2026-05-02T00:00:00.000Z",
  },
];
