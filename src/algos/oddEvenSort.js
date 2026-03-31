export function* oddEvenSort(arr) {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    // Odd pass
    for (let i = 1; i < arr.length - 1; i += 2) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]] };
        sorted = false;
      }
    }
    // Even pass
    for (let i = 0; i < arr.length - 1; i += 2) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]] };
        sorted = false;
      }
    }
  }
}
