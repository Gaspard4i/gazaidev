// Valorant Sort — Peek, headshot, clutch
export function* valorantSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    // Peek
    yield { type: 'compare', indices: [i], meta: 'valo_peek', peekIdx: i };

    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [i, j], meta: 'valo_aim' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Headshot
      yield { type: 'compare', indices: [minIdx], meta: 'valo_headshot', hsIdx: minIdx };
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'valo_kill' };
    }

    // Ace check
    if (i === n - 1) {
      for (let f = 0; f < 15; f++) {
        yield { type: 'compare', indices: [], meta: 'valo_ace', frame: f };
      }
    }
  }
}
