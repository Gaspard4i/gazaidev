// Epstein Sort — Ne prend que les valeurs en dessous de 18
// Les valeurs >= 18 sont ignorees / supprimees
// Le resultat est un tableau de "mineurs" tries
export function* epsteinSort(arr) {
  // Phase 1 : "recrutement" — ne garder que les < 18
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'screening' };
    if (arr[i] >= 18) {
      // Trop vieux, pas interesse
      yield { type: 'swap', indices: [i], values: [0], meta: 'rejected' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : trier les restants
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
