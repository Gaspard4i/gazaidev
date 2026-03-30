// 9/11 Sort — Trouve les 2 barres les plus hautes et egales (tours jumelles)
// Supprime tout le reste, puis un "avion" traverse et les detruit
export function* nineElevenSort(arr) {
  // Phase 1 : trouver les 2 plus grandes valeurs
  const maxVal = Math.max(...arr);
  const twinHeight = maxVal;

  // Phase 2 : supprimer tout ce qui n'est pas une tour jumelle
  // On garde 2 barres cote a cote au centre avec la meme hauteur
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'scanning' };
    i++;
  }

  // Vider le tableau et mettre 2 tours jumelles au centre
  while (arr.length > 0) {
    yield { type: 'swap', indices: [arr.length - 1], values: [0], meta: 'clearing' };
    arr.splice(arr.length - 1, 1);
  }

  // Construire les 2 tours jumelles
  arr.push(twinHeight, twinHeight);
  yield { type: 'swap', indices: [0], values: [twinHeight], meta: 'build_tower' };
  yield { type: 'swap', indices: [1], values: [twinHeight], meta: 'build_tower' };

  // Phase 3 : pause — les tours sont debout
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [0, 1], meta: 'standing' };
  }

  // Phase 4 : l'avion arrive (de droite a gauche, signale par meta)
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'plane', planeX: 1 - f / 20 };
  }

  // Phase 5 : impact — premiere tour s'effondre progressivement
  const steps = 10;
  for (let f = steps; f >= 0; f--) {
    arr[1] = Math.round(twinHeight * (f / steps));
    yield { type: 'swap', indices: [1], values: [arr[1]], meta: 'collapse' };
  }

  // Deuxieme tour s'effondre
  for (let f = steps; f >= 0; f--) {
    arr[0] = Math.round(twinHeight * (f / steps));
    yield { type: 'swap', indices: [0], values: [arr[0]], meta: 'collapse' };
  }

  // Phase 6 : fumee / poussiere
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'dust', dustFrame: f };
  }

  // Tableau vide
  arr.splice(0, arr.length);
}
