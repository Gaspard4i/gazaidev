// Fortnite Sort — Storm ferme, build, loot, eliminate, Victory Royale
export function* fortniteSort(arr) {
  const n = arr.length;
  let alive = n;

  // Selection sort inversee: place les max a la fin (eliminations)
  for (let end = n - 1; end > 0; end--) {
    // Storm closing
    const stormProgress = 1 - end / (n - 1);
    yield { type: 'compare', indices: [], meta: 'fn_storm', stormProgress, alive };

    // Loot phase — scan
    let maxIdx = 0;
    for (let j = 1; j <= end; j++) {
      yield { type: 'compare', indices: [j, maxIdx], meta: 'fn_loot', stormProgress, alive };
      if (arr[j] > arr[maxIdx]) maxIdx = j;
    }

    if (maxIdx !== end) {
      // Build wall
      for (let f = 0; f < 3; f++) {
        yield { type: 'compare', indices: [maxIdx], meta: 'fn_build', buildIdx: maxIdx, frame: f, stormProgress, alive };
      }
      // Eliminate
      [arr[maxIdx], arr[end]] = [arr[end], arr[maxIdx]];
      yield { type: 'swap', indices: [maxIdx, end], values: [arr[maxIdx], arr[end]], meta: 'fn_elim', stormProgress, alive };
    }
    alive--;
  }

  // #1 Victory Royale
  for (let f = 0; f < 18; f++) {
    yield { type: 'compare', indices: [], meta: 'fn_victory', frame: f };
  }
}
