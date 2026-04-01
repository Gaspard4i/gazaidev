// Diddy x Epstein Island Sort — Les barres disparaissent si trop jeunes ET invitees a la party
export function* diddyIslandSort(arr) {
  const n = arr.length;

  // Phase 1: party invitations
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'island_invite', frame: f };
  }

  // Phase 2: les barres arrivent a la party
  for (let i = 0; i < n; i++) {
    yield { type: 'compare', indices: [i], meta: 'island_arrive', arriveIdx: i };
  }

  // Phase 3: les petites barres (< 14) + random grandes barres disparaissent mysterieusement
  for (let i = n - 1; i >= 0; i--) {
    const isYoung = arr[i] < 14;
    const isInvited = Math.random() < 0.3;

    if (isYoung) {
      for (let f = 0; f < 5; f++) {
        yield { type: 'compare', indices: [i], meta: 'island_disappear', disappearIdx: i, frame: f };
      }
      arr[i] = 0;
      yield { type: 'swap', indices: [i], values: [0], meta: 'island_gone' };
    } else if (isInvited) {
      yield { type: 'compare', indices: [i], meta: 'island_witness', witnessIdx: i };
    }
  }

  // Phase 4: sort what remains
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { type: 'swap', indices: [i, j], values: [arr[i], arr[j]] };
      }
    }
  }

  // "The list doesn't exist"
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'island_coverup', frame: f };
  }
}
