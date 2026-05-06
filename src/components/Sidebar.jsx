import {
  Boxes,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  Facebook,
  FolderKanban,
  LibraryBig,
  Sparkles,
  WandSparkles,
  Youtube,
} from "lucide-react";

const navItems = [
  { id: "prompts", label: "คลังพรอมป์", icon: LibraryBig },
  { id: "tools", label: "AI Tools", icon: WandSparkles },
  { id: "workspace", label: "พื้นที่ทำงาน", icon: FolderKanban },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/MixNattanon?locale=th_TH",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.youtube.com/@MIXNATTANON",
    icon: Youtube,
    label: "YouTube",
  },
  {
    href: "http://miximage.one",
    icon: LibraryBig,
    label: "MIXIMAGE LIBRARY",
  },
];

function Sidebar({ activePage, clipboardCount, onNavigate, promptCount }) {
  return (
    <aside className="min-w-0 overflow-hidden rounded-[26px] border border-white/65 bg-white/55 p-3 shadow-glass backdrop-blur-xl lg:sticky lg:top-3 lg:h-[calc(100vh-1.5rem)]">
      <div className="flex min-w-0 items-center gap-3 rounded-[22px] bg-white/55 p-2.5 shadow-sm">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white shadow-soft">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-950">MIX IMAGE TOOL</p>
          <p className="text-xs text-slate-500">Personal AI image workspace</p>
        </div>
      </div>

      <nav className="no-scrollbar mt-4 flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group flex h-10 shrink-0 items-center gap-2.5 rounded-2xl px-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${
                active
                  ? "bg-slate-900 text-white shadow-soft"
                  : "bg-white/45 text-slate-600 hover:bg-white/80 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              <ChevronRight
                className={`ml-auto hidden h-4 w-4 transition lg:block ${
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div className="mt-4 grid min-w-0 grid-cols-2 gap-2">
        <Metric icon={Boxes} label="พรอมป์" value={promptCount} />
        <Metric icon={ClipboardList} label="คัดลอก" value={clipboardCount} />
      </div>

      <div className="mt-3 rounded-[22px] border border-white/60 bg-white/40 p-2 shadow-sm">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-normal text-slate-400">
          Links
        </p>
        <div className="grid gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                className="group flex h-10 min-w-0 items-center gap-2.5 rounded-2xl bg-white/55 px-3 text-sm font-semibold text-slate-600 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 truncate">{link.label}</span>
                <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 opacity-40 transition group-hover:opacity-80" />
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[20px] border border-white/60 bg-white/45 p-2.5 shadow-sm">
      <div className="mb-2 grid h-8 w-8 place-items-center rounded-2xl bg-white/75 text-slate-500">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-lg font-semibold text-slate-950">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default Sidebar;
