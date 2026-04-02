// Breaking Bad Sort — Cook the purest sort. I am the one who sorts.
export function* breakingBadSort(arr) {
  const n = arr.length;

  // Phase 1: Cooking — each pass increases purity
  let purity = 0;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'bb_cook', purity: Math.round(purity) };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'bb_crystal' };
    }
    purity = ((i + 1) / n) * 99.1;
    yield { type: 'compare', indices: [i], meta: 'bb_pure', purity: Math.round(purity * 10) / 10 };
  }

  // I am the one who knocks
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'bb_heisenberg', frame: f, purity: 99.1 };
  }
}
