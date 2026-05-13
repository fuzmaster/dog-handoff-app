import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-leaf text-white hover:bg-leaf/90 active:bg-leaf/95',
  secondary: 'bg-white text-ink ring-1 ring-ink/10 hover:bg-grass',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  danger: 'bg-red-50 text-red-700 ring-1 ring-red-100 hover:bg-red-100'
};

export function Button({ children, variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
