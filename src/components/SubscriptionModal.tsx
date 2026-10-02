import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Users, Heart, Trophy, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubscriptionModalProps {
  isPremium: boolean;
  onUpgrade: () => void;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isPremium,
  onUpgrade,
  onClose
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const handleSubscribe = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onUpgrade();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 border-b border-slate-800 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-[11px] rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Futsal Family Club · Assinatura Premium</span>
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-3">
            O Aplicativo de Futsal que Toda Família Ama
          </h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto mt-2">
            Desbloqueie acesso ilimitado para até 5 membros da família com acompanhamento em tempo real por vestíveis, 200 fichas e desafios semanais.
          </p>

          {/* Billing cycle switch */}
          <div className="mt-5 inline-flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensal ($9.90 / mês)
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-bold transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Anual ($5.80 / mês)
              <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-emerald-500 text-slate-950 rounded-full font-black">
                -41% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { icon: '📚', title: 'Todas as 200 Fichas de Treino', desc: 'Psicomotricidade, Condução, Drible, Tabelas, 2x1, 3x2, 4x4 e Guarda-Redes.' },
              { icon: '⌚', title: 'Integração com Vestíveis em Tempo Real', desc: 'Frequência cardíaca, zonas cardio, passos e calorias em tempo real.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Compartilhamento Familiar Completo', desc: 'Até 5 perfis de jogadores individuais com metas e histórico próprio.' },
              { icon: '🚦', title: 'Semáforo de Evolução dos 4 Pilares', desc: '111 indicadores organizados por idade: motor, técnico, tático e socioemocional.' },
              { icon: '🏆', title: 'Retos Semanais & Classificação', desc: 'Quadro de honra familiar, badges colecionáveis e diário do atleta.' },
              { icon: '📜', title: 'Certificados & Diário Imprimíveis', desc: 'Certificados de Mérito e Fair Play personalizados prontos a imprimir.' }
            ].map((b, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <div className="font-bold text-white">{b.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-slate-950 to-emerald-500/10 rounded-2xl border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-amber-300 font-semibold">
                {billingCycle === 'annual' ? 'Plano Anual Familiar' : 'Plano Mensal Familiar'}
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-white font-mono">
                  {billingCycle === 'annual' ? '$69.90' : '$9.90'}
                </span>
                <span className="text-xs text-slate-400">
                  {billingCycle === 'annual' ? '/ ano (cobrado anualmente)' : '/ mês'}
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>7 dias de teste grátis. Cancele quando quiser.</span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-400/20 active:scale-95 transition-all whitespace-nowrap"
            >
              {isPremium ? '✓ Assinatura Ativa (Plano Família)' : 'Começar 7 Dias Grátis'}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Pagamento 100% Seguro
            </span>
            <span>·</span>
            <span>Acesso Imediato</span>
            <span>·</span>
            <span>Garantia de 30 Dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};
