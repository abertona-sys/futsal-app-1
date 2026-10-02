export type AgeGroup = '2-5' | '6-9' | '10-13';

export type PillarCategory = 'motor' | 'tecnico' | 'tatico' | 'socioemocional';

export type SemaphoreStatus = 'dominio' | 'desenvolvimento' | 'nao_trabalhado';

export interface SkillIndicator {
  id: string;
  name: string;
  pillar: PillarCategory;
  ageGroup: AgeGroup;
  description: string;
  status: SemaphoreStatus;
  lastUpdated?: string;
  notes?: string;
}

export interface PlayerStats {
  control: number;     // 0 - 100
  precision: number;   // 0 - 100
  velocity: number;    // 0 - 100
  decision: number;    // 0 - 100
  teamwork: number;    // 0 - 100
  resilience: number;  // 0 - 100
}

export interface PlayerGoal {
  id: string;
  type: 'corpo' | 'mente' | 'jogo';
  title: string;
  description: string;
  completed: boolean;
  targetDate: string;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  avatar: string;
  photoUrl?: string;
  jerseyNumber: number;
  dominantFoot: 'Direito' | 'Esquerdo' | 'Ambidestro';
  role: 'Ala' | 'Fixador / Fecho' | 'Pivô' | 'Guarda-Redes' | 'Explorador';
  level: string;
  totalPoints: number;
  trainingMinutes: number;
  streakDays: number;
  stats: PlayerStats;
  goals: PlayerGoal[];
  skills: SkillIndicator[];
  badges: string[];
}

export interface DrillStep {
  number: number;
  title: string;
  description: string;
}

export interface DrillMarker {
  type: 'player' | 'cone' | 'ball' | 'goal' | 'target' | 'zone';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label?: string;
}

export interface Drill {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  ageGroup: AgeGroup;
  category: string;
  duration: string;
  childrenCount: string;
  space: string;
  material: string;
  setupTime: string;
  overview: string;
  steps: DrillStep[];
  markers: DrillMarker[];
  magicWords?: string[];
  scoringRules?: string[];
  rounds: {
    round1: { title: string; desc: string };
    round2: { title: string; desc: string };
    round3: { title: string; desc: string };
  };
  adjustments: {
    easier: string;
    harder: string;
    noMaterial: string;
  };
  coachTip: string;
  commonErrors: Array<{ error: string; fix: string }>;
  observationChecklist: string[];
  safetyTip: string;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  subtitle: string;
  category: 'técnica' | 'família' | 'fair_play' | 'cardio';
  targetCount: number;
  currentCount: number;
  unit: string;
  pointsReward: number;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  completed: boolean;
  daysRemaining: number;
}

export interface WearableTelemetry {
  isConnected: boolean;
  deviceName: string;
  connectionType: 'bluetooth' | 'motion' | 'simulated';
  heartRate: number;
  restingHeartRate: number;
  maxHeartRate: number;
  activeCalories: number;
  activeSeconds: number;
  steps: number;
  cadenceRpm: number;
  currentZone: 'Reposo' | 'Calentamiento' | 'Aeróbico' | 'Cardio Intenso' | 'Pico';
  zoneColor: string;
  batteryLevel?: number;
}

export interface TrainingLog {
  id: string;
  drillId: string;
  drillTitle: string;
  playerId: string;
  playerName: string;
  date: string;
  durationSeconds: number;
  score: number;
  roundPlayed: 'round1' | 'round2' | 'round3';
  avgHeartRate: number;
  caloriesBurned: number;
  checklistResults: Record<string, boolean>;
  smallVictory: string;
  coachNote?: string;
}

export interface FairPlayCertificate {
  id: string;
  childName: string;
  activityTitle: string;
  date: string;
  values: {
    respect: boolean;
    effort: boolean;
    honesty: boolean;
    cooperation: boolean;
  };
  justification: string;
  guardianSignature: string;
  playerSignature: string;
}

export interface SubscriptionAccount {
  status: 'free' | 'trial' | 'active' | 'canceled';
  plan: 'monthly' | 'annual';
  trialDaysLeft: number;
  trialEndsAt?: string;
  nextBillingDate?: string;
  amountPaid: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  paymentMethod: 'card' | 'impultienda' | 'mercadopago';
  cardLast4?: string;
  cardBrand?: string;
  gatewayCheckoutUrl: string; // The owner's store checkout URL, e.g. impultienda.ar link
}
