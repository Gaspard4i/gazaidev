// Skibidi Sort — Les barres-toilettes flush les elements mal places
export function* skibidiSort(arr) {
  const n = arr.length;
  // Intro: skibidi dop dop dop yes yes
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'skibidi_intro', frame: f };
  }

  // Bubble sort mais chaque swap est un "flush"
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1], meta: 'skibidi_scan', scanIdx: i };
      if (arr[i] > arr[i + 1]) {
        // Flush animation
        for (let f = 0; f < 5; f++) {
          yield { type: 'swap', indices: [i, i + 1], meta: 'skibidi_flush', flushIdx: i, flushFrame: f };
        }
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  }

  // Victory: skibidi toilet army
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'skibidi_victory', frame: f };
  }
}
