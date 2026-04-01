// NPC Sort — Les barres repetent les memes actions sans reflechir
// "Hmm" "That's crazy" "Oh really?" — avancent par accident
export function* npcSort(arr) {
  const n = arr.length;
  const phrases = ['hmm', "that's crazy", 'oh really?', 'wow', 'interesting', 'no way', 'same', 'literally', 'ok'];
  let phraseIdx = 0;

  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      const phrase = phrases[phraseIdx % phrases.length];
      phraseIdx++;

      // NPC stares at the bars
      yield { type: 'compare', indices: [i, i + 1], meta: 'npc_stare', npcText: phrase };

      if (arr[i] > arr[i + 1]) {
        // NPC accidentally bumps them
        yield { type: 'compare', indices: [i, i + 1], meta: 'npc_bump', npcText: 'oops' };
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'npc_swap', npcText: phrase };
        sorted = false;
      }

      // NPC idle animation every few steps
      if (phraseIdx % 5 === 0) {
        for (let f = 0; f < 5; f++) {
          yield { type: 'compare', indices: [i], meta: 'npc_idle', npcText: '...', idleFrame: f };
        }
      }
    }
  }
}
