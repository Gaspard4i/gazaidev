// 67 Sort — Ne garde que les 6 et les 7
// Phase 1 : supprime tout ce qui n'est pas 6 ou 7
// Phase 2 : a la fin il ne reste que 6 et 7 et on les echange 4 fois
export function* sort67(arr) {
  // Phase 1 : purge — seuls les 6 et 7 survivent
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'evaluate' };
    if (arr[i] !== 6 && arr[i] !== 7) {
      yield { type: 'swap', indices: [i], values: [0], meta: 'purge' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : vider jusqu'a n'avoir que 2 elements
  while (arr.length > 2) {
    const last = arr.length - 1;
    yield { type: 'swap', indices: [last], values: [0], meta: 'trim' };
    arr.splice(last, 1);
  }

  // S'assurer qu'on a exactement [6, 7]
  if (arr.length === 0) { arr.push(6, 7); }
  if (arr.length === 1) { arr.push(arr[0] === 6 ? 7 : 6); }
  arr[0] = 6;
  arr[1] = 7;
  yield { type: 'swap', indices: [0], values: [6], meta: 'force' };
  yield { type: 'swap', indices: [1], values: [7], meta: 'force' };

  // Pause — contempler le 6 et le 7
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [0, 1], meta: 'admire' };
  }

  // Phase 3 : echanger 6 et 7 quatre fois d'affilee, lentement
  for (let round = 0; round < 4; round++) {
    // Pause avant chaque echange
    for (let f = 0; f < 20; f++) {
      yield { type: 'compare', indices: [0, 1], meta: 'evaluate' };
    }
    [arr[0], arr[1]] = [arr[1], arr[0]];
    yield { type: 'swap', indices: [0, 1], values: [arr[0], arr[1]], meta: 'force' };
    // Pause apres chaque echange
    for (let f = 0; f < 15; f++) {
      yield { type: 'compare', indices: [0, 1], meta: 'admire' };
    }
  }
}
