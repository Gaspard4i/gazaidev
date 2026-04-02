// Plane Sort — Barres embarquent dans l'avion, turbulence, atterrissent triees
export function* planeSort(arr) {
  const n = arr.length;

  // Boarding
  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'plane_boarding', frame: f };
  }

  // Tri en vol (insertion sort = boarding order)
  for (let i = 1; i < n; i++) {
    yield { type: 'compare', indices: [i], meta: 'plane_seat', seatIdx: i };
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1], meta: 'plane_shuffle' };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'plane_move' };
      j--;
    }

    // Turbulence random
    if (Math.random() < 0.2) {
      for (let f = 0; f < 6; f++) {
        yield { type: 'compare', indices: [], meta: 'plane_turbulence', frame: f };
      }
    }
  }

  // Landing
  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'plane_landing', frame: f };
  }
}
