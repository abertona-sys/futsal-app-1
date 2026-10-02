import React from 'react';
import { X, CheckCircle, AlertTriangle, Cpu, Database, Server, Smartphone, Cloud, ArrowRight } from 'lucide-react';

interface ArchitectureExplainerModalProps {
  onClose: () => void;
}

export const ArchitectureExplainerModal: React.FC<ArchitectureExplainerModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              📐
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Parecer Técnico, Viabilidade de Vestíveis & Arquitetura Escalável
              </h2>
              <p className="text-xs text-slate-400">
                Análise aprofundada para o seu modelo de assinatura e retenção contínua
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed flex-1">
          {/* Section 1: Análise do Produto */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>💡 O Que Acho da Ideia? (Potencial de Assinatura)</span>
            </h3>
            <p>
              A ideia é <strong className="text-white">excelente e com altíssimo potencial de retenção (LTV)</strong>.
              Produtos digitais estáticos (e-books, PDFs) sofrem com taxa de abandono de 80% após a compra.
              Transformar os e-books em uma <strong className="text-white">experiência interativa de jogo em família</strong> com cronômetro, apito, semáforo de 4 pilares, retos semanais e vestíveis cria o chamado <em>"hábito semanal compartilhado"</em>. Pais não cancelam assinaturas que colocam seus filhos para praticar esportes com alegria e sem telas passivas.
            </p>
          </div>

          {/* Section 2: Viabilidade de Vestíveis */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Integração com Vestíveis: O Que É Possível vs O Que NÃO É no Navegador</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* O que SIM é possível */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-2">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <CheckCircle className="w-4 h-4" />
                  <span>O Que SIM É Possível (Totalmente Funcional na Web):</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                  <li>
                    <strong className="text-white">Web Bluetooth API (BLE):</strong> Permite conectar diretamente fitas cardíacas e relógios (Polar, Garmin HRM, Wahoo) que transmitem o serviço padrão Bluetooth GATT <code>0x180D</code> (Heart Rate). Funciona em Chrome/Edge no Android, Mac, Windows e Linux.
                  </li>
                  <li>
                    <strong className="text-white">Web DeviceMotion API:</strong> Usa o acelerômetro e giroscópio do próprio smartphone (no bolso ou braçadeira esportiva) para medir passos, saltos, cadência e gasto calórico em tempo real sem precisar de relógio extra.
                  </li>
                  <li>
                    <strong className="text-white">Áudio & Voz em Tempo Real:</strong> Sintetizador de apitos de arbitragem via Web Audio API e comandos de voz narrados pelo celular do treinador.
                  </li>
                </ul>
              </div>

              {/* O que NÃO é possível diretamente */}
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-2">
                <div className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>O Que NÃO É Possível Diretamente na Web:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                  <li>
                    <strong className="text-white">Safari no iPhone (iOS):</strong> A Apple ainda bloqueia a <em>Web Bluetooth API</em> nativa no Safari Mobile por política interna. No iPhone, usa-se navegadores dedicados (como Bluefy) ou o sensor de movimento do celular / wrapper PWA nativo (Capacitor/Cordova).
                  </li>
                  <li>
                    <strong className="text-white">Apple Watch Privado:</strong> O Apple Watch não expõe Bluetooth aberto para páginas web a menos que esteja rodando um app transmissor Bluetooth (HeartCast) ou sincronize dados via Apple HealthKit (que requer app nativo ou sincronização em nuvem).
                  </li>
                  <li>
                    <strong className="text-white">Garmin Connect Cloud:</strong> A sincronização direta com a nuvem da Garmin exige autenticação OAuth 2.0 e aprovação de API de parceiro corporativo.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Arquitetura para Escalar */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <span>Arquitetura de Dados Recomendada para Alta Escala</span>
            </h3>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs mb-1">1. Local-First / PWA</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Quadras e ginásios frequentemente têm Wi-Fi instável ou 4G fraco. A base inteira de treinos, áudios e semáforos deve rodar offline via IndexedDB/PWA.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs mb-1">2. Event Sourcing de Telemetria</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Não envie 1 pulso de BPM por segundo ao servidor. Agregue em blocos de 5s no dispositivo e sincronize apenas resumos da sessão ao final do treino.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs mb-1">3. Multi-Tenant Familiar</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Estrutura hierarchical em banco de dados: <code>FamilyAccount</code> ➔ <code>Players (até 5)</code> ➔ <code>TrainingSessions</code> ➔ <code>Semaphores & Badges</code>.
                  </p>
                </div>
              </div>

              {/* Recommended Stack diagram */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] space-y-1 font-mono">
                <div className="text-amber-400 font-bold font-sans">Stack de Produção Recomendada:</div>
                <div className="text-slate-300">
                  • <strong className="text-white">Frontend:</strong> React + Vite + Tailwind CSS + PWA Service Worker (Instalável no celular)
                </div>
                <div className="text-slate-300">
                  • <strong className="text-white">Banco de Dados:</strong> Cloud SQL PostgreSQL ou Firebase Firestore (para sync em tempo real)
                </div>
                <div className="text-slate-300">
                  • <strong className="text-white">Assinaturas:</strong> Stripe Billing / Mercado Pago Recorrente (com webhooks de ativação)
                </div>
                <div className="text-slate-300">
                  • <strong className="text-white">Mobile Híbrido:</strong> Capacitor.js para empacotar em APK Android e App iOS na App Store com 1 único código.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
          >
            Entendido! Continuar no App
          </button>
        </div>
      </div>
    </div>
  );
};
