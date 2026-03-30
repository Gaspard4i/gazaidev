// Communism Sort — "From each according to ability, to each according to need"
// Calcule la moyenne et force TOUTES les barres a la meme hauteur
// Resultat : parfaitement egal, mais plus rien n'est trie
export function* communismSort(arr) {
  // Phase 1 : inspection du peuple
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i], meta: 'inspect' };
    sum += arr[i];
  }

  const equal = Math.round(sum / arr.length);

  // Phase 2 : redistribution forcee
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== equal) {
      yield { type: 'swap', indices: [i], values: [equal], meta: 'redistribute' };
      arr[i] = equal;
    }
  }

  // Phase 3 : verification — tout le monde est egal, camarade
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i], meta: 'verify_equality' };
  }
}
