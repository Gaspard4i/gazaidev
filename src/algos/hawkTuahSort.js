// Hawk Tuah Sort — Spit on that thang to slide it into place
export function* hawkTuahSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    // Hawk tuah! Spit on the bar
    yield { type: 'compare', indices: [j], meta: 'tuah_spit', spitIdx: j };

    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1], meta: 'tuah_slide' };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'tuah_slide' };
      j--;
    }
    // Lands in place
    yield { type: 'compare', indices: [j], meta: 'tuah_land', landIdx: j };
  }
}
