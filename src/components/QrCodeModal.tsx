import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  text: string;
};

export function QrCodeModal({ open, onClose, text }: Props) {
  if (!open) return null;
  // QR code has practical capacity ~2KB; truncate if extremely long
  const payload = text.length > 1500 ? text.slice(0, 1500) + "..." : text;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-card relative w-full max-w-sm rounded-2xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="mb-1 text-lg font-bold neon-gradient-text">📱 สแกนส่งเข้ามือถือ</h3>
        <p className="mb-4 text-xs text-muted-foreground">ลูกค้าสแกนแล้วได้พรอมต์ทันที</p>
        <div className="mx-auto inline-block rounded-xl bg-white p-4">
          <QRCodeSVG value={payload} size={220} level="M" />
        </div>
        {text.length > 1500 && (
          <p className="mt-3 text-[11px] text-amber-400">⚠️ พรอมต์ยาวเกิน QR ตัดให้ 1500 ตัวอักษร</p>
        )}
      </div>
    </div>
  );
}