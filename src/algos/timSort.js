// Simplified Tim Sort — hybrid merge + insertion
const MIN_RUN = 8;

export function* timSort(arr) {
  const n = arr.length;

  // Insertion sort on small runs
  for (let i = 0; i < n; i += MIN_RUN) {
    const end = Math.min(i + MIN_RUN - 1, n - 1);
    yield* insertionSortRange(arr, i, end);
  }

  // Merge runs
  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        yield* mergeRuns(arr, left, mid, right);
      }
    }
  }
}

function* insertionSortRange(arr, lo, hi) {
  for (let i = lo + 1; i <= hi; i++) {
    let j = i;
    while (j > lo) {
      yield { type: 'compare', indices: [j - 1, j] };
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]] };
        j--;
      } else break;
    }
  }
}

function* mergeRuns(arr, lo, mid, hi) {
  const left = arr.slice(lo, mid + 1);
  const right = arr.slice(mid + 1, hi + 1);
  let i = 0, j = 0, k = lo;

  while (i < left.length && j < right.length) {
    yield { type: 'compare', indices: [lo + i, mid + 1 + j] };
    if (left[i] <= right[j]) {
      arr[k] = left[i++];
    } else {
      arr[k] = right[j++];
    }
    yield { type: 'swap', indices: [k], values: [arr[k]] };
    k++;
  }
  while (i < left.length) { arr[k] = left[i++]; yield { type: 'swap', indices: [k], values: [arr[k]] }; k++; }
  while (j < right.length) { arr[k] = right[j++]; yield { type: 'swap', indices: [k], values: [arr[k]] }; k++; }
}
