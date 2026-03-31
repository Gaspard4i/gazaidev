// Strand Sort — extract sorted subsequences and merge them
export function* strandSort(arr) {
  const result = [];

  while (arr.length > 0) {
    // Extract a strand (sorted subsequence)
    const strand = [arr.shift()];
    yield { type: 'compare', indices: [0] };

    let i = 0;
    while (i < arr.length) {
      yield { type: 'compare', indices: [i] };
      if (arr[i] >= strand[strand.length - 1]) {
        strand.push(arr.splice(i, 1)[0]);
        yield { type: 'swap', indices: [i] };
      } else {
        i++;
      }
    }

    // Merge strand into result
    const merged = [];
    let si = 0, ri = 0;
    while (si < strand.length && ri < result.length) {
      if (strand[si] <= result[ri]) {
        merged.push(strand[si++]);
      } else {
        merged.push(result[ri++]);
      }
    }
    while (si < strand.length) merged.push(strand[si++]);
    while (ri < result.length) merged.push(result[ri++]);
    result.length = 0;
    result.push(...merged);
  }

  // Copy result back to arr
  for (let i = 0; i < result.length; i++) {
    arr.push(result[i]);
    yield { type: 'swap', indices: [i], values: [result[i]] };
  }
}
