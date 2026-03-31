export function* shellSort(arr) {
  let gap = Math.floor(arr.length / 2);

  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let j = i;
      while (j >= gap) {
        yield { type: 'compare', indices: [j - gap, j] };
        if (arr[j - gap] > arr[j]) {
          [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]];
          yield { type: 'swap', indices: [j - gap, j], values: [arr[j - gap], arr[j]] };
          j -= gap;
        } else {
          break;
        }
      }
    }
    gap = Math.floor(gap / 2);
  }
}
