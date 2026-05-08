import { useCallback, useEffect, useState } from "react";

export type HistoryItem = {
  id: string;
  text: string;
  label?: string;
  ts: number;
};

const KEY = "mix-prompt-history-v1";
const MAX = 15;

function read(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(read());
    const refresh = () => setItems(read());
    window.addEventListener("storage", refresh);
    window.addEventListener("mix-cloud-sync-restored", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("mix-cloud-sync-restored", refresh);
    };
  }, []);

  const persist = (next: HistoryItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const push = useCallback((text: string, label?: string) => {
    if (!text || !text.trim()) return;
    const item: HistoryItem = {
      id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      label,
      ts: Date.now(),
    };
    setItems((prev) => {
      const filtered = prev.filter((p) => p.text !== text);
      const next = [item, ...filtered].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clear = useCallback(() => persist([]), []);

  return { items, push, remove, clear };
}
