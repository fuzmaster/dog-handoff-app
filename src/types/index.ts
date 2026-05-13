export type EventType =
  | 'Food'
  | 'Water'
  | 'Walk'
  | 'Pee'
  | 'Poop'
  | 'Medication'
  | 'Play'
  | 'Sleep'
  | 'Accident'
  | 'Grooming'
  | 'Other';

export interface LogEntry {
  id: string;
  type: EventType;
  time: string;
  detail: string;
  caretaker: string;
  done: boolean;
}

export interface DogProfile {
  dogName: string;
  date: string;
  primaryContact: string;
  emergencyContact: string;
}

export interface HandoffStateData {
  profile: DogProfile;
  entries: LogEntry[];
  behaviorNotes: string;
  nextInstructions: string;
  updatedAt: string;
}

export interface EncodedPayload {
  v: 1;
  data: HandoffStateData;
}
