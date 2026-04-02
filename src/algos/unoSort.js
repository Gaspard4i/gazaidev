// Uno Sort — Reverse, Skip, +4, la partie ne finit jamais
export function* unoSort(arr) {
  const n = arr.length;
  let direction = 1; // 1 = forward, -1 = reverse

  let sorted = false;
  while (!sorted) {
    sorted = true;
    const start = direction === 1 ? 0 : n - 2;
    const end = direction === 1 ? n - 1 : -1;

    for (let i = start; i !== end; i += direction) {
      const j = i + direction;
      if (j < 0 || j >= n) continue;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);

      // Card play
      const card = Math.random();
      if (card < 0.08) {
        // Reverse!
        direction *= -1;
        yield { type: 'compare', indices: [lo, hi], meta: 'uno_reverse' };
        break;
      } else if (card < 0.12) {
        // Skip
        yield { type: 'compare', indices: [lo], meta: 'uno_skip', skipIdx: lo };
        continue;
      } else if (card < 0.15) {
        // +4
        yield { type: 'compare', indices: [lo, hi], meta: 'uno_plus4' };
      }

      yield { type: 'compare', indices: [lo, hi], meta: 'uno_play' };
      if (arr[lo] > arr[hi]) {
        [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
        yield { type: 'swap', indices: [lo, hi], values: [arr[lo], arr[hi]], meta: 'uno_swap' };
        sorted = false;
      }
    }
  }

  // UNO!
  for (let f = 0; f < 12; f++) {
    yield { type: 'compare', indices: [], meta: 'uno_win', frame: f };
  }
}
