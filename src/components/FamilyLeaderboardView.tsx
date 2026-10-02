import React, { useState } from 'react';
import { Player, TrainingLog } from '../types/futsal';
import {
  Trophy,
  Flame,
  Clock,
  Printer,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface FamilyLeaderboardViewProps {
  players: Player[];
  trainingLogs: TrainingLog[];
  onOpenCertificateModal: () => void;
}

export const FamilyLeaderboardView: React.FC<FamilyLeaderboardViewProps> = ({
  players,
  trainingLogs,
  onOpenCertificateModal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tabela' | 'diario'>('tabela');

  // Sort players by totalPoints
  const sortedPlayers = [...players].sort((a, b) => b.totalPoints - a.totalPoints);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('tabela')}
            className={`py-2 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'tabela'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Classificação Familiar
          </button>
          <button
            onClick={() => setActiveSubTab('diario')}
            className={`py-2 px-4 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'diario'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diário Mensal do Pequeno Atleta
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCertificateModal}
            className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs rounded-xl border border-emerald-500/40 flex items-center gap-1.5 transition-all"
          >
            <span>📜 Emitir Certificado Fair Play</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors"
            title="Imprimir relatório"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CLASSIFICAÇÃO FAMILIAR */}
      {activeSubTab === 'tabela' && (
        <div className="space-y-6">
          {/* Podium Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
            {/* 2nd Place */}
            {sortedPlayers[1] && (
              <div className="order-2 md:order-1 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 relative">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-400 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-slate-900 shadow">
                  2
                </span>
                <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-4xl shadow mt-1">
                  {sortedPlayers[1].photoUrl ? (
                    <img src={sortedPlayers[1].photoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{sortedPlayers[1].avatar}</span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white">{sortedPlayers[1].name}</h3>
                <div className="text-[11px] text-slate-400">{sortedPlayers[1].role} · {sortedPlayers[1].age} anos</div>
                <div className="text-xl font-black font-mono text-slate-200">
                  {sortedPlayers[1].totalPoints} <span className="text-xs font-normal text-slate-400">pts</span>
                </div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-red-400" />
                  <span>{sortedPlayers[1].streakDays} dias seguidos</span>
                </div>
              </div>
            )}

            {/* 1st Place (Champion) */}
            {sortedPlayers[0] && (
              <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 border-2 border-amber-400 text-center space-y-2 relative shadow-xl shadow-amber-500/10 scale-105">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center border-2 border-slate-900 shadow-md">
                  👑 1
                </span>
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-slate-800 border-2 border-amber-400 flex items-center justify-center text-5xl shadow-xl mt-2">
                  {sortedPlayers[0].photoUrl ? (
                    <img src={sortedPlayers[0].photoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{sortedPlayers[0].avatar}</span>
                  )}
                </div>
                <h3 className="text-base font-extrabold text-white font-display">{sortedPlayers[0].name}</h3>
                <div className="text-xs font-semibold text-amber-300">{sortedPlayers[0].level}</div>
                <div className="text-3xl font-black font-mono text-amber-400">
                  {sortedPlayers[0].totalPoints} <span className="text-xs font-normal text-slate-400">pts</span>
                </div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{sortedPlayers[0].trainingMinutes} min de treino</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {sortedPlayers[2] && (
              <div className="order-3 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2 relative">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center border-2 border-slate-900 shadow">
                  3
                </span>
                <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-slate-800 border-2 border-amber-800 flex items-center justify-center text-4xl shadow mt-1">
                  {sortedPlayers[2].photoUrl ? (
                    <img src={sortedPlayers[2].photoUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{sortedPlayers[2].avatar}</span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white">{sortedPlayers[2].name}</h3>
                <div className="text-[11px] text-slate-400">{sortedPlayers[2].role} · {sortedPlayers[2].age} anos</div>
                <div className="text-xl font-black font-mono text-slate-200">
                  {sortedPlayers[2].totalPoints} <span className="text-xs font-normal text-slate-400">pts</span>
                </div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-red-400" />
                  <span>{sortedPlayers[2].streakDays} dias seguidos</span>
                </div>
              </div>
            )}
          </div>

          {/* Full Family Standings Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Quadro de Honra da Família</span>
              </h3>
              <span className="text-xs text-slate-400">
                Pontuação cumulativa por dedicação, treinos e fair play
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Pos</th>
                    <th className="py-3 px-4">Atleta</th>
                    <th className="py-3 px-4">Função / Idade</th>
                    <th className="py-3 px-4 text-right">Treinos (min)</th>
                    <th className="py-3 px-4 text-right">Sequência</th>
                    <th className="py-3 px-4 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {sortedPlayers.map((player, idx) => (
                    <tr key={player.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-300">#{idx + 1}</td>
                      <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                        {player.photoUrl ? (
                          <img src={player.photoUrl} alt="" className="w-6 h-6 rounded-lg object-cover border border-slate-700" />
                        ) : (
                          <span className="text-lg">{player.avatar}</span>
                        )}
                        <span>{player.name}</span>
                      </td>
                      <td className="py-3 px-4 font-sans text-slate-400">
                        {player.role} · {player.age} anos
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300 tabular-nums">
                        {player.trainingMinutes} min
                      </td>
                      <td className="py-3 px-4 text-right text-amber-400 font-semibold tabular-nums">
                        🔥 {player.streakDays} dias
                      </td>
                      <td className="py-3 px-4 text-right font-black text-amber-400 text-sm tabular-nums">
                        {player.totalPoints} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Training Logs */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Histórico de Treinos Recentes</span>
            </h3>

            {trainingLogs.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">Nenhum treino registrado ainda. Inicie um treino interativo acima!</p>
            ) : (
              <div className="space-y-2">
                {trainingLogs.slice(0, 5).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{log.drillTitle}</span>
                        <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          +{log.score} pts
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Atleta: <span className="text-slate-200">{log.playerName}</span> ·{' '}
                        {log.smallVictory}
                      </div>
                      {log.coachNote && (
                        <div className="text-[11px] text-emerald-400 italic mt-1">
                          “{log.coachNote}”
                        </div>
                      )}
                    </div>

                    <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                      <div>{log.date}</div>
                      <div className="text-emerald-400 font-bold">{log.avgHeartRate} bpm · {log.caloriesBurned} kcal</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: O DIÁRIO DO PEQUENO ATLETA (FROM BONUS 3) */}
      {activeSubTab === 'diario' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Capítulo 5 · Ficha Mensal Pronta a Colar no Quarto
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  Diário do Pequeno Atleta · Mês em Curso
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Acompanha 4 a 6 oportunidades de treino, registra o semáforo e bilhetes carinhosos.
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ficha Mensal</span>
              </button>
            </div>

            {/* Instruction Banner from Bonus 3 */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="font-bold text-white">Instruções de Preenchimento:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-emerald-950/30 border border-emerald-500/20 rounded-lg">
                  <span className="font-bold text-emerald-400">🟢 Verde: </span>
                  Faz com segurança, sem travar, mantendo a intenção de jogar.
                </div>
                <div className="p-2 bg-amber-950/30 border border-amber-500/20 rounded-lg">
                  <span className="font-bold text-amber-400">🟡 Amarelo: </span>
                  Tenta e melhora, mas precisa de repetição guiada e calma.
                </div>
                <div className="p-2 bg-slate-800/40 border border-slate-700/40 rounded-lg">
                  <span className="font-bold text-slate-400">⚪ Cinzento: </span>
                  Ainda não trabalhado; combina um foco simples nos próximos treinos.
                </div>
              </div>
            </div>

            {/* Monthly Table Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3 border border-slate-800">Foco do Treino</th>
                    <th className="p-3 text-center border border-slate-800">Dia 1</th>
                    <th className="p-3 text-center border border-slate-800">Dia 2</th>
                    <th className="p-3 text-center border border-slate-800">Dia 3</th>
                    <th className="p-3 text-center border border-slate-800">Dia 4</th>
                    <th className="p-3 text-center border border-slate-800">Dia 5</th>
                    <th className="p-3 text-center border border-slate-800">Dia 6</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { label: 'Passe (interior do pé)', d: ['🟢', '🟡', '🟢', '🟢', '🟢', '🟢'] },
                    { label: 'Recepção amortecida', d: ['🟡', '🟡', '🟢', '🟢', '🟢', '🟢'] },
                    { label: 'Cabeça levantada antes do passe', d: ['⚪', '🟡', '🟡', '🟢', '🟢', '🟢'] },
                    { label: 'Uso dos dois pés (pé fraco)', d: ['⚪', '⚪', '🟡', '🟡', '🟢', '🟢'] },
                    { label: 'Atitude em campo & Fair Play', d: ['🟢', '🟢', '🟢', '🟢', '🟢', '🟢'] }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3 font-semibold text-white border border-slate-800 bg-slate-950/40">
                        {row.label}
                      </td>
                      {row.d.map((val, dIdx) => (
                        <td key={dIdx} className="p-3 text-center border border-slate-800 text-sm">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Espaço de comentários carinhosos de pais e treinador */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Modelos de Comentários Carinhosos (Processo vs Cobrança)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  “Tentaste de novo mesmo quando erraste. Isso é coragem de jogador.”
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  “Hoje o teu passe ficou mais firme e chegou melhor ao colega.”
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  “Boa recepção! Controlaste a bola em vez de correr atrás dela.”
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  “Gostei quando olhaste antes de decidir. Assim o jogo fica mais fácil.”
                </div>
              </div>
            </div>

            {/* Small Victory of the Month */}
            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-400/30 rounded-2xl space-y-1">
              <div className="text-xs font-bold text-amber-300">A Pequena Vitória deste Mês:</div>
              <p className="text-xs text-white italic">
                “Acertou um passe de interior com intenção e respondeu ao erro com uma nova tentativa imediata, sem desistir nem chorar.”
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
