import { useEffect, useState } from "react";
import {
  Captions,
  Copy,
  Image,
  ImagePlus,
  Lightbulb,
  Music2,
  Save,
  Send,
  Trash2,
  WandSparkles,
  Youtube,
} from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const API_URL = import.meta.env.VITE_API_URL || "/api/generate";

const defaultYoutubeForm = {
  audience: "แฟนคลับและผู้ชมใหม่",
  contentType: "เพลง",
  details:
    "เล่าเนื้อหา จุดเด่น บรรยากาศ หรือสิ่งที่อยากให้คนดูรู้เกี่ยวกับคลิปนี้",
  extraInfo:
    "ชื่อร้าน/แบรนด์/ช่องทางติดต่อ/โปรโมชัน/คำที่ต้องใส่หรือห้ามใส่",
  title: "ชื่อคลิปหรือชื่อเพลง",
};

const defaultSunoForm = {
  avoid:
    "คำซ้ำซากแบบ AI, ประโยคสวยแต่ไม่เจ็บจริง, การบอกอารมณ์ตรง ๆ เกินไป",
  complexity: "ซับซ้อนแบบโปร",
  genreSelections: [
    "cinematic Thai rap",
    "orchestral hip hop",
    "dark piano ballad",
  ],
  hook: "ฮุกสั้น จำง่าย มีสองชั้นความหมาย",
  language: "ไทย",
  moodSelections: [
    "มั่นใจนิ่ง ๆ หลังโดนดูถูก",
    "เจ็บแต่ไม่ฟูมฟาย",
    "อบอุ่นปนมืด",
  ],
  perspective: "คนสร้างงานที่ไม่อยากเถียง",
  story:
    "คนทำเพลงด้วยเครื่องมือ AI แต่ใช้หูและใจควบคุมทุกชั้นเสียง ให้ผลงานพูดแทนปาก",
  vocal: "calm male close mic, warm breath, controlled power chorus",
};

const sunoGenreOptions = [
  "cinematic Thai rap",
  "orchestral hip hop",
  "dark piano ballad",
  "Thai pop ballad",
  "alt R&B",
  "trap soul",
  "R&B slow jam",
  "lo-fi pop",
  "city pop",
  "indie pop rock",
  "synthwave",
  "EDM pop",
  "dream pop",
  "rock ballad",
  "drill / trap",
  "acoustic folk",
  "jazz soul",
  "funk pop",
  "anime opening",
  "ลูกทุ่งอินดี้",
  "หมอลำ fusion",
  "เพื่อชีวิต modern",
  "orchestral cinematic",
  "Thai flute fusion",
  "dark grand piano",
  "deep 808 sub",
  "live drum kit",
  "choir pads",
];

const sunoMoodOptions = [
  "มั่นใจนิ่ง ๆ หลังโดนดูถูก",
  "เจ็บแต่ไม่ฟูมฟาย",
  "คิดถึงแบบเก็บไว้",
  "อบอุ่นปนมืด",
  "โกรธแบบคุมเสียง",
  "เหงาในเมืองใหญ่",
  "รักที่พูดไม่ได้",
  "ผิดหวังแต่ยังมีศักดิ์ศรี",
  "ชนะโดยไม่ต้องตะโกน",
  "ลึกแต่ไม่ดราม่าเกิน",
  "ลึกลับ cinematic",
  "หวังเล็ก ๆ หลังพัง",
  "ประชดนิ่ง ๆ",
  "ทะเยอทะยานแบบคนทำงาน",
  "ปล่อยวางแต่ยังเจ็บ",
  "โรแมนติกแบบผู้ใหญ่",
  "ดิบ จริง ไม่ประดิษฐ์",
  "มืดแต่แพง",
  "คิดถึงบ้าน / รากเหง้า",
  "พลังใจแบบไม่ขายฝัน",
];

const sunoHookOptions = [
  "ฮุกสั้น จำง่าย มีสองชั้นความหมาย",
  "ฮุกวนซ้ำแบบติดหูมาก",
  "ฮุกตะโกนได้ในคอนเสิร์ต",
  "ฮุกกระซิบแต่เจ็บ",
  "ฮุกเป็นคำถาม",
  "ฮุกประชดนิ่ง ๆ",
  "ฮุกบอกลาโดยไม่พูดว่าลา",
  "ฮุก cinematic เล่นใหญ่",
  "ฮุก rap chant จำง่าย",
  "ฮุกเปลี่ยนความหมายตอนท้ายเพลง",
  "ฮุกแบบประโยคเดียวแทงใจ",
  "ฮุกภาษาไทยปนอังกฤษนิด ๆ",
];

