// Bogo Sort — O(n * n!) en moyenne
// Melange aleatoirement le tableau, verifie s'il est trie. Repete.
// Le pire algorithme de tri qui existe (mais il est honnete)
export function* bogoSort(arr) {
  let attempts = 0;
  const maxAttempts = 5000; // securite pour pas boucler a l'infini

  while (!isSorted(arr) && attempts < maxAttempts) {
    attempts++;

    // Verification
    let sorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (arr[i] > arr[i + 1]) {
        sorted = false;
        break;
      }
    }

    if (sorted) break;

    // Pas trie -> shuffle Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]], meta: 'shuffle' };
    }
  }
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}
