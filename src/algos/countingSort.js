export function* countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i] };
    count[arr[i]]++;
  }

  // Rebuild sorted array
  let pos = 0;
  for (let val = 0; val <= max; val++) {
    while (count[val] > 0) {
      arr[pos] = val;
      yield { type: 'swap', indices: [pos], values: [val] };
      pos++;
      count[val]--;
    }
  }
}
