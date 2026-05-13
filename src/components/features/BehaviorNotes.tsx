'use client';

import { useHandoffStore } from '@/store/useHandoffStore';
import { Card, CardHeader } from '@/components/ui/Card';
import { Field, Textarea } from '@/components/ui/Input';

export function BehaviorNotes() {
  const behaviorNotes = useHandoffStore((state) => state.behaviorNotes);
  const nextInstructions = useHandoffStore((state) => state.nextInstructions);
  const setBehaviorNotes = useHandoffStore((state) => state.setBehaviorNotes);
  const setNextInstructions = useHandoffStore((state) => state.setNextInstructions);

  return (
    <Card className="print-block">
      <CardHeader title="Notes for the next person" eyebrow="Handoff details" />

      <div className="grid gap-4 print-grid">
        <div className="print-block">
          <Field label="Behavior notes" hint="Mood, appetite, anxiety, energy, leash issues, weird behavior.">
            <Textarea
              value={behaviorNotes}
              maxLength={600}
              onChange={(event) => setBehaviorNotes(event.target.value)}
              placeholder="Example: Barked at delivery driver, seemed tired after lunch, no limp noticed."
            />
          </Field>
        </div>

        <div className="print-block">
          <Field label="Next instructions" hint="What the next caretaker should do first.">
            <Textarea
              value={nextInstructions}
              maxLength={600}
              onChange={(event) => setNextInstructions(event.target.value)}
              placeholder="Example: Needs dinner at 6 PM, short walk only, keep away from couch treats."
            />
          </Field>
        </div>
      </div>
    </Card>
  );
}
