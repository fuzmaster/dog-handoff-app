'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useHandoffStore } from '@/store/useHandoffStore';
import type { EventType } from '@/types';
import { getCurrentTimeInputValue } from '@/utils/timeFormatter';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { Field, Input, Select } from '@/components/ui/Input';

const eventTypes: EventType[] = [
  'Food',
  'Water',
  'Walk',
  'Pee',
  'Poop',
  'Medication',
  'Play',
  'Sleep',
  'Accident',
  'Grooming',
  'Other'
];

const detailPresets: Record<EventType, string> = {
  Food: 'Meal served',
  Water: 'Fresh water given',
  Walk: 'Walk completed',
  Pee: 'Pee break',
  Poop: 'Poop break',
  Medication: 'Medication given',
  Play: 'Play time',
  Sleep: 'Nap/rest',
  Accident: 'Accident cleaned',
  Grooming: 'Grooming done',
  Other: ''
};

export function LogEntryForm() {
  const addEntry = useHandoffStore((state) => state.addEntry);
  const entryCount = useHandoffStore((state) => state.entries.length);
  const [type, setType] = useState<EventType>('Food');
  const [time, setTime] = useState(getCurrentTimeInputValue());
  const [detail, setDetail] = useState(detailPresets.Food);
  const [caretaker, setCaretaker] = useState('');
  const maxReached = entryCount >= 50;

  const remaining = useMemo(() => Math.max(0, 50 - entryCount), [entryCount]);

  function handleTypeChange(nextType: EventType) {
    setType(nextType);
    setDetail(detailPresets[nextType]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detail.trim() || maxReached) return;

    addEntry({
      type,
      time,
      detail,
      caretaker,
      done: true
    });

    setTime(getCurrentTimeInputValue());
    setDetail(detailPresets[type]);
  }

  return (
    <Card className="print-block no-print">
      <CardHeader title="Add a quick update" eyebrow="Routine log">
        <span className="rounded-full bg-grass px-3 py-1 text-xs font-bold text-leaf">{remaining} entries left</span>
      </CardHeader>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <Field label="What happened?">
          <Select value={type} onChange={(event) => handleTypeChange(event.target.value as EventType)} aria-label="Event type">
            {eventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Time">
          <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} aria-label="Event time" />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Details">
            <Input
              value={detail}
              maxLength={90}
              onChange={(event) => setDetail(event.target.value)}
              placeholder="Example: Ate half breakfast, normal poop, gave meds"
              required
            />
          </Field>
        </div>

        <Field label="Caretaker">
          <Input
            value={caretaker}
            maxLength={40}
            onChange={(event) => setCaretaker(event.target.value)}
            placeholder="Name"
          />
        </Field>

        <div className="flex items-end">
          <Button type="submit" disabled={!detail.trim() || maxReached} className="w-full">
            <Plus size={18} aria-hidden="true" />
            Add update
          </Button>
        </div>
      </form>
    </Card>
  );
}
