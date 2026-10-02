import React, { useState, useEffect } from 'react';
import { Drill, Player, WeeklyChallenge, TrainingLog, WearableTelemetry, SubscriptionAccount } from './types/futsal';
import { DRILLS_DATABASE } from './data/drillsData';
import { INITIAL_PLAYERS, INITIAL_CHALLENGES } from './data/skillsEvaluationData';
import { wearableService } from './services/wearableService';
import { InteractiveTrainingModal } from './components/InteractiveTrainingModal';
import { PlayerCardView } from './components/PlayerCardView';
import { WeeklyChallengesView } from './components/WeeklyChallengesView';
import { FamilyLeaderboardView } from './components/FamilyLeaderboardView';
import { RulesAndFairPlayView } from './components/RulesAndFairPlayView';
import { WearableHubModal } from './components/WearableHubModal';
import { FairPlayCertificateModal } from './components/FairPlayCertificateModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ArchitectureExplainerModal } from './components/ArchitectureExplainerModal';
import {
  Play,
  Heart,
  Sparkles,
  Trophy,
  Users,
  Search,
  Filter,
  Plus,
  HelpCircle,
  Clock,
  MapPin,
  ChevronRight,
  Flame,
  CheckCircle2,
  Crown,
  Lock,
  ExternalLink
} from 'lucide-react';

const LOCAL_STORAGE_KEY_PLAYERS = 'futsal_players_v1';
const LOCAL_STORAGE_KEY_CHALLENGES = 'futsal_challenges_v1';
const LOCAL_STORAGE_KEY_LOGS = 'futsal_logs_v1';
const LOCAL_STORAGE_KEY_PREMIUM = 'futsal_premium_v1';
const LOCAL_STORAGE_KEY_SUBSCRIPTION = 'futsal_subscription_account_v2';

const DEFAULT_SUBSCRIPTION: SubscriptionAccount = {
  status: 'free',
  plan: 'annual',
  trialDaysLeft: 7,
  amountPaid: 0,
  currency: 'USD',
  customerEmail: 'abertona@gmail.com',
  customerName: 'Alberto Bertona',
  paymentMethod: 'card',
  gatewayCheckoutUrl: 'https://treinos-de-futsal-infantil.impultienda.ar'
};

