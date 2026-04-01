// Brainrot Sort — Enchaine les references meme a chaque step
// Le tri avance a peine mais le brainrot est maximal
export function* brainrotSort(arr) {
  const n = arr.length;
  const memes = ['skibidi', 'rizz', 'sigma', 'fanum tax', 'gyatt', 'ohio', 'mewing', 'hawk tuah', 'griddy', 'bussin', 'no cap', 'slay', 'ong', 'lowkey', 'highkey'];
  let memeIdx = 0;

  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      const meme = memes[memeIdx % memes.length];
      memeIdx++;

      yield { type: 'compare', indices: [i, i + 1], meta: 'brainrot_meme', memeText: meme };

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'brainrot_swap', memeText: meme };
        sorted = false;
      }

      // Brainrot pause — perd le focus toutes les ~7 operations
      if (memeIdx % 7 === 0) {
        for (let f = 0; f < 8; f++) {
          yield { type: 'compare', indices: [], meta: 'brainrot_pause', memeText: memes[Math.floor(Math.random() * memes.length)], pauseFrame: f };
        }
      }
    }
  }
}
