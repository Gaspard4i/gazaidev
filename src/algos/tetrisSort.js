// Tetris Sort — Les barres tombent comme des pieces de Tetris
// Quand toutes les barres sont >= X, on "clear" la ligne (tout -1)
// Couleurs des 7 pieces de Tetris
export function* tetrisSort(arr) {
  const n = arr.length;

  // Assigner une couleur Tetris a chaque barre (index -> couleur fixe)
  // Les couleurs sont stockees par valeur pour que chaque barre garde sa couleur

  // Phase 1: Les barres tombent une par une (insertion sort)
  for (let i = 1; i < n; i++) {
    // La barre i "tombe" depuis le haut
    for (let f = 0; f < 6; f++) {
      yield { type: 'compare', indices: [i], meta: 'tetris_fall', fallIdx: i, fallFrame: f, totalFall: 6 };
    }

    // Insertion: slide vers la gauche
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1], meta: 'tetris_compare' };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'tetris_slide' };
      j--;
    }

    // Lock en place
    yield { type: 'compare', indices: [j], meta: 'tetris_lock', lockIdx: j };

    // Verifier si on peut "clear" une ligne
    // Si la barre la plus petite > 1, on peut reduire tout le monde
    const minVal = Math.min(...arr.filter(v => v > 0));
    if (minVal > 1) {
      // Line clear! Flash puis reduction
      for (let f = 0; f < 6; f++) {
        yield { type: 'compare', indices: [], meta: 'tetris_clear', clearFrame: f, clearAmount: minVal - 1 };
      }
      // Reduire toutes les barres
      const reduction = minVal - 1;
      for (let k = 0; k < n; k++) {
        if (arr[k] > 0) {
          arr[k] = Math.max(1, arr[k] - reduction);
          yield { type: 'swap', indices: [k], values: [arr[k]], meta: 'tetris_shrink' };
        }
      }
    }
  }

  // Fin — tout est trie et reduit
  for (let f = 0; f < 12; f++) {
    yield { type: 'compare', indices: [], meta: 'tetris_win', frame: f };
  }
}
