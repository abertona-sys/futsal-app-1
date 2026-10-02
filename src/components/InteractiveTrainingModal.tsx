import React, { useState, useEffect } from 'react';
import { Drill, Player, WearableTelemetry } from '../types/futsal';
import { TacticalPitchView } from './TacticalPitchView';
import { soundEffects } from '../services/soundEffects';
import { wearableService } from '../services/wearableService';
import confetti from 'canvas-confetti';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Trophy,
  CheckCircle2,
  Heart,
  Activity,
  Flame,
  Plus,
  Minus,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InteractiveTrainingModalProps {
  drill: Drill;
  players: Player[];
  activePlayerId: string;
  onSelectPlayer: (id: string) => void;
  onFinishSession: (logData: {
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
  }) => void;
  onClose: () => void;
  onOpenWearables: () => void;
}

export const InteractiveTrainingModal: React.FC<InteractiveTrainingModalProps> = ({
  drill,
  players,
  activePlayerId,
  onSelectPlayer,
  onFinishSession,
  onClose,
  onOpenWearables
}) => {
  const [selectedRound, setSelectedRound] = useState<'round1' | 'round2' | 'round3'>('round2');
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [initialDuration] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [smallVictory, setSmallVictory] = useState('');
  const [coachNote, setCoachNote] = useState('');
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  // Wearable telemetry
  const [telemetry, setTelemetry] = useState<WearableTelemetry>(wearableService.getTelemetry());

  useEffect(() => {
    const unsubscribe = wearableService.subscribe((data) => {
      setTelemetry(data);
    });
    return () => unsubscribe();
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 4 && prev > 1) {
            soundEffects.playCountdownBeep(false);
          } else if (prev === 1) {
            soundEffects.playCountdownBeep(true);
          }
          if (prev <= 1) {
            setIsRunning(false);
            wearableService.stopWorkout();
            soundEffects.playDoubleWhistle();
            soundEffects.speak('Tempo esgotado! Excelente treino!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
      wearableService.stopWorkout();
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const handleStartTimer = () => {
    setIsRunning(true);
    soundEffects.playWhistle(true);
    wearableService.startWorkout(selectedRound === 'round3' ? 2.5 : selectedRound === 'round2' ? 1.8 : 1.2);
    soundEffects.speak(`Atenção ${currentPlayer?.name || ''}... Preparar... Já!`);
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
    wearableService.stopWorkout();
    soundEffects.playWhistle(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(initialDuration);
    wearableService.stopWorkout();
  };

  const handleAddScore = (delta: number) => {
    setScore((prev) => {
      const next = Math.max(0, prev + delta);
      if (delta > 0) {
        soundEffects.playSuccessChime();
      }
      return next;
    });
  };

  const toggleChecklist = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleCompleteWorkout = () => {
    setIsRunning(false);
    wearableService.stopWorkout();
    soundEffects.playSuccessChime();
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 }
    });
    setIsCompletedModalOpen(true);
  };

  const handleFinalSave = () => {
    onFinishSession({
      drillId: drill.id,
      drillTitle: drill.title,
      playerId: activePlayerId,
      durationSeconds: initialDuration - timerSeconds > 0 ? initialDuration - timerSeconds : 30,
      score,
      roundPlayed: selectedRound,
      avgHeartRate: telemetry.heartRate,
      caloriesBurned: Math.round(telemetry.activeCalories) || 12,
      checklistResults: checkedItems,
      smallVictory: smallVictory.trim() || 'Completou a ronda com dedicação e alegria.',
      coachNote: coachNote.trim()
    });
    onClose();
  };

  const currentPlayer = players.find((p) => p.id === activePlayerId) || players[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow">
              #{drill.number}
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {drill.title}
                <span className="text-xs font-medium text-emerald-400">({drill.ageGroup} anos)</span>
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{drill.category}</span>
                <span>·</span>
                <span>{drill.duration}</span>
                <span>·</span>
                <span>{drill.space}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Active Player Picker */}
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              {currentPlayer.photoUrl ? (
                <img
                  src={currentPlayer.photoUrl}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover border border-amber-400"
                />
              ) : (
                <span className="text-sm">{currentPlayer.avatar}</span>
              )}
              <select
                value={activePlayerId}
                onChange={(e) => onSelectPlayer(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                {players.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {p.name} ({p.role})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Wearable Telemetry Strip */}
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart
                className={`w-4 h-4 text-red-500 ${isRunning ? 'animate-heart-pulse' : ''}`}
              />
              <span className="font-mono font-bold text-white text-sm tabular-nums">
                {telemetry.heartRate} <span className="text-[10px] text-slate-400 font-normal">BPM</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: telemetry.zoneColor }}
              ></span>
              <span className="font-semibold text-slate-200">
                {telemetry.currentZone}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{Math.round(telemetry.activeCalories)} kcal</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>{telemetry.cadenceRpm} rpm</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 truncate max-w-[140px] sm:max-w-xs">
              {telemetry.isConnected ? `Conectado: ${telemetry.deviceName}` : 'Vestível offline'}
            </span>
            <button
              onClick={onOpenWearables}
              className="px-2 py-0.5 text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded border border-amber-400/30 transition-colors"
            >
              Configurar Vestível
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          {/* Round Selector Bar */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedRound('round1')}
              className={`p-2.5 rounded-lg text-left transition-all ${
                selectedRound === 'round1'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="font-bold text-xs">Ronda 1 · Fácil</div>
              <div className="text-[11px] opacity-90 truncate">{drill.rounds.round1.title}</div>
            </button>
            <button
              onClick={() => setSelectedRound('round2')}
              className={`p-2.5 rounded-lg text-left transition-all ${
                selectedRound === 'round2'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="font-bold text-xs">Ronda 2 · Normal</div>
              <div className="text-[11px] opacity-90 truncate">{drill.rounds.round2.title}</div>
            </button>
            <button
              onClick={() => setSelectedRound('round3')}
              className={`p-2.5 rounded-lg text-left transition-all ${
                selectedRound === 'round3'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="font-bold text-xs">Ronda 3 · Desafio</div>
              <div className="text-[11px] opacity-90 truncate">{drill.rounds.round3.title}</div>
            </button>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-400">Instrução da Ronda: </span>
              {drill.rounds[selectedRound].desc}
            </div>
          </div>

          {/* Grid: Tactical Pitch & Stopwatch Scoreboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Tactical Pitch Visualizer */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Croqui do Espaço & Posições</span>
                <span>Toque para inspecionar</span>
              </div>
              <TacticalPitchView markers={drill.markers} interactive={true} />

              {/* Coach Tip Banner */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                <span className="font-bold text-emerald-200">Dica do Treinador: </span>
                {drill.coachTip}
              </div>
            </div>

            {/* Interactive Controller & Scoreboard */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              {/* Timer Display */}
              <div className="text-center py-2">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Cronómetro da Ronda
                </div>
                <div
                  className={`text-5xl font-extrabold font-mono tracking-tight tabular-nums ${
                    timerSeconds <= 5 && timerSeconds > 0
                      ? 'text-red-400 animate-pulse'
                      : 'text-amber-400'
                  }`}
                >
                  00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </div>

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  {!isRunning ? (
                    <button
                      onClick={handleStartTimer}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-sm"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Iniciar Ronda
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseTimer}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      Pausar
                    </button>
                  )}

                  <button
                    onClick={handleResetTimer}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors"
                    title="Reiniciar tempo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Points Scorer */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Pontos Conquistados
                  </span>
                  <span className="text-xs text-slate-400">
                    Regra oficial da ficha
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddScore(-1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-2xl font-black font-mono text-white tabular-nums px-2">
                      {score}
                    </span>
                    <button
                      onClick={() => handleAddScore(1)}
                      className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddScore(2)}
                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-lg border border-emerald-500/40 text-xs flex items-center gap-1"
                  >
                    +2 Bónus!
                  </button>
                </div>
              </div>

              {/* Sound & Audio Cues */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => soundEffects.playWhistle(false)}
                  className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  Apito Árbitro
                </button>

                {drill.magicWords && drill.magicWords.length > 0 && (
                  <button
                    onClick={() => {
                      const phrase = drill.magicWords![Math.floor(Math.random() * drill.magicWords!.length)];
                      soundEffects.speak(phrase.replace(/[“”"]/g, ''));
                    }}
                    className="flex-1 py-1.5 px-2 bg-sky-950/60 hover:bg-sky-900/60 text-sky-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-sky-800"
                  >
                    🗣️ Voz Mágica
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 4 Steps Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Passo a Passo (Ações Diretas sem Teoria)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {drill.steps.map((st) => (
                <div key={st.number} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      {st.number}
                    </span>
                    <span className="text-xs font-bold text-white truncate">{st.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Observation Checklist & Adjustments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Observation checklist */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                O Que Observar Nesta Ronda
              </div>
              <div className="space-y-1.5">
                {drill.observationChecklist.map((obs, idx) => (
                  <label
                    key={idx}
                    onClick={() => toggleChecklist(obs)}
                    className="flex items-center gap-2 text-xs text-slate-300 p-1.5 rounded hover:bg-slate-900 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedItems[obs]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-800 border-slate-700"
                    />
                    <span className={checkedItems[obs] ? 'line-through text-slate-500' : ''}>
                      {obs}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Adjustments: Easy / Hard / No Material */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 text-xs">
              <div className="font-bold text-slate-300">Ajustes Rápidos da Ficha</div>
              <div className="space-y-2">
                <div className="p-2 bg-emerald-950/30 border border-emerald-500/20 rounded-lg">
                  <span className="font-bold text-emerald-400">Mais Fácil: </span>
                  <span className="text-slate-300">{drill.adjustments.easier}</span>
                </div>
                <div className="p-2 bg-purple-950/30 border border-purple-500/20 rounded-lg">
                  <span className="font-bold text-purple-300">Mais Difícil: </span>
                  <span className="text-slate-300">{drill.adjustments.harder}</span>
                </div>
                <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                  <span className="font-bold text-amber-300">Sem Material: </span>
                  <span className="text-slate-300">{drill.adjustments.noMaterial}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400">
            Pontos atuais: <span className="font-bold text-white">{score} pts</span> · Atleta:{' '}
            <span className="font-bold text-amber-400">{currentPlayer.name}</span>
          </div>

          <button
            onClick={handleCompleteWorkout}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <span>Concluir Treino & Salvar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Post-Training Celebration Modal */}
        {isCompletedModalOpen && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-amber-400/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="text-center space-y-1">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-3xl overflow-hidden shadow-lg">
                  {currentPlayer.photoUrl ? (
                    <img src={currentPlayer.photoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>🏆</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">Treino Concluído com Sucesso!</h3>
                <p className="text-xs text-slate-300">
                  Parabéns, <span className="font-semibold text-amber-300">{currentPlayer.name}</span>!
                  Mais um treino registrado no diário familiar.
                </p>
              </div>

              {/* Stats summary */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">Pontos</div>
                  <div className="text-lg font-bold text-amber-400">+{score} pts</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">Freq. Cardíaca</div>
                  <div className="text-lg font-bold text-emerald-400">{telemetry.heartRate} bpm</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">Calorias</div>
                  <div className="text-lg font-bold text-sky-400">{Math.round(telemetry.activeCalories) || 15} kcal</div>
                </div>
              </div>

              {/* Pequena Vitória do Dia (From Bonus 3 PDF) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <span>⭐ Pequena Vitória Deste Treino</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Reconhecer sem comparar)</span>
                </label>
                <input
                  type="text"
                  value={smallVictory}
                  onChange={(e) => setSmallVictory(e.target.value)}
                  placeholder="Ex: Não desistiu ao errar o passe, tentou com o pé esquerdo"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Comentário carinhoso para o diário */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  💬 Comentário Carinhoso do Treinador / Pais
                </label>
                <textarea
                  rows={2}
                  value={coachNote}
                  onChange={(e) => setCoachNote(e.target.value)}
                  placeholder="Ex: Gostei quando olhaste antes de decidir. Assim o jogo fica mais fácil!"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setIsCompletedModalOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Voltar
                </button>
                <button
                  onClick={handleFinalSave}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20"
                >
                  Registrar no Diário
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
