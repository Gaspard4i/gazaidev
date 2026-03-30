// Hitler Sort — Separe les "indesirables" (nombres premiers) dans des camps
// Phase 1 : identification avec etoile jaune
// Phase 2 : transfert vers la "seconde liste" (camp) affichee a droite
// Phase 3 : les camps sont "liquides" — les barres disparaissent en fumee
export function* hitlerSort(arr) {
  const camps = []; // la seconde liste

  // Phase 1 : selection — marquer les nombres premiers
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'selection' };
    if (isPrime(arr[i])) {
      // Transfert vers le camp
      camps.push(arr[i]);
      yield { type: 'swap', indices: [i], values: [0], meta: 'deported', camps: [...camps] };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : trier les "acceptes"
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1], camps: [...camps] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]], camps: [...camps] };
      }
    }
  }

  // Phase 3 : liquidation — les camps se vident un par un (fumee)
  while (camps.length > 0) {
    camps.pop();
    yield { type: 'compare', indices: [], meta: 'smoke', camps: [...camps] };
  }
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
