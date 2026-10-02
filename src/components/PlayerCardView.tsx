import React, { useState } from 'react';
import { Player, PillarCategory, SemaphoreStatus } from '../types/futsal';
import { EditPlayerModal } from './EditPlayerModal';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Plus,
  CircleDot,
  Check,
  Zap,
  Target,
  Edit3,
  Camera
} from 'lucide-react';

interface PlayerCardViewProps {
  player: Player;
  onUpdatePlayer: (updated: Player) => void;
  onAddNewGoal: (playerId: string, goal: { type: 'corpo' | 'mente' | 'jogo'; title: string; description: string }) => void;
  onDeletePlayer?: (playerId: string) => void;
}

export const PlayerCardView: React.FC<PlayerCardViewProps> = ({
  player,
  onUpdatePlayer,
  onAddNewGoal,
  onDeletePlayer
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'semaforo' | 'metas'>('perfil');
  const [selectedPillar, setSelectedPillar] = useState<PillarCategory | 'todos'>('todos');
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [newGoalType, setNewGoalType] = useState<'corpo' | 'mente' | 'jogo'>('corpo');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');

  // Update semaphore status of an indicator
  const handleToggleSemaphore = (skillId: string, current: SemaphoreStatus) => {
    const nextStatus: SemaphoreStatus =
      current === 'dominio'
        ? 'desenvolvimento'
        : current === 'desenvolvimento'
        ? 'nao_trabalhado'
        : 'dominio';

    const updatedSkills = player.skills.map((s) =>
      s.id === skillId ? { ...s, status: nextStatus, lastUpdated: new Date().toISOString() } : s
    );

    onUpdatePlayer({
      ...player,
      skills: updatedSkills
    });
  };

  const handleToggleGoal = (goalId: string) => {
    const updatedGoals = player.goals.map((g) =>
      g.id === goalId ? { ...g, completed: !g.completed } : g
    );
    onUpdatePlayer({
      ...player,
      goals: updatedGoals
    });
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim() || !newGoalDesc.trim()) return;

    onAddNewGoal(player.id, {
      type: newGoalType,
      title: newGoalTitle.trim(),
      description: newGoalDesc.trim()
    });

    setNewGoalTitle('');
    setNewGoalDesc('');
    setIsGoalFormOpen(false);
  };

  // Filter skills
  const filteredSkills =
    selectedPillar === 'todos'
      ? player.skills
      : player.skills.filter((s) => s.pillar === selectedPillar);

  // Semaphore counts
  const countDominio = player.skills.filter((s) => s.status === 'dominio').length;
  const countDev = player.skills.filter((s) => s.status === 'desenvolvimento').length;
  const countNao = player.skills.filter((s) => s.status === 'nao_trabalhado').length;

  return (
    <div className="space-y-6">
      {/* Tab bar & Edit button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 max-w-md">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'perfil'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ficha do Jogador
          </button>
          <button
            onClick={() => setActiveTab('semaforo')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'semaforo'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semáforo dos 4 Pilares
          </button>
          <button
            onClick={() => setActiveTab('metas')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'metas'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metas Trimestrais ({player.goals.filter((g) => g.completed).length}/{player.goals.length})
          </button>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 transition-all shadow active:scale-95"
        >
          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Editar Foto & Dados</span>
        </button>
      </div>

      {/* TAB 1: PERFIL & FUT CARD */}
      {activeTab === 'perfil' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Futsal Player Card (Card design) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-xs p-5 rounded-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-2 border-amber-400/60 shadow-2xl relative overflow-hidden group">
              {/* Gold Glare background overlay */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className="text-4xl font-extrabold font-display text-amber-400 leading-none">
                    {Math.round(
                      (player.stats.control +
                        player.stats.precision +
                        player.stats.velocity +
                        player.stats.decision +
                        player.stats.teamwork +
                        player.stats.resilience) /
                        6
                    )}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    {player.role.toUpperCase()}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    Nº {player.jerseyNumber}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{player.age} Anos · {player.dominantFoot}</div>
                </div>
              </div>

              {/* Avatar / Real Photo Display */}
              <div className="my-4 text-center relative">
                <div
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-28 h-28 mx-auto rounded-2xl overflow-hidden bg-gradient-to-tr from-amber-500/20 to-sky-500/20 border-2 border-amber-400/70 flex items-center justify-center text-5xl shadow-xl cursor-pointer relative group/photo"
                  title="Clique para editar foto do atleta"
                >
                  {player.photoUrl ? (
                    <img
                      src={player.photoUrl}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{player.avatar}</span>
                  )}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <Camera className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <div className="mt-2 text-lg font-extrabold text-white font-display tracking-tight">
                  {player.name}
                </div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{player.level}</span>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-xs font-mono relative z-10">
                <div className="flex justify-between p-1.5 bg-slate-950/60 rounded-lg">
                  <span className="text-slate-400">CTR (Controlo)</span>
                  <span className="font-bold text-white">{player.stats.control}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-950/60 rounded-lg">
                  <span className="text-slate-400">PRC (Precisão)</span>
                  <span className="font-bold text-white">{player.stats.precision}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-950/60 rounded-lg">
                  <span className="text-slate-400">VEL (Velocidade)</span>
                  <span className="font-bold text-white">{player.stats.velocity}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-950/60 rounded-lg">
                  <span className="text-slate-400">DEC (Decisão)</span>
                  <span className="font-bold text-white">{player.stats.decision}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-950/60 rounded-lg">
                  <span className="text-slate-400">EQU (Equipa)</span>
                  <span className="font-bold text-white">{player.stats.teamwork}</span>
                </div>
                <div className="flex justify-between p-1.5 bg-slate-950/60 rounded-lg">
                  <span className="text-slate-400">RES (Resiliência)</span>
                  <span className="font-bold text-white">{player.stats.resilience}</span>
                </div>
              </div>

              {/* Badges footer */}
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                {player.badges.slice(0, 3).map((b, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats & Training Summary */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pontos Futsal</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {player.totalPoints} <span className="text-xs text-slate-400 font-normal">pts</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tempo de Treino</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {player.trainingMinutes} <span className="text-xs text-slate-400 font-normal">min</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  <span>Sequência Ativa</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {player.streakDays} <span className="text-xs text-slate-400 font-normal">dias</span>
                </div>
              </div>
            </div>

            {/* Semaphore Quick Overview */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Status no Semáforo de Evolução</h4>
                <button
                  onClick={() => setActiveTab('semaforo')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  Ver Todos os Indicadores →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                  <div className="text-xs font-bold text-emerald-400">Domínio</div>
                  <div className="text-2xl font-black font-mono text-white mt-0.5">{countDominio}</div>
                  <div className="text-[10px] text-slate-400">Ações estáveis</div>
                </div>
                <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl">
                  <div className="text-xs font-bold text-amber-400">Em Evolução</div>
                  <div className="text-2xl font-black font-mono text-white mt-0.5">{countDev}</div>
                  <div className="text-[10px] text-slate-400">Frequência crescente</div>
                </div>
                <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl">
                  <div className="text-xs font-bold text-slate-400">A Trabalhar</div>
                  <div className="text-2xl font-black font-mono text-white mt-0.5">{countNao}</div>
                  <div className="text-[10px] text-slate-400">Próximos treinos</div>
                </div>
              </div>
            </div>

            {/* Coach Note: Philosophy from Bonus 3 */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-300">Regra de ouro do acompanhamento: </span>
              “Compara evolução com evolução: o que esta criança faz hoje, em relação ao que fazia nas últimas semanas. A criança não precisa de vencer toda a gente; precisa de sentir que consegue melhorar.”
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SEMÁFORO DOS 4 PILARES */}
      {activeTab === 'semaforo' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">Mapa de Evolução Natural (4 Pilares)</h3>
              <p className="text-xs text-slate-400">
                Toque no semáforo para alternar: 🟢 Domínio | 🟡 Em Desenvolvimento | ⚪ A Trabalhar
              </p>
            </div>

            {/* Pillar Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedPillar('todos')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedPillar === 'todos' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos ({player.skills.length})
              </button>
              <button
                onClick={() => setSelectedPillar('motor')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedPillar === 'motor' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Motor
              </button>
              <button
                onClick={() => setSelectedPillar('tecnico')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedPillar === 'tecnico' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Técnico
              </button>
              <button
                onClick={() => setSelectedPillar('tatico')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedPillar === 'tatico' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tático & Espaço
              </button>
              <button
                onClick={() => setSelectedPillar('socioemocional')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  selectedPillar === 'socioemocional' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Socioemocional
              </button>
            </div>
          </div>

          {/* Indicator Rows */}
          <div className="space-y-2">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                      · {skill.pillar}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{skill.description}</p>
                </div>

                {/* Interactive Semaphore Switcher */}
                <button
                  onClick={() => handleToggleSemaphore(skill.id, skill.status)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all active:scale-95 shrink-0 ${
                    skill.status === 'dominio'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                      : skill.status === 'desenvolvimento'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      skill.status === 'dominio'
                        ? 'bg-emerald-400 shadow-sm shadow-emerald-400'
                        : skill.status === 'desenvolvimento'
                        ? 'bg-amber-400 shadow-sm shadow-amber-400'
                        : 'bg-slate-500'
                    }`}
                  ></span>
                  <span>
                    {skill.status === 'dominio'
                      ? 'Domínio'
                      : skill.status === 'desenvolvimento'
                      ? 'Em Evolução'
                      : 'A Trabalhar'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: METAS TRIMESTRAIS (CORPO, MENTE, JOGO) */}
      {activeTab === 'metas' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Metas Trimestrais Motivacionais</h3>
              <p className="text-xs text-slate-400">
                Alinhamento entre Família + Treinador + Criança: 1 do corpo, 1 da mente e 1 do jogo.
              </p>
            </div>

            <button
              onClick={() => setIsGoalFormOpen(true)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Meta</span>
            </button>
          </div>

          {/* Form to add a goal */}
          {isGoalFormOpen && (
            <form
              onSubmit={handleCreateGoal}
              className="p-4 bg-slate-900 border border-amber-400/40 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Cadastrar Nova Meta Trimestral</span>
                <button
                  type="button"
                  onClick={() => setIsGoalFormOpen(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setNewGoalType('corpo')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                    newGoalType === 'corpo'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Meta do Corpo (Habilidade)
                </button>
                <button
                  type="button"
                  onClick={() => setNewGoalType('mente')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                    newGoalType === 'mente'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Meta da Mente (Atenção/Atitude)
                </button>
                <button
                  type="button"
                  onClick={() => setNewGoalType('jogo')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                    newGoalType === 'jogo'
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Meta do Jogo (Decisão)
                </button>
              </div>

              <input
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="Título curto (Ex: Domínio de sola nos 5 cones)"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                required
              />

              <textarea
                value={newGoalDesc}
                onChange={(e) => setNewGoalDesc(e.target.value)}
                placeholder="O que a criança vai tentar fazer (Ex: Quero melhorar o meu controlo e recepção, tentando sem pressa)."
                rows={2}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
              >
                Salvar Meta
              </button>
            </form>
          )}

          {/* Goals List */}
          <div className="space-y-3">
            {player.goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleToggleGoal(goal.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  goal.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 shrink-0 ${
                    goal.completed
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'border-2 border-slate-600 bg-slate-950'
                  }`}
                >
                  {goal.completed && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        goal.type === 'corpo'
                          ? 'bg-sky-500/20 text-sky-300'
                          : goal.type === 'mente'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {goal.type === 'corpo'
                        ? 'Corpo'
                        : goal.type === 'mente'
                        ? 'Mente'
                        : 'Jogo'}
                    </span>
                    <h4
                      className={`text-xs font-bold ${
                        goal.completed ? 'text-slate-400 line-through' : 'text-white'
                      }`}
                    >
                      {goal.title}
                    </h4>
                  </div>
                  <p
                    className={`text-xs ${
                      goal.completed ? 'text-slate-500 line-through' : 'text-slate-300'
                    }`}
                  >
                    {goal.description}
                  </p>
                  <div className="text-[10px] text-slate-500 pt-1">
                    Meta para: {goal.targetDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Player Modal */}
      {isEditModalOpen && (
        <EditPlayerModal
          player={player}
          onSave={onUpdatePlayer}
          onDelete={onDeletePlayer}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};
