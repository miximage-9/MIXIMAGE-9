import { ExternalLink } from "lucide-react";

const TOOLS = [
  { num: 1, title: "สร้างภาพ Before & After", url: "https://miximageart.netlify.app/", host: "miximageart.netlify.app", color: "text-neon-green" },
  { num: 2, title: "ใบสั่งผลิตเพลง AI", url: "https://musicproduction.lovable.app/", host: "musicproduction.lovable.app", color: "text-neon-pink" },
  { num: 3, title: "MIX PROMPT GEN", url: "https://mix-image.store/", host: "mix-image.store", color: "text-neon-green" },
  { num: 4, title: "MIX-Lyric", url: "https://miximage-lyric.netlify.app/", host: "miximage-lyric.netlify.app", color: "text-neon-pink" },
  { num: 5, title: "Crop business card", url: "https://miximagecard.netlify.app/", host: "miximagecard.netlify.app", color: "text-neon-cyan" },
  { num: 6, title: "ID / ทะเบียนบ้าน", url: "https://id-house.netlify.app/", host: "id-house.netlify.app", color: "text-neon-cyan" },
];

export function ToolSidebar() {
  return (
    <aside className="panel-glass overflow-hidden rounded-2xl xl:sticky xl:top-32">
      <div className="border-b border-border-subtle bg-gradient-neon-soft px-4 py-3">
        <h3 className="text-base font-bold text-foreground">เครื่องมือ</h3>
        <p className="mt-1 text-xs text-muted-foreground">ลิงก์ใช้งานด่วน</p>
      </div>
      <div className="space-y-2 p-3">
        {TOOLS.map((t) => (
          <a
            key={t.num}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="prompt-card group flex items-start gap-3 rounded-xl bg-surface/60 p-3"
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-neon-soft font-bold ${t.color}`}>
              {t.num}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">{t.title}</span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">{t.host}</span>
            </span>
            <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </aside>
  );
}