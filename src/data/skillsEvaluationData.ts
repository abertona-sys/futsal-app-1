import { Player, SkillIndicator, WeeklyChallenge } from '../types/futsal';

export const INITIAL_SKILL_INDICATORS: SkillIndicator[] = [
  // --- 2 a 5 anos (Descoberta) ---
  // Motores
  { id: 'mot-1', name: 'Corrida com avanço', pillar: 'motor', ageGroup: '2-5', description: 'Corre para a frente sem "travar" o corpo, mantendo o ritmo por alguns segundos.', status: 'dominio' },
  { id: 'mot-2', name: 'Salto com impulso', pillar: 'motor', ageGroup: '2-5', description: 'Salta do chão com os dois pés, procurando altura ou distância simples.', status: 'dominio' },
  { id: 'mot-3', name: 'Equilíbrio num pé', pillar: 'motor', ageGroup: '2-5', description: 'Sustenta um pé no chão por alguns instantes, mesmo com apoio.', status: 'desenvolvimento' },
  { id: 'mot-4', name: 'Travagem ao sinal', pillar: 'motor', ageGroup: '2-5', description: 'Desacelera e reduz a velocidade ao ouvir um comando curto ("para").', status: 'dominio' },
  { id: 'mot-5', name: 'Passos para mudar direção', pillar: 'motor', ageGroup: '2-5', description: 'Consegue virar o corpo para o lado indicado com passos curtos e controlados.', status: 'desenvolvimento' },
  { id: 'mot-6', name: 'Paragem com a sola', pillar: 'motor', ageGroup: '2-5', description: 'Ao chegar à bola/linha, consegue segurar o movimento apoiando a sola.', status: 'dominio' },
  { id: 'mot-7', name: 'Remate com apoio estável', pillar: 'motor', ageGroup: '2-5', description: 'Antes de chutar, consegue firmar a base do corpo sem escorregar.', status: 'desenvolvimento' },

  // Técnicos
  { id: 'tec-1', name: 'Remate com peito do pé', pillar: 'tecnico', ageGroup: '2-5', description: 'Chuta com a parte frontal do pé procurando direção geral.', status: 'desenvolvimento' },
  { id: 'tec-2', name: 'Paragem suave com a sola', pillar: 'tecnico', ageGroup: '2-5', description: 'Recebe a bola encostando a sola, sem esmagar nem perder o controlo.', status: 'dominio' },
  { id: 'tec-3', name: 'Condução livre', pillar: 'tecnico', ageGroup: '2-5', description: 'Consegue tocar e seguir com a bola por alguns metros perto do pé.', status: 'dominio' },
  { id: 'tec-4', name: 'Primeiro toque', pillar: 'tecnico', ageGroup: '2-5', description: 'Ao receber, direciona a bola para perto do corpo, sem deixar escapar longe.', status: 'desenvolvimento' },
  { id: 'tec-5', name: 'Interrupção segura do toque', pillar: 'tecnico', ageGroup: '2-5', description: 'Ao ouvir "para", reduz os toques e controla a bola em vez de acelerar sem travão.', status: 'dominio' },

  // Socioemocionais / Comportamentais
  { id: 'soc-1', name: 'Alegria com a bola', pillar: 'socioemocional', ageGroup: '2-5', description: 'Demonstra interesse, sorri e envolve-se sem medo excessivo.', status: 'dominio' },
  { id: 'soc-2', name: 'Aceitação de regras simples', pillar: 'socioemocional', ageGroup: '2-5', description: 'Segue combinados curtos sem discussões quando o adulto reforça.', status: 'dominio' },
  { id: 'soc-3', name: 'Persistência perante o erro', pillar: 'socioemocional', ageGroup: '2-5', description: 'Tenta novamente após errar sem abandonar a atividade de imediato.', status: 'desenvolvimento' },
  { id: 'soc-4', name: 'Partilha da bola', pillar: 'socioemocional', ageGroup: '2-5', description: 'Aceita trocar ou esperar pela bola com apoio do adulto.', status: 'dominio' },
  { id: 'soc-5', name: 'Autonomia com ajuda', pillar: 'socioemocional', ageGroup: '2-5', description: 'Tenta sozinha primeiro e só depois procura intervenção.', status: 'desenvolvimento' },

  // --- 6 a 9 anos (Aprendizagem) ---
  // Habilidade com a Bola (Técnico)
  { id: 'b9-1', name: 'Uso dos dois pés', pillar: 'tecnico', ageGroup: '6-9', description: 'Usa os dois pés com intenção (não só o pé preferido).', status: 'desenvolvimento' },
  { id: 'b9-2', name: 'Condução próxima', pillar: 'tecnico', ageGroup: '6-9', description: 'Conduz a bola mantendo controlo próximo sem perder a referência do corpo.', status: 'dominio' },
  { id: 'b9-3', name: 'Passe com o interior', pillar: 'tecnico', ageGroup: '6-9', description: 'Passe com o interior mantendo direção e força mais constantes.', status: 'dominio' },
  { id: 'b9-4', name: 'Receção amortecida', pillar: 'tecnico', ageGroup: '6-9', description: 'Reduz a velocidade da bola ao receber em vez de deixar escapar.', status: 'dominio' },
  { id: 'b9-5', name: 'Drible de fuga', pillar: 'tecnico', ageGroup: '6-9', description: 'Sai do contacto com direção e mudança simples de ritmo com o corpo.', status: 'desenvolvimento' },
  { id: 'b9-6', name: 'Proteção de bola curta', pillar: 'tecnico', ageGroup: '6-9', description: 'Consegue proteger a bola por um tempo curto com o corpo de lado.', status: 'dominio' },
  { id: 'b9-7', name: 'Remate com contacto limpo', pillar: 'tecnico', ageGroup: '6-9', description: 'Remate com contacto limpo e procura de precisão no canto.', status: 'desenvolvimento' },

  // Espaço e Equipa (Tático)
  { id: 'esp-1', name: 'Distância funcional', pillar: 'tatico', ageGroup: '6-9', description: 'Mantém distância funcional do colega para receber (sem bloquear nem sumir).', status: 'desenvolvimento' },
  { id: 'esp-2', name: 'Oferecer-se para o passe', pillar: 'tatico', ageGroup: '6-9', description: 'Cria linha de passe ao posicionar o corpo e chamar a bola.', status: 'dominio' },
  { id: 'esp-3', name: 'Cabeça levantada', pillar: 'tatico', ageGroup: '6-9', description: 'Levanta a cabeça em momentos-chave antes e durante o passe.', status: 'desenvolvimento' },
  { id: 'esp-4', name: 'Receção voltada para o jogo', pillar: 'tatico', ageGroup: '6-9', description: 'Amortece a bola e já prepara a próxima ação para o espaço livre.', status: 'desenvolvimento' },
  { id: 'esp-5', name: 'Movimento após o passe', pillar: 'tatico', ageGroup: '6-9', description: 'Movimenta-se depois de passar: entra em novo espaço para receber ou apoiar.', status: 'desenvolvimento' },

  // Autonomia e Foco (Socioemocional)
  { id: 'aut-1', name: 'Atenção com bola em ação', pillar: 'socioemocional', ageGroup: '6-9', description: 'Mantém a atenção focada enquanto a bola está em jogo (sem "viajar").', status: 'dominio' },
  { id: 'aut-2', name: 'Iniciativa após perda', pillar: 'socioemocional', ageGroup: '6-9', description: 'Toma iniciativa de recuperar ou reposicionar logo após perder o controlo.', status: 'dominio' },
  { id: 'aut-3', name: 'Resiliência perante o erro', pillar: 'socioemocional', ageGroup: '6-9', description: 'Recupera em seguida, sem acumular frustração nem desistir.', status: 'dominio' },
  { id: 'aut-4', name: 'Celebração com a equipa', pillar: 'socioemocional', ageGroup: '6-9', description: 'Reage positivamente ao passe do colega, aplaude e coopera.', status: 'dominio' },

  // --- 10 a 13 anos (Jogo Formal) ---
  // Técnicos Avançados
  { id: 't13-1', name: 'Passe orientado 1ª intenção', pillar: 'tecnico', ageGroup: '10-13', description: 'Ajusta direção e força para chegar no espaço futuro do companheiro.', status: 'dominio' },
  { id: 't13-2', name: 'Finalização de primeira', pillar: 'tecnico', ageGroup: '10-13', description: 'Finalização direta após passe no tempo certo, sem precisar dominar.', status: 'desenvolvimento' },
  { id: 't13-3', name: 'Proteção de costas e leitura', pillar: 'tecnico', ageGroup: '10-13', description: 'Costas firmes para a baliza, reconhece a pressão e antecipa o giro.', status: 'desenvolvimento' },
  { id: 't13-4', name: 'Domínio orientado para progredir', pillar: 'tecnico', ageGroup: '10-13', description: 'Primeiro toque já sai rompendo linha ou abrindo ângulo de chute.', status: 'dominio' },
  { id: 't13-5', name: 'Condução sob pressão alta', pillar: 'tecnico', ageGroup: '10-13', description: 'Condução curta e dinâmica protegendo o raio da bola.', status: 'desenvolvimento' },

  // Táticos Avançados
  { id: 'tat13-1', name: 'Desmarcação em tempo certo', pillar: 'tatico', ageGroup: '10-13', description: 'Inicia a corrida no momento exato: nem cedo demais, nem tarde demais.', status: 'dominio' },
  { id: 'tat13-2', name: 'Transição ataque-defesa rápida', pillar: 'tatico', ageGroup: '10-13', description: 'Reduz espaços nos primeiros 3-4 segundos, volta para fechar linha.', status: 'dominio' },
  { id: 'tat13-3', name: 'Transição defesa-ataque vertical', pillar: 'tatico', ageGroup: '10-13', description: 'Ao roubar, aciona pivô ou ala livre com passe vertical em até 2 toques.', status: 'desenvolvimento' },
  { id: 'tat13-4', name: 'Ocupação de superioridade 2x1/3x2', pillar: 'tatico', ageGroup: '10-13', description: 'Mantém referências e atrai a marcação para liberar o colega.', status: 'dominio' },

  // Psicológicos / Socioemocionais
  { id: 'psi13-1', name: 'Comunicação em campo útil', pillar: 'socioemocional', ageGroup: '10-13', description: 'Chama por nome/função ("pivô, aqui!", "ala, vira!"), sem gritaria vaga.', status: 'dominio' },
  { id: 'psi13-2', name: 'Liderança positiva em momentos difíceis', pillar: 'socioemocional', ageGroup: '10-13', description: 'Puxa a equipa com atitude, nunca humilha nem reclama do colega.', status: 'dominio' },
  { id: 'psi13-3', name: 'Gestão da frustração e autocontrolo', pillar: 'socioemocional', ageGroup: '10-13', description: 'Mantém postura alta e disciplina mesmo sob desvantagem no placar.', status: 'desenvolvimento' },
  { id: 'psi13-4', name: 'Fair Play ativo e respeito ao apito', pillar: 'socioemocional', ageGroup: '10-13', description: 'Ajuda quem caiu, não simula faltas e cumprimenta o adversário.', status: 'dominio' }
];

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'player-1',
    name: 'Mateo Bertona',
    age: 8,
    avatar: '👦',
    jerseyNumber: 10,
    dominantFoot: 'Direito',
    role: 'Ala',
    level: 'Craque Familiar Lv. 4',
    totalPoints: 1420,
    trainingMinutes: 285,
    streakDays: 4,
    stats: {
      control: 82,
      precision: 78,
      velocity: 88,
      decision: 74,
      teamwork: 90,
      resilience: 85
    },
    goals: [
      {
        id: 'g-1',
        type: 'corpo',
        title: 'Meta do Corpo',
        description: 'Melhorar o controlo da sola nos ziguezagues sem tropeçar nos cones.',
        completed: true,
        targetDate: '2026-10-15'
      },
      {
        id: 'g-2',
        type: 'mente',
        title: 'Meta da Mente',
        description: 'Escutar a orientação do pai/treinador e tentar logo na próxima bola sem desanimar.',
        completed: false,
        targetDate: '2026-10-30'
      },
      {
        id: 'g-3',
        type: 'jogo',
        title: 'Meta do Jogo',
        description: 'Levantar a cabeça antes de passar e tentar pelo menos 3 passes com o pé esquerdo.',
        completed: false,
        targetDate: '2026-11-10'
      }
    ],
    skills: INITIAL_SKILL_INDICATORS.filter(s => s.ageGroup === '6-9'),
    badges: ['👑 Mestre do Semáforo', '⚡ Pés Rápidos', '🤝 Fair Play Ouro', '🎯 Pontaria Certa']
  },
  {
    id: 'player-2',
    name: 'Sofía Bertona',
    age: 5,
    avatar: '👧',
    jerseyNumber: 7,
    dominantFoot: 'Ambidestro',
    role: 'Explorador',
    level: 'Pequena Fera Lv. 2',
    totalPoints: 890,
    trainingMinutes: 160,
    streakDays: 3,
    stats: {
      control: 72,
      precision: 65,
      velocity: 70,
      decision: 68,
      teamwork: 84,
      resilience: 92
    },
    goals: [
      {
        id: 'g-4',
        type: 'corpo',
        title: 'Meta do Corpo',
        description: 'Correr até à linha e parar a bola como estátua com a sola sem usar as mãos.',
        completed: true,
        targetDate: '2026-10-18'
      },
      {
        id: 'g-5',
        type: 'mente',
        title: 'Meta da Mente',
        description: 'Rir e tentar de novo quando a bola escapar para fora do círculo.',
        completed: true,
        targetDate: '2026-10-25'
      },
      {
        id: 'g-6',
        type: 'jogo',
        title: 'Meta do Jogo',
        description: 'Acertar a bola no "barquinho do tesouro" em 3 toques suaves.',
        completed: false,
        targetDate: '2026-11-05'
      }
    ],
    skills: INITIAL_SKILL_INDICATORS.filter(s => s.ageGroup === '2-5'),
    badges: ['🌟 Guarda-Bola Fiel', '🐰 Salto do Coelho', '🎨 Desenho no Chão']
  },
  {
    id: 'player-3',
    name: 'Lucas Bertona',
    age: 12,
    avatar: '🧑',
    jerseyNumber: 9,
    dominantFoot: 'Direito',
    role: 'Pivô',
    level: 'Capitão Tático Lv. 6',
    totalPoints: 2150,
    trainingMinutes: 420,
    streakDays: 6,
    stats: {
      control: 89,
      precision: 86,
      velocity: 82,
      decision: 91,
      teamwork: 88,
      resilience: 94
    },
    goals: [
      {
        id: 'g-7',
        type: 'corpo',
        title: 'Meta do Corpo',
        description: 'Giro rápido na recepção de costas para a baliza orientando o chute ao primeiro toque.',
        completed: true,
        targetDate: '2026-10-12'
      },
      {
        id: 'g-8',
        type: 'mente',
        title: 'Meta da Mente',
        description: 'Liderar a comunicação da equipe chamando as alas pelo nome e orientando a transição.',
        completed: false,
        targetDate: '2026-10-28'
      },
      {
        id: 'g-9',
        type: 'jogo',
        title: 'Meta do Jogo',
        description: 'Converter 5 tabelas no 3x2 em lances de finalização no canto oposto.',
        completed: false,
        targetDate: '2026-11-15'
      }
    ],
    skills: INITIAL_SKILL_INDICATORS.filter(s => s.ageGroup === '10-13'),
    badges: ['🏆 Líder de Quadra', '🎯 Chute de Primeira', '🛡️ Escudo de Costas', '⚡ Contra-Ataque Relâmpago']
  },
  {
    id: 'player-4',
    name: 'Papá Coach (Alberto)',
    age: 38,
    avatar: '👨‍💼',
    jerseyNumber: 1,
    dominantFoot: 'Direito',
    role: 'Fixador / Fecho',
    level: 'Treinador da Família',
    totalPoints: 1780,
    trainingMinutes: 350,
    streakDays: 5,
    stats: {
      control: 85,
      precision: 88,
      velocity: 68,
      decision: 95,
      teamwork: 98,
      resilience: 90
    },
    goals: [
      {
        id: 'g-10',
        type: 'corpo',
        title: 'Meta do Corpo',
        description: 'Manter a intensidade nos apoios laterais e demonstrar os gestos em ritmo calmo.',
        completed: true,
        targetDate: '2026-10-30'
      },
      {
        id: 'g-11',
        type: 'mente',
        title: 'Meta da Mente',
        description: 'Nunca reclamar na bancada: elogiar o esforço antes do resultado em 100% dos treinos.',
        completed: true,
        targetDate: '2026-11-01'
      },
      {
        id: 'g-12',
        type: 'jogo',
        title: 'Meta do Jogo',
        description: 'Completar os 4 blocos da sessão semanal com toda a família reunida.',
        completed: false,
        targetDate: '2026-11-20'
      }
    ],
    skills: INITIAL_SKILL_INDICATORS.filter(s => s.ageGroup === '10-13'),
    badges: ['🎖️ Pai na Bancada Nota 10', '⏱️ Relógio Pedagógico', '🤝 Fair Play Master']
  }
];

