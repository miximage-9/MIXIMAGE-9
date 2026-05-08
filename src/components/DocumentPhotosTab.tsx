import { useState } from "react";
import { Copy, Ruler, Palette, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { DOCUMENT_PHOTOS } from "@/lib/extraData";
import { SectionHeader } from "./SectionHeader";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { QrCodeModal } from "./QrCodeModal";
import passportIcon from "@/assets/icon-3d-passport.png";
import { Star, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { search: string };

export function DocumentPhotosTab({ search }: Props) {
  const { toggle, isFav } = useFavorites();
  const { push } = useHistory();
  const [qrText, setQrText] = useState<string | null>(null);
  const term = search.trim().toLowerCase();

  return (
    <div>
      <SectionHeader
        title="📸 รูปติดบัตร / Document Photos"
        subtitle="พรอมต์มาตรฐานเอกสารราชการไทย และวีซ่าต่างประเทศ พร้อมขนาดและพื้นหลังถูกต้อง"
      />

      <div className="glass-card-hero mb-6 flex items-center gap-4 rounded-2xl p-5">
        <img src={passportIcon} alt="" width={110} height={110} className="float-3d h-auto w-[90px] sm:w-[110px]" loading="lazy" />
        <div>
          <p className="text-sm text-foreground/90">เลือกประเภทเอกสารที่ลูกค้าต้องการ — แต่ละแบบล็อคขนาด พื้นหลัง และข้อกำหนดให้ผ่านมาตรฐานทันที</p>
          <p className="mt-1 text-xs text-muted-foreground">⚠️ ตรวจสอบกับสถานทูต/หน่วยงานก่อนพิมพ์จริงทุกครั้ง</p>
        </div>
      </div>

      {DOCUMENT_PHOTOS.map((g) => {
        const filtered = g.items.filter(
          (it) => !term || it.label.toLowerCase().includes(term) || it.prompt.toLowerCase().includes(term),
        );
        if (filtered.length === 0) return null;
        return (
          <section key={g.category} className="mb-8">
            <h3 className="section-title mb-4 text-base font-bold text-foreground">{g.category}</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((it) => {
                const favorited = isFav(it.id);
                return (
                  <article key={it.id} className="glass-card rounded-2xl p-4">
                    <h4 className="mb-2 text-sm font-bold text-foreground">{it.label}</h4>
                    <div className="space-y-1.5 text-[11px]">
                      <p className="flex items-center gap-1.5 text-foreground/80"><Ruler className="h-3 w-3 text-neon-cyan" /> <span className="text-muted-foreground">ขนาด:</span> {it.size}</p>
                      <p className="flex items-center gap-1.5 text-foreground/80"><Palette className="h-3 w-3 text-neon-green" /> <span className="text-muted-foreground">พื้นหลัง:</span> {it.bg}</p>
                      <p className="flex items-start gap-1.5 text-foreground/70"><AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" /> <span>{it.notes}</span></p>
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(it.prompt);
                          push(it.prompt, it.label);
                          toast.success(`คัดลอก "${it.label}" แล้ว`);
                        }}
                        className="btn-neon flex flex-1 items-center justify-center gap-1.5 py-2 text-xs"
                      >
                        <Copy className="h-3.5 w-3.5" /> คัดลอก
                      </button>
                      <button
                        onClick={() => setQrText(it.prompt)}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-foreground/80 hover:border-neon-pink/40 hover:text-neon-pink"
                        aria-label="qr"
                      >
                        <QrCode className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggle(it.id, it.prompt)}
                        className={cn("rounded-lg p-2", favorited ? "text-amber-400" : "text-muted-foreground hover:text-amber-300")}
                        aria-label="fav"
                      >
                        <Star className="h-4 w-4" fill={favorited ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </article>
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