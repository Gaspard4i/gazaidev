// Among Us Sort — Crewmates trient, imposteurs tuent
// 2 imposteurs, kill animation, emergency meeting, vote, eject
export function* amongUsSort(arr) {
  const n = arr.length;

  // Choisir 2 imposteurs (par index)
  const imp1 = Math.floor(Math.random() * n);
  let imp2 = Math.floor(Math.random() * n);
  while (imp2 === imp1) imp2 = Math.floor(Math.random() * n);
  const impostors = new Set([imp1, imp2]);
  const dead = new Set();
  let ejected = new Set();
  let killCooldown = 0;
  let meetingsCalled = 0;

  // Intro: crewmates spawn
  for (let f = 0; f < 10; f++) {
    yield { type: 'compare', indices: [], meta: 'among_spawn', frame: f, impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
  }

  // Bubble sort avec events
  let sorted = false;
  let pass = 0;
  while (!sorted && pass < n * n) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      pass++;
      killCooldown++;

      // Skip dead/ejected bars
      if (dead.has(i) || ejected.has(i) || dead.has(i + 1) || ejected.has(i + 1)) continue;

      // Task (sort step)
      yield { type: 'compare', indices: [i, i + 1], meta: 'among_task', impostors: [...impostors], dead: [...dead], ejected: [...ejected] };

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'among_task', impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
        sorted = false;
      }

      // Imposteur kill — cooldown 8 steps, only if impostor still alive
      if (killCooldown > 8 && impostors.size > 0) {
        for (const imp of impostors) {
          if (ejected.has(imp) || dead.has(imp)) continue;
          // Chercher une victime adjacente
          const victim = [imp - 1, imp + 1].find(v => v >= 0 && v < n && !dead.has(v) && !ejected.has(v) && !impostors.has(v));
          if (victim !== undefined && Math.random() < 0.25) {
            // Kill animation
            for (let f = 0; f < 8; f++) {
              yield { type: 'compare', indices: [imp, victim], meta: 'among_kill', killerIdx: imp, victimIdx: victim, frame: f, impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
            }
            dead.add(victim);
            killCooldown = 0;
            break;
          }
        }
      }

      // Decouvrir un body → emergency meeting
      if (dead.size > 0 && !ejected.has(i) && meetingsCalled < 3) {
        for (const d of dead) {
          if (Math.abs(i - d) <= 1 && Math.random() < 0.3) {
            meetingsCalled++;

            // Emergency meeting!
            for (let f = 0; f < 12; f++) {
              yield { type: 'compare', indices: [], meta: 'among_meeting', frame: f, impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
            }

            // Vote phase — chaque barre "pointe" vers un suspect
            // 50% chance d'ejecter le bon imposteur
            let suspect;
            const aliveImpostors = [...impostors].filter(x => !ejected.has(x));
            if (aliveImpostors.length > 0 && Math.random() < 0.5) {
              suspect = aliveImpostors[0]; // correct vote
            } else {
              // mauvais vote — crewmate innocent
              const innocents = [];
              for (let k = 0; k < n; k++) {
                if (!dead.has(k) && !ejected.has(k) && !impostors.has(k)) innocents.push(k);
              }
              suspect = innocents.length > 0 ? innocents[Math.floor(Math.random() * innocents.length)] : aliveImpostors[0];
            }

            if (suspect !== undefined) {
              // Vote animation
              for (let f = 0; f < 8; f++) {
                yield { type: 'compare', indices: [suspect], meta: 'among_vote', suspectIdx: suspect, frame: f, impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
              }

              // Eject animation
              const wasImpostor = impostors.has(suspect);
              for (let f = 0; f < 15; f++) {
                yield { type: 'compare', indices: [suspect], meta: 'among_eject', ejectIdx: suspect, frame: f, wasImpostor, impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
              }
              ejected.add(suspect);
              arr[suspect] = 0;

              // Clear dead bodies after meeting
              dead.clear();
            }
            break;
          }
        }
      }
    }
  }

  // Victory
  const aliveImpostors = [...impostors].filter(x => !ejected.has(x));
  const victory = aliveImpostors.length === 0 ? 'crew' : 'impostor';
  for (let f = 0; f < 15; f++) {
    yield { type: 'compare', indices: [], meta: 'among_victory', victory, frame: f, impostors: [...impostors], dead: [...dead], ejected: [...ejected] };
  }
}
