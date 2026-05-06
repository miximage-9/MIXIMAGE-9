import Sidebar from "./Sidebar.jsx";

function AppShell({
  activePage,
  children,
  clipboardCount,
  onNavigate,
  promptCount,
}) {
  return (
    <div className="min-h-screen overflow-x-hidden px-3 py-3 text-slate-800 sm:px-4 lg:px-5">
      <div className="mx-auto grid w-full min-w-0 max-w-[1360px] gap-4 lg:grid-cols-[236px_minmax(0,1fr)]">
        <Sidebar
          activePage={activePage}
          clipboardCount={clipboardCount}
          onNavigate={onNavigate}
          promptCount={promptCount}
        />
        <main className="min-w-0 pb-6">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
