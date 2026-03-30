// Thanos Sort — "Perfectly balanced, as all things should be"
// A chaque passe, supprime la moitie des elements qui ne sont pas tries
// Continue jusqu'a ce que le reste soit trie (ou qu'il ne reste qu'un element)
export function* thanosSort(arr) {
  while (!isSorted(arr)) {
    const toRemove = [];
    for (let i = 0; i < arr.length - 1; i++) {
      yield { type: 'compare', indices: [i, i + 1] };
      if (arr[i] > arr[i + 1]) {
        // Snap — marque pour suppression (aleatoire entre les deux)
        const victim = Math.random() < 0.5 ? i : i + 1;
        if (!toRemove.includes(victim)) toRemove.push(victim);
      }
      // Snap seulement la moitie
      if (toRemove.length >= Math.floor(arr.length / 2)) break;
    }
    // Supprime du plus grand index au plus petit pour pas decaler
    toRemove.sort((a, b) => b - a);
    for (const idx of toRemove) {
      yield { type: 'swap', indices: [idx], values: [0], meta: 'snap' };
      arr.splice(idx, 1);
    }
  }
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}
