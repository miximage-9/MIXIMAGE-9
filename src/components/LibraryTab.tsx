import { LIBRARY_DATA_ALL } from "@/lib/promptData";
import { useFavorites } from "@/hooks/useFavorites";
import { PromptCard } from "./PromptCard";
import { cn } from "@/lib/utils";

type Props = { search: string };

const HEADER_COLOR: Record<string, string> = {
  red: "text-rose-300 bg-rose-500/10",
  indigo: "text-neon-cyan bg-neon-cyan/10",
  emerald: "text-neon-green bg-neon-green/10",
  amber: "text-amber-300 bg-amber-400/10",
  blue: "text-neon-cyan bg-neon-cyan/10",
  purple: "text-neon-pink bg-neon-pink/10",
  rose: "text-neon-pink bg-neon-pink/10",
  cyan: "text-neon-cyan bg-neon-cyan/10",
};

export function LibraryTab({ search }: Props) {
  const { isFav, toggle } = useFavorites();
  const q = search.trim().toLowerCase();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          <span className="neon-gradient-text">📚 คลังพรอมต์เสริม</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          คำสั่งเฉพาะจุด + helper สำหรับ Gemini / DALL·E — จัดใหม่ให้หา prompt ที่มักถูกมองข้ามได้ง่ายขึ้น
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {LIBRARY_DATA_ALL.map((group: any, gIdx: number) => {
          const items = group.items.filter((it: any) =>
            !q || `${it.en} ${it.th}`.toLowerCase().includes(q),
          );
          if (items.length === 0) return null;
          return (
            <div key={group.title} className="panel-glass overflow-hidden rounded-xl">
              <div className={cn("border-b border-border-subtle px-4 py-2.5", HEADER_COLOR[group.color] || "bg-surface")}>
                <h3 className="text-sm font-bold">{group.title}</h3>
              </div>
              <div className="divide-y divide-border-subtle/40 p-2">
                {items.map((it: any, idx: number) => {
                  const id = `lib-${gIdx}-${idx}`;
                  return (
                    <PromptCard
                      key={id}
                      id={id}
                      label={it.th || it.en}
                      prompt={it.en}
                      isFav={isFav(id)}
                      onToggleFav={toggle}
                      variant="list"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}