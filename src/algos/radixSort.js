export function* radixSort(arr) {
  const max = Math.max(...arr);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      yield { type: 'compare', indices: [i] };
      count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      yield { type: 'swap', indices: [i], values: [arr[i]] };
    }

    exp *= 10;
  }
}
