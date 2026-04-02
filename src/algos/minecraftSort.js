// Minecraft Sort — Mine les barres, craft les en ordre
export function* minecraftSort(arr) {
  const n = arr.length;

  // Phase 1: Mining — casser les barres (selection sort: find min, "mine" it)
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'mc_scan' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      // Mine the block
      for (let f = 0; f < 4; f++) {
        yield { type: 'compare', indices: [minIdx], meta: 'mc_mine', mineIdx: minIdx, mineFrame: f };
      }
      // Place the block
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'mc_place', placeIdx: i };
    } else {
      yield { type: 'compare', indices: [i], meta: 'mc_diamond', diamondIdx: i };
    }
  }

  // Creeper ending
  for (let f = 0; f < 12; f++) {
    yield { type: 'compare', indices: [], meta: 'mc_creeper', frame: f };
  }
}
