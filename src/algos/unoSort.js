// Uno Sort — Trie un jeu de cartes UNO
// Reverse change la direction, Skip saute, +4 ajoute du chaos
export function* unoSort(arr) {
  const n = arr.length;
  let direction = 1; // 1 = gauche→droite, -1 = reverse
  let skipNext = false;

  let sorted = false;
  let pass = 0;
  while (!sorted && pass < n * n) {
    sorted = true;
    pass++;

    // Tirer une carte speciale aleatoirement
    const specialRoll = Math.random();
    if (specialRoll < 0.06) {
      // REVERSE!
      direction *= -1;
      for (let f = 0; f < 6; f++) {
        yield { type: 'compare', indices: [], meta: 'uno_reverse', direction, frame: f };
      }
      continue;
    } else if (specialRoll < 0.1) {
      // SKIP
      for (let f = 0; f < 4; f++) {
        yield { type: 'compare', indices: [], meta: 'uno_skip', frame: f };
      }
      continue;
    } else if (specialRoll < 0.13) {
      // +4 — melange 4 barres au hasard (chaos)
      for (let f = 0; f < 5; f++) {
        yield { type: 'compare', indices: [], meta: 'uno_plus4', frame: f };
      }
      for (let c = 0; c < 4; c++) {
        const a = Math.floor(Math.random() * n);
        const b = Math.floor(Math.random() * n);
        if (a !== b) {
          [arr[a], arr[b]] = [arr[b], arr[a]];
          yield { type: 'swap', indices: [a, b], values: [arr[a], arr[b]], meta: 'uno_plus4_swap' };
          sorted = false;
        }
      }
      continue;
    }

    // Passe normale dans la direction actuelle
    const start = direction === 1 ? 0 : n - 2;
    const end = direction === 1 ? n - 1 : -1;

    for (let i = start; i !== end; i += direction) {
      const j = i + direction;
      if (j < 0 || j >= n) continue;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);

      yield { type: 'compare', indices: [lo, hi], meta: 'uno_play' };

      if (arr[lo] > arr[hi]) {
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
        yield { type: 'swap', indices: [lo, hi], values: [arr[lo], arr[hi]], meta: 'uno_swap' };
        sorted = false;
      }
    }
  }

  // UNO!
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'uno_win', frame: f };
  }
}
