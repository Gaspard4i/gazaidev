// Elon Sort — Rachete le tableau, vire 80% des barres, renomme en X Sort
export function* elonSort(arr) {
  const n = arr.length;

  // Phase 1: "I'm buying this array" — inspect all
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'elon_buying', frame: f };
  }

  // Phase 2: fire 80% — garde seulement les top 20%
  const sorted = [...arr].map((v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
  const keepCount = Math.max(2, Math.ceil(n * 0.2));
  const keepIndices = new Set(sorted.slice(0, keepCount).map(x => x.i));

  for (let i = 0; i < n; i++) {
    if (!keepIndices.has(i)) {
      yield { type: 'compare', indices: [i], meta: 'elon_fire', fireIdx: i };
      arr[i] = 0;
      yield { type: 'swap', indices: [i], values: [0], meta: 'elon_fired' };
    } else {
      yield { type: 'compare', indices: [i], meta: 'elon_keep', keepIdx: i };
    }
  }

  // Phase 3: rename to X
  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'elon_rename', frame: f };
  }

  // Phase 4: sort what's left (quick)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]], meta: 'elon_sort' };
      }
    }
  }

  // "This is the best sort. Mars next."
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'elon_mars', frame: f };
  }
}
