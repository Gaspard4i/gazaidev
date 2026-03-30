// Magician Sort — Le magicien cache la liste derriere un rideau
// Quand il le rouvre, tout est trie. Confettis + TADAA!
export function* magicianSort(arr) {
  // Phase 1 : le magicien montre la liste desordonnee
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'showoff' };
  }

  // Phase 2 : le rideau se ferme progressivement (de droite a gauche)
  for (let f = 0; f <= 30; f++) {
    yield { type: 'compare', indices: [], meta: 'curtain_close', curtainProgress: f / 30 };
  }

  // Phase 3 : derriere le rideau, on trie (invisible)
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = sorted[i];
  }

  // Pause derriere le rideau
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [], meta: 'behind_curtain', curtainProgress: 1 };
  }

  // Phase 4 : le rideau s'ouvre (de gauche a droite)
  for (let f = 0; f <= 30; f++) {
    yield { type: 'compare', indices: [], meta: 'curtain_open', curtainProgress: 1 - f / 30 };
  }

  // Phase 5 : TADAA! + confettis
  for (let f = 0; f < 60; f++) {
    yield { type: 'compare', indices: [], meta: 'tadaa', confettiFrame: f };
  }
}
