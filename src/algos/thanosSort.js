// Thanos Sort — "Perfectly balanced, as all things should be"
// A chaque snap, supprime exactement la moitie des elements au hasard
// Continue jusqu'a ce qu'il ne reste qu'un seul element (ou zero)
// Peu importe si c'est trie ou non — the snap is inevitable
export function* thanosSort(arr) {
  while (arr.length > 1) {
    // Inspecter tout le monde avant le snap
    for (let i = 0; i < arr.length; i++) {
      yield { type: 'compare', indices: [i], meta: 'inspecting' };
    }

    // Pause dramatique avant le snap
    for (let f = 0; f < 15; f++) {
      yield { type: 'compare', indices: [], meta: 'snap_charging' };
    }

    // Le snap — choisir aleatoirement la moitie a eliminer
    const halfCount = Math.floor(arr.length / 2);
    const indices = Array.from({ length: arr.length }, (_, i) => i);
    // Fisher-Yates pour choisir aleatoirement
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const victims = indices.slice(0, halfCount).sort((a, b) => b - a);

    // Eliminer du dernier au premier
    for (const idx of victims) {
      yield { type: 'swap', indices: [idx], values: [0], meta: 'snap' };
      arr.splice(idx, 1);
    }

    // Pause apres le snap — contempler l'equilibre
    for (let f = 0; f < 20; f++) {
      yield { type: 'compare', indices: [], meta: 'balanced' };
    }
  }
}
