import { useCallback, useEffect, useState } from "react";
import type { GenInputs } from "@/lib/promptBuilder";

export type Preset = {
  id: string;
  name: string;
  inputs: GenInputs;
  ts: number;
};

const KEY = "mix-prompt-presets-v1";

function read(): Preset[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    setPresets(read());
    const refresh = () => setPresets(read());
    window.addEventListener("storage", refresh);
    window.addEventListener("mix-cloud-sync-restored", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("mix-cloud-sync-restored", refresh);
    };
  }, []);

  const persist = (next: Preset[]) => {
    setPresets(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const save = useCallback((name: string, inputs: GenInputs) => {
    const p: Preset = { id: `p-${Date.now()}`, name, inputs, ts: Date.now() };
    setPresets((prev) => {
      const next = [p, ...prev].slice(0, 30);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    return p;
  }, []);

  const remove = useCallback((id: string) => {
    setPresets((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { presets, save, remove };
}
