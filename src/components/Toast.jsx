import { Check } from "lucide-react";

function Toast({ toast }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50">
      {toast && (
        <div
          key={toast.id}
          className="flex min-w-[190px] animate-toast items-center gap-3 rounded-[22px] border border-white/70 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-800 shadow-glass backdrop-blur-2xl"
        >
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Check className="h-5 w-5" />
          </span>
          <span>
            {toast.message}
            {toast.detail && (
              <span className="block text-xs font-medium text-slate-500">
                {toast.detail}
              </span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export default Toast;
