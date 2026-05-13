import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink/60">{hint}</span> : null}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="focus-ring w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink shadow-sm placeholder:text-ink/40"
      {...props}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="focus-ring min-h-28 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink shadow-sm placeholder:text-ink/40"
      {...props}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="focus-ring w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink shadow-sm"
      {...props}
    />
  );
}
