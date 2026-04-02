// Valorant Sort — FPS, peek, headshot, kill feed, ace
export function* valorantSort(arr) {
  const n = arr.length;
  const killFeed = []; // { from, to }

  for (let i = 0; i < n; i++) {
    // Peek
    for (let f = 0; f < 3; f++) {
      yield { type: 'compare', indices: [i], meta: 'valo_peek', peekIdx: i, killFeed: [...killFeed] };
    }

    // Aim — find target (min in unsorted)
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [i, j], meta: 'valo_aim', killFeed: [...killFeed] };
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      // Headshot!
      for (let f = 0; f < 4; f++) {
        yield { type: 'compare', indices: [minIdx], meta: 'valo_headshot', hsIdx: minIdx, frame: f, killFeed: [...killFeed] };
      }

      killFeed.push({ from: arr[i], to: arr[minIdx] });
      if (killFeed.length > 3) killFeed.shift();

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], meta: 'valo_kill', killFeed: [...killFeed] };
    }
  }

  // ACE!
  for (let f = 0; f < 18; f++) {
    yield { type: 'compare', indices: [], meta: 'valo_ace', frame: f, killFeed: [...killFeed] };
  }
}
