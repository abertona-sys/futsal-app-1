import { Drill } from '../types/futsal';

export const DRILLS_DATABASE: Drill[] = [
  // --- 2 A 5 ANOS ---
  {
    id: 'drill-1',
    number: 1,
    title: 'Patrulha do Guarda-Bola',
    subtitle: 'Ativação Motora e Alegria',
    ageGroup: '2-5',
    category: 'Ativação e Controlo',
    duration: '3 a 5 min',
    childrenCount: '2 a 8 crianças',
    space: 'Zonas pequenas marcadas no chão',
    material: '1 bola + cones por criança',
    setupTime: '1 minuto',
    overview: 'Cada criança guarda a sua própria "zona", conduzindo a bola até à borda e voltando sem a deixar sair. Uma forma simples de sentir posse e controlo perto do corpo.',
    steps: [
      { number: 1, title: 'A zona é a portinha', description: 'Explique: "tu és a patrulha que guarda a portinha — a bola não pode fugir".' },
      { number: 2, title: 'Condução até à borda', description: 'Ao sinal, a criança conduz a bola até à borda do quadrado, sempre olhando para a bola.' },
      { number: 3, title: 'Volta ao centro', description: 'Conduz de volta ao centro do quadrado, sem deixar a bola sair da zona.' },
      { number: 4, title: 'Troca de chefe', description: 'Depois de 3 tentativas, troque o "chefe" ou reduza o espaço para aumentar a atenção.' }
    ],
    markers: [
      { type: 'cone', x: 20, y: 20, label: 'Cone A' },
      { type: 'cone', x: 80, y: 20, label: 'Cone B' },
      { type: 'cone', x: 80, y: 80, label: 'Cone C' },
      { type: 'cone', x: 20, y: 80, label: 'Cone D' },
      { type: 'player', x: 50, y: 50, label: 'Patrulha' },
      { type: 'ball', x: 52, y: 56, label: 'Bola' }
    ],
    magicWords: [
      '“Guarda a portinha!”',
      '“Bola perto do pé!”',
      '“Não deixes fugir!”',
      '“Muito bem, patrulha!”'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Zona grande', desc: 'Comece com um quadrado maior para facilitar o controlo.' },
      round2: { title: 'Ronda 2 · Zona média', desc: 'Reduza ligeiramente o espaço, mantendo o mesmo ritmo.' },
      round3: { title: 'Ronda 3 · Zona final', desc: 'Termine com uma volta completa dentro da zona antes de voltar ao centro.' }
    },
    adjustments: {
      easier: 'Permita condução só para a frente, sem exigir voltas.',
      harder: 'Ao sinal, peça uma volta completa antes de regressar ao centro.',
      noMaterial: 'Use uma toalha dobrada como "portinha" e qualquer bola leve no quintal ou sala.'
    },
    coachTip: '“A bola é o tesouro, tu és o guarda.” Narre como uma pequena história — crianças desta idade aprendem melhor com imaginação.',
    commonErrors: [
      { error: 'Sai da zona sem perceber', fix: 'Reduza o tamanho do quadrado e marque a borda com uma cor viva.' },
      { error: 'Perde a bola de vista', fix: 'Peça "olhos na bola" antes de cada condução.' },
      { error: 'Fica parada à espera', fix: 'Reduza o número de tentativas por rodada para manter o ritmo.' }
    ],
    observationChecklist: [
      'Bola sempre perto do pé',
      'Mantém-se dentro da zona marcada',
      'Olha para a bola ao conduzir',
      'Reage ao sinal de início',
      'Sorri e repete com vontade'
    ],
    safetyTip: 'Um adulto acompanha sempre. Zonas com pelo menos 1 metro de distância entre si. Piso seco.'
  },
  {
    id: 'drill-2',
    number: 2,
    title: 'Giro do Super-Herói',
    subtitle: 'Ativação Motora e Mudança de Rumo',
    ageGroup: '2-5',
    category: 'Coordenação e Equilíbrio',
    duration: '3 a 5 min',
    childrenCount: '2 a 6 em fila',
    space: 'Caminho de 6 a 8 m',
    material: '1 bola por criança + 3 cones',
    setupTime: '1 minuto',
    overview: 'A criança conduz a bola por um caminho curto, faz um giro leve do corpo em cada marca e continua, como um herói que muda de rumo em cada missão.',
    steps: [
      { number: 1, title: 'Ponto do herói', description: 'A criança posiciona a bola no primeiro ponto e prepara-se para a missão.' },
      { number: 2, title: 'Condução até à marca', description: 'Ao comando, conduz a bola até à marca seguinte com toques curtos.' },
      { number: 3, title: 'O giro do herói', description: 'Faz um giro leve do corpo e dos pés, como se "virasse para o castelo".' },
      { number: 4, title: 'Continua a missão', description: 'Conduz de volta ou até à marca seguinte, mantendo o ritmo contínuo.' }
    ],
    markers: [
      { type: 'player', x: 15, y: 50, label: 'Herói' },
      { type: 'ball', x: 20, y: 50, label: 'Bola' },
      { type: 'cone', x: 45, y: 50, label: 'Giro' },
      { type: 'cone', x: 80, y: 50, label: 'Castelo' }
    ],
    magicWords: [
      '“O herói virou para o castelo!”',
      '“Gira e segue!”',
      '“Bola sempre contigo!”'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Giro só de um lado', desc: 'Pratique sempre o giro para o mesmo lado primeiro.' },
      round2: { title: 'Ronda 2 · Alternar lados', desc: 'Sinalize "gira para a esquerda" ou "gira para a direita".' },
      round3: { title: 'Ronda 3 · Missão completa', desc: 'Percorra todas as marcas seguidas, sem paragens longas.' }
    },
    adjustments: {
      easier: 'Giro só com o pé do mesmo lado, sem trocar direção.',
      harder: 'Alterne sinais de "esquerda" e "direita" em cada marca.',
      noMaterial: 'Use garrafas como marcas e qualquer espaço livre de 3 metros no corredor de casa.'
    },
    coachTip: '“O corpo gira antes da bola.” Mostre o giro devagar antes de pedir à criança — a imitação visual funciona melhor do que a explicação.',
    commonErrors: [
      { error: 'Perde a bola no giro', fix: 'Reduza a velocidade e peça toques mais curtos antes do giro.' },
      { error: 'Esquece a direção do giro', fix: 'Use sempre a mesma palavra-chave para o mesmo lado.' }
    ],
    observationChecklist: [
      'Bola perto do pé nas conduções',
      'Gira o corpo, não só a cabeça',
      'Mantém o equilíbrio no giro',
      'Segue o caminho marcado'
    ],
    safetyTip: 'Caminho livre de obstáculos, com pelo menos 1 metro de largura para o giro.'
  },
  {
    id: 'drill-4',
    number: 4,
    title: 'Desafio do Semáforo no Pé',
    subtitle: 'Paragem e Arranque Controlado',
    ageGroup: '2-5',
    category: 'Coordenação e Atenção',
    duration: '4 a 6 min',
    childrenCount: '2 a 10 crianças',
    space: 'Espaço livre sem obstáculos',
    material: '1 bola por criança + 3 cones ou cartões coloridos',
    setupTime: '1 minuto',
    overview: 'A criança conduz a bola respondendo a três sinais simples: verde continua, amarelo reduz, vermelho para. Um jeito lúdico de treinar paragem e arranque com precisão.',
    steps: [
      { number: 1, title: 'Explica o código', description: 'Verde = continuar; amarelo = reduzir; vermelho = parar com a bola debaixo do pé.' },
      { number: 2, title: 'Condução livre', description: 'Ao sinal verde, a criança conduz livremente pelo espaço.' },
      { number: 3, title: 'Reduz no amarelo', description: 'Ao mostrar amarelo, reduz a velocidade mantendo o controlo.' },
      { number: 4, title: 'Para no vermelho', description: 'Ao vermelho, estaciona a bola perto do pé e aguarda o próximo sinal.' }
    ],
    markers: [
      { type: 'zone', x: 50, y: 15, label: 'Semáforo (V/A/V)' },
      { type: 'player', x: 30, y: 50, label: 'Jogador 1' },
      { type: 'player', x: 70, y: 65, label: 'Jogador 2' },
      { type: 'ball', x: 33, y: 52, label: 'Bola' },
      { type: 'ball', x: 67, y: 67, label: 'Bola' }
    ],
    magicWords: [
      '“O teu pé é o semáforo!”',
      '“Verde, vai! Vermelho, para!”',
      '“Bola quietinha no vermelho!”'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Só verde e vermelho', desc: 'Comece sem o amarelo para simplificar a regra.' },
      round2: { title: 'Ronda 2 · Os três sinais', desc: 'Introduza o amarelo como "meia velocidade".' },
      round3: { title: 'Ronda 3 · Congelou!', desc: 'No vermelho, peça para ficar congelada como estátua por 2 segundos.' }
    },
    adjustments: {
      easier: 'Use apenas verde e vermelho, sem o sinal amarelo.',
      harder: 'No vermelho, peça uma pequena estátua de equilíbrio em um pé só.',
      noMaterial: 'Use folhas coloridas ou objetos de cores diferentes em qualquer sala.'
    },
    coachTip: '“Uma regra só, sempre com a mesma palavra.” Não mude o significado das cores durante a brincadeira — muda a confiança da criança.',
    commonErrors: [
      { error: 'Não para completamente no vermelho', fix: 'Reforce "bola perto do pé, pé quietinho" antes de continuar.' },
      { error: 'Confunde as cores', fix: 'Use sempre a mesma ordem e mantenha distância entre crianças.' }
    ],
    observationChecklist: [
      'Reage ao sinal com atenção',
      'Reduz a velocidade no amarelo',
      'Para com a bola debaixo do pé',
      'Mantém distância dos colegas'
    ],
    safetyTip: 'Espaço amplo, sem cantos ou obstáculos. Distância mínima de 1 metro entre crianças.'
  },
  {
    id: 'drill-5',
    number: 5,
    title: 'Bate-Bola do Tesouro',
    subtitle: 'Coordenação Olho-Pé e Alvo',
    ageGroup: '2-5',
    category: 'Pontaria e Condução',
    duration: '3 a 5 min',
    childrenCount: '2 a 8 crianças',
    space: 'Alvo + fila de espera',
    material: '1 bola por criança + alvos no chão',
    setupTime: '1 minuto',
    overview: 'A criança conduz a bola com toques curtos até um "alvo do tesouro" no chão, tentando encostar a bola com precisão. Um jogo simples de coordenação olho-pé.',
    steps: [
      { number: 1, title: 'Posição inicial', description: 'A criança começa junto à "fila do tesouro", com a bola perto do pé.' },
      { number: 2, title: 'Condução ao alvo', description: 'Conduz com toques curtos tentando encostar a bola no alvo.' },
      { number: 3, title: 'Toque no tesouro', description: 'Ao tocar o alvo, celebra o "tesouro encontrado".' },
      { number: 4, title: 'Volta e repete', description: 'Regressa à fila do tesouro e repete, sem espera longa.' }
    ],
    markers: [
      { type: 'cone', x: 20, y: 50, label: 'Partida' },
      { type: 'player', x: 25, y: 50, label: 'Explorador' },
      { type: 'ball', x: 30, y: 50, label: 'Bola' },
      { type: 'target', x: 80, y: 50, label: 'Tesouro' }
    ],
    magicWords: [
      '“Cada toque encontra um tesouro!”',
      '“Toques curtinhos!”',
      '“Voltaste? Tenta de novo!”'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Alvo grande', desc: 'Comece com um alvo grande para garantir sucesso frequente.' },
      round2: { title: 'Ronda 2 · Alvo médio', desc: 'Reduza ligeiramente o tamanho do alvo.' },
      round3: { title: 'Ronda 3 · Alvo e distância', desc: 'Aumente um pouco a distância mantendo o alvo médio.' }
    },
    adjustments: {
      easier: 'Use um alvo maior (círculo grande) para facilitar o acerto.',
      harder: 'Reduza o alvo e aumente ligeiramente a distância.',
      noMaterial: 'Use uma almofada ou caixa como alvo em qualquer espaço de casa.'
    },
    coachTip: '“Quanto mais precisa, mais pontuação.” Ajuste a dificuldade pelo alvo, não pela pressa.',
    commonErrors: [
      { error: 'Chuta em vez de conduzir', fix: 'Peça "toques curtinhos, a bola fica perto".' },
      { error: 'Perde o alvo de vista', fix: 'Aproxime o alvo e simplifique a distância.' }
    ],
    observationChecklist: [
      'Bola perto do pé ao conduzir',
      'Olha para o alvo antes de tocar',
      'Consegue encostar a bola no alvo',
      'Volta rápido à fila e sorri'
    ],
    safetyTip: 'Piso limpo e livre de obstáculos. Distância segura entre alvos e crianças.'
  },

  // --- 6 A 9 ANOS ---
  {
    id: 'drill-11',
    number: 11,
    title: 'Escada em Frequência Firme',
    subtitle: 'Pés Rápidos e Mudança de Ritmo',
    ageGroup: '6-9',
    category: 'Coordenação e Agilidade',
    duration: '1 passagem + 2 a 4 reps',
    childrenCount: '2 a 8 crianças',
    space: 'Escada de coordenação em linha reta',
    material: 'Escada de coordenação ou fita no chão',
    setupTime: '1 minuto',
    overview: 'O primeiro passo antes da velocidade: atravessar a escada com passadas curtas e estáveis, tronco alinhado e olhar à frente, para depois acelerar e desacelerar sem perder o equilíbrio.',
    steps: [
      { number: 1, title: 'Escada pronta', description: 'Coloca a escada em linha reta com espaço para começar e terminar 2 passos fora dela.' },
      { number: 2, title: 'Marca a partida', description: 'Posiciona uma linha de partida no mesmo ponto para todas as tentativas.' },
      { number: 3, title: 'Pé leve e curto', description: 'Orienta "pé leve e curto dentro da escada"; conta 1-2-3-4 em voz alta para manter a constância.' },
      { number: 4, title: 'Fecha o ciclo', description: 'Caminha 2 passos no final, sem parar bruscamente, para preparar o próximo ciclo.' }
    ],
    markers: [
      { type: 'player', x: 15, y: 50, label: 'Atleta' },
      { type: 'zone', x: 50, y: 50, label: 'Escada (1-2-3-4)' },
      { type: 'cone', x: 85, y: 50, label: 'Fim do ciclo' }
    ],
    scoringRules: [
      '1 ponto por atravessar a escada sem pisar fora nem trocar o pé.',
      '+1 ponto se o ritmo se mantiver constante do início ao fim.',
      '0 pontos se pisar fora da escada ou perder o padrão.',
      'Repete em 2 a 4 rondas, comparando a constância.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Ritmo guiado', desc: 'Conta em voz alta 1-2-3-4, sem pressa, guiando o passo.' },
      round2: { title: 'Ronda 2 · Ritmo próprio', desc: 'A criança conta sozinha, mantendo o mesmo padrão.' },
      round3: { title: 'Ronda 3 · Sem contagem', desc: 'Mantém o ritmo só pela sensação do passo, sem contar em voz alta.' }
    },
    adjustments: {
      easier: 'Aumenta o espaço entre os degraus e reduz a exigência de ritmo.',
      harder: 'Reduz o espaço entre os degraus e pede o mesmo ritmo com passadas mais rápidas.',
      noMaterial: 'Desenha os degraus com fita ou giz no chão, mantendo o mesmo espaçamento.'
    },
    coachTip: '“Boa frequência é mais importante do que velocidade.” Se o pé bate torto, o ritmo vira bagunça: reduz a velocidade e pede o padrão.',
    commonErrors: [
      { error: 'Pisa fora da escada', fix: 'Reduz a velocidade e aumenta o espaço entre os degraus.' },
      { error: 'Perde a constância do ritmo', fix: 'Conta em voz alta junto com a criança para guiar o passo.' }
    ],
    observationChecklist: [
      'Pé leve e curto dentro da escada',
      'Tronco alinhado, olhar à frente',
      'Ritmo constante do início ao fim',
      'Não pisa fora dos degraus',
      'Fecha o ciclo caminhando'
    ],
    safetyTip: 'Piso seco e escada bem fixada (ou linhas nítidas). Espaço livre antes e depois.'
  },
  {
    id: 'drill-16',
    number: 16,
    title: 'Semáforo de Paradas Rápidas',
    subtitle: 'Velocidade de Reação e Condução',
    ageGroup: '6-9',
    category: 'Reação e Domínio',
    duration: '5 a 8 min',
    childrenCount: '4 a 12 crianças',
    space: 'Corredor de condução com 6 a 10 cones',
    material: '1 bola por criança + cones coloridos',
    setupTime: '1 minuto',
    overview: 'A criança conduz respondendo a três comandos de cor: verde segue, amarelo desacelera, vermelho para a bola sob o pé — treinando leitura rápida e paragem controlada.',
    steps: [
      { number: 1, title: 'Explica o código', description: 'Defina claramente o significado de cada cor antes de começar.' },
      { number: 2, title: 'Condução em verde', description: 'A criança conduz pelo corredor mantendo o ritmo combinado.' },
      { number: 3, title: 'Reage em ritmo crescente', description: 'Você aponta ou sinaliza a cor em ritmo cada vez mais rápido.' },
      { number: 4, title: 'Para com controlo', description: 'Ao ouvir "vermelho", para com controlo e olha para o próximo sinal.' }
    ],
    markers: [
      { type: 'player', x: 15, y: 50, label: 'Condutor' },
      { type: 'ball', x: 20, y: 50, label: 'Bola' },
      { type: 'cone', x: 35, y: 50, label: 'Cone 1' },
      { type: 'cone', x: 50, y: 50, label: 'Cone 2' },
      { type: 'cone', x: 65, y: 50, label: 'Cone 3' },
      { type: 'zone', x: 85, y: 20, label: 'Sinal (V/A/V)' }
    ],
    scoringRules: [
      '1 ponto por reagir corretamente ao sinal.',
      '+1 ponto se parar com a bola totalmente controlada.',
      '0 pontos se a bola "sobrar" ao parar.',
      'Vence quem somar mais pontos em 5 sinais.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Ritmo lento', desc: 'Comece com sinais espaçados, dando tempo de reação.' },
      round2: { title: 'Ronda 2 · Ritmo médio', desc: 'Reduza o intervalo entre sinais.' },
      round3: { title: 'Ronda 3 · Ritmo rápido', desc: 'Sinalize em ritmo quase imprevisível, mantendo a segurança.' }
    },
    adjustments: {
      easier: 'Use apenas 2 cores (verde e vermelho) até a turma dominar.',
      harder: 'Adicione uma quarta cor (azul = virar 180°) para mais decisão.',
      noMaterial: 'Use objetos coloridos ou roupas como sinais em qualquer corredor livre.'
    },
    coachTip: '“Cobre decisão, não perfeição.” Se a turma demorar a reagir, reduza a velocidade do sinal antes de aumentar o ritmo.',
    commonErrors: [
      { error: 'Não estabiliza a bola no vermelho', fix: 'Reforce que a bola precisa ficar sob controlo total, sem sobrar rolando.' },
      { error: 'Espia o sinal em vez de conduzir', fix: 'Peça "olhos na bola, ouvidos no sinal".' }
    ],
    observationChecklist: [
      'Reage ao sinal sem atraso',
      'Reduz velocidade no amarelo',
      'Estabiliza a bola no vermelho com a sola',
      'Mantém o corredor sem esbarrar',
      'Retoma o ritmo rapidamente'
    ],
    safetyTip: 'Corredores bem espaçados entre crianças, piso livre e seco.'
  },
  {
    id: 'drill-51',
    number: 51,
    title: 'Zigue-Zague dos Cinco Cones',
    subtitle: 'Condução Orientada e Controlo',
    ageGroup: '6-9',
    category: 'Drible e Condução',
    duration: '30 s por ronda',
    childrenCount: '1 a 4 crianças por corredor',
    space: '8 × 3 m corredor de cones',
    material: '5 cones + 1 bola por criança',
    setupTime: '1 minuto',
    overview: 'Cinco cones em zigue-zague, a 1,5 m uns dos outros. A criança conduz a bola contornando cada cone, com toque curto e cabeça levantada. Ensina que o corpo orienta a bola.',
    steps: [
      { number: 1, title: 'Partir para o primeiro cone', description: 'A criança fica na partida. Ao "Já!", conduz a bola até ao primeiro cone, com toques curtos.' },
      { number: 2, title: 'Contornar de cone em cone', description: 'Contorna cada cone alternando os lados, com o pé de apoio firme e a bola perto.' },
      { number: 3, title: 'Cabeça levantada', description: 'Antes de cada curva, levanta a cabeça e olha para o cone seguinte.' },
      { number: 4, title: 'Chegada e troca', description: 'Depois do último cone, arranca em linha reta e para a bola na chegada.' }
    ],
    markers: [
      { type: 'player', x: 10, y: 50, label: 'Início' },
      { type: 'ball', x: 15, y: 50, label: 'Bola' },
      { type: 'cone', x: 28, y: 35, label: 'Cone 1' },
      { type: 'cone', x: 42, y: 65, label: 'Cone 2' },
      { type: 'cone', x: 56, y: 35, label: 'Cone 3' },
      { type: 'cone', x: 70, y: 65, label: 'Cone 4' },
      { type: 'cone', x: 84, y: 50, label: 'Chegada' }
    ],
    scoringRules: [
      '1 ponto por cone sem tocar.',
      '+1 se levantar a cabeça em todas as curvas.',
      '-1 se a bola sair a mais de 1 m.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Cones a 2 m', desc: 'Curvas largas e toques tranquilos.' },
      round2: { title: 'Ronda 2 · Cones a 1,5 m', desc: 'Ritmo normal e cabeça levantada.' },
      round3: { title: 'Ronda 3 · Cones a 1 m', desc: 'Curvas fechadas, exigindo toques bem curtos.' }
    },
    adjustments: {
      easier: 'Afaste os cones para 2 m e reduza-os a 3. Deixe dar mais toques.',
      harder: 'Aproxime os cones para 1 m, use só o pé mais fraco ou cronometre.',
      noMaterial: 'Use garrafas de plástico, mochilas ou sapatos como cones.'
    },
    coachTip: '“O pé de apoio dá o caminho.” Peça que o pé de apoio aponte já para o cone seguinte antes de tocar na bola.',
    commonErrors: [
      { error: 'Toca nos cones', fix: 'Afaste os cones e peça toques mais curtos.' },
      { error: 'Olha só para a bola', fix: 'Peça para dizer em voz alta a cor do cone seguinte.' }
    ],
    observationChecklist: [
      'Contorna sem tocar nos cones',
      'Levanta a cabeça antes de curvar',
      'Toque curto perto do pé',
      'Mantém o ritmo',
      'Acelera na reta final'
    ],
    safetyTip: 'Cones baixos e macios. Mantenha 2 m entre corredores.'
  },
  {
    id: 'drill-76',
    number: 76,
    title: 'Passe Curto em Dupla: Chega sem Pressa',
    subtitle: 'Passe, Receção e Tabelas Simples',
    ageGroup: '6-9',
    category: 'Passe e Cooperação',
    duration: '30 s por ronda',
    childrenCount: '2 crianças em dupla',
    space: '5 × 2 m (distância 4 m)',
    material: '2 marcas + 1 bola por dupla',
    setupTime: '1 minuto',
    overview: 'Duas crianças, dois pontos no chão e um objetivo: a bola tem de chegar com controlo, sem ser "atirada". A dupla combina o ritmo: passe, receção firme e devolução imediata.',
    steps: [
      { number: 1, title: 'Olhar antes de passar', description: 'A criança A olha para o colega e para o espaço. Só depois passa, com a parte de dentro do pé.' },
      { number: 2, title: 'Passe rasteiro', description: 'O passe é rasteiro e com a força certa: a bola tem de chegar devagar, à zona do pé do colega.' },
      { number: 3, title: 'Receber com firmeza', description: 'A criança B recebe com a parte de dentro do pé, amortece a bola e fica com ela junto de si.' },
      { number: 4, title: 'Devolver logo', description: 'B devolve de imediato, com o mesmo cuidado. Repitam durante 30 segundos.' }
    ],
    markers: [
      { type: 'player', x: 20, y: 50, label: 'Jogador A' },
      { type: 'cone', x: 20, y: 65, label: 'Base A' },
      { type: 'ball', x: 28, y: 50, label: 'Bola' },
      { type: 'player', x: 80, y: 50, label: 'Jogador B' },
      { type: 'cone', x: 80, y: 65, label: 'Base B' }
    ],
    scoringRules: [
      '1 ponto por passe que chega ao pé.',
      '+1 por receção sem a bola se afastar mais de 1 passo.',
      '-1 por passe forte demais.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Distância de 3 m', desc: 'Passes curtos e fáceis.' },
      round2: { title: 'Ronda 2 · Distância de 4 m', desc: 'Ritmo normal e constante.' },
      round3: { title: 'Ronda 3 · Distância de 5 m', desc: 'Mais precisão e firmeza.' }
    },
    adjustments: {
      easier: 'Aproxime as marcas a 2 m e deixe a bola rolar devagar.',
      harder: 'Afaste a 5 m, use só o pé mais fraco ou limite a 2 toques.',
      noMaterial: 'Uma parede também serve de parceiro (receber a bola devolvida).'
    },
    coachTip: '“A bola chega com carinho.” Peça que a dupla combine o ritmo em voz alta: "passo, recebo, devolvo". A comunicação começa no olhar.',
    commonErrors: [
      { error: 'Passa com muita força', fix: 'Peça um passe "de embalar".' },
      { error: 'Não olha para o colega', fix: 'Peça um olhar antes do toque.' }
    ],
    observationChecklist: [
      'Olha antes de passar',
      'Passe rasteiro e preciso',
      'Recebe com a bola perto',
      'Devolve depressa',
      'Comunica com o colega'
    ],
    safetyTip: 'Mantenha 2 m entre duplas e ninguém no caminho da bola.'
  },
  {
    id: 'drill-96',
    number: 96,
    title: '1x1 no Corredor Estreito com Finta de Ombro',
    subtitle: 'Drible Criativo e Duelos Rápidos',
    ageGroup: '6-9',
    category: '1x1 e Criatividade',
    duration: '30 s por ronda',
    childrenCount: '6 a 12 crianças em pares',
    space: '8 × 3 m corredor por par',
    material: '5 cones + 1 bola e 2 coletes',
    setupTime: '1 minuto',
    overview: 'Aqui a criança aprende a enganar o adversário com o corpo: inclina o ombro para um lado, sai pelo outro e passa com a bola controlada. Uma finta simples e eficaz.',
    steps: [
      { number: 1, title: 'Posição inicial', description: 'O atacante fica na linha de partida com a bola. O defensor fica de frente a 4 m.' },
      { number: 2, title: 'Condução até ao cone', description: 'Ao sinal "Já!", o atacante conduz com toques curtos até ao cone-marca a 2 m do defensor.' },
      { number: 3, title: 'A finta de ombro', description: 'No cone, inclina o ombro e o tronco para um lado e olha para lá, como se fosse sair por aí.' },
      { number: 4, title: 'Saída e aceleração', description: 'Com o defensor enganado, empurra a bola para o lado contrário e acelera nos dois primeiros toques.' }
    ],
    markers: [
      { type: 'player', x: 15, y: 50, label: 'Atacante' },
      { type: 'ball', x: 20, y: 50, label: 'Bola' },
      { type: 'cone', x: 45, y: 50, label: 'Cone Finta' },
      { type: 'player', x: 65, y: 50, label: 'Defensor' },
      { type: 'zone', x: 90, y: 50, label: 'Meta' }
    ],
    scoringRules: [
      '1 ponto por passar a meta com a bola controlada.',
      '+1 ponto se a finta de ombro foi bem visível.',
      '0 pontos se a bola sair do corredor.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Defensor estátua', desc: 'Fica parado e não tira a bola, para treinar o movimento.' },
      round2: { title: 'Ronda 2 · Defensor a meio gás', desc: 'Só dá um passo para o lado.' },
      round3: { title: 'Ronda 3 · Defensor a sério', desc: 'Tenta roubar a bola, sem carrinhos.' }
    },
    adjustments: {
      easier: 'Alargue o corredor a 4 m, deixe o defensor estátua.',
      harder: 'Estreite o corredor a 2 m, peça finta e saída com pé fraco.',
      noMaterial: 'Garrafas como cones e uma linha de giz como meta.'
    },
    coachTip: '“O ombro diz uma coisa, o pé faz outra.” Mostre a finta em câmara lenta. Festeje a tentativa, não só o resultado.',
    commonErrors: [
      { error: 'Só olha para a bola', fix: 'Peça que "cumprimente o defensor com os olhos" antes do cone.' },
      { error: 'Não acelera depois', fix: 'Diga "finta devagar, sai rápido".' }
    ],
    observationChecklist: [
      'Bola perto do pé até ao cone',
      'Inclina mesmo o ombro',
      'Acelera depois da finta',
      'Tenta os dois lados',
      'Troca de papel sem parar'
    ],
    safetyTip: 'Piso seco e corredor livre. Nada de carrinhos nem de empurrões.'
  },

  // --- 10 A 13 ANOS ---
  {
    id: 'drill-21',
    number: 21,
    title: 'Sinal e Giro Rápido',
    subtitle: 'Agilidade Reativa e Potência',
    ageGroup: '10-13',
    category: 'Reação e Decisão',
    duration: '3 a 5 m até cada alvo lateral',
    childrenCount: 'Individual em fila',
    space: 'Base + 2 alvos laterais a 3-5 m',
    material: '2 cones + 1 estímulo visual',
    setupTime: '1 minuto',
    overview: 'O jovem começa apontado para o centro e, a cada rodada, reage a um estímulo visual com um giro curto e controlado, seguido de aceleração até ao alvo indicado. Muda de direção sem perder equilíbrio nem quebrar o ritmo.',
    steps: [
      { number: 1, title: 'Base pronta', description: 'Marca a base de partida e os dois alvos laterais, a igual distância do centro.' },
      { number: 2, title: 'Mostra o estímulo', description: 'A cada tentativa, mostra o lado do estímulo só na hora de iniciar, sem avisar antes.' },
      { number: 3, title: 'Giro e aceleração', description: 'Ao sinal, o jovem faz um giro rápido e controlado na direção indicada e acelera até tocar o alvo.' },
      { number: 4, title: 'Regressa e repete', description: 'Volta ao centro em desaceleração limpa e repete do outro lado nas próximas tentativas.' }
    ],
    markers: [
      { type: 'target', x: 25, y: 25, label: 'Alvo Esquerdo' },
      { type: 'player', x: 50, y: 65, label: 'Jogador' },
      { type: 'target', x: 75, y: 25, label: 'Alvo Direito' },
      { type: 'zone', x: 50, y: 20, label: 'Estímulo' }
    ],
    scoringRules: [
      '1 ponto por reagir ao lado certo e tocar o alvo com controlo.',
      '+1 ponto se o giro for curto, sem perder o equilíbrio.',
      '0 pontos se girar para o lado errado ou perder a postura.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Estímulo mais lento', desc: 'Mostra o estímulo com mais antecedência, dando tempo de reação.' },
      round2: { title: 'Ronda 2 · Estímulo normal', desc: 'Mostra o estímulo só na hora de iniciar.' },
      round3: { title: 'Ronda 3 · Estímulo mais rápido', desc: 'Reduz o tempo entre o estímulo e a exigência de reagir.' }
    },
    adjustments: {
      easier: 'Diminui o raio do giro e reduz a distância entre os alvos.',
      harder: 'Aumenta a distância dos alvos e reduz o tempo de mostrar o estímulo.',
      noMaterial: 'Objetos de casa como alvos e folha de papel colorido como estímulo.'
    },
    coachTip: '“Regra de ouro: potência vem com técnica.” Se a postura desaba — tronco inclina demais, joelhos fecham — reduz a velocidade e garante a forma.',
    commonErrors: [
      { error: 'Giro longo e descontrolado', fix: 'Diminui o raio do giro e reduz a distância entre os alvos.' },
      { error: 'Olha só para o chão ao girar', fix: 'Pede para procurar o alvo durante a mudança de direção.' }
    ],
    observationChecklist: [
      'Olhar procura o alvo durante o giro',
      'Apoio do pé na direção do próximo movimento',
      'Tronco estável com leve inclinação à frente',
      'Desacelera antes do contacto com o alvo',
      'Reage sem hesitar'
    ],
    safetyTip: 'Piso seco e alvos livres de obstáculos. Espaço suficiente para desacelerar.'
  },
  {
    id: 'drill-36',
    number: 36,
    title: 'Semáforo de Decisão (Cores no Campo)',
    subtitle: 'Foco Mental, Perceção e Decisão Rápida',
    ageGroup: '10-13',
    category: 'Perceção e Tomada de Decisão',
    duration: '5 a 8 min (ritmo imprevisível)',
    childrenCount: '6 a 16 espalhados pelo espaço',
    space: 'Espaço aberto sem cones fixos',
    material: '1 bola por criança + cartões de cor',
    setupTime: '1 minuto',
    overview: 'Você mostra uma cor e o jovem reage com a ação combinada, mantendo a bola sob controlo e a postura pronta para mudar de direção a qualquer momento.',
    steps: [
      { number: 1, title: 'Define as cores', description: 'Verde = conduzir e avançar 3 a 5 m; amarelo = desacelerar e preparar; vermelho = parar e girar.' },
      { number: 2, title: 'Liga e desliga as cores', description: 'Mostre as cores em sequência imprevisível, a cada 3 a 6 segundos.' },
      { number: 3, title: 'A turma reage', description: 'Cada jogador executa a ação combinada, mantendo a bola sob controlo total.' },
      { number: 4, title: 'Aumenta a imprevisibilidade', description: 'Quando dominarem, reduza o intervalo entre trocas de cor.' }
    ],
    markers: [
      { type: 'zone', x: 50, y: 15, label: 'Treinador com Cores' },
      { type: 'player', x: 25, y: 45, label: 'Ala 1' },
      { type: 'player', x: 50, y: 60, label: 'Pivô' },
      { type: 'player', x: 75, y: 45, label: 'Ala 2' },
      { type: 'ball', x: 28, y: 48, label: 'Bola' },
      { type: 'ball', x: 52, y: 63, label: 'Bola' },
      { type: 'ball', x: 72, y: 48, label: 'Bola' }
    ],
    scoringRules: [
      '1 ponto por reação correta e no tempo certo.',
      '+1 ponto se a bola ficar sob controlo total.',
      '0 pontos se reagir à cor errada.',
      'Repita por 8 a 10 trocas de cor.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Duas cores', desc: 'Comece só com verde e vermelho.' },
      round2: { title: 'Ronda 2 · Três cores', desc: 'Adicione o amarelo como preparação.' },
      round3: { title: 'Ronda 3 · Ritmo imprevisível', desc: 'Troque as cores sem padrão fixo.' }
    },
    adjustments: {
      easier: 'Reduza para 2 cores por 2 minutos antes de somar a terceira.',
      harder: 'Combine as cores com mudança de pé de apoio obrigatória.',
      noMaterial: 'Use objetos coloridos como sinais em qualquer espaço livre.'
    },
    coachTip: '“Cobre decisão, não perfeição.” Se a criança erra, ajuste o sinal e mantenha o ritmo — o objetivo é aprender a escolher rápido.',
    commonErrors: [
      { error: 'Reage com atraso', fix: 'Reduza a velocidade da troca de cores até melhorar.' },
      { error: 'Perde a bola na mudança', fix: 'Peça toques mais curtos na transição entre ações.' }
    ],
    observationChecklist: [
      'Reage rápido à cor mostrada',
      'Executa a ação combinada',
      'Mantém a bola sob controlo',
      'Aceita o ritmo imprevisível',
      'Repete com boa concentração'
    ],
    safetyTip: 'Espaço amplo, sem obstáculos, distância segura entre crianças.'
  },
  {
    id: 'drill-151',
    number: 151,
    title: '2x1 com Mini-Baliza e Zona de Apoio',
    subtitle: 'Jogos Reduzidos com Superioridade Numérica',
    ageGroup: '10-13',
    category: 'Jogos Reduzidos e Tática',
    duration: '30 s por ronda',
    childrenCount: '3 a 9 em grupos de 3',
    space: '8 × 5 m corredor curto',
    material: '6 cones + 1 mini-baliza e 1 bola',
    setupTime: '1 minuto',
    overview: 'Dois atacantes contra um defensor num corredor curto. A dupla pode rematar diretamente ao mini-baliza ou usar a zona de apoio para ganhar tempo e criar ângulo. O defensor tem de ler o portador e proteger o caminho mais provável.',
    steps: [
      { number: 1, title: 'Início no meio', description: 'Os atacantes iniciam com a bola no meio da área curta; o defensor posiciona-se entre a bola e o mini-baliza.' },
      { number: 2, title: 'Remate direto ou apoio', description: 'A dupla pode rematar direto ao mini-baliza ou usar a zona de apoio para ganhar tempo e criar ângulo.' },
      { number: 3, title: 'O defensor lê', description: 'O defensor lê o portador e protege o caminho mais provável até ao mini-baliza.' },
      { number: 4, title: 'Trocar de funções', description: 'O remate vale quando a bola passa pela área do mini-baliza. Troquem de funções a cada tentativa.' }
    ],
    markers: [
      { type: 'player', x: 20, y: 35, label: 'Atacante 1' },
      { type: 'player', x: 20, y: 65, label: 'Atacante 2' },
      { type: 'ball', x: 25, y: 40, label: 'Bola' },
      { type: 'player', x: 55, y: 50, label: 'Defensor' },
      { type: 'zone', x: 50, y: 80, label: 'Zona Apoio' },
      { type: 'goal', x: 88, y: 50, label: 'Mini-Baliza' }
    ],
    scoringRules: [
      '1 ponto por golo.',
      '+1 se usarem a zona de apoio antes de rematar.',
      '-1 se o defensor recuperar a posse.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Defensor passivo', desc: 'Só acompanha e protege o centro.' },
      round2: { title: 'Ronda 2 · Defensor ativo', desc: 'Tenta recuperar e forçar erro.' },
      round3: { title: 'Ronda 3 · Sem zona de apoio', desc: 'Mais difícil: decisão direta em 2 toques.' }
    },
    adjustments: {
      easier: 'Alargue o mini-baliza e deixe o defensor só acompanhar.',
      harder: 'Estreite o mini-baliza e limite os atacantes a 2 toques.',
      noMaterial: 'Casacos como mini-baliza e cones.'
    },
    coachTip: '“Ajuste uma regra por vez.” O segredo é não corrigir muito: ajuste uma regra de cada vez para a criança descobrir a melhor decisão.',
    commonErrors: [
      { error: 'Rematam sem ângulo', fix: 'Peça mais um passe lateral antes de finalizar.' },
      { error: 'Ficam parados', fix: 'Peça movimento sem bola para criar linha de passe.' }
    ],
    observationChecklist: [
      'Cria ângulo antes de rematar',
      'Usa a zona de apoio',
      'Decide depressa',
      'O defensor lê o lance',
      'Troca de funções natural'
    ],
    safetyTip: 'Espaço livre. Sem contacto físico forte.'
  },
  {
    id: 'drill-188',
    number: 188,
    title: 'Guarda-Redes: Saída Curta com os Pés',
    subtitle: 'Jogos Táticos Situacionais 4x4',
    ageGroup: '10-13',
    category: 'Goleiro-Linha e Construção',
    duration: '30 s por ronda',
    childrenCount: '5 em equipa',
    space: '20 × 12 m campo reduzido',
    material: '1 baliza + cones e bolas',
    setupTime: '1 minuto',
    overview: 'O guarda-redes deixa de ser só quem defende: começa a jogada com os pés, como mais um jogador. Duas linhas de apoio recebem a bola curta e ajudam a equipa a sair da pressão com segurança.',
    steps: [
      { number: 1, title: 'Bola ao guarda-redes', description: 'O treinador ou um colega dá a bola ao guarda-redes, como depois de uma defesa.' },
      { number: 2, title: 'Escolher o lado livre', description: 'O guarda-redes olha para os dois apoios e escolhe o lado onde a pressão é menor.' },
      { number: 3, title: 'Passe curto e rasteiro', description: 'Faz um passe curto e rasteiro ao apoio livre, sem arriscar um passe longo ao acaso.' },
      { number: 4, title: 'Continuar a jogada', description: 'O apoio recebe orientado e continua a circular a bola para fora da pressão.' }
    ],
    markers: [
      { type: 'goal', x: 10, y: 50, label: 'Baliza' },
      { type: 'player', x: 18, y: 50, label: 'Guarda-Redes' },
      { type: 'player', x: 45, y: 25, label: 'Apoio Esq.' },
      { type: 'player', x: 45, y: 75, label: 'Apoio Dir.' },
      { type: 'player', x: 65, y: 50, label: 'Pressão 1' }
    ],
    scoringRules: [
      '1 ponto por saída limpa.',
      '+1 se escolher o lado certo.',
      '0 se arriscar um passe longo sem necessidade.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Sem pressão', desc: 'O apoio está livre para construir.' },
      round2: { title: 'Ronda 2 · Com 1 pressionador', desc: 'Fecha um dos lados, obrigando à leitura do lado livre.' },
      round3: { title: 'Ronda 3 · Com 2 pressionadores', desc: 'Fecha os dois lados, exigindo rapidez de decisão.' }
    },
    adjustments: {
      easier: 'Deixe o guarda-redes escolher sempre o lado sem pressão.',
      harder: 'Limite o guarda-redes a 3 segundos para decidir.',
      noMaterial: 'Uma parede como baliza e dois alvos no chão como apoios.'
    },
    coachTip: '“O guarda-redes também joga.” Trate o guarda-redes como o primeiro passador da equipa, não como alguém que só afasta a bola.',
    commonErrors: [
      { error: 'Chuta a bola para a frente sem olhar', fix: 'Peça passe curto e olhos nos apoios laterais.' },
      { error: 'Demora a decidir', fix: 'Conte em voz alta: 1, 2, 3.' }
    ],
    observationChecklist: [
      'Escolhe o lado livre',
      'Passe curto e rasteiro',
      'Apoios oferecem ângulo',
      'Decide depressa',
      'A equipa sai da pressão'
    ],
    safetyTip: 'Sem contacto forte junto à baliza. Pressão só sobre a bola.'
  },
  {
    id: 'drill-196',
    number: 196,
    title: 'Linguagem do Futsal: Pivô, Ala e Fecho',
    subtitle: 'Comunicação Tática e Sistemas',
    ageGroup: '10-13',
    category: 'Sistemas Táticos e Posicionamento',
    duration: '30 s por ronda',
    childrenCount: '8 a 16 em equipa',
    space: '16 × 10 m campo reduzido',
    material: 'Coletes + cones',
    setupTime: '1 minuto',
    overview: 'Antes de jogar em sistema, a equipa precisa de um vocabulário comum. Esta ficha ensina os nomes das posições e dois sistemas simples (2-2 e 3-1), com um jogo curto para os fixar em movimento.',
    steps: [
      { number: 1, title: 'Explicar os nomes', description: 'Explique em voz alta: o pivô joga mais perto da baliza adversária; as alas correm os lados; o fecho fica mais atrás a organizar.' },
      { number: 2, title: 'Sistema 2-2', description: 'Organize a equipa em duas linhas de dois (2-2) e jogue um mini-jogo de posse.' },
      { number: 3, title: 'Sistema 3-1', description: 'Mude para três jogadores numa linha e um mais avançado (3-1) e repita a posse.' },
      { number: 4, title: 'Chamar pelo nome', description: 'Durante o jogo, cada jogador chama o colega pela função: "pivô, aqui!", "ala, vira!".' }
    ],
    markers: [
      { type: 'player', x: 20, y: 50, label: 'Fecho' },
      { type: 'player', x: 50, y: 25, label: 'Ala Esq.' },
      { type: 'player', x: 50, y: 75, label: 'Ala Dir.' },
      { type: 'player', x: 80, y: 50, label: 'Pivô' }
    ],
    scoringRules: [
      '1 ponto por passe ao jogador certo, chamado pelo nome da função.',
      '+1 por manter o sistema pedido.',
      '0 se ninguém chamar pela função.'
    ],
    rounds: {
      round1: { title: 'Ronda 1 · Só nomes', desc: 'Sem sistema fixo, apenas chamar pelo papel.' },
      round2: { title: 'Ronda 2 · Sistema 2-2', desc: 'Duas linhas de dois bem desenhadas.' },
      round3: { title: 'Ronda 3 · Sistema 3-1', desc: 'Três na linha de suporte e um pivô de referência.' }
    },
    adjustments: {
      easier: 'Comece só com os nomes das posições, sem exigir o sistema.',
      harder: 'Troque de sistema a cada 30 segundos sem parar o jogo.',
      noMaterial: 'Quatro amigos e coletes de cores diferentes por função.'
    },
    coachTip: '“O nome vem antes da tática.” Uma equipa que sabe nomear as suas posições entende muito mais depressa qualquer sistema que lhe ensinar depois.',
    commonErrors: [
      { error: 'Ninguém chama pela função', fix: 'Pare e recorde os nomes em voz alta.' },
      { error: 'Confundem pivô com ala', fix: 'Aponte para cada um e mostre a referência de campo.' }
    ],
    observationChecklist: [
      'Sabe o nome da sua função',
      'Chama o colega certo',
      'Mantém o sistema pedido',
      'Circula conforme a posição',
      'Comunica com clareza'
    ],
    safetyTip: 'Sem contacto forte. Jogo de posse tranquilo.'
  }
];
