// Chess Sort — Les barres sont des pieces d'echecs sur un echiquier
// Blancs vs Noirs, moves annotes (brillant, bon, risque, blunder)
export function* chessSort(arr) {
  const n = arr.length;

  // Insertion sort — chaque "move" est annote
  for (let i = 1; i < n; i++) {
    const startPos = i;
    let j = i;
    let moves = 0;

    // Evaluer la position: compare avec voisin
    yield { type: 'compare', indices: [j], meta: 'chess_think', thinkIdx: j };

    while (j > 0 && arr[j - 1] > arr[j]) {
      // Determiner la qualite du move
      const distance = startPos - j + 1;
      let quality;
      if (distance === 1 && arr[j - 1] - arr[j] <= 2) {
        quality = 'good'; // ✓ petit ajustement
      } else if (distance >= 3) {
        quality = 'brilliant'; // !! grande reposition
      } else if (arr[j - 1] > arr[j] * 1.5) {
        quality = 'blunder'; // ?? gros decalage
      } else {
        quality = 'risky'; // ?! risque
      }

      yield { type: 'compare', indices: [j - 1, j], meta: 'chess_move', quality, moveIdx: j };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'chess_capture', quality };
      j--;
      moves++;
    }

    // Piece posee — check ou pas
    const moveQuality = moves === 0 ? 'already' : moves >= 3 ? 'brilliant' : 'good';
    yield { type: 'compare', indices: [j], meta: 'chess_placed', quality: moveQuality, placedIdx: j };
  }

  // Checkmate
  for (let f = 0; f < 18; f++) {
    yield { type: 'compare', indices: [], meta: 'chess_checkmate', frame: f };
  }
}
