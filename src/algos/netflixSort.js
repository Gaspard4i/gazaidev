// Netflix Sort — "Are you still sorting?" pause toutes les X operations
export function* netflixSort(arr) {
  const n = arr.length;
  let ops = 0;

  for (let i = 1; i < n; i++) {
    yield { type: 'compare', indices: [i], meta: 'netflix_play' };

    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1] };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'netflix_watch' };
      ops++;
      j--;

      // "Are you still sorting?"
      if (ops % 12 === 0) {
        for (let f = 0; f < 12; f++) {
          yield { type: 'compare', indices: [], meta: 'netflix_pause', frame: f };
        }
        // Continue watching
        yield { type: 'compare', indices: [], meta: 'netflix_continue' };
      }
    }
  }

  // Credits
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'netflix_credits', frame: f };
  }
}
