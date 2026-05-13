import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dog Handoff Sheet',
  description: 'A simple shareable dog routine handoff sheet for caretakers.',
  icons: {
    icon: '/favicon.svg'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2f7d46'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/print-stylesheet.css" media="print" />
      </head>
      <body>{children}</body>
    </html>
  );
}
