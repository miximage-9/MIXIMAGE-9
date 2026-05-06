import { Check, Copy, Pencil, Sparkles, Trash2 } from "lucide-react";
import { previewStyles } from "../data/defaultPrompts.js";

function PromptCard({ copied, onCopy, onDelete, onEdit, prompt }) {
  const preview =
    previewStyles.find((style) => style.id === prompt.previewStyle) ??
    previewStyles[0];

  return (
    <article className="group grid min-w-0 grid-cols-[74px_minmax(0,1fr)] gap-3 overflow-hidden rounded-[22px] border border-white/65 bg-white/55 p-2.5 shadow-soft backdrop-blur-lg transition duration-150 hover:-translate-y-0.5 hover:bg-white/70">
      <div
        className={`relative h-[74px] overflow-hidden rounded-[18px] ${
          prompt.imageDataUrl ? "bg-slate-100" : preview.className
        }`}
      >
        {prompt.imageDataUrl ? (
          <img
            alt={`ภาพตัวอย่าง ${prompt.title}`}
            className="absolute inset-0 h-full w-full object-cover"
            src={prompt.imageDataUrl}
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.72),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.36),rgba(255,255,255,0.08))]" />
        <div className="absolute bottom-2 left-2 grid h-7 w-7 place-items-center rounded-2xl bg-white/60 text-slate-700 shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="min-w-0">
          <h2 className="min-w-0 break-words text-sm font-semibold leading-snug tracking-normal text-slate-950">
            {prompt.title}
          </h2>
        </div>

        <p
          className="mt-1 break-words text-xs leading-5 text-slate-500"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {prompt.text}
        </p>

        <div className="mt-2 flex min-w-0 flex-wrap gap-1">
          {prompt.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="max-w-full truncate rounded-full border border-white/70 bg-white/55 px-2 py-0.5 text-[11px] font-semibold text-slate-600 shadow-sm"
            >
              {tag}
            </span>
          ))}
          {prompt.tags.length > 2 && (
            <span className="rounded-full border border-white/70 bg-white/55 px-2 py-0.5 text-[11px] font-semibold text-slate-400 shadow-sm">
              +{prompt.tags.length - 2}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            aria-label={`คัดลอก ${prompt.title}`}
            onClick={onCopy}
            type="button"
            className={`inline-flex h-8 min-w-[86px] items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold shadow-soft transition duration-200 hover:-translate-y-0.5 ${
              copied
                ? "scale-95 bg-emerald-100 text-emerald-700"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "คัดลอกแล้ว" : "คัดลอก"}
          </button>
          <div className="flex shrink-0 gap-1">
            <IconButton
              label={`แก้ไข ${prompt.title}`}
              onClick={onEdit}
              title="แก้ไข"
            >
              <Pencil className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton
              label={`ลบ ${prompt.title}`}
              onClick={onDelete}
              title="ลบ"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </IconButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function IconButton({ children, label, onClick, title }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      title={title}
      type="button"
      className="grid h-8 w-8 place-items-center rounded-2xl border border-white/70 bg-white/55 text-slate-500 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
    >
      {children}
    </button>
  );
}

export default PromptCard;
