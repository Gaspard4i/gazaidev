// Among Us Sort — Imposteur fait des swaps random, se fait ejecter
export function* amongUsSort(arr) {
  const n = arr.length;
  const impostorIdx = Math.floor(Math.random() * n);

  // Phase 1: tasks (sort) + imposteur sabote
  let sorted = false;
  let sabotages = 0;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1], meta: 'among_task' };

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'among_fix' };
        sorted = false;
      }

      // Imposteur sabote parfois
      if (Math.random() < 0.1 && sabotages < 5) {
        const a = Math.floor(Math.random() * n);
        const b = Math.floor(Math.random() * n);
        if (a !== b) {
          [arr[a], arr[b]] = [arr[b], arr[a]];
          yield { type: 'swap', indices: [a, b], values: [arr[a], arr[b]], meta: 'among_sabotage', susIdx: a };
          sabotages++;
          sorted = false;
        }
      }
    }

    // Emergency meeting si trop de sabotages
    if (sabotages >= 5) {
      for (let f = 0; f < 10; f++) {
        yield { type: 'compare', indices: [], meta: 'among_meeting', frame: f };
      }
      // Eject impostor
      for (let f = 0; f < 8; f++) {
        yield { type: 'compare', indices: [impostorIdx], meta: 'among_eject', ejectIdx: impostorIdx, frame: f };
      }
      sabotages = 0;
      break;
    }
  }

  // Finish sort without impostor
  sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1], meta: 'among_task' };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'among_fix' };
        sorted = false;
      }
    }
  }
}
