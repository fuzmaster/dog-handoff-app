'use client';

import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useHandoffStore } from '@/store/useHandoffStore';
import { formatTime } from '@/utils/timeFormatter';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';

const typeStyles: Record<string, string> = {
  Food: 'bg-orange-50 text-orange-800',
  Water: 'bg-blue-50 text-blue-800',
  Walk: 'bg-green-50 text-green-800',
  Pee: 'bg-yellow-50 text-yellow-800',
  Poop: 'bg-amber-50 text-amber-900',
  Medication: 'bg-purple-50 text-purple-800',
  Play: 'bg-pink-50 text-pink-800',
  Sleep: 'bg-indigo-50 text-indigo-800',
  Accident: 'bg-red-50 text-red-800',
  Grooming: 'bg-teal-50 text-teal-800',
  Other: 'bg-slate-100 text-slate-800'
};

export function EventList() {
  const entries = useHandoffStore((state) => state.entries);
  const updateEntry = useHandoffStore((state) => state.updateEntry);
  const removeEntry = useHandoffStore((state) => state.removeEntry);
  const clearEntries = useHandoffStore((state) => state.clearEntries);

  return (
    <Card className="print-block">
      <CardHeader title="Today’s log" eyebrow="What already happened">
        {entries.length > 0 ? (
          <Button variant="ghost" onClick={clearEntries} className="no-print">
            Clear all
          </Button>
        ) : null}
      </CardHeader>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-grass/60 p-6 text-center text-sm text-ink/60">
          No updates yet. Add the first feeding, walk, bathroom break, medication, or note.
        </div>
      ) : (
        <>
          <div className="space-y-3 print:hidden">
            {entries.map((entry) => (
              <article key={entry.id} className="flex gap-3 rounded-2xl border border-ink/10 bg-bone p-3">
                <button
                  type="button"
                  onClick={() => updateEntry(entry.id, { done: !entry.done })}
                  className="focus-ring mt-1 h-8 w-8 shrink-0 rounded-full text-leaf"
                  aria-label={entry.done ? 'Mark not done' : 'Mark done'}
                >
                  {entry.done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-black ${typeStyles[entry.type] ?? typeStyles.Other}`}>
                      {entry.type}
                    </span>
                    <span className="text-sm font-black text-ink">{formatTime(entry.time)}</span>
                    {entry.caretaker ? <span className="text-xs font-bold text-ink/55">by {entry.caretaker}</span> : null}
                  </div>
                  <p className="mt-1 break-words text-sm text-ink/80">{entry.detail}</p>
                </div>

                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="focus-ring h-9 w-9 shrink-0 rounded-xl text-ink/45 hover:bg-red-50 hover:text-red-700"
                  aria-label={`Remove ${entry.type} entry`}
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>

          <table className="print-table hidden print:table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Details</th>
                <th>Caretaker</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{formatTime(entry.time)}</td>
                  <td>{entry.type}</td>
                  <td>{entry.detail}</td>
                  <td>{entry.caretaker || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Card>
  );
}
