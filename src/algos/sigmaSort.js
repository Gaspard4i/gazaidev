// Sigma Sort — A chaque iteration, une barre random pousse un "cri de loup"
// et se place en position 1 (le sigma male). Puis elle trie les betas.
// Le sigma change tout le temps donc ca ne se resout presque jamais.
export function* sigmaSort(arr) {
  // Le sigma sort ne finit presque jamais — beaucoup d'iterations
  const iterations = arr.length * 3;

  for (let iter = 0; iter < iterations; iter++) {
    // Choisir une barre random — le nouveau sigma
    const sigmaIdx = Math.floor(Math.random() * arr.length);

    // Le sigma se fait remarquer — "howl" avec pause dramatique
    for (let h = 0; h < 8; h++) {
      yield { type: 'compare', indices: [sigmaIdx], meta: 'howl' };
    }

    // Le sigma se deplace vers la position 0
    for (let i = sigmaIdx; i > 0; i--) {
      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
      yield { type: 'swap', indices: [i, i - 1], values: [arr[i], arr[i - 1]], meta: 'sigma_push' };
    }

    // Pause — le sigma contemple sa domination
    for (let p = 0; p < 5; p++) {
      yield { type: 'compare', indices: [0], meta: 'sigma_flex' };
    }

    // Trier PARTIELLEMENT les betas (juste une passe, pas un tri complet)
    // Ca garantit que ca ne se resout jamais vraiment
    for (let j = 1; j < arr.length - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1], meta: 'beta_sort' };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]], meta: 'beta_sort' };
      }
    }

    // Un nouveau sigma va arriver et tout casser de toute facon...
  }
}
