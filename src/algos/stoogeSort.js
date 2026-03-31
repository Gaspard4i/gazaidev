export function* stoogeSort(arr, lo = 0, hi = arr.length - 1) {
  yield { type: 'compare', indices: [lo, hi] };
  if (arr[lo] > arr[hi]) {
    [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
    yield { type: 'swap', indices: [lo, hi], values: [arr[lo], arr[hi]] };
  }

  if (hi - lo + 1 > 2) {
    const t = Math.floor((hi - lo + 1) / 3);
    yield* stoogeSort(arr, lo, hi - t);
    yield* stoogeSort(arr, lo + t, hi);
    yield* stoogeSort(arr, lo, hi - t);
  }
}
