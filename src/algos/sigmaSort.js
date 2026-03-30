// Sigma Sort — A chaque iteration, une barre random pousse un "cri de loup"
// et se place en position 1 (le sigma male). Puis elle trie tout ce qui
// est en dessous d'elle par bubble sort. Repete avec une nouvelle barre random.
export function* sigmaSort(arr) {
  const iterations = Math.min(arr.length, 15); // nombre de "sigma moments"

  for (let iter = 0; iter < iterations; iter++) {
    // Choisir une barre random — le nouveau sigma
    const sigmaIdx = Math.floor(Math.random() * arr.length);
    const sigmaVal = arr[sigmaIdx];

    // Le sigma se fait remarquer — "howl"
    yield { type: 'compare', indices: [sigmaIdx], meta: 'howl' };
    yield { type: 'compare', indices: [sigmaIdx], meta: 'howl' };
    yield { type: 'compare', indices: [sigmaIdx], meta: 'howl' };

    // Le sigma se deplace vers la position 0 (devant tout le monde)
    // En poussant tout le monde sur son passage
    for (let i = sigmaIdx; i > 0; i--) {
      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
      yield { type: 'swap', indices: [i, i - 1], values: [arr[i], arr[i - 1]], meta: 'sigma_push' };
    }

    // Maintenant le sigma est en position 0
    // Trier tout ce qui est en dessous de sa valeur (les "betas")
    // On trie les elements > 0 qui sont <= sigmaVal
    for (let i = 1; i < arr.length; i++) {
      for (let j = 1; j < arr.length - 1; j++) {
        if (arr[j] <= sigmaVal && arr[j + 1] <= sigmaVal) {
          yield { type: 'compare', indices: [j, j + 1], meta: 'beta_sort' };
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]], meta: 'beta_sort' };
          }
        }
      }
    }
  }
}
