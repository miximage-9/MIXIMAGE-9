import { Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { previewStyles } from "../data/defaultPrompts.js";

function PromptEditor({ initialPrompt, onClose, onSave }) {
  const [title, setTitle] = useState(initialPrompt?.title ?? "");
  const [text, setText] = useState(initialPrompt?.text ?? "");
  const [tags, setTags] = useState(initialPrompt?.tags?.join(", ") ?? "ทั่วไป");
  const [previewStyle, setPreviewStyle] = useState(
    initialPrompt?.previewStyle ?? previewStyles[0].id
  );
  const [imageDataUrl, setImageDataUrl] = useState(
    initialPrompt?.imageDataUrl ?? ""
  );
  const [imageError, setImageError] = useState("");

  const canSave = title.trim() && text.trim();

  function submitForm(event) {
    event.preventDefault();
    if (!canSave) return;

    onSave({
      ...initialPrompt,
      id: initialPrompt?.id ?? createId(),
      imageDataUrl,
      previewStyle,
      tags: parseTags(tags),
      text: text.trim(),
      title: title.trim(),
      updatedAt: new Date().toISOString(),
    });
  }

  async function handleImageFile(file) {
    setImageError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("เลือกได้เฉพาะไฟล์รูปภาพ");
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setImageError("รูปใหญ่เกินไป แนะนำไม่เกิน 2.5 MB เพื่อให้บันทึกในเครื่องได้");
      return;
    }

    const nextImage = await fileToDataUrl(file);
    setImageDataUrl(nextImage);
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-slate-900/20 p-3 backdrop-blur-sm">
      <form
        onSubmit={submitForm}
        className="max-h-[calc(100vh-1.5rem)] w-full max-w-[620px] overflow-y-auto rounded-[26px] border border-white/70 bg-white/85 p-4 shadow-glass backdrop-blur-xl sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              {initialPrompt ? "แก้ไขพรอมป์" : "พรอมป์ใหม่"}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">
              รายละเอียดพรอมป์
            </h2>
          </div>
          <button
            aria-label="ปิดหน้าต่างแก้ไขพรอมป์"
            onClick={onClose}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-slate-500 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <Field label="ชื่อ">
            <input
              autoFocus
              className="field-input"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="ชื่อพรอมป์"
              value={title}
            />
          </Field>

          <Field label="พรอมป์">
            <textarea
              className="field-input min-h-28 resize-none py-3 leading-6"
              onChange={(event) => setText(event.target.value)}
              placeholder="เขียนพรอมป์ที่อยากเก็บไว้ใช้ซ้ำ"
              value={text}
            />
          </Field>

          <Field label="แท็ก">
            <input
              className="field-input"
              onChange={(event) => setTags(event.target.value)}
              placeholder="ดีไซน์, งานเขียน, โซเชียล"
              value={tags}
            />
          </Field>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-600">
              ภาพตัวอย่าง
            </p>
            <label
              className="group grid min-h-32 cursor-pointer place-items-center overflow-hidden rounded-[22px] border border-dashed border-white/80 bg-white/45 p-3 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/65"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleImageFile(event.dataTransfer.files?.[0]);
              }}
            >
              <input
                accept="image/*"
                className="hidden"
                onChange={(event) => handleImageFile(event.target.files?.[0])}
                type="file"
              />
              {imageDataUrl ? (
                <img
                  alt="ภาพตัวอย่างพรอมป์"
                  className="max-h-40 w-full rounded-[18px] object-cover"
                  src={imageDataUrl}
                />
              ) : (
                <span className="flex flex-col items-center gap-3 text-sm font-semibold text-slate-500">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 text-slate-600 shadow-sm">
                    <Upload className="h-5 w-5" />
                  </span>
                  กดเพื่อเลือกรูป หรือลากรูปมาวาง
                </span>
              )}
            </label>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-500">
                รองรับรูปขนาดไม่เกิน 2.5 MB
              </p>
              {imageDataUrl && (
                <button
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-white/70 px-3 text-xs font-semibold text-slate-600 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-rose-600"
                  onClick={() => setImageDataUrl("")}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  ลบรูป
                </button>
              )}
            </div>

            {imageError && (
              <p className="mt-2 text-xs font-semibold text-rose-600">
                {imageError}
              </p>
            )}

            <p className="mb-2 mt-3 text-sm font-semibold text-slate-600">
              พื้นหลังสำรอง
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {previewStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setPreviewStyle(style.id)}
                  type="button"
                  className={`h-14 rounded-[18px] border-2 transition duration-200 hover:-translate-y-0.5 ${
                    style.className
                  } ${
                    previewStyle === style.id
                      ? "border-slate-900"
                      : "border-white/70"
                  }`}
                  title={style.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            className="h-10 rounded-full bg-white/70 px-4 text-sm font-semibold text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:bg-white"
            onClick={onClose}
            type="button"
          >
            ยกเลิก
          </button>
          <button
            className="h-10 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canSave}
            type="submit"
          >
            บันทึกพรอมป์
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ children, label }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

function createId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function parseTags(value) {
  const tags = value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return [...new Set(tags.length ? tags : ["ทั่วไป"])];
}

export default PromptEditor;
