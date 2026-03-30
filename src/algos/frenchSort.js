// French Sort — Taxe la classe moyenne pour enrichir les riches
// Les petites valeurs (pauvres) perdent encore plus
// Les moyennes (classe moyenne) sont taxees et redistribuees vers le haut
// Les grandes (riches) grossissent
// A la fin: les riches sont enormes, les pauvres ont disparu, la classe moyenne est ecrasee
export function* frenchSort(arr) {
  const maxVal = Math.max(...arr);
  const richThreshold = maxVal * 0.75;
  const poorThreshold = maxVal * 0.3;

  // Phase 1 : identifier les classes
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= richThreshold) {
      yield { type: 'compare', indices: [i], meta: 'rich' };
    } else if (arr[i] <= poorThreshold) {
      yield { type: 'compare', indices: [i], meta: 'poor' };
    } else {
      yield { type: 'compare', indices: [i], meta: 'middle_class' };
    }
  }

  // Phase 2 : taxation — plusieurs passes de redistribution inversee
  for (let pass = 0; pass < 5; pass++) {
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];

      if (val > poorThreshold && val < richThreshold) {
        // Classe moyenne : taxee — perd 15% a chaque passe
        const tax = Math.round(val * 0.15);
        arr[i] = val - tax;
        yield { type: 'swap', indices: [i], values: [arr[i]], meta: 'taxed' };

        // Redistribuer la taxe au plus riche du tableau
        let richestIdx = 0;
        for (let j = 0; j < arr.length; j++) {
          if (arr[j] > arr[richestIdx]) richestIdx = j;
        }
        arr[richestIdx] += tax;
        yield { type: 'swap', indices: [richestIdx], values: [arr[richestIdx]], meta: 'enriched' };
        yield { type: 'compare', indices: [i, richestIdx], meta: 'transfer' };
      } else if (val <= poorThreshold && val > 2) {
        // Pauvres : perdent aussi (inflation, cout de la vie)
        arr[i] = Math.max(1, val - Math.round(val * 0.1));
        yield { type: 'swap', indices: [i], values: [arr[i]], meta: 'impoverished' };
      }
    }

    // Pause entre les passes — "annee fiscale"
    for (let f = 0; f < 10; f++) {
      yield { type: 'compare', indices: [], meta: 'fiscal_year' };
    }
  }

  // Phase 3 : les pauvres en dessous de 3 disparaissent (SDF)
  let i = 0;
  while (i < arr.length) {
    if (arr[i] <= 2) {
      yield { type: 'swap', indices: [i], values: [0], meta: 'homeless' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 4 : "tri" final — les riches en premier (tri decroissant)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]] };
      }
    }
  }
}
