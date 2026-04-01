// Fanum Tax Sort — Prend un pourcentage de chaque barre
// Les barres retrecissent progressivement jusqu'a l'egalite
export function* fanumTaxSort(arr) {
  const n = arr.length;

  // Phase 1: sort normalement mais taxe a chaque swap
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'fanum_inspect' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'fanum_tax', taxIdx: minIdx };
    }
  }

  // Phase 2: Fanum takes his tax — shrink all bars toward the average
  const avg = Math.round(arr.reduce((a, b) => a + b, 0) / n);
  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < n; i++) {
      if (arr[i] > avg) {
        const oldVal = arr[i];
        arr[i] = Math.max(avg, Math.round(arr[i] * 0.8));
        yield { type: 'swap', indices: [i], values: [arr[i]], meta: 'fanum_steal', taxAmount: oldVal - arr[i] };
      }
    }
  }
}