const sunoVocalOptions = [
  "calm male close mic, warm breath, controlled power chorus",
  "warm male vocal with soft rasp and intimate doubles",
  "breathy female vocal, fragile verse, wide chorus",
  "powerful female belt with soft harmony stack",
  "male/female duet call and response",
  "smooth R&B falsetto with airy ad-libs",
  "spoken rap calm pocket with natural breath",
  "low baritone narrative vocal",
  "youthful pop vocal, clean and bright",
  "raspy rock vocal, emotional but controlled",
  "choir-backed hook with dry lead vocal",
  "whisper intimate vocal with cinematic lift",
];

const sunoPerspectiveOptions = [
  "คนสร้างงานที่ไม่อยากเถียง",
  "คนที่ยังรัก แต่ต้องทำเหมือนไม่รู้สึกอะไรแล้ว",
  "คนถูกทิ้งที่ไม่ขอร้อง",
  "คนผิดที่พูดขอโทษไม่เก่ง",
  "คนรอที่เริ่มรู้ว่าควรไป",
  "คนชนะที่ไม่ได้อยากทำร้ายใคร",
  "คนธรรมดาที่อยากพิสูจน์ด้วยงาน",
  "คนที่กลับบ้านแล้วไม่เหมือนเดิม",
  "คนที่รักเงียบ ๆ จากไกล ๆ",
  "คนที่ปล่อยมือ แต่ยังจำรายละเอียดได้หมด",
];

const toolTabs = [
  { id: "youtube", label: "YouTube Description", icon: Youtube },
  { id: "suno", label: "Suno Songwriter", icon: Music2 },
  { id: "caption", label: "สร้างแคปชัน", icon: Captions },
  { id: "enhancer", label: "ปรับพรอมป์", icon: WandSparkles },
  { id: "ideas", label: "สุ่มไอเดีย", icon: Lightbulb },
  { id: "image", label: "วิเคราะห์ภาพ", icon: Image },
];

const toolModeBadges = {
  default: {
    className: "bg-emerald-100/70 text-emerald-700",
    label: "โหมดประหยัด: จีพีทีไฟว์มินิ",
  },
  suno: {
    className: "bg-indigo-100/75 text-indigo-700",
    label: "โหมดเพลง: โปรดักชันละเอียด + เนื้อร้องลึก",
  },
  youtube: {
    className: "bg-sky-100/75 text-sky-700",
    label: "โหมด YouTube SEO: พร้อมวางใต้คลิป",
  },
};

