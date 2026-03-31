export function* dualPivotQuickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;

  // Ensure arr[lo] <= arr[hi]
  yield { type: 'compare', indices: [lo, hi] };
  if (arr[lo] > arr[hi]) {
    [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
    yield { type: 'swap', indices: [lo, hi], values: [arr[lo], arr[hi]] };
  }

  const p = arr[lo], q = arr[hi];
  let lt = lo + 1, gt = hi - 1, k = lo + 1;

  while (k <= gt) {
    yield { type: 'compare', indices: [k, lo] };
    if (arr[k] < p) {
      [arr[k], arr[lt]] = [arr[lt], arr[k]];
      yield { type: 'swap', indices: [k, lt], values: [arr[k], arr[lt]] };
      lt++;
    } else {
      yield { type: 'compare', indices: [k, hi] };
      if (arr[k] > q) {
        while (arr[gt] > q && k < gt) {
          yield { type: 'compare', indices: [gt, hi] };
          gt--;
        }
        [arr[k], arr[gt]] = [arr[gt], arr[k]];
        yield { type: 'swap', indices: [k, gt], values: [arr[k], arr[gt]] };
        gt--;
        yield { type: 'compare', indices: [k, lo] };
        if (arr[k] < p) {
          [arr[k], arr[lt]] = [arr[lt], arr[k]];
          yield { type: 'swap', indices: [k, lt], values: [arr[k], arr[lt]] };
          lt++;
        }
      }
    }
    k++;
  }

  lt--;
  gt++;
  [arr[lo], arr[lt]] = [arr[lt], arr[lo]];
  yield { type: 'swap', indices: [lo, lt], values: [arr[lo], arr[lt]] };
  [arr[hi], arr[gt]] = [arr[gt], arr[hi]];
  yield { type: 'swap', indices: [hi, gt], values: [arr[hi], arr[gt]] };

  yield* dualPivotQuickSort(arr, lo, lt - 1);
  yield* dualPivotQuickSort(arr, lt + 1, gt - 1);
  yield* dualPivotQuickSort(arr, gt + 1, hi);
}
