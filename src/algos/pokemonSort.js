// Pokemon Sort — Catch bars, sort by Pokedex number
export function* pokemonSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    // Wild bar appeared!
    yield { type: 'compare', indices: [i], meta: 'poke_wild', wildIdx: i };

    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1], meta: 'poke_battle' };
      // Throw pokeball
      yield { type: 'compare', indices: [j], meta: 'poke_catch', catchIdx: j };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'poke_caught' };
      j--;
    }
  }

  // Gotta catch 'em all!
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'poke_master', frame: f };
  }
}
