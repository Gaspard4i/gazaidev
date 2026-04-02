// Seaweed Sort — Les barres ondulent comme des algues sous l'eau
export function* seaweedSort(arr) {
  const n = arr.length;

  // Bubble sort — les bulles remontent naturellement
  let swapped = true;
  let pass = 0;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1 - pass; i++) {
      yield { type: 'compare', indices: [i, i + 1], meta: 'seaweed_sway' };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'seaweed_sway' };
        swapped = true;
      }
    }
    pass++;
  }
}
