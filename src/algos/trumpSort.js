// Trump Sort — "Only the best values, believe me"
// Ne garde que les valeurs les plus hautes (les "riches")
// Les petites valeurs sont "deportees" du tableau
// Le gradient de couleur ne garde que les barres claires
export function* trumpSort(arr) {
  const threshold = Math.max(...arr) * 0.7; // Seuls les top 30% restent

  // Phase 1 : "extreme vetting" — inspecter chaque valeur
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'vetting' };
    if (arr[i] < threshold) {
      // "You're fired"
      yield { type: 'swap', indices: [i], values: [0], meta: 'deported' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : les survivants se trient entre riches
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
