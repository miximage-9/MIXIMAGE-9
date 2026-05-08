import { Search, Star, Sparkles, Clock, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabKey = "generator" | "ai" | "documents" | "uniforms" | "professions" | "special" | "library" | "favorites";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "generator", label: "สร้างพรอมต์", icon: "🛠️" },
  { key: "ai", label: "AI Tools", icon: "✨" },
  { key: "documents", label: "รูปติดบัตร", icon: "📸" },
  { key: "uniforms", label: "ชุดนักเรียน", icon: "👔" },
  { key: "professions", label: "สายอาชีพ", icon: "💼" },
  { key: "special", label: "ชุดพิเศษ+สูท+ฉาก", icon: "🎖️" },
  { key: "library", label: "คลังพรอมต์", icon: "📚" },
];

type Props = {
  active: TabKey;
  onChange: (k: TabKey) => void;
  search: string;
  onSearch: (v: string) => void;
  favCount: number;
  onOpenHistory?: () => void;
  onOpenSync?: () => void;
};

export function AppHeader({ active, onChange, search, onSearch, favCount, onOpenHistory, onOpenSync }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-neon text-xl font-black text-background shadow-neon-mix">
              M
              <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-neon-pink" />
            </div>
            <div>
              <h1 className="neon-gradient-text text-lg font-bold tracking-tight">MIX-IMAGE PROMPT LIBRARY</h1>
              <p className="text-xs text-muted-foreground">คลังพรอมต์ใช้งานจริง — บรบือ จ.มหาสารคาม</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                type="text"
                placeholder="ค้นหาพรอมต์..."
                className="w-56 rounded-full border border-border bg-surface/80 py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/30"
              />
            </div>
            <a
              href="http://piscopy.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-neon px-3 py-2 text-xs font-bold text-background shadow-neon-pink transition active:scale-95"
            >
              🎨 MIX Image
            </a>
            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="rounded-lg p-2 text-muted-foreground transition hover:text-neon-cyan"
                title="ประวัติพรอมต์"
              >
                <Clock className="h-5 w-5" />
              </button>
            )}
            {onOpenSync && (
              <button
                onClick={onOpenSync}
                className="rounded-lg p-2 text-muted-foreground transition hover:text-neon-green"
                title="ซิงก์ข้อมูลข้ามเครื่อง"
              >
                <Cloud className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => onChange("favorites")}
              className={cn(
                "relative rounded-lg p-2 transition",
                active === "favorites"
                  ? "bg-amber-400/15 text-amber-300 shadow-[0_0_18px_-4px_hsl(45_100%_60%/0.7)]"
                  : "text-muted-foreground hover:text-amber-300",
              )}
              title="ดูรายการโปรด"
            >
              <Star className="h-5 w-5" fill={active === "favorites" ? "currentColor" : "none"} />
              {favCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-neon-pink px-1 text-[10px] font-bold text-background">
                  {favCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <nav className="tabs-scroll flex gap-1 overflow-x-auto pb-0">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
                )}
              >
                <span className="mr-1">{t.icon}</span> {t.label}
                {isActive && (
                  <span className="pointer-events-none absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-gradient-neon shadow-[0_0_10px_hsl(var(--neon-green)/0.7)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-3 pt-1 sm:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="ค้นหาพรอมต์..."
            className="w-full rounded-full border border-border bg-surface/80 py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/30"
          />
        </div>
      </div>
    </header>
  );
}
