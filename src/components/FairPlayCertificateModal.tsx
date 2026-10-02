import React, { useState } from 'react';
import { Player } from '../types/futsal';
import { X, Printer, Award, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FairPlayCertificateModalProps {
  players: Player[];
  activePlayerId: string;
  onClose: () => void;
}

export const FairPlayCertificateModal: React.FC<FairPlayCertificateModalProps> = ({
  players,
  activePlayerId,
  onClose
}) => {
  const activePlayer = players.find((p) => p.id === activePlayerId) || players[0];

  const [childName, setChildName] = useState(activePlayer.name);
  const [activity, setActivity] = useState('Treino de Futsal em Família');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [respect, setRespect] = useState(true);
  const [effort, setEffort] = useState(true);
  const [honesty, setHonesty] = useState(true);
  const [cooperation, setCooperation] = useState(true);
  const [justification, setJustification] = useState(
    'Ajudou o parceiro a levantar-se, escutou o apito com atenção e comemorou com respeito.'
  );
  const [guardianName, setGuardianName] = useState('Treinador / Pai Alberto');

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📜</span>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Certificado Oficial de Mérito e Jogo Limpo
              </h3>
              <p className="text-[11px] text-slate-400">
                Bonus 4 · Reconhece carácter, respeito e fair play da criança
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Edit controls (hidden on print) */}
        <div className="p-4 bg-slate-950/50 border-b border-slate-800 space-y-3 text-xs no-print">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Nome do Jogador
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Atividade
              </label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Justificativa (O que observaste em campo)
            </label>
            <input
              type="text"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
            />
          </div>
        </div>

        {/* CERTIFICATE CANVAS (Printable layout matching Bonus 4 page 16) */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 flex justify-center bg-slate-950">
          <div className="w-full max-w-2xl bg-amber-50 text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border-8 border-slate-900 relative print:p-8 print:border-4 print:shadow-none print:w-full print:max-w-none">
            {/* Header branding */}
            <div className="text-center space-y-1 pb-4 border-b-2 border-slate-300">
              <div className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                TREINOS DE FUTSAL INFANTIL · BÓNUS 4
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                CERTIFICADO
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
                Mérito e Jogo Limpo
              </h1>
              <p className="text-xs text-slate-700 pt-1">
                Reconhecemos a participação e o compromisso ético de:
              </p>
            </div>

            {/* Child Name */}
            <div className="text-center py-6">
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-8">
                {childName || 'Nome do Jogador'}
              </div>
              <div className="text-xs text-slate-600 mt-3">
                Atividade: <span className="font-semibold text-slate-900">{activity}</span> · Data:{' '}
                <span className="font-semibold text-slate-900">{date}</span>
              </div>
            </div>

            {/* Atitudes demonstradas */}
            <div className="my-4 p-4 bg-white/70 rounded-xl border border-slate-200">
              <div className="text-xs font-bold text-slate-800 text-center mb-3">
                Pela demonstração de atitudes que constroem um futsal melhor para todos:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-900 justify-items-center">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={respect}
                    onChange={(e) => setRespect(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>🤝 Respeito</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={effort}
                    onChange={(e) => setEffort(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>💪 Esforço</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={honesty}
                    onChange={(e) => setHonesty(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>⚖️ Honestidade</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cooperation}
                    onChange={(e) => setCooperation(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <span>⚽ Cooperação</span>
                </label>
              </div>
            </div>

            {/* Justification note */}
            <div className="my-5 text-center">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                O que foi observado em campo:
              </div>
              <p className="text-xs text-slate-800 italic bg-white/40 p-3 rounded-lg border border-slate-200">
                “{justification}”
              </p>
            </div>

            {/* Official Oath */}
            <div className="text-center my-6 py-2 border-y border-dashed border-slate-300">
              <p className="text-xs font-semibold text-slate-700 italic">
                “Prometo jogar com respeito, dar o meu melhor, ser honesto e cooperar com a equipa.”
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-4 text-center text-xs">
              <div className="border-t border-slate-400 pt-1.5">
                <div className="font-bold text-slate-900">{childName}</div>
                <div className="text-[10px] text-slate-500">Assinatura do Jogador</div>
              </div>
              <div className="border-t border-slate-400 pt-1.5">
                <div className="font-bold text-slate-900">{guardianName}</div>
                <div className="text-[10px] text-slate-500">Treinador / Pai / Mãe ou Educador</div>
              </div>
            </div>

            {/* Official Footer Motto */}
            <div className="mt-8 pt-3 text-center border-t-2 border-slate-300 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              O MAIOR TROFÉU É APRENDER A JOGAR LIMPO, MESMO QUANDO O RESULTADO NÃO VEM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
