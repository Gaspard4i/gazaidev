// Liberty Sort — Libere toutes les barres, elles trouvent leur place d'elles-memes
export function* libertySort(arr) {
  const n = arr.length;

  // Phase 1: Liberation!
  for (let f = 0; f < 12; f++) {
    yield { type: 'compare', indices: [], meta: 'liberty_free', frame: f };
  }

  // Phase 2: chaque barre cherche sa place (insertion sort = chacun trouve son rang)
  for (let i = 1; i < n; i++) {
    yield { type: 'compare', indices: [i], meta: 'liberty_search', searchIdx: i };
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1] };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'liberty_move' };
      j--;
    }
    yield { type: 'compare', indices: [j], meta: 'liberty_home', homeIdx: j };
  }

  // Vive la liberte
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'liberty_flag', frame: f };
  }
}
