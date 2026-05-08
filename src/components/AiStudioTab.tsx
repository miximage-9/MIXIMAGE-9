import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Copy,
  FileText,
  ImagePlus,
  Loader2,
  PenTool,
  Send,
  SlidersHorizontal,
  Sparkles,
  Upload,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useHistory } from "@/hooks/useHistory";

const API_URL = import.meta.env.VITE_API_URL || "/api/generate";

type Mode = "content" | "youtube" | "prompt";
type OutputKey = "content" | "youtube" | "imagePrompt" | "promptTune";

type ImageValue = {
  imageDataUrl: string;
  fileName: string;
};

const modes: { id: Mode; label: string; icon: typeof Sparkles }[] = [
  { id: "content", label: "ปั้นคอนเทนต์", icon: FileText },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "prompt", label: "ออกแบบพรอมต์ภาพ", icon: PenTool },
];

const emptyImage: ImageValue = { imageDataUrl: "", fileName: "" };

export function AiStudioTab() {
  const [mode, setMode] = useState<Mode>("prompt");
  const [loading, setLoading] = useState<OutputKey | null>(null);
  const [error, setError] = useState("");
  const { push } = useHistory();

  const [contentForm, setContentForm] = useState({
    platform: "Facebook",
    contentType: "โพสต์ขาย / โปรโมต",
    tone: "จริงใจ อ่านง่าย",
    goal: "ให้คนทักแชทหรือกดติดตาม",
    topic: "บริการสร้างภาพด้วย AI",
    audience: "เจ้าของร้าน ครีเอเตอร์ และคนทำเพจ",
    offer: "",
    constraints: "ไม่เว่อร์ ไม่ขายแข็ง ไม่ใส่ข้อมูลที่ไม่ได้ให้",
  });

  const [youtubeForm, setYoutubeForm] = useState({
    contentType: "เพลง",
    title: "",
    details: "",
    audience: "ผู้ชมทั่วไป",
    extraInfo: "",
  });

  const [imagePromptForm, setImagePromptForm] = useState({
    ...emptyImage,
    brief: "แตกภาพนี้ให้เป็นพรอมต์สร้างภาพที่นำไปใช้ได้จริง",
    targetUse: "ใช้สร้างภาพใหม่จาก reference นี้",
    subject: "ใช้กับสิ่งนี้ / ตัวนี้ / คนนี้",
    outputStyle: "สมจริง รายละเอียดแน่น คุมองค์ประกอบชัด",
    ratio: "คงสัดส่วนจากภาพอ้างอิง",
    mustKeep: "โครงหน้า ท่าทาง จุดเด่นหลัก และบรรยากาศสำคัญ",
  });

  const [tuneForm, setTuneForm] = useState({
    ...emptyImage,
    originalPrompt: "",
    requirements: "ปรับให้คมขึ้น ใช้งานจริงกับ GPT Image 2 และคุมผลลัพธ์ไม่หลุด",
    targetUse: "ใช้กับภาพนี้ / คนนี้ / สินค้านี้",
    intensity: "ปรับหนักแต่ยังคงเจตนาเดิม",
    outputStyle: "พร้อมคัดลอกไปใช้ทันที",
  });

  const [outputs, setOutputs] = useState<Record<OutputKey, string>>({
    content: "",
    youtube: "",
    imagePrompt: "",
    promptTune: "",
  });

  async function generate(tool: string, payload: Record<string, unknown>, outputKey: OutputKey) {
    setError("");
    setLoading(outputKey);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, payload }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "สร้างผลลัพธ์ไม่สำเร็จ");
      }

      setOutputs((current) => ({ ...current, [outputKey]: data.text || "" }));
      toast.success("สร้างผลลัพธ์แล้ว");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "สร้างผลลัพธ์ไม่สำเร็จ";
      setError(message.includes("fetch") ? "เรียก API ไม่สำเร็จ" : message);
    } finally {
      setLoading(null);
    }
  }

  async function copyOutput(outputKey: OutputKey, label: string) {
    const text = outputs[outputKey];
    if (!text.trim()) return;

    await navigator.clipboard.writeText(text);
    push(text, label);
    toast.success("คัดลอกแล้ว", { description: label });
  }

  return (
    <section className="space-y-5">
      <header className="glass-card-hero rounded-3xl p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-neon-green/25 bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green">
              AI Tools
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              เครื่องมือสร้างคอนเทนต์และพรอมต์ภาพ
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              ปั้นคอนเทนต์, เขียนคำอธิบาย YouTube, แตกภาพเป็นพรอมต์ และจูนพรอมต์ให้พร้อมใช้กับ GPT Image 2
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-3 text-xs text-muted-foreground">
            ผลลัพธ์ที่คัดลอกจะเข้า History และซิงก์ข้ามเครื่องได้ผ่าน Cloud Sync
          </div>
        </div>
      </header>

      <div className="glass-card rounded-2xl p-2">
        <div className="tabs-scroll flex gap-2 overflow-x-auto">
          {modes.map((item) => {
            const Icon = item.icon;
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold transition",
                  active
                    ? "bg-gradient-neon text-background shadow-neon-mix"
                    : "bg-surface/70 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm font-semibold text-destructive-foreground">
          {error}
        </div>
      )}

      {mode === "content" && (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="ปั้นคอนเทนต์" subtitle="กรอกสั้น ๆ แล้วให้ระบบจัดเป็นคอนเทนต์พร้อมใช้">
            <div className="grid gap-3 md:grid-cols-2">
              <SelectField
                label="แพลตฟอร์ม"
                value={contentForm.platform}
                onChange={(platform) => setContentForm({ ...contentForm, platform })}
                options={["Facebook", "TikTok", "Instagram", "YouTube Shorts", "LINE OA"]}
              />
              <SelectField
                label="ประเภทคอนเทนต์"
                value={contentForm.contentType}
                onChange={(contentType) => setContentForm({ ...contentForm, contentType })}
                options={[
                  "โพสต์ขาย / โปรโมต",
                  "ไอเดียคลิปสั้น",
                  "สคริปต์พูดหน้ากล้อง",
                  "โพสต์เล่าเรื่อง",
                  "ประกาศบริการ",
                  "รีวิวสินค้า",
                ]}
              />
            </div>
            <TextInput
              label="หัวข้อ / สินค้า / บริการ"
              value={contentForm.topic}
              onChange={(topic) => setContentForm({ ...contentForm, topic })}
            />
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput
                label="กลุ่มเป้าหมาย"
                value={contentForm.audience}
                onChange={(audience) => setContentForm({ ...contentForm, audience })}
              />
              <TextInput
                label="เป้าหมาย"
                value={contentForm.goal}
                onChange={(goal) => setContentForm({ ...contentForm, goal })}
              />
            </div>
            <TextInput
              label="โทนภาษา"
              value={contentForm.tone}
              onChange={(tone) => setContentForm({ ...contentForm, tone })}
            />
            <TextArea
              label="ข้อมูลขาย / โปร / จุดเด่น"
              value={contentForm.offer}
              onChange={(offer) => setContentForm({ ...contentForm, offer })}
              placeholder="เช่น ราคา จุดเด่น ช่องทางติดต่อ โปรโมชัน หรือสิ่งที่ต้องใส่"
              rows={4}
            />
            <TextArea
              label="ข้อกำหนด / คำที่ห้ามใช้"
              value={contentForm.constraints}
              onChange={(constraints) => setContentForm({ ...contentForm, constraints })}
              rows={3}
            />
            <GenerateButton
              loading={loading === "content"}
              disabled={!contentForm.topic.trim()}
              onClick={() => generate("content", { ...contentForm, maxOutputTokens: 1800 }, "content")}
            >
              สร้างคอนเทนต์
            </GenerateButton>
          </Panel>

          <ResultPanel
            title="ผลลัพธ์คอนเทนต์"
            value={outputs.content}
            onCopy={() => copyOutput("content", "Content Builder")}
          />
        </div>
      )}

      {mode === "youtube" && (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="YouTube Description" subtitle="คำอธิบาย, Top hashtags, tags และ pinned comment">
            <SelectField
              label="ประเภทคลิป"
              value={youtubeForm.contentType}
              onChange={(contentType) => setYoutubeForm({ ...youtubeForm, contentType })}
              options={[
                "เพลง",
                "คลิปสั้น",
                "รีวิวสินค้า",
                "Vlog",
                "สอนใช้งาน / How-to",
                "เกม",
                "โปรโมตร้าน",
                "เบื้องหลัง",
                "ไลฟ์ / ไฮไลต์",
              ]}
            />
            <TextInput
              label="ชื่อคลิปหรือหัวข้อ"
              value={youtubeForm.title}
              onChange={(title) => setYoutubeForm({ ...youtubeForm, title })}
              placeholder="เช่น เพลงใหม่ / รีวิวสินค้า / คลิปสั้นขายของ"
            />
            <TextArea
              label="ข้อมูลคลิป"
              value={youtubeForm.details}
              onChange={(details) => setYoutubeForm({ ...youtubeForm, details })}
              placeholder="ใส่เนื้อหา จุดเด่น อารมณ์เพลง สินค้า หรือสิ่งที่ต้องการให้ผู้ชมรู้"
              rows={5}
            />
            <TextInput
              label="กลุ่มเป้าหมาย"
              value={youtubeForm.audience}
              onChange={(audience) => setYoutubeForm({ ...youtubeForm, audience })}
            />
            <TextArea
              label="ข้อมูลเสริม / ตัวกรอง"
              value={youtubeForm.extraInfo}
              onChange={(extraInfo) => setYoutubeForm({ ...youtubeForm, extraInfo })}
              placeholder="ชื่อร้าน เบอร์โทร ลิงก์ เพจ ราคา โปรโมชัน คำที่ต้องใส่ หรือคำที่ห้ามใช้"
              rows={4}
            />
            <GenerateButton
              loading={loading === "youtube"}
              disabled={!youtubeForm.title.trim() || !youtubeForm.details.trim()}
              onClick={() => generate("youtube", { ...youtubeForm, maxOutputTokens: 2400 }, "youtube")}
            >
              สร้างคำอธิบาย YouTube
            </GenerateButton>
          </Panel>

          <ResultPanel
            title="ผลลัพธ์ YouTube"
            value={outputs.youtube}
            onCopy={() => copyOutput("youtube", "YouTube Description")}
          />
        </div>
      )}

      {mode === "prompt" && (
        <div className="grid items-start gap-5 xl:grid-cols-2">
          <Panel
            title="แตกภาพเป็นพรอมต์"
            subtitle="ใส่ภาพ แล้วบอกว่าจะเอาไปใช้กับอะไร ระบบจะแตกเป็นพรอมต์พร้อมใช้"
          >
            <ImageInput
              label="ภาพต้นแบบ"
              value={imagePromptForm}
              onChange={(image) => setImagePromptForm({ ...imagePromptForm, ...image })}
            />
            <TextArea
              label="บรีฟสั้น ๆ"
              value={imagePromptForm.brief}
              onChange={(brief) => setImagePromptForm({ ...imagePromptForm, brief })}
              rows={3}
            />
            <TextInput
              label="เอาพรอมต์นี้ไปใช้กับ"
              value={imagePromptForm.subject}
              onChange={(subject) => setImagePromptForm({ ...imagePromptForm, subject })}
              placeholder="เช่น สินค้านี้ / ตัวนี้ / คนนี้ / คาแรกเตอร์นี้"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput
                label="รูปแบบงาน"
                value={imagePromptForm.targetUse}
                onChange={(targetUse) => setImagePromptForm({ ...imagePromptForm, targetUse })}
              />
              <TextInput
                label="สัดส่วนภาพ"
                value={imagePromptForm.ratio}
                onChange={(ratio) => setImagePromptForm({ ...imagePromptForm, ratio })}
              />
            </div>
            <TextArea
              label="สิ่งที่ต้องคงไว้"
              value={imagePromptForm.mustKeep}
              onChange={(mustKeep) => setImagePromptForm({ ...imagePromptForm, mustKeep })}
              rows={3}
            />
            <TextInput
              label="สไตล์ผลลัพธ์"
              value={imagePromptForm.outputStyle}
              onChange={(outputStyle) => setImagePromptForm({ ...imagePromptForm, outputStyle })}
            />
            <GenerateButton
              loading={loading === "imagePrompt"}
              disabled={!imagePromptForm.imageDataUrl}
              onClick={() =>
                generate("imagePrompt", { ...imagePromptForm, maxOutputTokens: 2200 }, "imagePrompt")
              }
            >
              วิเคราะห์และแตกพรอมต์
            </GenerateButton>
            <InlineResult
              title="พรอมต์จากภาพ"
              value={outputs.imagePrompt}
              onCopy={() => copyOutput("imagePrompt", "Image to GPT Image Prompt")}
            />
          </Panel>

          <Panel
            title="จูนพรอมต์"
            subtitle="ใส่พรอมต์เดิม ความต้องการ และภาพอ้างอิง เพื่อปรับให้คุมผลลัพธ์ดีขึ้น"
          >
            <ImageInput
              label="ภาพที่จะใช้ประกอบ"
              value={tuneForm}
              onChange={(image) => setTuneForm({ ...tuneForm, ...image })}
            />
            <TextArea
              label="พรอมต์เดิม"
              value={tuneForm.originalPrompt}
              onChange={(originalPrompt) => setTuneForm({ ...tuneForm, originalPrompt })}
              placeholder="วางพรอมต์เดิม หรือพรอมต์ที่แตกจากฝั่งซ้าย"
              rows={5}
            />
            <TextArea
              label="ความต้องการ"
              value={tuneForm.requirements}
              onChange={(requirements) => setTuneForm({ ...tuneForm, requirements })}
              rows={4}
            />
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput
                label="ใช้กับ"
                value={tuneForm.targetUse}
                onChange={(targetUse) => setTuneForm({ ...tuneForm, targetUse })}
              />
              <SelectField
                label="ระดับการปรับ"
                value={tuneForm.intensity}
                onChange={(intensity) => setTuneForm({ ...tuneForm, intensity })}
                options={[
                  "ปรับเบา คงของเดิม",
                  "ปรับกลาง ใช้งานจริง",
                  "ปรับหนักแต่ยังคงเจตนาเดิม",
                  "รีไรท์ใหม่แบบโปร",
                ]}
              />
            </div>
            <TextInput
              label="รูปแบบผลลัพธ์"
              value={tuneForm.outputStyle}
              onChange={(outputStyle) => setTuneForm({ ...tuneForm, outputStyle })}
            />
            <button
              type="button"
              onClick={() => setTuneForm({ ...tuneForm, originalPrompt: outputs.imagePrompt })}
              disabled={!outputs.imagePrompt}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-4 text-sm font-bold text-neon-cyan transition hover:bg-neon-cyan/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SlidersHorizontal className="h-4 w-4" />
              ใช้พรอมต์จากฝั่งซ้าย
            </button>
            <GenerateButton
              loading={loading === "promptTune"}
              disabled={!tuneForm.originalPrompt.trim() && !tuneForm.imageDataUrl}
              onClick={() => generate("promptTune", { ...tuneForm, maxOutputTokens: 2200 }, "promptTune")}
            >
              จูนพรอมต์
            </GenerateButton>
            <InlineResult
              title="พรอมต์ที่จูนแล้ว"
              value={outputs.promptTune}
              onCopy={() => copyOutput("promptTune", "Prompt Tuner")}
            />
          </Panel>
        </div>
      )}
    </section>
  );
}

