export interface Episode {
  id?: string; // reserved for firestore id
  userId: string;
  timestamp: Date;
  dayPeriod: string;
  intensity: number;
  painLocation: string[];
  symptoms: string[];
  triggers: string[];
  medication: string;
  medicationOutcome: string;
  notes: string;
}
