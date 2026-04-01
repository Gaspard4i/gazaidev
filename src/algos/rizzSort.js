// Rizz Sort — Chaque barre tente de rizz sa voisine pour la convaincre de swap
export function* rizzSort(arr) {
  const n = arr.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      // Attempt rizz
      const rizzSuccess = arr[i] > arr[i + 1];
      yield { type: 'compare', indices: [i, i + 1], meta: rizzSuccess ? 'rizz_success' : 'rizz_fail', rizzIdx: i };

      if (rizzSuccess) {
        // W rizz — she moved
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'rizz_swap' };
        sorted = false;
      } else {
        // L rizz — no game
        yield { type: 'compare', indices: [i, i + 1], meta: 'rizz_rejected' };
      }
    }
  }
}
