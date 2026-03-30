// Hitler Sort — Separe les elements selon un critere arbitraire
// Les "indesirables" (ex: nombres premiers) sont mis dans une liste separee
// puis la liste est supprimee a la fin
export function* hitlerSort(arr) {
  const undesirables = [];

  // Phase 1 : "selection" — identifier les nombres premiers (arbitraire)
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'selection' };
    if (isPrime(arr[i])) {
      // Separer dans "l'autre liste"
      undesirables.push(arr[i]);
      yield { type: 'swap', indices: [i], values: [0], meta: 'separated' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : trier les "acceptes"
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
  }

  // Phase 3 : "l'autre liste" est supprimee — plus rien n'en reste
  // (les undesirables sont deja retires du tableau)
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
