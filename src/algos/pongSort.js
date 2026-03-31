// Pong Sort — Un jeu de pong entre 2 barres
// Quand le bot 1 perd, les 2 barres sont triees (swappees si necessaire)
// Puis on passe aux 2 barres suivantes
export function* pongSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    yield { type: 'compare', indices: [i, i + 1], meta: 'pong_start' };

    // Simuler une partie de pong entre arr[i] et arr[i+1]
    // La balle fait des allers-retours
    const rallies = 8 + Math.floor(Math.random() * 12);
    for (let r = 0; r < rallies; r++) {
      const direction = r % 2 === 0 ? 'right' : 'left';
      yield {
        type: 'compare',
        indices: [i, i + 1],
        meta: 'pong_rally',
        ballX: direction === 'right' ? r / rallies : 1 - r / rallies,
        ballY: 0.3 + Math.sin(r * 0.8) * 0.3,
        leftPaddle: i,
        rightPaddle: i + 1,
      };
    }

    // Le bot de gauche perd (ou droite) — on trie
    yield { type: 'compare', indices: [i, i + 1], meta: 'pong_score' };

    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'pong_swap' };
    }
  }

  // Plusieurs passes (comme bubble sort mais en pong)
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      // Mini pong rapide
      for (let r = 0; r < 4; r++) {
        yield {
          type: 'compare',
          indices: [i, i + 1],
          meta: 'pong_rally',
          ballX: r / 4,
          ballY: 0.4 + Math.sin(r) * 0.2,
          leftPaddle: i,
          rightPaddle: i + 1,
        };
      }
      yield { type: 'compare', indices: [i, i + 1], meta: 'pong_score' };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]] };
        swapped = true;
      }
    }
  }
}
