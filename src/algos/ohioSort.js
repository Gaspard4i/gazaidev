// Ohio Sort — Only in Ohio. Chaos absolu puis tri par accident.
export function* ohioSort(arr) {
  const n = arr.length;

  // Phase 1: Ohio chaos — random swaps, teleportation
  const chaosRounds = n * 2;
  for (let r = 0; r < chaosRounds; r++) {
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    yield { type: 'compare', indices: [i, j], meta: 'ohio_chaos', ohioEvent: ['teleport', 'fusion', 'glitch', 'reverse'][r % 4] };

    // Parfois on swap, parfois non (c'est l'Ohio)
    if (Math.random() < 0.5 && arr[i] > arr[j]) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]], meta: 'ohio_swap' };
    }
  }

  // Phase 2: "wait it actually sorted itself??"
  // Finish with a real sort
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [i, j], meta: 'ohio_confused' };
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]], meta: 'ohio_wtf' };
      }
    }
  }

  // "Only in Ohio"
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'ohio_finale', frame: f };
  }
}
