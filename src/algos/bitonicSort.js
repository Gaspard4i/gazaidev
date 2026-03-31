export function* bitonicSort(arr) {
  // Pad to power of 2
  const n = arr.length;
  yield* bitonicSortRec(arr, 0, n, true);
}

function* bitonicSortRec(arr, lo, cnt, ascending) {
  if (cnt <= 1) return;
  const k = Math.floor(cnt / 2);
  yield* bitonicSortRec(arr, lo, k, true);
  yield* bitonicSortRec(arr, lo + k, cnt - k, false);
  yield* bitonicMerge(arr, lo, cnt, ascending);
}

function* bitonicMerge(arr, lo, cnt, ascending) {
  if (cnt <= 1) return;
  const k = greatestPowerOfTwo(cnt);
  for (let i = lo; i < lo + cnt - k; i++) {
    if (i + k < arr.length) {
      yield { type: 'compare', indices: [i, i + k] };
      if ((arr[i] > arr[i + k]) === ascending) {
        [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
        yield { type: 'swap', indices: [i, i + k], values: [arr[i], arr[i + k]] };
      }
    }
  }
  yield* bitonicMerge(arr, lo, k, ascending);
  yield* bitonicMerge(arr, lo + k, cnt - k, ascending);
}

function greatestPowerOfTwo(n) {
  let k = 1;
  while (k < n) k <<= 1;
  return k >> 1;
}
