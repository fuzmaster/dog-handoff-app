import LZString from 'lz-string';
import type { EncodedPayload, HandoffStateData } from '@/types';

const PARAM_NAME = 's';

export function encodeState(data: HandoffStateData): string {
  const payload: EncodedPayload = {
    v: 1,
    data
  };

  return LZString.compressToEncodedURIComponent(JSON.stringify(payload));
}

export function decodeState(value: string | null): HandoffStateData | null {
  if (!value) return null;

  try {
    const json = LZString.decompressFromEncodedURIComponent(value);
    if (!json) return null;

    const parsed = JSON.parse(json) as EncodedPayload;
    if (parsed.v !== 1 || !parsed.data) return null;

    return parsed.data;
  } catch {
    return null;
  }
}

export function buildShareUrl(data: HandoffStateData): string {
  if (typeof window === 'undefined') return '';
  const encoded = encodeState(data);
  const url = new URL(window.location.href);
  url.searchParams.set(PARAM_NAME, encoded);
  return url.toString();
}

export function getEncodedStateFromLocation(): HandoffStateData | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return decodeState(params.get(PARAM_NAME));
}

export function replaceUrlWithState(data: HandoffStateData): void {
  if (typeof window === 'undefined') return;
  const encoded = encodeState(data);
  const url = new URL(window.location.href);
  url.searchParams.set(PARAM_NAME, encoded);
  window.history.replaceState({}, '', url.toString());
}
