import { X, Copy, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { useHistory } from "@/hooks/useHistory";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function HistoryDrawer({ open, onClose }: Props) {
  const { items, remove, clear } = useHistory();

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex" onClick={onClose}>
      <div className="flex-1 bg-background/70 backdrop-blur-sm" />
      <aside
        className="glass-card flex h-full w-full max-w-md flex-col overflow-hidden border-l border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="flex items-center gap-2 font-bold">
            <Clock className="h-4 w-4 text-neon-green" />
            <span className="neon-gradient-text">ประวัติพรอมต์ล่าสุด</span>
          </h3>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={() => { clear(); toast.success("ล้างประวัติเรียบร้อย"); }}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                ล้างทั้งหมด
              </button>
            )}
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/5">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {items.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <Clock className="h-10 w-10 opacity-30" />
              <p>ยังไม่มีประวัติ</p>
              <p className="text-xs">พรอมต์ที่กดคัดลอกจะมาแสดงที่นี่</p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.id} className="glass-card rounded-xl p-3">
              {it.label && <p className="mb-1 text-xs font-semibold text-neon-green">{it.label}</p>}
              <p className="line-clamp-3 break-words font-mono text-[11px] text-foreground/80">{it.text}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  {new Date(it.ts).toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" })}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={async () => { await navigator.clipboard.writeText(it.text); toast.success("คัดลอกซ้ำ!"); }}
                    className="rounded-md p-1 text-neon-green hover:bg-neon-green/10"
                    aria-label="copy"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}