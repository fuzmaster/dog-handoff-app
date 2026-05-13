import { create } from 'zustand';
import type { DogProfile, EventType, HandoffStateData, LogEntry } from '@/types';
import { getCurrentTimeInputValue, getTodayInputValue } from '@/utils/timeFormatter';

const MAX_ENTRIES = 50;

interface HandoffStore extends HandoffStateData {
  setProfileField: (field: keyof DogProfile, value: string) => void;
  addEntry: (entry: Omit<LogEntry, 'id'>) => void;
  updateEntry: (id: string, patch: Partial<LogEntry>) => void;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
  setBehaviorNotes: (value: string) => void;
  setNextInstructions: (value: string) => void;
  hydrate: (data: HandoffStateData) => void;
  reset: () => void;
  getSnapshot: () => HandoffStateData;
}

function createInitialState(): HandoffStateData {
  return {
    profile: {
      dogName: '',
      date: getTodayInputValue(),
      primaryContact: '',
      emergencyContact: ''
    },
    entries: [
      {
        id: cryptoSafeId(),
        type: 'Food',
        time: getCurrentTimeInputValue(),
        detail: 'Breakfast served',
        caretaker: '',
        done: true
      }
    ],
    behaviorNotes: '',
    nextInstructions: '',
    updatedAt: new Date().toISOString()
  };
}

function cryptoSafeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeEntry(entry: Omit<LogEntry, 'id'>): LogEntry {
  return {
    id: cryptoSafeId(),
    type: entry.type as EventType,
    time: entry.time,
    detail: entry.detail.trim(),
    caretaker: entry.caretaker.trim(),
    done: entry.done
  };
}

const initialState = createInitialState();

export const useHandoffStore = create<HandoffStore>((set, get) => ({
  ...initialState,

  setProfileField: (field, value) =>
    set((state) => ({
      profile: {
        ...state.profile,
        [field]: value
      },
      updatedAt: new Date().toISOString()
    })),

  addEntry: (entry) =>
    set((state) => {
      const nextEntries = [normalizeEntry(entry), ...state.entries].slice(0, MAX_ENTRIES);
      return {
        entries: nextEntries,
        updatedAt: new Date().toISOString()
      };
    }),

  updateEntry: (id, patch) =>
    set((state) => ({
      entries: state.entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
      updatedAt: new Date().toISOString()
    })),

  removeEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
      updatedAt: new Date().toISOString()
    })),

  clearEntries: () =>
    set({
      entries: [],
      updatedAt: new Date().toISOString()
    }),

  setBehaviorNotes: (value) =>
    set({
      behaviorNotes: value,
      updatedAt: new Date().toISOString()
    }),

  setNextInstructions: (value) =>
    set({
      nextInstructions: value,
      updatedAt: new Date().toISOString()
    }),

  hydrate: (data) =>
    set({
      profile: {
        dogName: data.profile?.dogName ?? '',
        date: data.profile?.date ?? getTodayInputValue(),
        primaryContact: data.profile?.primaryContact ?? '',
        emergencyContact: data.profile?.emergencyContact ?? ''
      },
      entries: Array.isArray(data.entries) ? data.entries.slice(0, MAX_ENTRIES) : [],
      behaviorNotes: data.behaviorNotes ?? '',
      nextInstructions: data.nextInstructions ?? '',
      updatedAt: data.updatedAt ?? new Date().toISOString()
    }),

  reset: () => set(createInitialState()),

  getSnapshot: () => {
    const state = get();
    return {
      profile: state.profile,
      entries: state.entries,
      behaviorNotes: state.behaviorNotes,
      nextInstructions: state.nextInstructions,
      updatedAt: state.updatedAt
    };
  }
}));
