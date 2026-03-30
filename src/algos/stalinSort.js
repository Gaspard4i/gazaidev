// Stalin Sort — O(n) garanti
// Parcourt la liste une seule fois. Tout element plus petit que le precedent
// est "envoye au goulag" (supprime). Le resultat est toujours trie.
export function* stalinSort(arr) {
  let i = 1;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i - 1, i] };
    if (arr[i] < arr[i - 1]) {
      // Au goulag
      yield { type: 'swap', indices: [i], values: [0], meta: 'goulag' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Sweep de victoire — les survivants sont tries
  for (let j = 0; j < arr.length; j++) {
    yield { type: 'compare', indices: [j], meta: 'approved' };
  }
}
