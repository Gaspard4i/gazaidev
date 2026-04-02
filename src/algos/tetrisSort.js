// Tetris Sort — Les barres tombent du haut et s'emboitent
export function* tetrisSort(arr) {
  const n = arr.length;

  // Trie par insertion — chaque barre "tombe" a sa place
  for (let i = 1; i < n; i++) {
    // Barre apparait en haut
    for (let f = 0; f < 3; f++) {
      yield { type: 'compare', indices: [i], meta: 'tetris_fall', fallIdx: i, fallFrame: f };
    }

    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1], meta: 'tetris_slide' };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'tetris_move' };
      j--;
    }

    // Lock in place
    yield { type: 'compare', indices: [j], meta: 'tetris_lock', lockIdx: j };

    // Line clear if a section is sorted
    if (i > 0 && i % 5 === 0) {
      for (let f = 0; f < 4; f++) {
        yield { type: 'compare', indices: [], meta: 'tetris_clear', frame: f };
      }
    }
  }

  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'tetris_win', frame: f };
  }
}
