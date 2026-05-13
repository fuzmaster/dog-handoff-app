import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section className={`rounded-3xl border border-ink/10 bg-white/90 p-5 shadow-soft backdrop-blur ${className}`}>
      {children}
    </section>
  );
}

export function CardHeader({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <div className="mb-4">
      {eyebrow ? <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-leaf">{eyebrow}</p> : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-xl font-black tracking-tight text-ink">{title}</h2>
        {children}
      </div>
    </div>
  );
}
