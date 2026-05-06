import { Copy, Folder, Layers3 } from "lucide-react";

function Workspace({ clipboardHistory, onCopy, prompts }) {
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
