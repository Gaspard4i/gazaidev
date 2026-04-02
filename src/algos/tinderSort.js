// Tinder Sort — Swipe right (garde) ou left (jette)
export function* tinderSort(arr) {
  const n = arr.length;

  // Phase 1: swipe — garde les barres dans l'ordre, jette les mauvaises
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      // Inspect profile
      yield { type: 'compare', indices: [j, minIdx], meta: 'tinder_look' };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Swipe left on current, right on better
      yield { type: 'compare', indices: [i], meta: 'tinder_left', leftIdx: i };
      yield { type: 'compare', indices: [minIdx], meta: 'tinder_right', rightIdx: minIdx };
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'tinder_match' };
    } else {
      yield { type: 'compare', indices: [i], meta: 'tinder_super', superIdx: i };
    }
  }

  // It's a match!
  for (let f = 0; f < 12; f++) {
    yield { type: 'compare', indices: [], meta: 'tinder_love', frame: f };
  }
}
