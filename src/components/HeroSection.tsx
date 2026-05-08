import heroCamera from "@/assets/hero-3d-camera.png";
import { Sparkles, Zap } from "lucide-react";

type Props = {
  onStart?: () => void;
};

export function HeroSection({ onStart }: Props) {
  return (
    <section className="glass-card-hero relative mb-8 overflow-visible rounded-3xl px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid items-center gap-4 sm:grid-cols-[1fr,auto]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neon-green">
            <Sparkles className="h-3 w-3" /> Premium Prompt Engine
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            <span className="neon-gradient-text">Mix Your Perfect</span>
            <br />
            <span className="text-foreground">Photo Prompt</span>
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            เครื่องมือสร้างพรอมต์สำหรับร้านถ่ายรูป — รูปติดบัตร, พรีเวดดิ้ง, รับปริญญา, ชุดนักเรียน-สายอาชีพ ครบในที่เดียว
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className="btn-neon inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <Zap className="h-4 w-4" /> เริ่มสร้างพรอมต์
            </button>
            <a
              href="http://piscopy.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-neon-pink/40 hover:bg-white/10"
            >
              🎨 MIX Image
            </a>
          </div>
          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="text-muted-foreground"><span className="font-bold text-neon-green">200+</span> พรอมต์</div>
            <div className="text-muted-foreground"><span className="font-bold text-neon-pink">8</span> หมวดหลัก</div>
            <div className="text-muted-foreground"><span className="font-bold text-neon-cyan">Face Lock</span> อัตโนมัติ</div>
          </div>
        </div>
        <div className="relative hidden sm:block">
          <img
            src={heroCamera}
            alt="3D camera with eye lens"
            width={260}
            height={260}
            className="float-3d h-auto w-[220px] sm:w-[260px]"
          />
        </div>
      </div>
    </section>
  );
}