export const INITIAL_CHALLENGES: WeeklyChallenge[] = [
  {
    id: 'ch-1',
    title: 'Mestre da Sola em Família',
    subtitle: 'Conduzir e travar 50 vezes com a sola nos treinos desta semana',
    category: 'técnica',
    targetCount: 50,
    currentCount: 38,
    unit: 'paragens',
    pointsReward: 250,
    badgeId: 'badge-sola',
    badgeName: 'Mestre da Sola',
    badgeIcon: '👟',
    completed: false,
    daysRemaining: 3
  },
  {
    id: 'ch-2',
    title: '100 Passes Conectados',
    subtitle: 'Completar 100 passes rasteiros em duplas sem a bola sair',
    category: 'família',
    targetCount: 100,
    currentCount: 100,
    unit: 'passes',
    pointsReward: 350,
    badgeId: 'badge-dupla',
    badgeName: 'Dupla Dinâmica',
    badgeIcon: '⚽',
    completed: true,
    daysRemaining: 1
  },
  {
    id: 'ch-3',
    title: 'Código Fair Play de Ouro',
    subtitle: 'Ajudar quem caiu, cumprimentar o parceiro e juramento antes do jogo',
    category: 'fair_play',
    targetCount: 5,
    currentCount: 4,
    unit: 'atos de fair play',
    pointsReward: 300,
    badgeId: 'badge-fairplay',
    badgeName: 'Coração Limpo',
    badgeIcon: '💚',
    completed: false,
    daysRemaining: 4
  },
  {
    id: 'ch-4',
    title: 'Futsal Cardio Zone: 45 Minutos',
    subtitle: 'Acumular 45 minutos em Zona Aeróbica através dos sensores vestíveis',
    category: 'cardio',
    targetCount: 45,
    currentCount: 32,
    unit: 'minutos em cardio',
    pointsReward: 400,
    badgeId: 'badge-pulso',
    badgeName: 'Motor Futsal',
    badgeIcon: '❤️‍🔥',
    completed: false,
    daysRemaining: 2
  }
];
