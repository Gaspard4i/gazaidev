export function* heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    yield { type: 'swap', indices: [0, i], values: [arr[0], arr[i]] };
    yield* heapify(arr, i, 0);
  }
}

function* heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    yield { type: 'compare', indices: [left, largest] };
    if (arr[left] > arr[largest]) largest = left;
  }
  if (right < n) {
    yield { type: 'compare', indices: [right, largest] };
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    yield { type: 'swap', indices: [i, largest], values: [arr[i], arr[largest]] };
    yield* heapify(arr, n, largest);
  }
}
