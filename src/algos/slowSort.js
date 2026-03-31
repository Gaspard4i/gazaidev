// Slow Sort — multiply and surrender (intentionally bad)
export function* slowSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;

  const mid = Math.floor((lo + hi) / 2);
  yield* slowSort(arr, lo, mid);
  yield* slowSort(arr, mid + 1, hi);

  yield { type: 'compare', indices: [mid, hi] };
  if (arr[mid] > arr[hi]) {
    [arr[mid], arr[hi]] = [arr[hi], arr[mid]];
    yield { type: 'swap', indices: [mid, hi], values: [arr[mid], arr[hi]] };
  }

  yield* slowSort(arr, lo, hi - 1);
}
