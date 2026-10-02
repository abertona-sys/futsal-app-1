import React, { useState } from 'react';
import { soundEffects } from '../services/soundEffects';
import {
  Heart,
  Shield,
  Volume2,
  Award,
  Sparkles,
  Users,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface RulesAndFairPlayViewProps {
  onOpenCertificate: () => void;
}

export const RulesAndFairPlayView: React.FC<RulesAndFairPlayViewProps> = ({ onOpenCertificate }) => {
  const [activeTab, setActiveTab] = useState<'mandamentos' | 'regras' | 'emocoes' | 'bancada'>('mandamentos');

  const handleSpeakOath = () => {
    soundEffects.playWhistle(true);
    soundEffects.speak(
      'Juramento do Jogador: Eu respeito meus companheiros, meu adversário e o jogo. Eu faço o meu esforço, mesmo quando é difícil. Eu tenho coragem para errar e aprender com a correção. Eu jogo com disciplina, sem deslealdade. E agradeço no final!'
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-500/20 via-slate-900 to-sky-500/20 border border-emerald-500/30 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Bónus 4 Oficial · Formação de Carácter e Respeito
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
              Guia de Regras Simples e Fair Play Infantil
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              “Regra boa é a que protege, organiza e faz o jogo voltar a ser brincadeira.”
              Valores em ação no mesmo ritmo do treino: em casa, no treino e na bancada.
            </p>
          </div>

          <button
            onClick={onOpenCertificate}
            className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-400/20 transition-all shrink-0 active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>Emitir Certificado</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('mandamentos')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'mandamentos' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Os 7 Mandamentos do Jogo Limpo
        </button>
        <button
          onClick={() => setActiveTab('regras')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'regras' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Regras Explicadas como Brincadeira
        </button>
        <button
          onClick={() => setActiveTab('emocoes')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'emocoes' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Emoções: Raiva, Tristeza e Derrota
        </button>
        <button
          onClick={() => setActiveTab('bancada')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'bancada' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Pais na Bancada (Incentivo Positivo)
        </button>
      </div>

      {/* TAB 1: 7 MANDAMENTOS & JURAMENTO */}
      {activeTab === 'mandamentos' && (
        <div className="space-y-6">
          {/* Juramento Card */}
          <div className="p-6 bg-slate-900 border border-amber-400/40 rounded-3xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">✋</span>
                <h3 className="text-base font-bold text-white font-display">
                  Juramento do Jovem Jogador de Futsal
                </h3>
              </div>
              <button
                onClick={handleSpeakOath}
                className="px-3 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ouvir Juramento</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Façam juntos com a mão no peito antes do treino ou da partida. Não é cobrança, é identidade: <em>“É assim que a gente joga.”</em>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {[
                { n: 1, text: 'Eu respeito meus companheiros, meu adversário e o jogo.' },
                { n: 2, text: 'Eu faço o meu esforço, mesmo quando é difícil.' },
                { n: 3, text: 'Eu tenho coragem para errar e aprender com a correção.' },
                { n: 4, text: 'Eu jogo com disciplina, sem deslealdade e sem magoar.' },
                { n: 5, text: 'Eu tento mais uma vez, comemoro com educação e agradeço.' }
              ].map((j) => (
                <div key={j.n} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center mb-1.5">
                    {j.n}
                  </span>
                  <p className="text-slate-200 leading-snug">{j.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Mandamentos */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              O Código do Jogo Limpo em 7 Mandamentos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { n: 1, title: 'Ajudar quem caiu, sem fazer espetáculo', desc: 'Quando alguém cai, o jogo não vale mais do que o cuidado. Basta um gesto rápido, estender a mão e perguntar se está tudo bem.' },
                { n: 2, title: 'Cumprimentar árbitro e adversários', desc: 'Antes e depois. Olhar nos olhos, acenar e desejar um bom jogo. Respeitamos pessoas, não só o placar.' },
                { n: 3, title: 'Não gozar com os erros', desc: 'Errar faz parte da aprendizagem. Frase padrão do grupo: “Calma, tenta outra vez. Eu estou contigo!”' },
                { n: 4, title: 'Respeitar o apito', desc: 'O apito organiza o jogo. Ao ouvi-lo, todos param a bola, respiram e voltam ao posicionamento combinado.' },
                { n: 5, title: 'Não simular faltas', desc: 'Coragem é jogar a valer. Sem atirar-se ao chão nem fingir dores para levar vantagem.' },
                { n: 6, title: 'Apoiar a equipa no banco de suplentes', desc: 'Quem está no banco nunca está fora do jogo: aplaudir, incentivar e manter postura positiva.' },
                { n: 7, title: 'Agradecer a pais e treinadores', desc: 'Reconhecer a dedicação da família ao final de cada sessão. Respeito também acontece fora de campo.' }
              ].map((m) => (
                <div key={m.n} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {m.n}
                    </span>
                    <h4 className="text-xs font-bold text-white">{m.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGRAS DO FUTSAL COMO BRINCADEIRA */}
      {activeTab === 'regras' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>⚽ Bola Fora: O Pontapé Lateral</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quando a bola atravessa por completo a linha do campo, o jogo recomeça no mesmo sítio, com o pé parado sobre ou perto da linha. Sem discussões nem regras inventadas.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-xs text-amber-300 font-semibold">
              Regra de Ouro: O jogo recomeça depressa e com justiça.
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🧤 Mãos no Jogo: A Garagem do Guarda-Redes</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              A área é como a garagem do guarda-redes: só ele pode usar as mãos ali dentro. Para todos os outros, as mãos servem para equilibrar o corpo, nunca para empurrar ou segurar.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-xs text-sky-300 font-semibold">
              Mãos equilibram, pés jogam!
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>⏱️ Os 4 Segundos: Relógio de Brincar</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evita que a bola fique parada. Cada segundo é uma batidinha: um, dois, três, quatro. Observa opções e passa rápido com intenção.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-xs text-emerald-300 font-semibold">
              4 segundos é ritmo e decisão!
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🎉 Festejos Bonitos: Energia com Classe</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sorriso, abraço rápido e comemoração em conjunto. A emoção nunca pode virar provocação ou humilhação do adversário.
            </p>
            <div className="p-2.5 bg-slate-950 rounded-xl text-xs text-purple-300 font-semibold">
              Celebra com a equipa, respeita o adversário.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EMOÇÕES EM CAMPO */}
      {activeTab === 'emocoes' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                A Caixa da Raiva: Rotina de 30 Segundos
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Quando a bola não entra ou o passe sai torto, ensine a criança a controlar a resposta:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400">1. Para o corpo</span>
                <p className="text-slate-400 mt-1">Volta a uma posição útil e olha o jogo.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400">2. Sente o corpo</span>
                <p className="text-slate-400 mt-1">Reconhece o calor no peito ou pernas.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400">3. Respira em 2 tempos</span>
                <p className="text-slate-400 mt-1">Puxa o ar em 3s, solta em 4s.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400">4. Frase mental</span>
                <p className="text-slate-400 mt-1">“Eu volto. Eu tento outra vez.”</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400">5. Ação treinável</span>
                <p className="text-slate-400 mt-1">Pede a bola ou apoia pelo lado certo.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="font-bold text-white">Vitória com Humildade</h4>
              <p className="text-slate-300">
                Ganhou? Ótimo. Reconheça o esforço do treino, aperte a mão do adversário e nunca aponte o dedo nem provoque pelo placar.
              </p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="font-bold text-white">Derrota de Cabeça Erguida</h4>
              <p className="text-slate-300">
                Perder faz parte do caminho. Checklist de 30 segundos: cumprimentar os adversários, respirar e dizer: “Jogaram bem, vamos treinar!”.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PAIS NA BANCADA */}
      {activeTab === 'bancada' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold text-white font-display">
              Código de Conduta da Família na Bancada
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A criança não precisa de um comentador nem de um juiz na arquibancada: precisa de <strong>segurança afetiva</strong>.
              Substitua a cobrança de desempenho por presença e apoio incondicional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl space-y-1">
                <div className="font-bold text-red-400">❌ O Que Evitar na Bancada:</div>
                <ul className="text-slate-400 space-y-1 list-disc list-inside">
                  <li>Cobrar gols e gritar ordens confusas no calor do jogo.</li>
                  <li>Comparar com os colegas: "Veja como o fulano corre!".</li>
                  <li>Reclamar do árbitro ou do treinador na frente da criança.</li>
                  <li>Fazer o amor parecer depender do resultado.</li>
                </ul>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1">
                <div className="font-bold text-emerald-400">✅ Frases Prontas que Abrem Espaço para Jogar:</div>
                <ul className="text-slate-300 space-y-1">
                  <li>• “Gosto tanto de te ver jogar!”</li>
                  <li>• “Boa tentativa! Na próxima já sai melhor.”</li>
                  <li>• “Melhoraste muito a força do passe!”</li>
                  <li>• “Estou do teu lado, sempre.”</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
