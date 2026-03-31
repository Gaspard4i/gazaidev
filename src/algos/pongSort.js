// Pong Sort — Une vraie partie de pong simulee
// 2 paddles + 1 balle carree jouent jusqu'a ce qu'un bot perde
// A la fin on "trie" les 3 entites (2 paddles + balle) par taille
export function* pongSort(arr) {
  // On ignore le tableau original — on simule un pong
  // Balle et paddles ont des hauteurs differentes
  const paddleL = 60;  // taille paddle gauche
  const paddleR = 80;  // taille paddle droite
  const ballSize = 20; // taille balle

  // Remplacer le tableau par les 3 entites
  arr.length = 0;
  arr.push(paddleL, ballSize, paddleR);

  // Etat du jeu
  let ballX = 0.5, ballY = 0.5;
  let ballDX = 0.02, ballDY = 0.015;
  let padLY = 0.5, padRY = 0.5;
  let scoreL = 0, scoreR = 0;
  const winScore = 3;

  // Phase 1 : le jeu de pong
  while (scoreL < winScore && scoreR < winScore) {
    // Bouger la balle
    ballX += ballDX;
    ballY += ballDY;

    // Rebond haut/bas
    if (ballY <= 0.05 || ballY >= 0.95) ballDY *= -1;

    // IA des paddles (suivent la balle avec un peu de retard)
    padLY += (ballY - padLY) * 0.08;
    padRY += (ballY - padRY) * 0.06; // droite un peu plus lente

    // Rebond paddle gauche
    if (ballX <= 0.08 && Math.abs(ballY - padLY) < 0.12) {
      ballDX = Math.abs(ballDX) * 1.05;
      ballDY += (ballY - padLY) * 0.1;
    }
    // Rebond paddle droite
    if (ballX >= 0.92 && Math.abs(ballY - padRY) < 0.12) {
      ballDX = -Math.abs(ballDX) * 1.05;
      ballDY += (ballY - padRY) * 0.1;
    }

    // Score
    if (ballX < 0) {
      scoreR++;
      ballX = 0.5; ballY = 0.5;
      ballDX = 0.02; ballDY = 0.015 * (Math.random() > 0.5 ? 1 : -1);
      for (let f = 0; f < 20; f++) {
        yield { type: 'compare', indices: [], meta: 'pong_score_r', scoreL, scoreR };
      }
    }
    if (ballX > 1) {
      scoreL++;
      ballX = 0.5; ballY = 0.5;
      ballDX = -0.02; ballDY = 0.015 * (Math.random() > 0.5 ? 1 : -1);
      for (let f = 0; f < 20; f++) {
        yield { type: 'compare', indices: [], meta: 'pong_score_l', scoreL, scoreR };
      }
    }

    // Limiter la vitesse
    ballDX = Math.max(-0.04, Math.min(0.04, ballDX));
    ballDY = Math.max(-0.03, Math.min(0.03, ballDY));

    yield {
      type: 'compare', indices: [],
      meta: 'pong_play',
      ballX, ballY, padLY, padRY, scoreL, scoreR,
    };
  }

  // Phase 2 : game over
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'pong_gameover', winner: scoreL >= winScore ? 'left' : 'right', scoreL, scoreR };
  }

  // Phase 3 : les entites se transforment en barres et volent vers leur position triee
  // Positions initiales : paddle L a gauche, balle au centre, paddle R a droite
  // Positions finales triees par taille : [balle(20), paddleL(60), paddleR(80)]
  const entities = [
    { label: 'Paddle L', size: paddleL, startX: 0.05, startY: padLY },
    { label: 'Ball',     size: ballSize, startX: ballX,  startY: ballY },
    { label: 'Paddle R', size: paddleR, startX: 0.92, startY: padRY },
  ];
  // Trier par taille pour determiner les positions cibles
  const sorted = [...entities].sort((a, b) => a.size - b.size);
  const targetXs = [0.2, 0.5, 0.8]; // 3 positions cibles centrees

  // Animation de transition : 60 frames (~1s)
  const transFrames = 60;
  for (let f = 0; f <= transFrames; f++) {
    const t = f / transFrames;
    // Easing ease-in-out
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const positions = sorted.map((ent, i) => ({
      size: ent.size,
      label: ent.label,
      x: ent.startX + (targetXs[i] - ent.startX) * ease,
      y: ent.startY + (0.85 - ent.startY) * ease, // descendent vers le bas
      morphProgress: ease, // 0 = forme pong, 1 = barre
    }));

    yield { type: 'compare', indices: [], meta: 'pong_transform', positions, frame: f };
  }

  // Phase 4 : les barres sont en place — pause finale
  arr.length = 0;
  for (const ent of sorted) arr.push(ent.size);

  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [0, 1, 2], meta: 'pong_sorted' };
  }
}
