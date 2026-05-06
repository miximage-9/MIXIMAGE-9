import { useMemo, useState } from "react";
import { ImagePlus, Plus, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import PromptCard from "../components/PromptCard.jsx";
import PromptEditor from "../components/PromptEditor.jsx";

function PromptLibrary({ copiedKey, onCopy, prompts, setPrompts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("ทั้งหมด");
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const tags = useMemo(() => {
    const uniqueTags = new Set(prompts.flatMap((prompt) => prompt.tags));
    return ["ทั้งหมด", ...Array.from(uniqueTags).sort()];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesTag =
        activeTag === "ทั้งหมด" || prompt.tags.includes(activeTag);
      const matchesQuery =
        !normalizedQuery ||
        [prompt.title, prompt.text, ...prompt.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, prompts, query]);

  function openNewPrompt() {
    setEditingPrompt(null);
    setEditorOpen(true);
  }

  function openEditPrompt(prompt) {
    setEditingPrompt(prompt);
    setEditorOpen(true);
  }

  function savePrompt(prompt) {
    setPrompts((items) => {
      const exists = items.some((item) => item.id === prompt.id);
      if (exists) {
        return items.map((item) => (item.id === prompt.id ? prompt : item));
      }

      return [prompt, ...items];
    });
    setEditorOpen(false);
  }

  function deletePrompt(promptId) {
    setPrompts((items) => items.filter((prompt) => prompt.id !== promptId));
  }

  return (
    <section className="min-w-0 space-y-4">
      <header className="min-w-0 overflow-hidden rounded-[28px] border border-white/65 bg-white/55 p-4 shadow-glass backdrop-blur-xl sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              คลังพรอมป์
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">
              จัดการพรอมป์
            </h1>
            <p className="mt-2 max-w-xl break-words text-sm leading-6 text-slate-600">
              บันทึก ค้นหา คัดลอก แก้ไข และจัดระเบียบพรอมป์เอไอที่ใช้ซ้ำได้
            </p>
          </div>

          <button
            onClick={openNewPrompt}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            เพิ่มพรอมป์
          </button>
        </div>
      </header>

      <section className="min-w-0 overflow-hidden rounded-[24px] border border-white/65 bg-white/45 p-3 shadow-soft backdrop-blur-xl">
        <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              className="field-input h-10 !pl-11"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหาพรอมป์"
              value={query}
            />
          </div>

          <div className="no-scrollbar flex min-w-0 gap-2 overflow-x-auto pb-1 xl:justify-end xl:pb-0">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                  activeTag === tag
                    ? "bg-slate-900 text-white shadow-soft"
                    : "bg-white/60 text-slate-600 hover:bg-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filteredPrompts.length > 0 ? (
        <section className="grid min-w-0 gap-2.5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              copied={copiedKey === prompt.id}
              key={prompt.id}
              onCopy={() => onCopy(prompt.text, prompt.title, prompt.id)}
              onDelete={() => deletePrompt(prompt.id)}
              onEdit={() => openEditPrompt(prompt)}
              prompt={prompt}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-[26px] border border-white/65 bg-white/45 p-8 text-center shadow-soft backdrop-blur-xl">
          <SlidersHorizontal className="mx-auto h-9 w-9 text-slate-400" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            ไม่พบพรอมป์
          </h2>
          <button
            onClick={openNewPrompt}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
          >
            <ImagePlus className="h-4 w-4" />
            เพิ่มพรอมป์
          </button>
        </section>
      )}

      {editorOpen && (
        <PromptEditor
          initialPrompt={editingPrompt}
          onClose={() => setEditorOpen(false)}
          onSave={savePrompt}
        />
      )}
    </section>
  );
}

export default PromptLibrary;
