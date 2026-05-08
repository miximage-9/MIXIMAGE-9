import { useState } from "react";
import { Copy, Star, QrCode } from "lucide-react";
import { toast } from "sonner";
import { PROFESSIONS } from "@/lib/extraData";
import { SectionHeader } from "./SectionHeader";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { QrCodeModal } from "./QrCodeModal";
import professionIcon from "@/assets/icon-3d-profession.png";
import { cn } from "@/lib/utils";

type Props = { search: string };

export function ProfessionsTab({ search }: Props) {
  const { toggle, isFav } = useFavorites();
  const { push } = useHistory();
  const [qrText, setQrText] = useState<string | null>(null);
  const term = search.trim().toLowerCase();

  return (
    <div>
      <SectionHeader
        title="💼 ชุดสายอาชีพ / Professional Outfits"
        subtitle="หมอ พยาบาล ตำรวจ ทหาร แอร์ เชฟ พระ — สำหรับรูปทำเนียบและ portrait สายอาชีพ"
      />

      <div className="glass-card-hero mb-6 flex items-center gap-4 rounded-2xl p-5">
        <img src={professionIcon} alt="" width={110} height={110} className="float-3d h-auto w-[90px] sm:w-[110px]" loading="lazy" />
        <div>
          <p className="text-sm text-foreground/90">คลิกเดียวเปลี่ยนเป็นชุดอาชีพต่างๆ — ใช้คู่กับรูปต้นฉบับเพื่อรักษาใบหน้า</p>
          <p className="mt-1 text-xs text-muted-foreground">เหมาะสำหรับวันเด็กบอกอาชีพในฝัน, ภาพสมัครสอบ, การ์ดวันเกิด</p>
        </div>
      </div>

      {PROFESSIONS.map((g) => {
        const filtered = g.items.filter(
          (it) => !term || it.label.toLowerCase().includes(term) || it.prompt.toLowerCase().includes(term),
        );
        if (filtered.length === 0) return null;
        return (
          <section key={g.category} className="mb-8">
            <h3 className="section-title mb-4 text-base font-bold text-foreground">{g.category}</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((it) => {
                const favorited = isFav(it.id);
                return (
                  <div key={it.id} className="glass-card flex items-center justify-between gap-2 rounded-xl px-3 py-2.5">
                    <p className="min-w-0 flex-1 truncate text-sm text-foreground/90" title={it.prompt}>
                      {it.label}
                    </p>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <button
                        onClick={() => toggle(it.id, it.prompt)}
                        className={cn("rounded-md p-1", favorited ? "text-amber-400" : "text-muted-foreground hover:text-amber-300")}
                        aria-label="fav"
                      >
                        <Star className="h-3.5 w-3.5" fill={favorited ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => setQrText(it.prompt)}
                        className="rounded-md p-1 text-muted-foreground hover:text-neon-pink"
                        aria-label="qr"
                      >
                        <QrCode className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(it.prompt);
                          push(it.prompt, it.label);
                          toast.success("คัดลอกแล้ว!");
                        }}
                        className="rounded-md p-1 text-neon-green hover:bg-neon-green/10"
                        aria-label="copy"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <QrCodeModal open={!!qrText} text={qrText || ""} onClose={() => setQrText(null)} />
    </div>
  );
}