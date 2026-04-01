// North Korea Sort — Les barres marchent au pas militaire
// Celles qui sont pas alignees sont executees
export function* northKoreaSort(arr) {
  const n = arr.length;

  // Phase 1: parade militaire — inspection des barres
  for (let i = 0; i < n; i++) {
    yield { type: 'compare', indices: [i], meta: 'nk_inspect', inspectIdx: i };
  }

  // Phase 2: tri par execution — comme Stalin mais avec parade
  let max = arr[0];
  const executed = [];
  for (let i = 1; i < n; i++) {
    yield { type: 'compare', indices: [i], meta: 'nk_march', marchIdx: i };

    if (arr[i] < max) {
      // Pas aligne! Execute!
      executed.push(i);
      for (let f = 0; f < 5; f++) {
        yield { type: 'compare', indices: [i], meta: 'nk_execute', execIdx: i, execFrame: f };
      }
      arr[i] = 0; // supprime
      yield { type: 'swap', indices: [i], values: [0], meta: 'nk_executed' };
    } else {
      max = arr[i];
      // Bon soldat — applaudit
      yield { type: 'compare', indices: [i], meta: 'nk_applause' };
    }
  }

  // Phase 3: le reste applaudit le leader
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'nk_glory', frame: f };
  }
}
