// Monopoly Sort — Achete, vend, hypotheque, va en prison
export function* monopolySort(arr) {
  const n = arr.length;
  let money = 1500;

  for (let i = 0; i < n; i++) {
    // Lance les des
    const dice = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    yield { type: 'compare', indices: [i], meta: 'mono_dice', dice, money };

    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'mono_inspect', money };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Buy the property
      const cost = arr[minIdx] * 10;
      money -= cost;
      yield { type: 'compare', indices: [minIdx], meta: money < 0 ? 'mono_bankrupt' : 'mono_buy', cost, money };

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'mono_trade' };
      money += 200; // pass GO
    }

    // Go to jail random
    if (dice === 12) {
      for (let f = 0; f < 5; f++) {
        yield { type: 'compare', indices: [i], meta: 'mono_jail', frame: f };
      }
    }
  }
}
