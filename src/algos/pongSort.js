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

  // Phase 3 : trier les 3 entites (paddle gauche, balle, paddle droite) par taille
  // [60, 20, 80] -> [20, 60, 80]
  const entities = [paddleL, ballSize, paddleR];
  entities.sort((a, b) => a - b);
  arr.length = 0;
  for (let i = 0; i < entities.length; i++) {
    arr.push(entities[i]);
    yield { type: 'swap', indices: [i], values: [entities[i]], meta: 'pong_sort_final' };
  }

  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [0, 1, 2], meta: 'pong_sorted' };
  }
}
