// 9/11 Sort — Trouve les 2 barres les plus hautes et egales (tours jumelles)
// Supprime tout le reste, puis un "avion" traverse et les detruit
export function* nineElevenSort(arr) {
  const maxVal = Math.max(...arr);
  const twinHeight = maxVal;

  // Phase 1 : scanner toutes les barres
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'scanning' };
    i++;
  }

  // Phase 2 : vider le tableau une barre a la fois
  while (arr.length > 0) {
    yield { type: 'swap', indices: [arr.length - 1], values: [0], meta: 'clearing' };
    arr.splice(arr.length - 1, 1);
  }

  // Phase 3 : construire les 2 tours jumelles brique par brique
  arr.push(0, 0);
  const buildSteps = 30;
  for (let f = 1; f <= buildSteps; f++) {
    arr[0] = Math.round(twinHeight * (f / buildSteps));
    arr[1] = Math.round(twinHeight * (f / buildSteps));
    yield { type: 'swap', indices: [0, 1], values: [arr[0], arr[1]], meta: 'build_tower' };
  }

  // Phase 4 : les tours sont debout — pause longue
  for (let f = 0; f < 60; f++) {
    yield { type: 'compare', indices: [0, 1], meta: 'standing' };
  }

  // Phase 5 : l'avion arrive lentement de droite a gauche
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'plane', planeX: 1 - f / 40 };
  }

  // Phase 6 : impact tour 1 — effondrement LENT
  const collapseSteps = 30;
  for (let f = collapseSteps; f >= 0; f--) {
    arr[1] = Math.round(twinHeight * (f / collapseSteps));
    yield { type: 'swap', indices: [1], values: [arr[1]], meta: 'collapse' };
  }

  // Pause entre les 2 effondrements
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [0], meta: 'standing' };
  }

  // Phase 7 : deuxieme tour s'effondre encore plus lentement
  for (let f = collapseSteps; f >= 0; f--) {
    arr[0] = Math.round(twinHeight * (f / collapseSteps));
    yield { type: 'swap', indices: [0], values: [arr[0]], meta: 'collapse' };
  }

  // Phase 8 : fumee / poussiere — longue
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'dust', dustFrame: f };
  }

  // Tableau vide
  arr.splice(0, arr.length);
}
