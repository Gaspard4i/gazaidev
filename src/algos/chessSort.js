// Chess Sort — Les barres se deplacent comme des pieces d'echecs
export function* chessSort(arr) {
  const n = arr.length;

  // Insertion sort = le cavalier saute, le fou glisse en diagonale
  const pieces = ['♟', '♞', '♝', '♜', '♛', '♚'];
  for (let i = 1; i < n; i++) {
    const piece = pieces[i % pieces.length];
    yield { type: 'compare', indices: [i], meta: 'chess_move', piece, moveIdx: i };

    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { type: 'compare', indices: [j, j - 1], meta: 'chess_capture', piece };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'chess_take' };
      j--;
    }
  }

  // Checkmate
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'chess_checkmate', frame: f };
  }
}
