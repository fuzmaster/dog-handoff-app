use client';

import { useEffect, useMemo, useState } from 'react';
import { Copy, Link2, Printer, RefreshCcw, X } from 'lucide-react';
import { useHandoffStore } from '@/store/useHandoffStore';
import { buildShareUrl, replaceUrlWithState } from '@/utils/urlEncoder';
import { printHandoffSheet } from '@/utils/printHelper';
import { Button } from '@/components/ui/Button';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ open, onClose }: ShareModalProps) {
  const snapshot = useHandoffStore((state) => state.getSnapshot());
  const reset = useHandoffStore((state) => state.reset);
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => buildShareUrl(snapshot), [snapshot]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  if (!open) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      replaceUrlWithState(snapshot);
    } catch {
      setCopied(false);
    }
  }

  function handleReset() {
    reset();
    onClose();
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, '', url.toString());
    }
  }

  return (
    <div className="no-print fixed inset-0 z-50 grid place-items-end bg-ink/40 p-3 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="share-title">
      <div className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-leaf">Share or export</p>
            <h2 id="share-title" className="mt-1 text-2xl font-black text-ink">
              Send the handoff sheet
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid h-10 w-10 place-items-center rounded-2xl bg-ink/5 text-ink"
            aria-label="Close share modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="rounded-2xl bg-grass p-3 text-sm text-ink/70">
          The share link stores this sheet inside the URL. Anyone with the link can open the current handoff state.
        </div>

        <div className="mt-4 break-all rounded-2xl border border-ink/10 bg-bone p-3 text-xs text-ink/65" aria-label="Generated share URL">
          {shareUrl}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button onClick={handleCopy}>
            <Copy size={18} aria-hidden="true" />
            {copied ? 'Copied' : 'Copy link'}
          </Button>
          <Button variant="secondary" onClick={printHandoffSheet}>
            <Printer size={18} aria-hidden="true" />
            Print / PDF
          </Button>
          <Button variant="secondary" onClick={() => replaceUrlWithState(snapshot)}>
            <Link2 size={18} aria-hidden="true" />
            Update URL
          </Button>
          <Button variant="danger" onClick={handleReset}>
            <RefreshCcw size={18} aria-hidden="true" />
            Reset sheet
          </Button>
        </div>
      </div>
    </div>
  );
}