function AITools({ onCopy, onSavePrompt }) {
  const [activeTool, setActiveTool] = useState("youtube");
  const [loadingTool, setLoadingTool] = useState(null);
  const [error, setError] = useState("");
  const modeBadge = toolModeBadges[activeTool] || toolModeBadges.default;
  const [youtubePreset, setYoutubePreset] = useLocalStorage(
    "mixtoole-youtube-description-preset-v1",
    null
  );
  const [youtubePresetMessage, setYoutubePresetMessage] = useState("");
  const [youtubeForm, setYoutubeForm] = useState(() =>
    getYoutubeFormDefaults(youtubePreset)
  );
  const [sunoForm, setSunoForm] = useState(defaultSunoForm);
  const [captionForm, setCaptionForm] = useState({
    platform: "อินสตาแกรม",
    tone: "เป็นกันเอง",
    length: "สั้น",
    topic: "โพสต์แนะนำเครื่องมือเอไอส่วนตัว",
  });
  const [enhancerForm, setEnhancerForm] = useState({
    mode: "ละเอียดขึ้น",
    prompt: "ช่วยเขียนแคปชันขายสินค้าให้น่าสนใจ",
  });
  const [ideaForm, setIdeaForm] = useState({
    kind: "ไอเดียคอนเทนต์",
    topic: "เครื่องมือเอไอสำหรับครีเอเตอร์",
  });
  const [imageForm, setImageForm] = useState({
    imageDataUrl: "",
    fileName: "",
  });
  const [outputs, setOutputs] = useState({
    youtube: "",
    suno: "",
    caption: "",
    enhancer: "",
    ideas: "",
    image: "",
  });

  useEffect(() => {
    function restoreYoutubePreset() {
      const savedPreset = readYoutubePreset();
      setYoutubePreset(savedPreset);
      setYoutubeForm(getYoutubeFormDefaults(savedPreset));
      setYoutubePresetMessage(
        savedPreset ? "โหลดค่าจากคลาวด์แล้ว" : "ไม่มีค่า YouTube preset บนคลาวด์"
      );
    }

    window.addEventListener("mixtoole-sync-restored", restoreYoutubePreset);
    return () =>
      window.removeEventListener("mixtoole-sync-restored", restoreYoutubePreset);
  }, [setYoutubePreset]);

  async function generate(tool, payload) {
    setError("");
    setLoadingTool(tool);

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

      setOutputs((current) => ({ ...current, [tool]: data.text }));
    } catch (caughtError) {
      setError(
        caughtError.message.includes("fetch")
          ? "ยังไม่ได้เปิด OpenAI proxy ในเครื่อง"
          : caughtError.message
      );
    } finally {
      setLoadingTool(null);
    }
  }

  function saveOutput(tool) {
    const output = outputs[tool];
    const meta = saveMeta[tool];
    onSavePrompt({
      imageDataUrl: tool === "image" ? imageForm.imageDataUrl : "",
      title: meta.title,
      text: output,
      tags: meta.tags,
      previewStyle: meta.previewStyle,
    });
  }

  function sendImageToCaption() {
    setCaptionForm((current) => ({
      ...current,
      topic: outputs.image || "ภาพที่เพิ่งวิเคราะห์",
    }));
    setActiveTool("caption");
  }

  function saveYoutubePreset() {
    setYoutubePreset(youtubeForm);
    setYoutubePresetMessage("บันทึกเป็นค่าเริ่มต้นแล้ว");
  }

  function deleteYoutubePreset() {
    setYoutubePreset(null);
    setYoutubeForm(getYoutubeFormDefaults(null));
    setYoutubePresetMessage("ลบค่าที่บันทึกแล้ว");
  }

  return (
    <section className="space-y-4">
      <header className="rounded-[28px] border border-white/65 bg-white/55 p-4 shadow-glass backdrop-blur-xl sm:p-5">
        <p className="mb-3 inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-500">
          AI Tools
        </p>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="break-words text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Click to Create
            </h1>
            <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-600">
              ใช้เครดิต OpenAI ผ่าน server ในเครื่อง คัดลอกผลลัพธ์ หรือบันทึกเข้าคลังพรอมป์ได้ทันที
            </p>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${modeBadge.className}`}>
            {modeBadge.label}
          </span>
        </div>
      </header>

      <section className="rounded-[24px] border border-white/65 bg-white/45 p-2.5 shadow-soft backdrop-blur-xl">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {toolTabs.map((tool) => {
            const Icon = tool.icon;
            const active = activeTool === tool.id;

            return (
              <button
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                  active
                    ? "bg-slate-900 text-white shadow-soft"
                    : "bg-white/60 text-slate-600 hover:bg-white"
                }`}
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
              >
                <Icon className="h-5 w-5" />
                {tool.label}
              </button>
            );
          })}
        </div>
      </section>

      {error && (
        <div className="rounded-[24px] border border-rose-100 bg-rose-50/80 p-4 text-sm font-semibold text-rose-700 shadow-soft">
          {error}
        </div>
      )}

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <ToolPanel title={toolLabels[activeTool]}>
          {activeTool === "youtube" && (
            <YoutubeDescriptionTool
              form={youtubeForm}
              hasPreset={Boolean(youtubePreset)}
              loading={loadingTool === "youtube"}
              presetMessage={youtubePresetMessage}
              onChange={setYoutubeForm}
              onDeletePreset={deleteYoutubePreset}
              onGenerate={() =>
                generate("youtube", {
                  ...youtubeForm,
                  maxOutputTokens: 2400,
                })
              }
              onSavePreset={saveYoutubePreset}
            />
          )}

          {activeTool === "suno" && (
            <SunoSongTool
              form={sunoForm}
              loading={loadingTool === "suno"}
              onChange={setSunoForm}
              onGenerate={() =>
                generate("suno", {
                  ...buildSunoPayload(sunoForm),
                  maxOutputTokens: 4300,
                })
              }
            />
          )}

          {activeTool === "caption" && (
            <CaptionTool
              form={captionForm}
              loading={loadingTool === "caption"}
              onChange={setCaptionForm}
              onGenerate={() => generate("caption", captionForm)}
            />
          )}

          {activeTool === "enhancer" && (
            <EnhancerTool
              form={enhancerForm}
              loading={loadingTool === "enhancer"}
              onChange={setEnhancerForm}
              onGenerate={() => generate("enhancer", enhancerForm)}
            />
          )}

          {activeTool === "ideas" && (
            <IdeaTool
              form={ideaForm}
              loading={loadingTool === "ideas"}
              onChange={setIdeaForm}
              onGenerate={() => generate("ideas", ideaForm)}
            />
          )}

          {activeTool === "image" && (
            <ImageTool
              form={imageForm}
              loading={loadingTool === "image"}
              onChange={setImageForm}
              onGenerate={() => generate("image", imageForm)}
            />
          )}
        </ToolPanel>

        <OutputPanel
          output={outputs[activeTool]}
          onCopy={() =>
            onCopy(outputs[activeTool], toolLabels[activeTool], activeTool)
          }
          onSave={() => saveOutput(activeTool)}
          onSendImageToCaption={
            activeTool === "image" && outputs.image ? sendImageToCaption : null
          }
        />
      </div>
    </section>
  );
}

