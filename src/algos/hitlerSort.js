// Hitler Sort — Les nombres premiers sont identifies, marques, separes, elimines
// Phase 1 : identification (etoile jaune sur chaque premier)
// Phase 2 : separation (deplacees a droite du tableau)
// Phase 3 : les "acceptes" sont tries
// Phase 4 : les separes sont elimines un par un avec fumee
export function* hitlerSort(arr) {
  const marked = new Set();

  // Phase 1 : identification — marquer les nombres premiers
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i], meta: 'inspect' };
    if (isPrime(arr[i])) {
      marked.add(i);
      // Pause sur le marque — etoile jaune
      yield { type: 'compare', indices: [i], meta: 'mark_star', marked: [...marked] };
      yield { type: 'compare', indices: [i], meta: 'mark_star', marked: [...marked] };
      yield { type: 'compare', indices: [i], meta: 'mark_star', marked: [...marked] };
    }
  }

  // Phase 2 : separation — pousser les marques vers la droite
  // Bubble les marques vers la fin du tableau
  let separated = 0;
  for (let pass = 0; pass < arr.length; pass++) {
    let swapped = false;
    for (let i = 0; i < arr.length - 1 - separated; i++) {
      const iMarked = isPrime(arr[i]);
      const jMarked = isPrime(arr[i + 1]);
      yield { type: 'compare', indices: [i, i + 1], meta: iMarked ? 'deporting' : 'sorting', marked: getMarkedIndices(arr) };
      if (iMarked && !jMarked) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'deporting', marked: getMarkedIndices(arr) };
        swapped = true;
      }
    }
    if (!swapped) break;
    separated++;
  }

  // Compter les separes (premiers a droite)
  let splitIdx = arr.length;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (isPrime(arr[i])) splitIdx = i;
    else break;
  }

  // Phase 3 : trier les "acceptes" (partie gauche)
  for (let i = 0; i < splitIdx; i++) {
    for (let j = 0; j < splitIdx - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1], marked: getMarkedIndices(arr) };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]], marked: getMarkedIndices(arr) };
      }
    }
  }

  // Phase 4 : elimination — les separes disparaissent un par un
  while (arr.length > splitIdx || (arr.length > 0 && isPrime(arr[arr.length - 1]))) {
    if (arr.length === 0) break;
    const last = arr.length - 1;
    if (!isPrime(arr[last])) break;
    // Fumee avant suppression
    for (let f = 0; f < 5; f++) {
      yield { type: 'compare', indices: [last], meta: 'smoke_chimney', smokeIdx: last, marked: getMarkedIndices(arr) };
    }
    yield { type: 'swap', indices: [last], values: [0], meta: 'eliminated' };
    arr.splice(last, 1);
  }

  // Phase 5 : fumee finale qui se dissipe
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [], meta: 'smoke_final', dustFrame: f };
  }
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function getMarkedIndices(arr) {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i])) indices.push(i);
  }
  return indices;
}
