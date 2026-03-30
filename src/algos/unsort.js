// Unsort — Prend une liste triee et la desordonne completement
// C'est l'anti-tri. Fisher-Yates shuffle mais presente comme un "algorithme"
export function* unsort(arr) {
  // Phase 1 : d'abord trier (pour montrer l'etat initial propre)
  // On suppose que l'array est deja shuffle, donc on la trie d'abord
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
  }

  // Phase 2 : UNSORT — Fisher-Yates en sens inverse, detruire l'ordre
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    yield { type: 'compare', indices: [i, j], meta: 'chaos' };
    [arr[i], arr[j]] = [arr[j], arr[i]];
    yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]], meta: 'destroy' };
  }
}
