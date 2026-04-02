// Car Sort — Embouteillage, klaxons, les barres changent de file
export function* carSort(arr) {
  const n = arr.length;

  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1], meta: 'car_traffic' };

      if (arr[i] > arr[i + 1]) {
        // Klaxon!
        yield { type: 'compare', indices: [i], meta: 'car_honk', honkIdx: i };
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'car_overtake' };
        sorted = false;
      }
    }
  }
}
