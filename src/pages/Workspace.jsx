import { Cloud, Copy, Download, Folder, Layers3, Upload } from "lucide-react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

function Workspace({
  clipboardHistory,
  onCloudLoad,
  onCloudSave,
  onCopy,
  prompts,
}) {
  const [syncKey, setSyncKey] = useLocalStorage("mixtoole-sync-key-v1", "");
  const [syncStatus, setSyncStatus] = useState("");
  const [syncLoading, setSyncLoading] = useState("");

  async function runSync(action) {
    const key = syncKey.trim();
    if (!key) {
      setSyncStatus("ใส่รหัสซิงก์ก่อน");
      return;
    }

    setSyncLoading(action);
    setSyncStatus("");

    try {
      if (action === "save") {
        await onCloudSave(key);
        setSyncStatus("บันทึกข้อมูลขึ้นคลาวด์แล้ว");
      } else {
        const workspace = await onCloudLoad(key);
        setSyncStatus(
          workspace.updatedAt
            ? `โหลดข้อมูลล่าสุด: ${formatDateTime(workspace.updatedAt)}`
            : "ยังไม่มีข้อมูลบนคลาวด์ ระบบโหลดค่าเริ่มต้นให้แล้ว"
        );
      }
    } catch (error) {
      setSyncStatus(error.message || "ซิงก์ไม่สำเร็จ");
    } finally {
      setSyncLoading("");
    }
  }

  return (
    <section className="space-y-4">
      <header className="rounded-[28px] border border-white/65 bg-white/55 p-4 shadow-glass backdrop-blur-xl sm:p-5">
        <p className="mb-3 inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-500">
          พื้นที่ทำงาน
        </p>
        <h1 className="break-words text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
          โต๊ะจัดคอนเทนต์
        </h1>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        <SummaryCard icon={Folder} label="พรอมป์ที่บันทึก" value={prompts.length} />
        <SummaryCard
          icon={Layers3}
          label="รายการในคลิปบอร์ด"
          value={clipboardHistory.length}
        />
      </section>

      <section className="rounded-[26px] border border-white/65 bg-white/45 p-4 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="mb-2 grid h-11 w-11 place-items-center rounded-[20px] bg-white/70 text-slate-600 shadow-sm">
              <Cloud className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-slate-950">
              ซิงก์ข้อมูลข้ามเครื่อง
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              ใช้รหัสเดียวกับค่า SYNC_SECRET ใน Netlify เพื่อบันทึกหรือโหลดคลังพรอมป์ ประวัติคัดลอก และค่าที่ Save ไว้
            </p>
          </div>
          <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto] xl:w-[560px]">
            <input
              className="field-input h-10"
              onChange={(event) => setSyncKey(event.target.value)}
              placeholder="รหัสซิงก์ส่วนตัว"
              type="password"
              value={syncKey}
            />
            <SyncButton
              disabled={Boolean(syncLoading)}
              loading={syncLoading === "save"}
              onClick={() => runSync("save")}
            >
              <Upload className="h-4 w-4" />
              Save Cloud
            </SyncButton>
            <SyncButton
              disabled={Boolean(syncLoading)}
              loading={syncLoading === "load"}
              onClick={() => runSync("load")}
              secondary
            >
              <Download className="h-4 w-4" />
              Load
            </SyncButton>
          </div>
        </div>
        {syncStatus && (
          <p className="mt-3 rounded-[18px] bg-white/55 px-3 py-2 text-sm font-semibold text-slate-600">
            {syncStatus}
          </p>
        )}
      </section>

      <section className="rounded-[26px] border border-white/65 bg-white/45 p-4 shadow-soft backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-950">
            ประวัติการคัดลอก
          </h2>
          <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-slate-500">
            ล่าสุด 20 รายการ
          </span>
        </div>

        <div className="grid gap-2.5">
          {clipboardHistory.length > 0 ? (
            clipboardHistory.map((item) => (
              <div
                className="flex min-w-0 items-center gap-3 rounded-[20px] bg-white/55 p-2.5 shadow-sm"
                key={item.id}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {item.label}
                  </p>
                  <p className="truncate text-sm text-slate-500">{item.text}</p>
                </div>
                <button
                  aria-label={`คัดลอก ${item.label}`}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700"
                  onClick={() => onCopy(item.text, item.label, item.id)}
                  title="คัดลอก"
                  type="button"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="rounded-[20px] bg-white/45 p-5 text-sm font-medium text-slate-500">
              ยังไม่มีรายการที่คัดลอก
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

function SyncButton({ children, disabled, loading, onClick, secondary = false }) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold shadow-soft transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 ${
        secondary
          ? "bg-white/75 text-slate-600 hover:bg-white"
          : "bg-slate-900 text-white hover:bg-slate-700"
      }`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {loading ? "กำลังซิงก์..." : children}
    </button>
  );
}

function formatDateTime(value) {
  try {
    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <article className="rounded-[24px] border border-white/65 bg-white/55 p-4 shadow-soft backdrop-blur-lg">
      <div className="grid h-11 w-11 place-items-center rounded-[20px] bg-white/70 text-slate-600 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </article>
  );
}

export default Workspace;
