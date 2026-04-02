// Pokemon Sort — Wild bar appeared! Catch, battle, Pokedex
export function* pokemonSort(arr) {
  const n = arr.length;
  let caught = 0;

  for (let i = 1; i < n; i++) {
    // Wild bar appeared!
    for (let f = 0; f < 5; f++) {
      yield { type: 'compare', indices: [i], meta: 'poke_wild', wildIdx: i, caught, frame: f };
    }

    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // Battle!
      yield { type: 'compare', indices: [j, j - 1], meta: 'poke_battle', caught };

      // Throw pokeball
      for (let f = 0; f < 4; f++) {
        yield { type: 'compare', indices: [j], meta: 'poke_catch', catchIdx: j, frame: f, caught };
      }

      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'poke_caught', caught };
      j--;
    }
    caught++;

    // Registered in Pokedex
    yield { type: 'compare', indices: [j], meta: 'poke_registered', registeredIdx: j, caught };
  }

  // Gotta catch 'em all!
  for (let f = 0; f < 18; f++) {
    yield { type: 'compare', indices: [], meta: 'poke_master', frame: f, caught };
  }
}