function YoutubeDescriptionTool({
  form,
  hasPreset,
  loading,
  presetMessage,
  onChange,
  onDeletePreset,
  onGenerate,
  onSavePreset,
}) {
  return (
    <div className="grid gap-3">
      <div className="rounded-[22px] border border-white/70 bg-white/45 p-3 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              ค่าที่ใช้ประจำ
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {hasPreset
                ? "ใช้ค่าที่ Save ไว้จนกว่าจะลบ"
                : "กด Save เพื่อจำค่านี้ไว้ใช้ครั้งต่อไป"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex h-9 items-center gap-2 rounded-full bg-slate-900 px-3.5 text-xs font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
              onClick={onSavePreset}
              type="button"
            >
              <Save className="h-4 w-4" />
              Save ค่านี้
            </button>
            {hasPreset && (
              <button
                className="inline-flex h-9 items-center gap-2 rounded-full bg-white/75 px-3.5 text-xs font-semibold text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white"
                onClick={onDeletePreset}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
                ลบ
              </button>
            )}
          </div>
        </div>
        {presetMessage && (
          <p className="mt-2 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-700">
            {presetMessage}
          </p>
        )}
      </div>
      <SelectField
        label="ประเภทคลิป"
        value={form.contentType}
        onChange={(contentType) => onChange({ ...form, contentType })}
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
      <TextInputField
        label="ชื่อคลิปหรือหัวข้อ"
        onChange={(title) => onChange({ ...form, title })}
        placeholder="เช่น เพลงใหม่ / รีวิวสินค้า / คลิปสั้นขายของ"
        value={form.title}
      />
      <TextAreaField
        label="ข้อมูลคลิป"
        onChange={(details) => onChange({ ...form, details })}
        placeholder="ใส่รายละเอียดคลิป จุดเด่น เนื้อหา อารมณ์ เพลง สินค้า หรือสิ่งที่อยากบอกผู้ชม"
        value={form.details}
      />
      <TextInputField
        label="กลุ่มเป้าหมาย"
        onChange={(audience) => onChange({ ...form, audience })}
        placeholder="เช่น แฟนเพลง ลูกค้าหน้าร้าน คนชอบแต่งรถ"
        value={form.audience}
      />
      <TextAreaField
        label="ข้อมูลเสริม / ตัวกรอง"
        onChange={(extraInfo) => onChange({ ...form, extraInfo })}
        placeholder="เช่น ชื่อร้าน เบอร์โทร ลิงก์ เพจ ราคา โปรโมชัน คำที่ต้องใส่ หรือคำที่ห้ามใช้"
        value={form.extraInfo}
      />
      <GenerateButton
        disabled={!form.title.trim() || !form.details.trim()}
        loading={loading}
        onClick={onGenerate}
      >
        สร้างคำอธิบาย YouTube
      </GenerateButton>
    </div>
  );
}

function SunoSongTool({ form, loading, onChange, onGenerate }) {
  const genreSelections = Array.isArray(form.genreSelections)
    ? form.genreSelections
    : [];
  const moodSelections = Array.isArray(form.moodSelections)
    ? form.moodSelections
    : [];
  const genreCount = genreSelections.length;
  const moodCount = moodSelections.length;

  return (
    <div className="grid gap-3">
      <div className="rounded-[22px] border border-white/70 bg-white/45 p-3 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">
          แต่งเพลงสำหรับ Suno 5.5 Pro
        </p>
        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
          ใส่บรีฟสั้น ๆ แล้วเลือกโทนงาน ระบบจะจัด styles, exclude styles และ lyrics พร้อม timestamp ให้อัตโนมัติ
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <SelectField
          label="ภาษา"
          value={form.language}
          onChange={(language) => onChange({ ...form, language })}
          options={["ไทย", "อังกฤษ", "ไทยปนอังกฤษ", "ญี่ปุ่น", "เกาหลี"]}
        />
        <SelectField
          label="ระดับความซับซ้อน"
          value={form.complexity}
          onChange={(complexity) => onChange({ ...form, complexity })}
          options={[
            "ฟังง่ายติดหู",
            "ซับซ้อนแบบโปร",
            "ดราม่าหนัก",
            "กวีแต่ยังร้องได้",
            "เชิงทดลอง / Art pop",
          ]}
        />
      </div>

      <TextAreaField
        label="บรีฟสั้น ๆ"
        onChange={(story) => onChange({ ...form, story })}
        placeholder="พิมพ์สั้น ๆ ว่าเพลงนี้เกี่ยวกับอะไร ใครรู้สึกอะไร หรืออยากให้เพลงตอบโต้เรื่องอะไร"
        value={form.story}
      />

      <MultiChoiceField
        label={`แนวเพลง / Sound (${genreCount}/4)`}
        max={4}
        onChange={(genreSelections) => onChange({ ...form, genreSelections })}
        options={sunoGenreOptions}
        value={genreSelections}
      />

      <MultiChoiceField
        label={`อารมณ์เพลง (${moodCount}/4)`}
        max={4}
        onChange={(moodSelections) => onChange({ ...form, moodSelections })}
        options={sunoMoodOptions}
        value={moodSelections}
      />

      <ChoiceField
        label="มุมมองคนร้อง"
        onChange={(perspective) => onChange({ ...form, perspective })}
        options={sunoPerspectiveOptions}
        value={form.perspective}
      />

      <ChoiceField
        label="ฮุกที่อยากให้จำ"
        onChange={(hook) => onChange({ ...form, hook })}
        options={sunoHookOptions}
        value={form.hook}
      />

      <ChoiceField
        label="เสียงร้อง / การร้อง"
        onChange={(vocal) => onChange({ ...form, vocal })}
        options={sunoVocalOptions}
        value={form.vocal}
      />

      <TextInputField
        label="สิ่งที่ไม่อยากได้ (ไม่จำเป็น)"
        onChange={(avoid) => onChange({ ...form, avoid })}
        placeholder="เช่น ห้ามคำเชย ห้ามคำว่า น้ำตา ห้ามเสียงหุ่นยนต์"
        value={form.avoid}
      />

      <GenerateButton
        disabled={
          !form.story.trim() || genreCount === 0 || moodCount === 0
        }
        loading={loading}
        onClick={onGenerate}
      >
        แต่งเพลงสำหรับ Suno
      </GenerateButton>
    </div>
  );
}

function CaptionTool({ form, loading, onChange, onGenerate }) {
  return (
    <div className="grid gap-3">
      <SelectField
        label="แพลตฟอร์ม"
        value={form.platform}
        onChange={(platform) => onChange({ ...form, platform })}
        options={["เฟซบุ๊ก", "ติ๊กต็อก", "อินสตาแกรม"]}
      />
      <SelectField
        label="โทน"
        value={form.tone}
        onChange={(tone) => onChange({ ...form, tone })}
        options={["เป็นกันเอง", "ขายของ", "เท่", "ตลก", "อบอุ่น", "จริงใจ"]}
      />
      <SelectField
        label="ความยาว"
        value={form.length}
        onChange={(length) => onChange({ ...form, length })}
        options={["สั้น", "กลาง", "ยาว"]}
      />
      <TextAreaField
        label="หัวข้อหรือสินค้า"
        value={form.topic}
        onChange={(topic) => onChange({ ...form, topic })}
      />
      <GenerateButton disabled={!form.topic.trim()} loading={loading} onClick={onGenerate}>
        สร้างแคปชัน
      </GenerateButton>
    </div>
  );
}

function EnhancerTool({ form, loading, onChange, onGenerate }) {
  return (
    <div className="grid gap-3">
      <SelectField
        label="โหมด"
        value={form.mode}
        onChange={(mode) => onChange({ ...form, mode })}
        options={["ละเอียดขึ้น", "ซีนีมาติก", "มืออาชีพ"]}
      />
      <TextAreaField
        label="พรอมป์เดิม"
        value={form.prompt}
        onChange={(prompt) => onChange({ ...form, prompt })}
      />
      <GenerateButton disabled={!form.prompt.trim()} loading={loading} onClick={onGenerate}>
        ปรับพรอมป์
      </GenerateButton>
    </div>
  );
}

function IdeaTool({ form, loading, onChange, onGenerate }) {
  return (
    <div className="grid gap-3">
      <SelectField
        label="ประเภท"
        value={form.kind}
        onChange={(kind) => onChange({ ...form, kind })}
        options={["ไอเดียคอนเทนต์", "ไอเดียพรอมป์", "ธีมสร้างสรรค์"]}
      />
      <TextAreaField
        label="หัวข้อ"
        value={form.topic}
        onChange={(topic) => onChange({ ...form, topic })}
      />
      <GenerateButton loading={loading} onClick={onGenerate}>
        สุ่มไอเดีย
      </GenerateButton>
    </div>
  );
}

function ImageTool({ form, loading, onChange, onGenerate }) {
  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageDataUrl = await fileToDataUrl(file);
    onChange({ imageDataUrl, fileName: file.name });
  }

  return (
    <div className="grid gap-3">
      <label className="grid min-h-44 cursor-pointer place-items-center rounded-[24px] border border-dashed border-white/80 bg-white/45 p-3 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/65">
        <input
          accept="image/*"
          className="hidden"
          onChange={handleFile}
          type="file"
        />
        {form.imageDataUrl ? (
          <img
            alt="ภาพตัวอย่าง"
            className="max-h-56 w-full rounded-[20px] object-contain"
            src={form.imageDataUrl}
          />
        ) : (
          <span className="flex flex-col items-center gap-3 text-slate-500">
            <ImagePlus className="h-10 w-10" />
            ลากรูปมาวาง หรือกดเพื่ออัปโหลด
          </span>
        )}
      </label>
      {form.fileName && (
        <p className="text-sm font-medium text-slate-500">{form.fileName}</p>
      )}
      <GenerateButton
        disabled={!form.imageDataUrl}
        loading={loading}
        onClick={onGenerate}
      >
        วิเคราะห์ภาพ
      </GenerateButton>
    </div>
  );
}