function Panel({
  children,
  subtitle,
  title,
}: {
  children: ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <section className="glass-card rounded-3xl p-4 md:p-5">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function ResultPanel({
  onCopy,
  title,
  value,
}: {
  onCopy: () => void;
  title: string;
  value: string;
}) {
  return (
    <section className="glass-card rounded-3xl p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">พร้อมคัดลอกไปใช้งาน</p>
        </div>
        <IconButton onClick={onCopy} disabled={!value.trim()} label="คัดลอก">
          <Copy className="h-4 w-4" />
        </IconButton>
      </div>
      <textarea
        readOnly
        value={value || "ผลลัพธ์จะอยู่ตรงนี้หลังจากกดสร้าง"}
        className="min-h-[520px] w-full resize-none rounded-2xl border border-white/10 bg-surface/75 p-4 text-sm leading-7 text-foreground outline-none"
      />
    </section>
  );
}

function InlineResult({
  onCopy,
  title,
  value,
}: {
  onCopy: () => void;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface/70 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-neon-green">{title}</p>
        <IconButton onClick={onCopy} disabled={!value.trim()} label="คัดลอก">
          <Copy className="h-4 w-4" />
        </IconButton>
      </div>
      <textarea
        readOnly
        value={value || "ผลลัพธ์จะแสดงที่นี่"}
        className="min-h-[280px] w-full resize-y rounded-xl border border-border bg-background/70 p-3 text-sm leading-7 text-foreground outline-none"
      />
    </div>
  );
}

function GenerateButton({
  children,
  disabled,
  loading,
  onClick,
}: {
  children: ReactNode;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="btn-neon inline-flex h-12 w-full items-center justify-center gap-2 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-45"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      {children}
    </button>
  );
}

function SelectField({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground outline-none transition focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextInput({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
      />
    </label>
  );
}

function TextArea({
  label,
  onChange,
  placeholder,
  rows = 4,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-border bg-surface p-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
      />
    </label>
  );
}

function ImageInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (image: ImageValue) => void;
  value: ImageValue;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("ไฟล์ต้องเป็นรูปภาพ");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("รูปใหญ่เกินไป", { description: "แนะนำไม่เกิน 5MB" });
      return;
    }

    const imageDataUrl = await readFileAsDataUrl(file);
    onChange({ imageDataUrl, fileName: file.name });
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-bold uppercase text-muted-foreground">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      {value.imageDataUrl ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/70">
          <img src={value.imageDataUrl} alt={value.fileName || label} className="h-48 w-full object-cover" />
          <div className="flex items-center justify-between gap-3 p-3">
            <p className="min-w-0 truncate text-xs text-muted-foreground">{value.fileName}</p>
            <button
              type="button"
              onClick={() => onChange(emptyImage)}
              className="inline-flex h-8 items-center gap-1 rounded-lg bg-destructive/15 px-2 text-xs font-bold text-destructive-foreground transition hover:bg-destructive/25"
            >
              <X className="h-3.5 w-3.5" />
              ลบ
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files?.[0]);
          }}
          className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neon-cyan/35 bg-neon-cyan/5 p-5 text-center transition hover:bg-neon-cyan/10"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-cyan/10 text-neon-cyan">
            <ImagePlus className="h-6 w-6" />
          </span>
          <span className="text-sm font-bold text-foreground">อัปโหลดหรือวางรูปตรงนี้</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Upload className="h-3.5 w-3.5" />
            PNG, JPG, WEBP ไม่เกิน 5MB
          </span>
        </button>
      )}
    </div>
  );
}

function IconButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition hover:border-neon-green/40 hover:text-neon-green disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("อ่านไฟล์รูปไม่สำเร็จ"));
    reader.readAsDataURL(file);
  });
}
