export function* cycleSort(arr) {
  for (let start = 0; start < arr.length - 1; start++) {
    let item = arr[start];
    let pos = start;

    for (let i = start + 1; i < arr.length; i++) {
      yield { type: 'compare', indices: [start, i] };
      if (arr[i] < item) pos++;
    }

    if (pos === start) continue;
    while (item === arr[pos]) pos++;

    if (pos !== start) {
      [arr[pos], item] = [item, arr[pos]];
      yield { type: 'swap', indices: [pos, start], values: [arr[pos], item] };
    }

    while (pos !== start) {
      pos = start;
      for (let i = start + 1; i < arr.length; i++) {
        yield { type: 'compare', indices: [start, i] };
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      if (item !== arr[pos]) {
        [arr[pos], item] = [item, arr[pos]];
        yield { type: 'swap', indices: [pos], values: [arr[pos]] };
      }
    }
  }
}
