// 67 Sort — Ne garde que les 6 et les 7
// Reduit progressivement chaque valeur. Si elle n'est pas 6 ou 7, on la force.
// Resultat : un tableau de 6 et 7 uniquement
export function* sort67(arr) {
  // Phase 1 : normaliser — tout doit devenir 6 ou 7
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i], meta: 'evaluate' };
    const target = arr[i] % 2 === 0 ? 6 : 7;
    if (arr[i] !== target) {
      // Reduction progressive vers 6 ou 7
      while (arr[i] > target + 1) {
        arr[i] = Math.max(target, Math.floor(arr[i] * 0.7));
        yield { type: 'swap', indices: [i], values: [arr[i]], meta: 'reduce' };
      }
      arr[i] = target;
      yield { type: 'swap', indices: [i], values: [target], meta: 'force' };
    }
  }

  // Phase 2 : trier les 6 avant les 7 (bubble basique)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
  }
}
