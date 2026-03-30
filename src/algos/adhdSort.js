// ADHD Sort — Trie normalement mais se distrait regulierement
// S'arrete, bouge 2-3 barres au hasard, regarde ailleurs, puis reprend
export function* adhdSort(arr) {
  let focusCounter = 0;
  const distractEvery = 15 + Math.floor(Math.random() * 10);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      focusCounter++;

      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }

      // Distraction !
      if (focusCounter >= distractEvery) {
        focusCounter = 0;

        // Pause — regarde ailleurs
        for (let f = 0; f < 15; f++) {
          yield { type: 'compare', indices: [], meta: 'distracted' };
        }

        // Bouge 2-3 barres au hasard (oups)
        const moves = 2 + Math.floor(Math.random() * 2);
        for (let m = 0; m < moves; m++) {
          const a = Math.floor(Math.random() * arr.length);
          const b = Math.floor(Math.random() * arr.length);
          yield { type: 'compare', indices: [a, b], meta: 'fidgeting' };
          [arr[a], arr[b]] = [arr[b], arr[a]];
          yield { type: 'swap', indices: [a, b], values: [arr[a], arr[b]], meta: 'fidgeting' };
        }

        // "Ah oui, je triais" — reprend
        for (let f = 0; f < 5; f++) {
          yield { type: 'compare', indices: [], meta: 'refocusing' };
        }
      }
    }
  }
}
