export function* selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      yield { type: 'compare', indices: [minIdx, j] };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]] };
    }
  }
}
