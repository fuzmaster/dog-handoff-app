export function printHandoffSheet(): void {
  if (typeof window === 'undefined') return;
  window.print();
}
