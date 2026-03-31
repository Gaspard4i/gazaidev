// Hiroshima Sort — Une bombe atomique tombe et detruit tout
// Phase 1 : les barres vivent normalement (tri partiel)
// Phase 2 : un bombardier arrive
// Phase 3 : la bombe tombe
// Phase 4 : flash blanc aveuglant
// Phase 5 : champignon atomique
// Phase 6 : onde de choc — toutes les barres sont detruites
// Phase 7 : silence et cendres
export function* hiroshimaSort(arr) {
  // Phase 1 : tri partiel (faux sentiment de securite)
  for (let i = 0; i < Math.min(arr.length, 20); i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
  }

  // Phase 2 : son d'alerte puis le bombardier arrive
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'siren', sirenFrame: f };
  }

  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'bomber', planeX: 1 - f / 40 };
  }

  // Phase 3 : la bombe tombe
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [], meta: 'nuke_falling', bombFrame: f };
  }

  // Phase 4 : flash blanc aveuglant
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'nuke_flash', flashFrame: f };
  }

  // Phase 5 : champignon atomique + onde de choc
  for (let f = 0; f < 60; f++) {
    // L'onde de choc detruit les barres progressivement du centre vers les bords
    const radius = f / 60;
    const center = Math.floor(arr.length / 2);
    const destroyRange = Math.floor(radius * arr.length / 2);

    for (let i = Math.max(0, center - destroyRange); i <= Math.min(arr.length - 1, center + destroyRange); i++) {
      if (arr[i] > 0) {
        arr[i] = Math.max(0, arr[i] - Math.ceil(arr[i] * 0.15));
      }
    }

    yield { type: 'compare', indices: [], meta: 'mushroom_cloud', cloudFrame: f };
  }

  // Phase 6 : tout a zero
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 0;
  }

  // Phase 7 : cendres et silence
  for (let f = 0; f < 50; f++) {
    yield { type: 'compare', indices: [], meta: 'ashes', ashFrame: f };
  }

  arr.splice(0, arr.length);
}
