import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  right?: ReactNode;
};

export function SectionHeader({ title, subtitle, icon, right }: Props) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div className="section-title">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {icon}
          <span>{title}</span>
        </h2>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{subtitle}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}