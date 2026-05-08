import { NEGATIVE_CHIPS } from "@/lib/extraData";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  selected: string[];
  onChange: (ids: string[]) => void;
};

export function NegativePromptPicker({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-rose-400">
          🚫 สิ่งที่ห้ามมี (Negative)
        </label>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-[10px] text-muted-foreground hover:text-foreground"
          >
            ล้าง
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {NEGATIVE_CHIPS.map((c) => {
          const active = selected.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={cn("chip-toggle", active && "active")}
            >
              {active && <X className="h-3 w-3" />}
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}