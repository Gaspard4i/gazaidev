// Diddy Sort — Les grosses valeurs "invitent" les petites dans leur "party"
// Les petites valeurs disparaissent mysterieusement apres
export function* diddySort(arr) {
  // Phase 1 : les grosses valeurs reperent les petites
  const partyThreshold = Math.max(...arr) * 0.5;

  for (let i = 0; i < arr.length; i++) {
    yield { type: 'compare', indices: [i], meta: 'scouting' };
  }

  // Phase 2 : les petites valeurs sont "invitees a la party"
  let i = 0;
  while (i < arr.length) {
    if (arr[i] < partyThreshold) {
      yield { type: 'compare', indices: [i], meta: 'invited' };
      // Elles disparaissent apres la party...
      yield { type: 'swap', indices: [i], values: [0], meta: 'disappeared' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 3 : les survivants font comme si de rien n'etait et se trient
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
  }
}
