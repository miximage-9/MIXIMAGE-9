import { Star, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label?: string;
  th?: string;
  prompt: string;
  isFav: boolean;
  onToggleFav: (id: string, text: string) => void;
  variant?: "default" | "compact" | "list";
};

export function PromptCard({ id, label, th, prompt, isFav, onToggleFav, variant = "default" }: Props) {
  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    toast.success("คัดลอกเรียบร้อย!", { description: "พรอมต์อยู่ในคลิปบอร์ดแล้ว" });
  };

  if (variant === "list") {
    const title = label || th || prompt;
    return (
      <div className="prompt-card group flex items-center justify-between gap-2 rounded-lg bg-surface/60 px-3 py-2">
        <p
          className="min-w-0 flex-1 truncate text-sm text-foreground/90"
          title={prompt}
        >
          {title}
        </p>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            onClick={() => onToggleFav(id, prompt)}
            aria-label="favorite"
            className={cn(
              "rounded-md p-1 transition-all hover:scale-110",
              isFav ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-muted-foreground hover:text-amber-300",
            )}
          >
            <Star className="h-3.5 w-3.5" fill={isFav ? "currentColor" : "none"} />
          </button>
          <button
            onClick={copy}
            aria-label="copy"
            className="rounded-md p-1 text-neon-green transition-all hover:bg-neon-green/10 hover:drop-shadow-[0_0_8px_hsl(var(--neon-green)/0.6)]"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("prompt-card group rounded-xl bg-surface/60 p-4", variant === "compact" && "p-3")}>
      {label && <p className="mb-2 text-xs font-medium text-muted-foreground">{label}</p>}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="break-words font-mono text-sm leading-relaxed text-foreground/90">{prompt}</p>
          {th && <p className="text-xs text-muted-foreground">{th}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onToggleFav(id, prompt)}
            aria-label="favorite"
            className={cn(
              "rounded-lg p-1.5 transition-all hover:scale-110",
              isFav ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-muted-foreground hover:text-amber-300",
            )}
          >
            <Star className="h-4 w-4" fill={isFav ? "currentColor" : "none"} />
          </button>
          <button
            onClick={copy}
            aria-label="copy"
            className="rounded-lg p-1.5 text-neon-green transition-all hover:bg-neon-green/10 hover:drop-shadow-[0_0_8px_hsl(var(--neon-green)/0.6)]"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}