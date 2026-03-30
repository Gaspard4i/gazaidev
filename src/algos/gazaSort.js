// Gaza Sort — Les bombes ne tombent que sur les petites valeurs (enfants)
// A la fin un bombardement aerien detruit tout
export function* gazaSort(arr) {
  const maxVal = Math.max(...arr);
  const childThreshold = maxVal * 0.3; // les "enfants" = petites valeurs

  // Phase 1 : bombardements cibles sur les enfants
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'scanning' };
    if (arr[i] <= childThreshold) {
      // Bombe qui tombe
      for (let f = 0; f < 6; f++) {
        yield { type: 'compare', indices: [i], meta: 'bomb_falling', bombFrame: f };
      }
      // Impact
      yield { type: 'swap', indices: [i], values: [0], meta: 'bomb_impact' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : pause — les survivants restent debout
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'calm' };
  }

  // Phase 3 : bombardement aerien total — avion israelien
  for (let f = 0; f < 50; f++) {
    yield { type: 'compare', indices: [], meta: 'airstrike', planeX: 1 - f / 50 };
  }

  // Phase 4 : tout est detruit progressivement
  while (arr.length > 0) {
    const idx = Math.floor(Math.random() * arr.length);
    for (let f = 0; f < 3; f++) {
      yield { type: 'compare', indices: [idx], meta: 'explosion', explosionFrame: f };
    }
    yield { type: 'swap', indices: [idx], values: [0], meta: 'destroyed' };
    arr.splice(idx, 1);
  }

  // Phase 5 : fumee et ruines
  for (let f = 0; f < 50; f++) {
    yield { type: 'compare', indices: [], meta: 'ruins', dustFrame: f };
  }
}
