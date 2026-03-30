export function* quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;

  const pivotIdx = yield* partition(arr, lo, hi);
  yield* quickSort(arr, lo, pivotIdx - 1);
  yield* quickSort(arr, pivotIdx + 1, hi);
}

function* partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo;

  for (let j = lo; j < hi; j++) {
    yield { type: 'compare', indices: [j, hi] };
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]] };
      i++;
    }
  }

  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  yield { type: 'swap', indices: [i, hi], values: [arr[i], arr[hi]] };
  return i;
}
