import React from 'react';
import { WeeklyChallenge } from '../types/futsal';
import confetti from 'canvas-confetti';
import { soundEffects } from '../services/soundEffects';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Plus
} from 'lucide-react';

interface WeeklyChallengesViewProps {
  challenges: WeeklyChallenge[];
  onUpdateChallenge: (id: string, newCount: number) => void;
}

export const WeeklyChallengesView: React.FC<WeeklyChallengesViewProps> = ({
  challenges,
  onUpdateChallenge
}) => {
  const [filter, setFilter] = React.useState<string>('todos');

  const handleIncrement = (ch: WeeklyChallenge) => {
    if (ch.completed) return;
    const next = ch.currentCount + 1;
    onUpdateChallenge(ch.id, next);

    if (next >= ch.targetCount) {
      soundEffects.playSuccessChime();
      soundEffects.speak(`Parabéns! Desafio ${ch.title} concluído em família!`);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const filtered =
    filter === 'todos'
      ? challenges
      : challenges.filter((c) => c.category === filter);

  const completedCount = challenges.filter((c) => c.completed).length;
  const totalXp = challenges
    .filter((c) => c.completed)
    .reduce((acc, c) => acc + c.pointsReward, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/10 border border-amber-400/30 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Temporada Semanal · Semana 40
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
              Retos e Conquistas Familiares
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              Desafios para praticar com a bola e em conjunto durante a semana. Cada meta cumprida desbloqueia insígnias e pontuação na classificação familiar.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
            <div className="text-center">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">Completados</div>
              <div className="text-lg font-black text-amber-400 font-mono">
                {completedCount}/{challenges.length}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">XP da Família</div>
              <div className="text-lg font-black text-emerald-400 font-mono">+{totalXp}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('todos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            filter === 'todos' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Todos os Retos
        </button>
        <button
          onClick={() => setFilter('técnica')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            filter === 'técnica' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          ⚽ Técnica de Bola
        </button>
        <button
          onClick={() => setFilter('família')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            filter === 'família' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          👨‍👩‍👧‍👦 Jogos em Família
        </button>
        <button
          onClick={() => setFilter('fair_play')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            filter === 'fair_play' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          💚 Fair Play & Carácter
        </button>
        <button
          onClick={() => setFilter('cardio')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            filter === 'cardio' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          ⌚ Futsal Cardio
        </button>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ch) => {
          const progressPercent = Math.min(100, Math.round((ch.currentCount / ch.targetCount) * 100));

          return (
            <div
              key={ch.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                ch.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shadow">
                      {ch.badgeIcon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{ch.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="capitalize">{ch.category.replace('_', ' ')}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-amber-300">
                          <Clock className="w-3 h-3" />
                          Restam {ch.daysRemaining} dias
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    +{ch.pointsReward} XP
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{ch.subtitle}</p>
              </div>

              {/* Progress Bar & Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Progresso</span>
                  <span className="font-bold text-white">
                    {ch.currentCount} / {ch.targetCount} {ch.unit} ({progressPercent}%)
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      ch.completed
                        ? 'bg-emerald-400 shadow-sm shadow-emerald-400'
                        : 'bg-gradient-to-r from-amber-500 to-amber-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Insígnia: {ch.badgeName}</span>
                  </div>

                  {!ch.completed ? (
                    <button
                      onClick={() => handleIncrement(ch)}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 transition-all shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Registrar +1</span>
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-lg flex items-center gap-1 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluído!</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
