import { useState } from "react";
import { Save, FolderOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { usePresets } from "@/hooks/usePresets";
import type { GenInputs } from "@/lib/promptBuilder";

type Props = {
  current: GenInputs;
  onLoad: (i: GenInputs) => void;
};

export function PresetManager({ current, onLoad }: Props) {
  const { presets, save, remove } = usePresets();
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    const name = window.prompt("ตั้งชื่อ Preset (เช่น ร.ร.อนุบาลบรบือ - มาตรฐาน):");
    if (name && name.trim()) {
      save(name.trim(), current);
      toast.success(`บันทึก Preset "${name}" แล้ว`);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleSave}
        className="inline-flex items-center gap-1.5 rounded-lg border border-neon-green/30 bg-neon-green/10 px-3 py-1.5 text-xs font-semibold text-neon-green transition hover:bg-neon-green/20"
      >
        <Save className="h-3.5 w-3.5" /> บันทึก Preset
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition hover:border-neon-pink/40"
        >
          <FolderOpen className="h-3.5 w-3.5" /> โหลด ({presets.length})
        </button>
        {open && (
          <div className="glass-card absolute right-0 top-full z-30 mt-2 w-72 rounded-xl p-2 shadow-2xl">
            {presets.length === 0 ? (
              <p className="p-3 text-center text-xs text-muted-foreground">ยังไม่มี Preset ที่บันทึกไว้</p>
            ) : (
              presets.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-white/5">
                  <button
                    onClick={() => { onLoad(p.inputs); setOpen(false); toast.success(`โหลด "${p.name}"`); }}
                    className="flex-1 truncate text-left text-xs text-foreground/90 hover:text-neon-green"
                    title={p.name}
                  >
                    {p.name}
                  </button>
                  <button
                    onClick={() => { remove(p.id); toast.info(`ลบ "${p.name}"`); }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}