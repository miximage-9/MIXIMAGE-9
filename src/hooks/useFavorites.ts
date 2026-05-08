import { useCallback, useEffect, useState } from "react";

export type FavoriteItem = { id: string; text: string };

const KEY = "mix-prompt-favs";

function read(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => read());

  useEffect(() => {
    const refresh = (e?: StorageEvent | Event) => {
      if (e instanceof StorageEvent && e.key !== KEY) return;
      setFavorites(read());
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("mix-cloud-sync-restored", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("mix-cloud-sync-restored", refresh);
    };
  }, []);

  const toggle = useCallback((id: string, text: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === id);
      const next = exists ? prev.filter((f) => f.id !== id) : [...prev, { id, text }];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFav = useCallback((id: string) => favorites.some((f) => f.id === id), [favorites]);

  return { favorites, toggle, isFav };
}
