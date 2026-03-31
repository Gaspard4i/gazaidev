export function* insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0) {
      yield { type: 'compare', indices: [j - 1, j] };
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]] };
        j--;
      } else {
        break;
      }
    }
  }
}
