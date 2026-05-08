import { SPECIAL_DATA_FULL } from "@/lib/promptData";
import { useFavorites } from "@/hooks/useFavorites";
import { PromptCard } from "./PromptCard";
import { cn } from "@/lib/utils";

type Props = { search: string };

const COLOR: Record<string, string> = {
  amber: "text-amber-300 border-amber-400/30",
  emerald: "text-neon-green border-neon-green/30",
  rose: "text-neon-pink border-neon-pink/30",
  slate: "text-foreground/80 border-border",
  cyan: "text-neon-cyan border-neon-cyan/30",
  pink: "text-neon-pink border-neon-pink/30",
};

export function SpecialTab({ search }: Props) {
  const { isFav, toggle } = useFavorites();
  const q = search.trim().toLowerCase();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          <span className="neon-gradient-text">🎖️ ชุดพิเศษ + สูทสากล + แบ็คกราวด์</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">พรอมต์สกัดจากตัวอย่างชุดจริง — กดก๊อปปี้ไปใช้ได้เลย</p>
      </div>
      <div className="space-y-6">
        {SPECIAL_DATA_FULL.map((group: any) => {
          const items = group.items.filter((it: any) =>
            !q || `${it.label} ${it.prompt}`.toLowerCase().includes(q),
          );
          if (items.length === 0) return null;
          const cls = COLOR[group.color] || "text-foreground border-border";
          return (
            <div key={group.category} className={cn("panel-glass overflow-hidden rounded-xl border", cls.split(" ").slice(1).join(" "))}>
              <div className="border-b border-border-subtle bg-surface/60 px-4 py-3">
                <h3 className={cn("text-base font-bold", cls.split(" ")[0])}>{group.category}</h3>
              </div>
              <div className="divide-y divide-border-subtle/40 p-2">
                {items.map((it: any) => (
                  <PromptCard
                    key={it.id}
                    id={it.id}
                    label={it.label}
                    prompt={it.prompt}
                    isFav={isFav(it.id)}
                    onToggleFav={toggle}
                    variant="list"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}