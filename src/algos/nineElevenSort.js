// 9/11 Sort — 2 tours jumelles, 2 avions, 2 effondrements
export function* nineElevenSort(arr) {
  const maxVal = Math.max(...arr);
  const twinHeight = maxVal;

  // Phase 1 : scanner
  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i], meta: 'scanning' };
  }

  // Phase 2 : vider le tableau
  while (arr.length > 0) {
    yield { type: 'swap', indices: [arr.length - 1], values: [0], meta: 'clearing' };
    arr.splice(arr.length - 1, 1);
  }

  // Phase 3 : construire les 2 tours brique par brique
  arr.push(0, 0);
  const buildSteps = 30;
  for (let f = 1; f <= buildSteps; f++) {
    arr[0] = Math.round(twinHeight * (f / buildSteps));
    arr[1] = Math.round(twinHeight * (f / buildSteps));
    yield { type: 'swap', indices: [0, 1], values: [arr[0], arr[1]], meta: 'build_tower' };
  }

  // Phase 4 : les tours debout
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [0, 1], meta: 'standing' };
  }

  // Phase 5 : PREMIER avion arrive — frappe tour 1 (index 1, droite)
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'plane', planeX: 1 - f / 40, planeY: 0.30 };
  }

  // Impact tour 1 — effondrement lent
  const collapseSteps = 25;
  for (let f = collapseSteps; f >= 0; f--) {
    arr[1] = Math.round(twinHeight * (f / collapseSteps));
    yield { type: 'swap', indices: [1], values: [arr[1]], meta: 'collapse' };
  }

  // Pause — la 2eme tour est encore debout
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [0], meta: 'standing' };
  }

  // Phase 6 : DEUXIEME avion arrive — frappe tour 2 (index 0, gauche)
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'plane', planeX: f / 40, planeY: 0.25 };
  }

  // Impact tour 2 — effondrement
  for (let f = collapseSteps; f >= 0; f--) {
    arr[0] = Math.round(twinHeight * (f / collapseSteps));
    yield { type: 'swap', indices: [0], values: [arr[0]], meta: 'collapse' };
  }

  // Phase 7 : fumee / poussiere longue
  for (let f = 0; f < 50; f++) {
    yield { type: 'compare', indices: [], meta: 'dust', dustFrame: f };
  }

  arr.splice(0, arr.length);
}
