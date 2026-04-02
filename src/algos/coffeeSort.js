// Coffee Sort — Sans cafe = ultra lent, avec cafe = speed demon
export function* coffeeSort(arr) {
  const n = arr.length;
  let caffeine = 0;

  // Phase 1: no coffee — zombie mode, swap 1 par 1 tres lentement
  for (let i = 0; i < Math.min(5, n); i++) {
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [i, j], meta: 'coffee_sleepy', caffeine: 0 };
      // Trop fatigue, fait rien
    }
    yield { type: 'compare', indices: [i], meta: 'coffee_yawn' };
  }

  // Phase 2: prend un cafe
  for (let f = 0; f < 8; f++) {
    yield { type: 'compare', indices: [], meta: 'coffee_drink', frame: f };
  }
  caffeine = 100;

  // Phase 3: SPEED — tri ultra rapide (meme algo mais pas de pauses)
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'coffee_wired', caffeine };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'coffee_zoom' };
    }
    caffeine = Math.max(0, caffeine - 5);
  }
}
