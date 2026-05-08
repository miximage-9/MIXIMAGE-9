import { useEffect, useMemo, useState } from "react";
import { Copy, Lock, Image as ImageIcon, Bot, QrCode, Zap } from "lucide-react";
import { toast } from "sonner";
import { ToolSidebar } from "./ToolSidebar";
import { generateMainPrompt, generateShortPrompt, type GenInputs } from "@/lib/promptBuilder";
import { HAIRSTYLE_GROUPS } from "@/lib/promptData";
import { OUTPUT_SIZES } from "@/lib/extraData";
import { NegativePromptPicker } from "./NegativePromptPicker";
import { PresetManager } from "./PresetManager";
import { QrCodeModal } from "./QrCodeModal";
import { useHistory } from "@/hooks/useHistory";

const ACTIONS = [
  { v: "passport", l: "รูปติดบัตรสมัครงาน (Passport / ID)" },
  { v: "restore", l: "ซ่อมแซมรูปเก่า (Restoration)" },
  { v: "wedding", l: "พรีเวดดิ้ง (Wedding Portrait)" },
  { v: "graduation", l: "รูปรับปริญญา (Graduation)" },
  { v: "retouch", l: "รีทัชผิว (Beauty Retouch)" },
];
const EXPRESSIONS = [
  { v: "neutral", l: "เรียบเฉย (Neutral)" },
  { v: "smirk", l: "ยิ้มมุมปาก (ห้ามเห็นฟัน)" },
  { v: "smile_closed", l: "ยิ้มเล็กน้อย (ห้ามเห็นฟัน)" },
  { v: "smile_teeth", l: "ยิ้มเห็นฟัน (Toothy Smile)" },
];
const MAKEUP = [
  { v: "clear_skin", l: "หน้าใสธรรมชาติ" },
  { v: "light", l: "แต่งเบาๆ" },
  { v: "full", l: "แต่งเต็ม" },
  { v: "ceremonial", l: "งานพิธี (เนียนกริบ)" },
];
const CLOTHING_GROUPS: { label: string; opts: { v: string; l: string }[] }[] = [
  { label: "", opts: [{ v: "none", l: "── คงชุดเดิม (Keep original) ──" }] },
  { label: "🎓 ชุดนักเรียน-นักศึกษา", opts: [
    { v: "u_knd_m", l: "1. อนุบาล ผู้ชาย" },
    { v: "u_knd_f", l: "1. อนุบาล ผู้หญิง" },
    { v: "u_prm_m", l: "2. ประถม ผู้ชาย" },
    { v: "u_prm_f", l: "2. ประถม ผู้หญิง" },
    { v: "u_jh_m", l: "3. ม.ต้น ผู้ชาย" },
    { v: "u_jh_f", l: "3. ม.ต้น ผู้หญิง" },
    { v: "u_sh_m", l: "4. ม.ปลาย ผู้ชาย" },
    { v: "u_sh_f", l: "4. ม.ปลาย ผู้หญิง" },
    { v: "u_nfe", l: "4. กศน." },
    { v: "u_uni_m", l: "5. มหาวิทยาลัย ผู้ชาย" },
    { v: "u_uni_f", l: "5. มหาวิทยาลัย ผู้หญิง" },
  ]},
  { label: "👔 ชุดทางการ / สูทผู้ชาย", opts: [
    { v: "u_off_m", l: "6. ปกติขาว ผู้ชาย (ราชปะแตน)" },
    { v: "u_off_f", l: "6. ปกติขาว ผู้หญิง" },
    { v: "suit_black", l: "สูทดำ + เนคไท" },
    { v: "suit_black_notie", l: "สูทดำ (ไม่ใส่เนคไท)" },
    { v: "suit_gray", l: "สูทเทาอ่อน + เชิ้ตขาว (ไม่ไท)" },
    { v: "suit_navy", l: "สูทกรมท่า + เนคไท" },
    { v: "suit_navy_3piece", l: "สูทกรมท่า 3 ชิ้น + เนคไทเงิน" },
    { v: "uniform_white", l: "เชิ้ตขาวทางการ" },
    { v: "thai_formal", l: "ชุดไทยทางการ" },
  ]},
  { label: "👩‍💼 สูทผู้หญิง", opts: [
    { v: "women_charcoal_pink", l: "สูทผู้หญิงชาร์โคล + เชิ้ตชมพู" },
    { v: "women_black_round", l: "สูทผู้หญิงดำ + เสื้อขาวคอกลม" },
    { v: "women_gray_white", l: "สูทผู้หญิงเทา + เชิ้ตขาว" },
  ]},
  { label: "🎖️ ชุดพิเศษ", opts: [
    { v: "military", l: "ทหาร / สห. แขนสั้น" },
    { v: "military_formal", l: "ทหารทางการ / ลุคเข้ม" },
    { v: "gown", l: "ชุดครุย (Graduation Gown)" },
  ]},
];
const SUBJECT_GROUPS = [
  { v: "boy", l: "เด็กชาย" },
  { v: "girl", l: "เด็กหญิง" },
  { v: "male", l: "ผู้ชาย" },
  { v: "female", l: "ผู้หญิง" },
];
const BACKGROUNDS = [
  { v: "none", l: "คงฉากเดิม (Keep original)" },
  { v: "blue", l: "ฟ้าไล่สีมาตรฐาน" },
  { v: "white", l: "ขาวล้วนแบบสตูดิโอ" },
  { v: "studio_gray", l: "เทาเข้มไล่สี" },
  { v: "brown_vintage", l: "น้ำตาลวินเทจ" },
  { v: "teal_art", l: "เขียวเทา / ฟ้าเทาแบบอาร์ต" },
  { v: "outdoor_blur", l: "ฉากนอกสถานที่เบลอธรรมชาติ" },
];
const ENHANCERS = [
  { v: "none", l: "ไม่เพิ่ม" },
  { v: "studio_retouch", l: "แสงสตูดิโอ + รีทัชสมจริง" },
  { v: "color_correct", l: "แก้สีและเพิ่มความคม" },
  { v: "vintage_restore", l: "ซ่อมรูปเก่าวินเทจ" },
  { v: "face_recover", l: "กู้ภาพหน้าเบลอให้ชัด" },
];

