import { useState } from "react";
import { Copy, RotateCcw, Star } from "lucide-react";
import { toast } from "sonner";
import { UNIFORM_DATA } from "@/lib/promptData";
import { buildUniformPrompt, UNIFORM_PLACEHOLDER } from "@/lib/promptBuilder";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

type Props = { search: string };

const COLOR_RING: Record<string, string> = {
  pink: "border-neon-pink/30",
  yellow: "border-amber-400/30",
  orange: "border-orange-400/30",
  red: "border-rose-500/30",
  green: "border-neon-green/30",
  blue: "border-neon-cyan/30",
  gray: "border-border",
};
const COLOR_TEXT: Record<string, string> = {
  pink: "text-neon-pink",
  yellow: "text-amber-300",
  orange: "text-orange-300",
  red: "text-rose-300",
  green: "text-neon-green",
  blue: "text-neon-cyan",
  gray: "text-muted-foreground",
};

export function UniformsTab({ search }: Props) {
  const [slot, setSlot] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const { isFav, toggle } = useFavorites();

  const fullPrompt = buildUniformPrompt(slot || UNIFORM_PLACEHOLDER);

  const inject = (text: string) => {
    setSlot(text);
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(fullPrompt);
    toast.success("คัดลอกพรอมต์ทั้งหมดเรียบร้อย!");
  };

  const copyOne = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("คัดลอกเรียบร้อย!");
  };

  const reset = () => setSlot(null);

  const q = search.trim().toLowerCase();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          <span className="neon-gradient-text">👔 คลังชุดนักเรียน-นักศึกษา</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">กดเลือกชุดด้านล่าง → เสียบเข้าพรอมต์หลัก → ก๊อปปี้ไปใช้</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4 lg:sticky lg:top-36 lg:self-start">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-bold text-neon-pink">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-neon-pink shadow-[0_0_10px_hsl(var(--neon-pink))]" />
              พรอมต์หลัก (ผลลัพธ์)
            </h3>
            <button onClick={reset} className="flex items-center gap-1 text-xs text-muted-foreground transition hover:text-neon-green">
              <RotateCcw className="h-3 w-3" /> รีเซ็ต
            </button>
          </div>

          <div
            className={cn(
              "panel-glass rounded-xl p-5 text-base italic leading-relaxed min-h-[220px]",
              flash && "inject-flash",
            )}
          >
            Create an image of a realistic professional studio portrait edit using the provided reference photo.
            Use the provided reference image as the identity source. Preserve 100% facial identity, exact facial structure, proportions, eyes, eyebrows, nose shape, lips, jawline, skin tone, age impression, and natural expression.{" "}
            <span className={cn("keyword-slot", slot && "filled")}>{slot || UNIFORM_PLACEHOLDER}</span>{" "}
            Background: clean gradient blue studio backdrop, transitioning smoothly from deeper sky blue to lighter blue, formal official portrait look, smooth and evenly lit.
            <br />
            [FRAMING: Vertical 2:3 composition, medium shot from the belt up, subject centered, straight posture, level shoulders, balanced symmetry, eye-level camera angle, and slight headroom above the head for later cropping. Keep full shoulders visible and not cut off.]
            <br />
            Real photography style, natural skin texture, realistic fabric detail, sharp focus, no illustration or 3D.
          </div>

          <button onClick={copyAll} className="btn-neon flex w-full items-center justify-center gap-2 py-3.5 text-sm">
            <Copy className="h-4 w-4" /> ก๊อปปี้พรอมต์ทั้งหมด
          </button>
        </div>

        <div className="max-h-[75vh] space-y-4 overflow-y-auto pb-4 pr-1">
          {UNIFORM_DATA.map((group: any) => {
            const items = group.items.filter((it: any) =>
              !q || `${it.label} ${it.prompt}`.toLowerCase().includes(q),
            );
            if (items.length === 0) return null;
            return (
              <div key={group.category} className={cn("panel-glass overflow-hidden rounded-xl border", COLOR_RING[group.color] || "border-border")}>
                <div className="border-b border-border-subtle bg-surface/60 px-4 py-2.5">
                  <h3 className={cn("text-sm font-bold uppercase tracking-wider", COLOR_TEXT[group.color] || "text-foreground")}>
                    {group.category}
                  </h3>
                </div>
                <div className="divide-y divide-border-subtle/50">
                  {items.map((it: any) => {
                    const fav = isFav(it.id);
                    return (
                      <div
                        key={it.id}
                        onClick={() => inject(it.prompt)}
                        className="cursor-pointer p-3 transition hover:bg-surface-elevated/60"
                      >
                        <p className="mb-1 text-xs text-muted-foreground">{it.label}</p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex-1 text-sm italic text-foreground/80">{it.prompt}</span>
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); toggle(it.id, it.prompt); }}
                              className={cn("rounded-lg p-1.5 transition hover:scale-110", fav ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-muted-foreground")}
                            >
                              <Star className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); copyOne(it.prompt); }}
                              className="rounded-lg p-1.5 text-neon-cyan transition hover:bg-neon-cyan/10"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); inject(it.prompt); }}
                              className="rounded-md bg-gradient-neon px-2.5 py-1 text-[11px] font-bold text-background transition hover:scale-105"
                            >
                              ใช้ชุดนี้
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}