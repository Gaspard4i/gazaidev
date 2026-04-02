// GTA Sort — Vole les barres, evade la police, 5 etoiles
export function* gtaSort(arr) {
  const n = arr.length;
  let stars = 0;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'gta_drive', stars };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Steal the bar
      stars = Math.min(5, stars + 1);
      yield { type: 'compare', indices: [minIdx], meta: 'gta_steal', stealIdx: minIdx, stars };
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'gta_escape', stars };
    }

    // Police chase at high stars
    if (stars >= 3) {
      for (let f = 0; f < 4; f++) {
        yield { type: 'compare', indices: [], meta: 'gta_wanted', stars, frame: f };
      }
      stars = Math.max(0, stars - 2);
    }
  }

  for (let f = 0; f < 12; f++) {
    yield { type: 'compare', indices: [], meta: 'gta_wasted', frame: f };
  }
}