function OutputPanel({ onCopy, onSave, onSendImageToCaption, output }) {
  return (
    <section className="rounded-[26px] border border-white/65 bg-white/55 p-4 shadow-soft backdrop-blur-lg xl:sticky xl:top-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-950">ผลลัพธ์</h2>
        <div className="flex gap-2">
          <IconAction disabled={!output} label="คัดลอก" onClick={onCopy}>
            <Copy className="h-4 w-4" />
          </IconAction>
          <IconAction disabled={!output} label="บันทึก" onClick={onSave}>
            <Save className="h-4 w-4" />
          </IconAction>
        </div>
      </div>

      <div className="max-h-[58vh] min-h-[260px] overflow-y-auto whitespace-pre-wrap rounded-[22px] border border-white/70 bg-white/50 p-4 pr-5 text-sm leading-7 text-slate-700 shadow-sm">
        {output || "ผลลัพธ์จะมาแสดงตรงนี้หลังจากกดสร้าง"}
      </div>

      {onSendImageToCaption && (
        <button
          className="mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
          onClick={onSendImageToCaption}
        >
          <Send className="h-4 w-4" />
          ส่งไปสร้างแคปชัน
        </button>
      )}
    </section>
  );
}

function ToolPanel({ children, title }) {
  return (
    <section className="rounded-[26px] border border-white/65 bg-white/55 p-4 shadow-soft backdrop-blur-lg">
      <h2 className="mb-4 text-lg font-semibold text-slate-950">{title}</h2>
      {children}
    </section>
  );
}

