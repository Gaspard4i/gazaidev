// Fortnite Sort — Storm shrinks, bars build walls, last one standing
export function* fortniteSort(arr) {
  const n = arr.length;

  // Storm closing in from right — sort from right to left (cocktail-ish)
  for (let end = n - 1; end > 0; end--) {
    // Storm circle
    yield { type: 'compare', indices: [], meta: 'fn_storm', stormEdge: end };

    // Find max in unsorted zone
    let maxIdx = 0;
    for (let j = 1; j <= end; j++) {
      yield { type: 'compare', indices: [j, maxIdx], meta: 'fn_loot' };
      if (arr[j] > arr[maxIdx]) maxIdx = j;
    }

    if (maxIdx !== end) {
      // Build wall + ramp
      yield { type: 'compare', indices: [maxIdx], meta: 'fn_build', buildIdx: maxIdx };
      [arr[maxIdx], arr[end]] = [arr[end], arr[maxIdx]];
      yield { type: 'swap', indices: [maxIdx, end], values: [arr[maxIdx], arr[end]], meta: 'fn_elim' };
    }
  }

  // Victory Royale
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'fn_victory', frame: f };
  }
}
