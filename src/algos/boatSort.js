// Boat Sort — Les barres flottent ou coulent selon leur poids
export function* boatSort(arr) {
  const n = arr.length;

  // Les plus legeres flottent, les lourdes coulent
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'boat_float' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      yield { type: 'compare', indices: [minIdx], meta: 'boat_sink', sinkIdx: minIdx };
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'boat_splash' };
    } else {
      yield { type: 'compare', indices: [i], meta: 'boat_steady' };
    }
  }

  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'boat_harbor', frame: f };
  }
}
