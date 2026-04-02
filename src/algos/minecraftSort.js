// Minecraft Sort — Mine les blocs mal places, insertion sort
// Un bloc aleatoire est vert (creeper) — s'il est approche, explosion!
export function* minecraftSort(arr) {
  const n = arr.length;

  // Choisir un creeper au hasard (valeur aleatoire dans le tableau)
  const creeperVal = arr[Math.floor(Math.random() * n)];
  let creeperExploded = false;

  // Intro: montrer le creeper qui hiss
  const creeperIdx = arr.indexOf(creeperVal);
  for (let f = 0; f < 8; f++) {
    yield { type: 'compare', indices: [creeperIdx], meta: 'mc_creeper_idle', creeperVal, frame: f };
  }

  // Insertion sort — chaque barre mal placee est "minee"
  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0 && arr[j - 1] > arr[j]) {
      // Verifier la proximite du creeper avant de miner
      if (!creeperExploded) {
        const ci = arr.indexOf(creeperVal);
        if (ci !== -1 && Math.abs(j - ci) <= 2) {
          // Hissing — ssssss
          for (let f = 0; f < 10; f++) {
            yield { type: 'compare', indices: [ci], meta: 'mc_creeper_hiss', creeperVal, creeperIdx: ci, frame: f };
          }
          // BOOM — explosion, supprime les barres autour
          creeperExploded = true;
          const blast = 3;
          for (let f = 0; f < 12; f++) {
            yield { type: 'compare', indices: [ci], meta: 'mc_explosion', creeperVal, explosionIdx: ci, explosionFrame: f };
          }
          // Supprime les blocs dans le rayon
          for (let k = Math.max(0, ci - blast); k <= Math.min(n - 1, ci + blast); k++) {
            arr[k] = 0;
            yield { type: 'swap', indices: [k], values: [0], meta: 'mc_blast_remove', creeperVal };
          }
          // Reset j pour ne pas miner une barre supprimee
          j = Math.min(j, n - 1);
          continue;
        }
      }

      // Animation de minage — 4 stages de fissures
      for (let crack = 0; crack < 4; crack++) {
        yield { type: 'compare', indices: [j - 1], meta: 'mc_mining', creeperVal, mineIdx: j - 1, crackStage: crack };
      }

      // Mine! Le bloc remonte a sa place
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      yield { type: 'swap', indices: [j - 1, j], values: [arr[j - 1], arr[j]], meta: 'mc_place', creeperVal, placeIdx: j - 1 };

      j--;
    }

    // Bloc pose correctement
    yield { type: 'compare', indices: [j], meta: 'mc_scan', creeperVal };
  }
}