export default function App() {
  // Navigation
  const [activeNav, setActiveNav] = useState<'treinos' | 'jogadores' | 'retos' | 'classificacao' | 'fairplay'>('treinos');

  // Drill filters
  const [selectedAge, setSelectedAge] = useState<'all' | '2-5' | '6-9' | '10-13'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PLAYERS);
      return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
    } catch {
      return INITIAL_PLAYERS;
    }
  });

  const [activePlayerId, setActivePlayerId] = useState<string>(players[0]?.id || 'player-1');

  const [challenges, setChallenges] = useState<WeeklyChallenge[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CHALLENGES);
      return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
    } catch {
      return INITIAL_CHALLENGES;
    }
  });

  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [subscription, setSubscription] = useState<SubscriptionAccount>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SUBSCRIPTION);
      if (saved) return JSON.parse(saved);
      const oldPrem = localStorage.getItem(LOCAL_STORAGE_KEY_PREMIUM) === 'true';
      if (oldPrem) {
        return {
          ...DEFAULT_SUBSCRIPTION,
          status: 'active',
          amountPaid: 69.90
        };
      }
      return DEFAULT_SUBSCRIPTION;
    } catch {
      return DEFAULT_SUBSCRIPTION;
    }
  });

  const isSubscribed = subscription.status === 'active' || subscription.status === 'trial';

  // Modal triggers
  const [activeDrillModal, setActiveDrillModal] = useState<Drill | null>(null);
  const [isWearableModalOpen, setIsWearableModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // New Player Dialog
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerAge, setNewPlayerAge] = useState(7);
  const [newPlayerRole, setNewPlayerRole] = useState<'Ala' | 'Fixador / Fecho' | 'Pivô' | 'Guarda-Redes' | 'Explorador'>('Ala');
  const [newPlayerFoot, setNewPlayerFoot] = useState<'Direito' | 'Esquerdo' | 'Ambidestro'>('Direito');
  const [newPlayerPhoto, setNewPlayerPhoto] = useState<string | undefined>(undefined);
  const [isUploadingNewPhoto, setIsUploadingNewPhoto] = useState(false);
  const newPlayerFileInputRef = React.useRef<HTMLInputElement>(null);

  // Telemetry status
  const [telemetry, setTelemetry] = useState<WearableTelemetry>(wearableService.getTelemetry());

  useEffect(() => {
    const unsub = wearableService.subscribe((data) => {
      setTelemetry(data);
    });
    return () => unsub();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PLAYERS, JSON.stringify(players));
    } catch (e) {
      console.warn(e);
    }
  }, [players]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CHALLENGES, JSON.stringify(challenges));
    } catch (e) {
      console.warn(e);
    }
  }, [challenges]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LOGS, JSON.stringify(trainingLogs));
    } catch (e) {
      console.warn(e);
    }
  }, [trainingLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SUBSCRIPTION, JSON.stringify(subscription));
      localStorage.setItem(LOCAL_STORAGE_KEY_PREMIUM, isSubscribed ? 'true' : 'false');
    } catch (e) {
      console.warn(e);
    }
  }, [subscription, isSubscribed]);

  const handleUpdateSubscription = (updated: SubscriptionAccount) => {
    setSubscription(updated);
  };

  // Player handlers
  const handleUpdatePlayer = (updated: Player) => {
    setPlayers((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeletePlayer = (playerId: string) => {
    if (players.length <= 1) {
      alert('É necessário manter pelo menos um atleta na família.');
      return;
    }
    const remaining = players.filter((p) => p.id !== playerId);
    setPlayers(remaining);
    if (activePlayerId === playerId) {
      setActivePlayerId(remaining[0].id);
    }
  };

  const handleAddNewGoal = (
    playerId: string,
    goal: { type: 'corpo' | 'mente' | 'jogo'; title: string; description: string }
  ) => {
    const newGoalObj = {
      id: `g-${Date.now()}`,
      type: goal.type,
      title: goal.title,
      description: goal.description,
      completed: false,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, goals: [newGoalObj, ...p.goals] } : p))
    );
  };

  const handleNewPlayerPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingNewPhoto(true);
      const { processImageUpload } = await import('./utils/imageUpload');
      const dataUrl = await processImageUpload(file, 400);
      setNewPlayerPhoto(dataUrl);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar a foto do atleta.');
    } finally {
      setIsUploadingNewPhoto(false);
    }
  };

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;

    const newP: Player = {
      id: `p-${Date.now()}`,
      name: newPlayerName.trim(),
      age: Number(newPlayerAge),
      avatar: newPlayerAge <= 6 ? '👧' : newPlayerAge <= 11 ? '👦' : '🧑',
      photoUrl: newPlayerPhoto,
      jerseyNumber: Math.floor(Math.random() * 20) + 1,
      dominantFoot: newPlayerFoot,
      role: newPlayerRole,
      level: 'Iniciante Familiar Lv. 1',
      totalPoints: 200,
      trainingMinutes: 0,
      streakDays: 1,
      stats: {
        control: 70,
        precision: 70,
        velocity: 70,
        decision: 70,
        teamwork: 80,
        resilience: 80
      },
      goals: [
        {
          id: `g-${Date.now()}`,
          type: 'corpo',
          title: 'Primeiro Controlo',
          description: 'Aprender a paragem suave da bola com a sola.',
          completed: false,
          targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      skills: [],
      badges: ['🌱 Primeiro Toque']
    };

    setPlayers((prev) => [...prev, newP]);
    setActivePlayerId(newP.id);
    setNewPlayerName('');
    setNewPlayerPhoto(undefined);
    setIsAddPlayerOpen(false);
  };

  // Workout Session Completed Handler
  const handleFinishTrainingSession = (logData: {
    drillId: string;
    drillTitle: string;
    playerId: string;
    durationSeconds: number;
    score: number;
    roundPlayed: 'round1' | 'round2' | 'round3';
    avgHeartRate: number;
    caloriesBurned: number;
    checklistResults: Record<string, boolean>;
    smallVictory: string;
    coachNote: string;
  }) => {
    const targetPlayer = players.find((p) => p.id === logData.playerId);
    const playerName = targetPlayer ? targetPlayer.name : 'Atleta';

    const newLog: TrainingLog = {
      id: `log-${Date.now()}`,
      drillId: logData.drillId,
      drillTitle: logData.drillTitle,
      playerId: logData.playerId,
      playerName,
      date: new Date().toLocaleDateString('pt-BR'),
      durationSeconds: logData.durationSeconds,
      score: logData.score,
      roundPlayed: logData.roundPlayed,
      avgHeartRate: logData.avgHeartRate,
      caloriesBurned: logData.caloriesBurned,
      checklistResults: logData.checklistResults,
      smallVictory: logData.smallVictory,
      coachNote: logData.coachNote
    };

    setTrainingLogs((prev) => [newLog, ...prev]);

    // Update player points and minutes
    const addedMinutes = Math.max(1, Math.round(logData.durationSeconds / 60));
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === logData.playerId) {
          return {
            ...p,
            totalPoints: p.totalPoints + logData.score + 50,
            trainingMinutes: p.trainingMinutes + addedMinutes,
            streakDays: p.streakDays + 1
          };
        }
        return p;
      })
    );
  };

  const handleUpdateChallenge = (id: string, newCount: number) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const completed = newCount >= c.targetCount;
          return {
            ...c,
            currentCount: newCount,
            completed
          };
        }
        return c;
      })
    );
  };

  // Filter drills
  const filteredDrills = DRILLS_DATABASE.filter((d) => {
    const matchesAge = selectedAge === 'all' || d.ageGroup === selectedAge;
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAge && matchesSearch;
  });

  const activePlayer = players.find((p) => p.id === activePlayerId) || players[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans futsal-court-pattern">
      {/* 1. TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <div
            onClick={() => setActiveNav('treinos')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow group-hover:scale-105 transition-transform">
              ⚽
            </span>
            <span className="text-lg font-bold font-display tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Futsal Play Family
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setActiveNav('treinos')}
              className={`hover:text-white transition-colors pb-0.5 ${
                activeNav === 'treinos' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              200 Fichas de Treino
            </button>
            <button
              onClick={() => setActiveNav('jogadores')}
              className={`hover:text-white transition-colors pb-0.5 ${
                activeNav === 'jogadores' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              Fichas de Jogadores ({players.length})
            </button>
            <button
              onClick={() => setActiveNav('retos')}
              className={`hover:text-white transition-colors pb-0.5 ${
                activeNav === 'retos' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              Retos Semanais
            </button>
            <button
              onClick={() => setActiveNav('classificacao')}
              className={`hover:text-white transition-colors pb-0.5 ${
                activeNav === 'classificacao' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              Quadro & Diário Familiar
            </button>
            <button
              onClick={() => setActiveNav('fairplay')}
              className={`hover:text-white transition-colors pb-0.5 ${
                activeNav === 'fairplay' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              Fair Play & Regras
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5">
            {/* Live Wearable status trigger */}
            <button
              onClick={() => setIsWearableModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
              title="Configurar Vestível / Sensor"
            >
              <Heart
                className={`w-3.5 h-3.5 text-red-500 ${
                  telemetry.isConnected ? 'animate-heart-pulse' : ''
                }`}
              />
              <span className="font-mono text-white tabular-nums hidden sm:inline">
                {telemetry.heartRate} <span className="text-[10px] text-slate-400">BPM</span>
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: telemetry.zoneColor }}
              ></span>
            </button>

            {/* Architecture Explainer (Answers user prompt directly) */}
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              title="Ver Parecer Técnico e Arquitetura Escalável"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden lg:inline">Arquitetura & Viabilidade</span>
            </button>

            {/* Premium Subscription Pass */}
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                subscription.status === 'active'
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : subscription.status === 'trial'
                  ? 'bg-sky-400 text-slate-950 hover:bg-sky-300'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/10'
              }`}
            >
              {subscription.status === 'active' ? (
                <>
                  <Crown className="w-3.5 h-3.5" />
                  <span>Família Pro</span>
                </>
              ) : subscription.status === 'trial' ? (
                <>
                  <Clock className="w-3.5 h-3.5" />
                  <span>Trial 7 Dias</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Assinar Pro ($9.90)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 space-y-6">
        {/* VIEW 1: 200 FICHAS DE TREINO */}
        {activeNav === 'treinos' && (
          <div className="space-y-6">
            {/* Hero Card */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="max-w-2xl relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Treinos de Futsal Infantil · Oferta Digital Interativa</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                  Transforme os Treinos em Família no Momento Mais Esperado do Dia
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  200 fichas de exercícios, 50 brincadeiras rápidas de aquecimento e 30 circuitos lúdicos. Selecione uma ficha para iniciar a sessão com croqui tático, apito de árbitro, cronômetro e rastreamento cardíaco.
                </p>

                {/* Quick Stats Pill Island replacement (Clean unboxed text) */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                  <span className="text-white font-semibold">200 Fichas Completas</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-semibold">Semáforo de 4 Pilares</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-semibold">Vestíveis em Tempo Real</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-sky-400 font-semibold">Zero Teoria Chata</span>
                </div>
              </div>
            </div>

            {/* Free Mode Monetization Alert */}
            {!isSubscribed && (
              <div className="p-4 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-950 border border-amber-400/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 text-base shadow">
                    ⭐
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>Modo Demonstração Gratuito</span>
                      <span className="text-[10px] text-amber-300 font-normal">· Fichas de 10 a 13 anos e vestíveis bloqueados</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Assine o plano <strong className="text-white">Futsal Family Club</strong> para liberar todas as 200 fichas, retos semanais e rastreamento de frequência cardíaca.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shrink-0 shadow-lg shadow-amber-400/20 transition-all active:scale-95"
                >
                  Ver Planos & Assinar ($9.90)
                </button>
              </div>
            )}

            {/* Filter Controls (Segmented controls) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Age Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setSelectedAge('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedAge === 'all'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todas as Idades ({DRILLS_DATABASE.length})
                </button>
                <button
                  onClick={() => setSelectedAge('2-5')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedAge === '2-5'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2 a 5 Anos (Descoberta)
                </button>
                <button
                  onClick={() => setSelectedAge('6-9')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedAge === '6-9'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  6 a 9 Anos (Aprendizagem)
                </button>
                <button
                  onClick={() => setSelectedAge('10-13')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedAge === '10-13'
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  10 a 13 Anos (Jogo Formal)
                </button>
              </div>

              {/* Search bar */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar treino, drible, tabela..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Drills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDrills.map((drill) => (
                <div
                  key={drill.id}
                  className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl transition-all shadow-md flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-black text-xs flex items-center justify-center shadow">
                        #{drill.number}
                      </span>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-emerald-400">
                          {drill.ageGroup} anos
                        </span>
                        <div className="text-[10px] text-slate-500">{drill.setupTime} preparação</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {drill.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">{drill.subtitle}</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {drill.overview}
                    </p>

                    {/* Metadata line */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {drill.duration}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Users className="w-3 h-3 text-sky-400" />
                        {drill.childrenCount}
                      </span>
                    </div>

                    {/* Mini tactical preview banner */}
                    <div className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="text-slate-400">Espaço:</span>
                      <span className="font-medium text-white truncate max-w-[180px]">{drill.space}</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80">
                    {!isSubscribed && drill.ageGroup === '10-13' ? (
                      <button
                        onClick={() => setIsSubscriptionModalOpen(true)}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all border border-amber-400/30 shadow active:scale-98"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Desbloquear com Futsal Pro</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveDrillModal(drill)}
                        className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow shadow-amber-400/10"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Iniciar Treino Interativo</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: FICHAS DE JOGADORES & 4 PILARES */}
        {activeNav === 'jogadores' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-3xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Plantel da Família
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                  Fichas Personalizadas & Metas Individuais
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Acompanhamento individual por semáforo nos 4 pilares: Motor, Técnico, Tático e Socioemocional.
                </p>
              </div>

              <button
                onClick={() => setIsAddPlayerOpen(true)}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Membro Familiar</span>
              </button>
            </div>

            {/* Player Selector Bar */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {players.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlayerId(p.id)}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all shrink-0 min-w-[200px] text-left ${
                    p.id === activePlayerId
                      ? 'bg-slate-900 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  {p.photoUrl ? (
                    <img
                      src={p.photoUrl}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-400/60 shadow shrink-0"
                    />
                  ) : (
                    <span className="text-3xl shrink-0">{p.avatar}</span>
                  )}
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {p.role} · {p.age} anos · #{p.jerseyNumber}
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono font-bold mt-0.5">
                      {p.totalPoints} pts
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Player View */}
            <PlayerCardView
              player={activePlayer}
              onUpdatePlayer={handleUpdatePlayer}
              onAddNewGoal={handleAddNewGoal}
              onDeletePlayer={handleDeletePlayer}
            />
          </div>
        )}

        {/* VIEW 3: RETOS SEMANAIS */}
        {activeNav === 'retos' && (
          <WeeklyChallengesView
            challenges={challenges}
            onUpdateChallenge={handleUpdateChallenge}
          />
        )}

        {/* VIEW 4: CLASSIFICAÇÃO FAMILIAR & DIÁRIO */}
        {activeNav === 'classificacao' && (
          <FamilyLeaderboardView
            players={players}
            trainingLogs={trainingLogs}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
          />
        )}

        {/* VIEW 5: FAIR PLAY & REGRAS */}
        {activeNav === 'fairplay' && (
          <RulesAndFairPlayView
            onOpenCertificate={() => setIsCertificateModalOpen(true)}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-8 text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Futsal Play Family</span>
            <span>·</span>
            <span>Treinos de Futsal Infantil & Atividades Familiares</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="text-amber-400 hover:underline"
            >
              Parecer Técnico & Arquitetura de Vestíveis
            </button>
            <span>·</span>
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="hover:text-slate-300"
            >
              Certificados
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="hover:text-slate-300"
            >
              Assinatura Club
            </button>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION (Constitution Mobile Rule) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-1 no-print">
        <div className="grid grid-cols-5 items-center">
          <button
            onClick={() => setActiveNav('treinos')}
            className={`flex flex-col items-center justify-center py-1.5 ${
              activeNav === 'treinos' ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="text-base">⚽</span>
            <span className="text-[10px] mt-0.5">Treinos</span>
          </button>
          <button
            onClick={() => setActiveNav('jogadores')}
            className={`flex flex-col items-center justify-center py-1.5 ${
              activeNav === 'jogadores' ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="text-base">👦</span>
            <span className="text-[10px] mt-0.5">Atletas</span>
          </button>
          <button
            onClick={() => setActiveNav('retos')}
            className={`flex flex-col items-center justify-center py-1.5 ${
              activeNav === 'retos' ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="text-base">🏆</span>
            <span className="text-[10px] mt-0.5">Retos</span>
          </button>
          <button
            onClick={() => setActiveNav('classificacao')}
            className={`flex flex-col items-center justify-center py-1.5 ${
              activeNav === 'classificacao' ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="text-base">📊</span>
            <span className="text-[10px] mt-0.5">Quadro</span>
          </button>
          <button
            onClick={() => setActiveNav('fairplay')}
            className={`flex flex-col items-center justify-center py-1.5 ${
              activeNav === 'fairplay' ? 'text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="text-base">💚</span>
            <span className="text-[10px] mt-0.5">Fair Play</span>
          </button>
        </div>
      </div>

      {/* MODALS */}
      {activeDrillModal && (
        <InteractiveTrainingModal
          drill={activeDrillModal}
          players={players}
          activePlayerId={activePlayerId}
          onSelectPlayer={(id) => setActivePlayerId(id)}
          onFinishSession={handleFinishTrainingSession}
          onClose={() => setActiveDrillModal(null)}
          onOpenWearables={() => setIsWearableModalOpen(true)}
        />
      )}

      {isWearableModalOpen && (
        <WearableHubModal onClose={() => setIsWearableModalOpen(false)} />
      )}

      {isCertificateModalOpen && (
        <FairPlayCertificateModal
          players={players}
          activePlayerId={activePlayerId}
          onClose={() => setIsCertificateModalOpen(false)}
        />
      )}

      {isSubscriptionModalOpen && (
        <SubscriptionModal
          subscription={subscription}
          onUpdateSubscription={handleUpdateSubscription}
          onClose={() => setIsSubscriptionModalOpen(false)}
        />
      )}

      {isArchitectureModalOpen && (
        <ArchitectureExplainerModal onClose={() => setIsArchitectureModalOpen(false)} />
      )}

      {/* Add New Family Member Modal */}
      {isAddPlayerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm">
          <form
            onSubmit={handleCreatePlayer}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-display">Adicionar Atleta Familiar</h3>
              <button
                type="button"
                onClick={() => setIsAddPlayerOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
            </div>

            {/* Photo Upload for New Player */}
            <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <div
                onClick={() => newPlayerFileInputRef.current?.click()}
                className="w-14 h-14 rounded-xl border border-dashed border-amber-400/60 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer overflow-hidden shrink-0"
              >
                {newPlayerPhoto ? (
                  <img src={newPlayerPhoto} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <span className="text-lg">📷</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Foto do Atleta (Opcional)</span>
                <p className="text-[11px] text-slate-400">
                  {newPlayerPhoto ? 'Foto selecionada com sucesso!' : 'Carregue uma foto ou use um avatar padrão'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => newPlayerFileInputRef.current?.click()}
                    disabled={isUploadingNewPhoto}
                    className="text-[11px] font-bold text-amber-400 hover:underline"
                  >
                    {isUploadingNewPhoto ? 'Processando...' : newPlayerPhoto ? 'Alterar Foto' : '+ Carregar Foto'}
                  </button>
                  {newPlayerPhoto && (
                    <button
                      type="button"
                      onClick={() => setNewPlayerPhoto(undefined)}
                      className="text-[11px] font-semibold text-red-400 hover:underline"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <input
                  ref={newPlayerFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleNewPlayerPhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Nome do Jogador</label>
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Ex: Valentina, Tomás, Mãe Carolina"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Idade</label>
                <input
                  type="number"
                  min={2}
                  max={60}
                  value={newPlayerAge}
                  onChange={(e) => setNewPlayerAge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Pé Dominante</label>
                <select
                  value={newPlayerFoot}
                  onChange={(e) => setNewPlayerFoot(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Direito">Direito</option>
                  <option value="Esquerdo">Esquerdo</option>
                  <option value="Ambidestro">Ambidestro</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400">Posição / Papel</label>
              <select
                value={newPlayerRole}
                onChange={(e) => setNewPlayerRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Ala">Ala (Velocidade e Passe lateral)</option>
                <option value="Pivô">Pivô (Referência e Finalização)</option>
                <option value="Fixador / Fecho">Fixador / Fecho (Organização e Defesa)</option>
                <option value="Guarda-Redes">Guarda-Redes (Goleiro com os Pés)</option>
                <option value="Explorador">Explorador (Iniciação 2 a 5 anos)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow"
            >
              Criar Ficha do Atleta
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
