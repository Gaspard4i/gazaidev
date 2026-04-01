// Manual Sort — Une main attrape les barres et les place au bon endroit
// Strategie: insertion sort visuel (comme un humain trierait des cartes)
export function* manualSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    // La main se deplace vers la barre i
    for (let f = 0; f < 6; f++) {
      yield { type: 'compare', indices: [i], meta: 'hand_move', handIdx: i, handPhase: 'moving' };
    }

    // La main attrape la barre
    for (let f = 0; f < 4; f++) {
      yield { type: 'compare', indices: [i], meta: 'hand_grab', handIdx: i, handPhase: 'grabbing', grabFrame: f };
    }

    // Chercher la bonne position (comme un humain qui regarde a gauche)
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // La main regarde la barre a gauche
      yield { type: 'compare', indices: [j, j - 1], meta: 'hand_compare', handIdx: j, handPhase: 'comparing' };

      // Slide vers la gauche
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      for (let f = 0; f < 4; f++) {
        yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'hand_slide', handIdx: j - 1, handPhase: 'sliding', slideFrame: f };
      }
      j--;
    }

    // La main lache la barre (elle est en place)
    for (let f = 0; f < 4; f++) {
      yield { type: 'compare', indices: [j], meta: 'hand_drop', handIdx: j, handPhase: 'dropping', dropFrame: f };
    }
  }
}
