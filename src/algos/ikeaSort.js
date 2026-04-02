// IKEA Sort — Instructions pas claires, monte a l'envers, recommence, fini
export function* ikeaSort(arr) {
  const n = arr.length;

  // Phase 1: ouvre le carton
  for (let f = 0; f < 6; f++) {
    yield { type: 'compare', indices: [], meta: 'ikea_open', frame: f };
  }

  // Phase 2: lit les instructions (compare tout mais comprend rien)
  for (let i = 0; i < Math.min(n, 8); i++) {
    yield { type: 'compare', indices: [i], meta: 'ikea_confused', confIdx: i };
  }

  // Phase 3: assemble a l'envers — trie en reverse
  for (let i = 0; i < n; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, maxIdx], meta: 'ikea_build' };
      if (arr[j] > arr[maxIdx]) maxIdx = j;
    }
    if (maxIdx !== i) {
      [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]];
      yield { type: 'swap', indices: [i, maxIdx], values: [arr[i], arr[maxIdx]], meta: 'ikea_wrong' };
    }
  }

  // Phase 4: "attends c'est a l'envers" — regarde les instructions
  for (let f = 0; f < 8; f++) {
    yield { type: 'compare', indices: [], meta: 'ikea_realize', frame: f };
  }

  // Phase 5: recommence correctement
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'ikea_rebuild' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'ikea_fix' };
    }
  }

  // Piece en trop
  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'ikea_leftover', frame: f };
  }
}
