import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { PromptCard } from "./PromptCard";

export function FavoritesView() {
  const { favorites, isFav, toggle } = useFavorites();
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          <span className="neon-gradient-text">⭐ รายการโปรด</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">พรอมต์ที่คุณบันทึกไว้</p>
      </div>
      {favorites.length === 0 ? (
        <div className="panel-glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center">
          <Star className="h-10 w-10 text-amber-400/60" />
          <p className="text-muted-foreground">ยังไม่มีรายการโปรด — กดดาว ⭐ ที่พรอมต์เพื่อเพิ่ม</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((f) => (
            <PromptCard key={f.id} id={f.id} prompt={f.text} isFav={isFav(f.id)} onToggleFav={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}