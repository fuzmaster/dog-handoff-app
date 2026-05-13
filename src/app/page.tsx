use client';

import { useEffect, useState } from 'react';
import { Clock3, Link2, Printer, Share2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BehaviorNotes } from '@/components/features/BehaviorNotes';
import { EventList } from '@/components/features/EventList';
import { LogEntryForm } from '@/components/features/LogEntryForm';
import { ShareModal } from '@/components/features/ShareModal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Field, Input } from '@/components/ui/Input';
import { useHandoffStore } from '@/store/useHandoffStore';
import { formatDate } from '@/utils/timeFormatter';
import { getEncodedStateFromLocation, replaceUrlWithState } from '@/utils/urlEncoder';
import { printHandoffSheet } from '@/utils/printHelper';

export default function HomePage() {
  const [shareOpen, setShareOpen] = useState(false);
  const hydrate = useHandoffStore((state) => state.hydrate);
  const profile = useHandoffStore((state) => state.profile);
  const entries = useHandoffStore((state) => state.entries);
  const behaviorNotes = useHandoffStore((state) => state.behaviorNotes);
  const nextInstructions = useHandoffStore((state) => state.nextInstructions);
  const updatedAt = useHandoffStore((state) => state.updatedAt);
  const setProfileField = useHandoffStore((state) => state.setProfileField);
  const snapshot = useHandoffStore((state) => state.getSnapshot());

  useEffect(() => {
    const decoded = getEncodedStateFromLocation();
    if (decoded) hydrate(decoded);
  }, [hydrate]);

  function handleUpdateUrl() {
    replaceUrlWithState(snapshot);
  }

  return (
    <div className="screen-shell min-h-screen">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <div id="print-area" className="space-y-5">
          <section className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-soft">
            <div className="bg-leaf px-5 py-4 text-white print-compact">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-white/75">Dog routine handoff</p>
                  <h1 className="print-title mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                    {profile.dogName ? `${profile.dogName}’s Daily Sheet` : 'Dog Handoff Sheet'}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/85">
                    <Clock3 size={16} aria-hidden="true" />
                    {formatDate(profile.date)}
                  </p>
                </div>

                <div className="no-print flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={handleUpdateUrl}>
                    <Link2 size={18} aria-hidden="true" />
                    Update URL
                  </Button>
                  <Button variant="secondary" onClick={printHandoffSheet}>
                    <Printer size={18} aria-hidden="true" />
                    Print
                  </Button>
                  <Button onClick={() => setShareOpen(true)} className="bg-ink hover:bg-ink/90">
                    <Share2 size={18} aria-hidden="true" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 print-grid print-compact md:grid-cols-4">
              <Field label="Dog name">
                <Input
                  value={profile.dogName}
                  onChange={(event) => setProfileField('dogName', event.target.value)}
                  placeholder="Bailey"
                  maxLength={40}
                />
              </Field>
              <Field label="Date">
                <Input
                  type="date"
                  value={profile.date}
                  onChange={(event) => setProfileField('date', event.target.value)}
                />
              </Field>
              <Field label="Primary contact">
                <Input
                  value={profile.primaryContact}
                  onChange={(event) => setProfileField('primaryContact', event.target.value)}
                  placeholder="Name + phone"
                  maxLength={80}
                />
              </Field>
              <Field label="Emergency contact">
                <Input
                  value={profile.emergencyContact}
                  onChange={(event) => setProfileField('emergencyContact', event.target.value)}
                  placeholder="Vet / backup"
                  maxLength={80}
                />
              </Field>
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5">
              <LogEntryForm />

              <Card className="print-block">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-grass p-3">
                    <p className="text-2xl font-black text-leaf">{entries.length}</p>
                    <p className="text-xs font-bold text-ink/60">Log entries</p>
                  </div>
                  <div className="rounded-2xl bg-grass p-3">
                    <p className="text-2xl font-black text-leaf">{behaviorNotes.trim() ? 'Yes' : 'No'}</p>
                    <p className="text-xs font-bold text-ink/60">Behavior note</p>
                  </div>
                  <div className="rounded-2xl bg-grass p-3">
                    <p className="text-2xl font-black text-leaf">{nextInstructions.trim() ? 'Yes' : 'No'}</p>
                    <p className="text-xs font-bold text-ink/60">Next steps</p>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-ink/50">
                  Last updated {new Date(updatedAt).toLocaleString()}
                </p>
              </Card>
            </div>

            <EventList />
          </div>

          <BehaviorNotes />
        </div>
      </main>

      <Footer />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