const selectCls =
  "w-full cursor-pointer rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground transition focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/30";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neon-pink";

export function PromptGenerator() {
  const [inputs, setInputs] = useState<GenInputs>({
    action: "passport",
    expression: "neutral",
    makeup: "clear_skin",
    clothing: "none",
    hairstyleGroup: "female",
    hairstyleId: "keep-original",
    bg: "none",
    enhancer: "none",
    negatives: [],
    size: "size-none",
  });
  const [qrOpen, setQrOpen] = useState(false);
  const { push } = useHistory();

  const hairstyles = useMemo(() => (HAIRSTYLE_GROUPS as any)[inputs.hairstyleGroup] || [], [inputs.hairstyleGroup]);

  useEffect(() => {
    if (!hairstyles.some((s: any) => s.id === inputs.hairstyleId)) {
      setInputs((p) => ({ ...p, hairstyleId: hairstyles[0]?.id || "keep-original" }));
    }
  }, [hairstyles, inputs.hairstyleId]);

  const output = useMemo(() => generateMainPrompt(inputs), [inputs]);
  const shortOutput = useMemo(() => generateShortPrompt(inputs), [inputs]);
  const update = (k: keyof GenInputs) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setInputs((p) => ({ ...p, [k]: e.target.value }));

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    push(output, "Generator (Full)");
    toast.success("คัดลอกพรอมต์เรียบร้อย!");
  };

  const copyShort = async () => {
    await navigator.clipboard.writeText(shortOutput);
    push(shortOutput, "Generator (Short)");
    toast.success("คัดลอกแบบสั้นแล้ว!", { description: "เหมาะกับ AI ที่จำกัดตัวอักษร" });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          <span className="neon-gradient-text">✨ เครื่องมือสร้างพรอมต์</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ล็อคใบหน้า + สัดส่วนภาพอัตโนมัติ — ปรับคำสั่งให้เหมาะกับงานแก้ภาพบน Gemini / DALL·E มากขึ้น
        </p>
        <div className="mt-3 rounded-xl border border-neon-green/20 bg-neon-green/5 px-4 py-3 text-sm text-foreground/90">
          <p className="font-semibold text-neon-green">🎯 โครงพรอมต์รอบนี้เน้นงานจาก reference image</p>
          <p className="mt-1 text-foreground/70">
            เพิ่ม intent เปิดต้นประโยค, คำสั่งแบบ change only, และ lock framing/aspect ratio เพื่อให้ผลลัพธ์นิ่งขึ้น
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[280px,minmax(0,1fr)]">
        <ToolSidebar />

        <div className="glass-card overflow-hidden rounded-2xl lg:flex">
          <div className="space-y-4 border-b border-white/5 bg-surface/30 p-5 lg:w-5/12 lg:border-b-0 lg:border-r">
            <PresetManager current={inputs} onLoad={(i) => setInputs({ ...inputs, ...i })} />
            <div>
              <label className={labelCls}>หมวดงานหลัก (Action)</label>
              <select className={selectCls} value={inputs.action} onChange={update("action")}>
                {ACTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>สีหน้า (Expression)</label>
              <select className={selectCls} value={inputs.expression} onChange={update("expression")}>
                {EXPRESSIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>การแต่งหน้า (Makeup)</label>
              <select className={selectCls} value={inputs.makeup} onChange={update("makeup")}>
                {MAKEUP.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>เครื่องแต่งกาย (Clothing)</label>
              <select className={selectCls} value={inputs.clothing} onChange={update("clothing")}>
                {CLOTHING_GROUPS.map((g, i) =>
                  g.label ? (
                    <optgroup key={i} label={g.label}>
                      {g.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </optgroup>
                  ) : (
                    g.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)
                  ),
                )}
              </select>
            </div>
            <div>
              <label className={labelCls}>กลุ่มบุคคล / ช่วงวัย</label>
              <select className={selectCls} value={inputs.hairstyleGroup} onChange={update("hairstyleGroup")}>
                {SUBJECT_GROUPS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>ทรงผม (Hairstyle)</label>
              <select className={selectCls} value={inputs.hairstyleId} onChange={update("hairstyleId")}>
                {hairstyles.map((s: any) => <option key={s.id} value={s.id}>{s.labelTh}</option>)}
              </select>
              <p className="mt-1 text-[11px] text-muted-foreground">ค่าเริ่มต้นคือคงทรงเดิม</p>
            </div>
            <div>
              <label className={labelCls}>ฉากหลัง (Background)</label>
              <select className={selectCls} value={inputs.bg} onChange={update("bg")}>
                {BACKGROUNDS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>ตัวเสริมคุณภาพ (Optional)</label>
              <select className={selectCls} value={inputs.enhancer} onChange={update("enhancer")}>
                {ENHANCERS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
              <p className="mt-1 text-[11px] text-muted-foreground">แนะนำเลือกทีละ 1 ตัว</p>
            </div>
            <div>
              <label className={labelCls}>📐 ขนาดผลลัพธ์ (สำหรับพิมพ์)</label>
              <select className={selectCls} value={inputs.size} onChange={update("size")}>
                {OUTPUT_SIZES.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
            <NegativePromptPicker
              selected={inputs.negatives || []}
              onChange={(ids) => setInputs((p) => ({ ...p, negatives: ids }))}
            />
          </div>

          <div className="flex flex-col p-5 lg:w-7/12">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neon-green">ผลลัพธ์พรอมต์</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-neon-cyan/15 px-2 py-0.5 text-[10px] font-semibold text-neon-cyan">
                  <ImageIcon className="h-3 w-3" /> Auto-Frame
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-neon-pink/15 px-2 py-0.5 text-[10px] font-semibold text-neon-pink">
                  <Lock className="h-3 w-3" /> Face Lock
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-neon-green/15 px-2 py-0.5 text-[10px] font-semibold text-neon-green">
                  <Bot className="h-3 w-3" /> Gemini / DALL·E
                </span>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              className="output-box min-h-[260px] flex-1 resize-none rounded-xl p-4 font-mono text-sm leading-relaxed focus:outline-none"
            />
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr,auto,auto]">
              <button onClick={copy} className="btn-neon flex items-center justify-center gap-2 py-3 text-sm">
                <Copy className="h-4 w-4" /> คัดลอกแบบเต็ม ({output.length} ตัว)
              </button>
              <button
                onClick={copyShort}
                className="flex items-center justify-center gap-2 rounded-xl border border-neon-pink/40 bg-neon-pink/10 px-4 py-3 text-sm font-bold text-neon-pink transition hover:bg-neon-pink/20"
                title="พรอมต์แบบสั้น (สำหรับ AI ที่จำกัดตัวอักษร)"
              >
                <Zap className="h-4 w-4" /> สั้น
              </button>
              <button
                onClick={() => setQrOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-foreground transition hover:border-neon-cyan/40 hover:text-neon-cyan"
                title="สแกน QR"
              >
                <QrCode className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <QrCodeModal open={qrOpen} text={output} onClose={() => setQrOpen(false)} />
    </div>
  );
}