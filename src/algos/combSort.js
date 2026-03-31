export function* combSort(arr) {
  let gap = arr.length;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.max(1, Math.floor(gap / shrink));
    sorted = gap === 1;

    for (let i = 0; i + gap < arr.length; i++) {
      yield { type: 'compare', indices: [i, i + gap] };
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        yield { type: 'swap', indices: [i, i + gap], values: [arr[i], arr[i + gap]] };
        sorted = false;
      }
    }
  }
}
