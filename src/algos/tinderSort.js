// Tinder Sort — Swipe right (keep), swipe left (reject), match!
export function* tinderSort(arr) {
  const n = arr.length;
  let matches = 0;

  for (let i = 0; i < n; i++) {
    // Look at profile
    yield { type: 'compare', indices: [i], meta: 'tinder_look', lookIdx: i, matches };

    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIdx], meta: 'tinder_browse', matches };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Swipe left on current
      for (let f = 0; f < 3; f++) {
        yield { type: 'compare', indices: [i], meta: 'tinder_left', leftIdx: i, frame: f, matches };
      }
      // Swipe right on match
      for (let f = 0; f < 3; f++) {
        yield { type: 'compare', indices: [minIdx], meta: 'tinder_right', rightIdx: minIdx, frame: f, matches };
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      // It's a match!
      matches++;
      for (let f = 0; f < 5; f++) {
        yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'tinder_match', frame: f, matches };
      }
    } else {
      // Super like — already in place
      yield { type: 'compare', indices: [i], meta: 'tinder_super', superIdx: i, matches };
    }
  }

  // Love ending
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'tinder_love', frame: f, matches };
  }
}
