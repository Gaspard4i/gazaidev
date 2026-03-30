// Autism Sort — HIGH IQ animation puis la liste est instantanement triee
// Phase 1 : analyse intense de chaque element (scanning tres detaille)
// Phase 2 : animation "HIGH IQ" / "calculating..."
// Phase 3 : *snap* tout est trie instantanement
export function* autismSort(arr) {
  // Phase 1 : analyse hyper-detaillee de chaque element
  for (let i = 0; i < arr.length; i++) {
    // Regarde chaque element 3 fois
    yield { type: 'compare', indices: [i], meta: 'analyzing' };
    yield { type: 'compare', indices: [i], meta: 'analyzing' };
    yield { type: 'compare', indices: [i], meta: 'analyzing' };
  }

  // Phase 2 : "calculating..." — le cerveau tourne
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'calculating', calcFrame: f };
  }

  // Phase 3 : HIGH IQ moment
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [], meta: 'high_iq', iqFrame: f };
  }

  // Phase 4 : tri instantane — on place tout d'un coup
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sorted[i];
  }
  // Revealer une barre a la fois (comme si elles se placent)
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'swap', indices: [i], values: [arr[i]], meta: 'placed' };
  }
}
