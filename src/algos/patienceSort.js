// Patience Sort — like a card game solitaire
export function* patienceSort(arr) {
  const piles = [];

  // Deal cards into piles
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i] };
    let placed = false;
    for (let p = 0; p < piles.length; p++) {
      if (piles[p][piles[p].length - 1] >= arr[i]) {
        piles[p].push(arr[i]);
        placed = true;
        break;
      }
    }
    if (!placed) piles.push([arr[i]]);
  }

  // Merge piles (k-way merge using simple min extraction)
  let pos = 0;
  while (piles.some(p => p.length > 0)) {
    let minPile = -1;
    let minVal = Infinity;
    for (let p = 0; p < piles.length; p++) {
      if (piles[p].length > 0 && piles[p][piles[p].length - 1] < minVal) {
        minVal = piles[p][piles[p].length - 1];
        minPile = p;
      }
    }
    piles[minPile].pop();
    arr[pos] = minVal;
    yield { type: 'swap', indices: [pos], values: [minVal] };
    pos++;
  }
}
