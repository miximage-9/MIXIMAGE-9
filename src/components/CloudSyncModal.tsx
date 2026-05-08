import { useState } from "react";
import { Cloud, Download, KeyRound, Loader2, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  applyWorkspaceData,
  clearSavedSyncKey,
  collectWorkspaceData,
  getSavedSyncKey,
  saveSyncKey,
} from "@/lib/cloudSync";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CloudSyncModal({ open, onClose }: Props) {
  const [syncKey, setSyncKey] = useState(() => getSavedSyncKey());
  const [busy, setBusy] = useState<"save" | "load" | null>(null);

  if (!open) return null;

  const canSubmit = Boolean(syncKey.trim()) && !busy;

  const saveCloud = async () => {
    if (!syncKey.trim()) {
      toast.error("ใส่รหัสซิงก์ก่อน");
      return;
    }

    setBusy("save");
    try {
      saveSyncKey(syncKey);
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Sync-Key": syncKey.trim(),
        },
        body: JSON.stringify(collectWorkspaceData()),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "บันทึกขึ้นคลาวด์ไม่สำเร็จ");
      toast.success("บันทึกขึ้นคลาวด์แล้ว");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "ซิงก์ไม่สำเร็จ");
    } finally {
      setBusy(null);
    }
  };

  const loadCloud = async () => {
    if (!syncKey.trim()) {
      toast.error("ใส่รหัสซิงก์ก่อน");
      return;
    }

    setBusy("load");
    try {
      saveSyncKey(syncKey);
      const response = await fetch("/api/sync", {
        headers: { "X-Sync-Key": syncKey.trim() },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "โหลดข้อมูลจากคลาวด์ไม่สำเร็จ");
      applyWorkspaceData(data.data || {});
      toast.success("โหลดข้อมูลจากคลาวด์แล้ว");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "ซิงก์ไม่สำเร็จ");
    } finally {
      setBusy(null);
    }
  };

  const forgetKey = () => {
    clearSavedSyncKey();
    setSyncKey("");
    toast.info("ลบรหัสซิงก์ในเครื่องนี้แล้ว");
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/75 px-4 backdrop-blur-sm" onClick={onClose}>
      <section
        className="glass-card w-full max-w-lg rounded-2xl p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green">
              <Cloud className="h-3.5 w-3.5" />
              Cloud Sync
            </p>
            <h2 className="text-xl font-bold">ซิงก์ข้อมูลข้ามเครื่อง</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              บันทึก/โหลดรายการโปรด ประวัติ และ preset ผ่าน Netlify Blobs
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neon-pink">
          <KeyRound className="h-3.5 w-3.5" />
          Sync Key
        </label>
        <input
          value={syncKey}
          onChange={(event) => setSyncKey(event.target.value)}
          type="password"
          placeholder="ใส่รหัสเดียวกับ SYNC_SECRET"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-neon-green focus:ring-2 focus:ring-neon-green/30"
        />

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            onClick={saveCloud}
            disabled={!canSubmit}
            className="btn-neon inline-flex items-center justify-center gap-2 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "save" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            บันทึกขึ้นคลาวด์
          </button>
          <button
            onClick={loadCloud}
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-3 text-sm font-bold text-neon-cyan transition hover:bg-neon-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy === "load" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            โหลดจากคลาวด์
          </button>
        </div>

        <button
          onClick={forgetKey}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
          ลบรหัสที่จำไว้ในเครื่องนี้
        </button>
      </section>
    </div>
  );
}
