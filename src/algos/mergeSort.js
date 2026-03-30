export function* mergeSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;

  const mid = Math.floor((lo + hi) / 2);
  yield* mergeSort(arr, lo, mid);
  yield* mergeSort(arr, mid + 1, hi);
  yield* merge(arr, lo, mid, hi);
}

function* merge(arr, lo, mid, hi) {
  const left = arr.slice(lo, mid + 1);
  const right = arr.slice(mid + 1, hi + 1);
  let i = 0, j = 0, k = lo;

  while (i < left.length && j < right.length) {
    yield { type: 'compare', indices: [lo + i, mid + 1 + j] };
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      yield { type: 'swap', indices: [k], values: [arr[k]] };
      i++;
    } else {
      arr[k] = right[j];
      yield { type: 'swap', indices: [k], values: [arr[k]] };
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    yield { type: 'swap', indices: [k], values: [arr[k]] };
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    yield { type: 'swap', indices: [k], values: [arr[k]] };
    j++;
    k++;
  }
}
