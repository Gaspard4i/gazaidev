// Mewing Sort — Les barres mew pour ameliorer leur jawline (position)
// Les recessed normies restent en bas
export function* mewingSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    // Find the min (biggest normie) for position i
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'mewing_compare' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // This bar has been mewing — jaw is sharp, move up
      for (let f = 0; f < 6; f++) {
        yield { type: 'compare', indices: [minIdx], meta: 'mewing_glow', mewIdx: minIdx, mewFrame: f };
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'mewing_ascend' };
    } else {
      // Already in place — natural chad
      yield { type: 'compare', indices: [i], meta: 'mewing_chad', mewIdx: i };
    }
  }
}
