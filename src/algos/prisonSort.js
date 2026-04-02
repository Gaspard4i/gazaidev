// Prison Sort — Barres enfermees, liberees par bonne conduite (dans l'ordre)
export function* prisonSort(arr) {
  const n = arr.length;

  // Phase 1: Incarceration
  for (let f = 0; f < 8; f++) {
    yield { type: 'compare', indices: [], meta: 'prison_lock', frame: f };
  }

  // Phase 2: Liberation par bonne conduite — les plus petites d'abord
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'prison_review' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      yield { type: 'compare', indices: [minIdx], meta: 'prison_release', releaseIdx: minIdx };
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'prison_free' };
    } else {
      yield { type: 'compare', indices: [i], meta: 'prison_good', goodIdx: i };
    }

    // Riot random
    if (Math.random() < 0.15) {
      const a = Math.floor(Math.random() * n);
      const b = Math.floor(Math.random() * n);
      yield { type: 'compare', indices: [a, b], meta: 'prison_riot' };
    }
  }

  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'prison_escape', frame: f };
  }
}
