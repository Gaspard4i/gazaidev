// Rocket League Sort — Boost, bump, aerial, "What a save!"
export function* rocketLeagueSort(arr) {
  const n = arr.length;

  let sorted = false;
  let pass = 0;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1 - pass; i++) {
      // Boost toward
      yield { type: 'compare', indices: [i, i + 1], meta: 'rl_boost', boostIdx: i };

      if (arr[i] > arr[i + 1]) {
        // Bump!
        yield { type: 'compare', indices: [i, i + 1], meta: 'rl_bump', bumpIdx: i };
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'rl_goal' };
        sorted = false;
      }
    }
    pass++;
  }

  // What a save!
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'rl_whs', frame: f };
  }
}
