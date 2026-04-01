// Ukraine Sort — Les petites barres resistent l'invasion des grandes
// Drones contre tanks, resilience ukrainienne
export function* ukraineSort(arr) {
  const n = arr.length;
  const median = [...arr].sort((a, b) => a - b)[Math.floor(n / 2)];

  // Phase 1: invasion — les grandes barres (tanks) avancent
  for (let i = 0; i < n; i++) {
    if (arr[i] > median) {
      yield { type: 'compare', indices: [i], meta: 'ukraine_tank', tankIdx: i };
    } else {
      yield { type: 'compare', indices: [i], meta: 'ukraine_defend', defIdx: i };
    }
  }

  // Phase 2: les petites barres envoient des drones
  // Tri par insertion — les petites barres se defendent et repoussent les grandes
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      // Drone strike!
      yield { type: 'compare', indices: [j - 1, j], meta: 'ukraine_drone', droneTarget: j - 1 };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'ukraine_push' };
      j--;
    }
    yield { type: 'compare', indices: [j], meta: 'ukraine_hold', holdIdx: j };
  }

  // Phase 3: Slava Ukraini
  for (let f = 0; f < 20; f++) {
    yield { type: 'compare', indices: [], meta: 'ukraine_victory', frame: f };
  }
}
