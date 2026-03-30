// Drug Sort — On prend des substances, tout devient psychedelique
// Phase 1 : on trie normalement (sobre)
// Phase 2 : on prend la drogue — les couleurs partent en vrille
// Phase 3 : hallucinations — les barres bougent toutes seules, ondulent
// Phase 4 : on se reveille — l'ecran est retourne mais c'est trie
export function* drugSort(arr) {
  // Phase 1 : sobre — trie un peu normalement
  for (let i = 0; i < Math.min(arr.length, 15); i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1], meta: 'sober' };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]], meta: 'sober' };
      }
    }
  }

  // Phase 2 : on prend la drogue
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'taking_drugs', drugFrame: f };
  }

  // Phase 3 : trip — hallucinations longues
  for (let f = 0; f < 180; f++) {
    // Les barres ondulent, les couleurs changent
    yield { type: 'compare', indices: [], meta: 'tripping', tripFrame: f, tripIntensity: Math.min(1, f / 60) };
  }

  // Phase 4 : peak — ecran tourne
  for (let f = 0; f < 60; f++) {
    yield { type: 'compare', indices: [], meta: 'peak', peakFrame: f };
  }

  // Phase 5 : on trie en secret pendant le trip (le cerveau travaille inconsciemment)
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sorted[i];
  }

  // Phase 6 : descente — on se reveille, ecran retourne mais trie
  for (let f = 0; f < 60; f++) {
    yield { type: 'compare', indices: [], meta: 'comedown', comedownFrame: f };
  }

  // Phase 7 : resultat retourne
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'flipped' };
  }
}
