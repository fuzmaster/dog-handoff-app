import { Dog } from 'lucide-react';

export function Header() {
  return (
    <header className="no-print mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <a href="/" className="focus-ring flex items-center gap-3 rounded-2xl" aria-label="Dog Handoff Sheet home">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf text-white shadow-soft">
          <Dog aria-hidden="true" size={25} />
        </span>
        <span>
          <span className="block text-lg font-black leading-tight text-ink">Dog Handoff</span>
          <span className="block text-xs font-bold uppercase tracking-[0.18em] text-leaf">No account needed</span>
        </span>
      </a>
    </header>
  );
}
