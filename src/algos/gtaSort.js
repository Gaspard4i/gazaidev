// GTA Sort — Vole les barres, niveau de recherche, police, WASTED
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
      // Vol!
      stars = Math.min(5, stars + 1);
      for (let f = 0; f < 3; f++) {
        yield { type: 'compare', indices: [minIdx], meta: 'gta_steal', stealIdx: minIdx, stars, frame: f };
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'gta_escape', stars };
    }

    // Police chase a 3+ etoiles
    if (stars >= 3) {
      for (let f = 0; f < 6; f++) {
        yield { type: 'compare', indices: [], meta: 'gta_wanted', stars, frame: f };
      }
      stars = Math.max(0, stars - 2);
    }
  }

  // WASTED
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'gta_wasted', frame: f };
  }
}
