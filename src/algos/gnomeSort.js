export function* gnomeSort(arr) {
  let i = 1;
  while (i < arr.length) {
    if (i === 0) { i++; continue; }
    yield { type: 'compare', indices: [i - 1, i] };
    if (arr[i - 1] <= arr[i]) {
      i++;
    } else {
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      yield { type: 'swap', indices: [i - 1, i], values: [arr[i - 1], arr[i]] };
      i--;
    }
  }
}
