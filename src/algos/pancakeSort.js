export function* pancakeSort(arr) {
  for (let size = arr.length; size > 1; size--) {
    // Find max in arr[0..size-1]
    let maxIdx = 0;
    for (let i = 1; i < size; i++) {
      yield { type: 'compare', indices: [i, maxIdx] };
      if (arr[i] > arr[maxIdx]) maxIdx = i;
    }

    if (maxIdx !== size - 1) {
      // Flip to bring max to front
      yield* flip(arr, maxIdx);
      // Flip to bring max to correct position
      yield* flip(arr, size - 1);
    }
  }
}

function* flip(arr, k) {
  let i = 0, j = k;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]] };
    i++;
    j--;
  }
}