function MultiChoiceField({ label, max = 4, onChange, options, value }) {
  const selected = Array.isArray(value) ? value : [];

  function toggle(option) {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
      return;
    }

    if (selected.length >= max) return;
    onChange([...selected, option]);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-600">{label}</span>
        <span className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
          เลือกได้ไม่เกิน {max}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          const locked = !active && selected.length >= max;

          return (
            <button
              className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-semibold transition duration-150 hover:-translate-y-0.5 ${
                active
                  ? "bg-slate-900 text-white shadow-soft"
                  : locked
                    ? "bg-white/35 text-slate-300"
                    : "bg-white/65 text-slate-600 shadow-sm hover:bg-white"
              }`}
              disabled={locked}
              key={option}
              onClick={() => toggle(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChoiceField({ label, onChange, options, value }) {
  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;

          return (
            <button
              className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-semibold transition duration-150 hover:-translate-y-0.5 ${
                active
                  ? "bg-slate-900 text-white shadow-soft"
                  : "bg-white/65 text-slate-600 shadow-sm hover:bg-white"
              }`}
              key={option}
              onClick={() => onChange(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelectField({ label, onChange, options, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>
      <select
        className="field-input h-10"
        onChange={(event) => onChange(event.target.value)}
        value={value}
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

function TextInputField({ label, onChange, placeholder, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>
      <input
        className="field-input h-10"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function TextAreaField({ label, onChange, placeholder, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>
      <textarea
        className="field-input min-h-28 resize-none py-3 leading-6"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function GenerateButton({ children, disabled = false, loading, onClick }) {
  return (
    <button
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-45"
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      <WandSparkles className="h-4 w-4" />
      {loading ? "กำลังสร้าง..." : children}
    </button>
  );
}

function IconAction({ children, disabled, label, onClick }) {
  return (
    <button
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-2xl bg-white/65 text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getYoutubeFormDefaults(savedPreset) {
  if (!savedPreset || typeof savedPreset !== "object") {
    return { ...defaultYoutubeForm };
  }

  return { ...defaultYoutubeForm, ...savedPreset };
}

function readYoutubePreset() {
  try {
    const stored = window.localStorage.getItem(
      "mixtoole-youtube-description-preset-v1"
    );
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function buildSunoPayload(form) {
  const genreSelections = Array.isArray(form.genreSelections)
    ? form.genreSelections
    : [];
  const moodSelections = Array.isArray(form.moodSelections)
    ? form.moodSelections
    : [];

  return {
    ...form,
    genre: genreSelections.join(", "),
    mood: moodSelections.join(", "),
  };
}

const toolLabels = {
  youtube: "YouTube Description",
  suno: "Suno Songwriter",
  caption: "สร้างแคปชัน",
  enhancer: "ปรับพรอมป์",
  ideas: "สุ่มไอเดีย",
  image: "วิเคราะห์ภาพ",
};

const saveMeta = {
  youtube: {
    title: "คำอธิบาย YouTube",
    tags: ["YouTube", "คำอธิบาย", "เอไอ"],
    previewStyle: "rose-sky",
  },
  suno: {
    title: "เพลงสำหรับ Suno",
    tags: ["Suno", "เพลง", "เนื้อเพลง"],
    previewStyle: "violet-fog",
  },
  caption: {
    title: "ผลลัพธ์แคปชัน",
    tags: ["แคปชัน", "เอไอ"],
    previewStyle: "violet-fog",
  },
  enhancer: {
    title: "พรอมป์ที่ปรับแล้ว",
    tags: ["พรอมป์", "เอไอ"],
    previewStyle: "rose-sky",
  },
  ideas: {
    title: "ไอเดียจากเอไอ",
    tags: ["ไอเดีย", "เอไอ"],
    previewStyle: "honey-mist",
  },
  image: {
    title: "พรอมป์จากภาพ",
    tags: ["ภาพ", "เอไอ"],
    previewStyle: "mint-cream",
  },
};

export default AITools;
