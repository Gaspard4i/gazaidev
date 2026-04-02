// Breaking Bad Sort — Cook the purest sort. Purity increases each pass.
export function* breakingBadSort(arr) {
  const n = arr.length;

  // Selection sort — purity augmente a chaque element place
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    const purity = Math.round(((i + 1) / n) * 991) / 10; // 0 → 99.1%

    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'bb_cook', purity };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Crystal formation
      yield { type: 'compare', indices: [minIdx], meta: 'bb_crystal', purity, crystalIdx: minIdx };
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'bb_pure', purity };
    } else {
      yield { type: 'compare', indices: [i], meta: 'bb_pure', purity };
    }
  }

  // I am the one who knocks
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'bb_heisenberg', frame: f, purity: 99.1 };
  }
}
