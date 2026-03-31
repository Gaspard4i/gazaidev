export function* bucketSort(arr) {
  const n = arr.length;
  const max = Math.max(...arr);
  const bucketCount = Math.max(1, Math.floor(Math.sqrt(n)));
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute into buckets
  for (let i = 0; i < n; i++) {
    yield { type: 'compare', indices: [i] };
    const idx = Math.min(Math.floor((arr[i] / (max + 1)) * bucketCount), bucketCount - 1);
    buckets[idx].push(arr[i]);
  }

  // Sort each bucket (insertion sort) and put back
  let pos = 0;
  for (const bucket of buckets) {
    // Insertion sort on bucket
    for (let i = 1; i < bucket.length; i++) {
      let j = i;
      while (j > 0 && bucket[j - 1] > bucket[j]) {
        [bucket[j - 1], bucket[j]] = [bucket[j], bucket[j - 1]];
        j--;
      }
    }
    for (const val of bucket) {
      arr[pos] = val;
      yield { type: 'swap', indices: [pos], values: [val] };
      pos++;
    }
  }
}
