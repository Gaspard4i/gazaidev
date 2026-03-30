// 67 Sort — Ne garde que les 6 et les 7
// Phase 1 : supprime tout ce qui n'est pas 6 ou 7
// Phase 2 : le resultat final alterne 6,7,6,7... exactement 6 ou 7 fois
export function* sort67(arr) {
  // Phase 1 : purge — seuls les 6 et 7 survivent
  let i = 0;
  while (i < arr.length) {
    yield { type: 'compare', indices: [i], meta: 'evaluate' };
    if (arr[i] !== 6 && arr[i] !== 7) {
      yield { type: 'swap', indices: [i], values: [0], meta: 'purge' };
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  // Phase 2 : on decide — 6 ou 7 elements au final ?
  const finalLength = Math.random() < 0.5 ? 6 : 7;

  // Ajuster la taille : trop court -> ajouter, trop long -> couper
  while (arr.length > finalLength) {
    const last = arr.length - 1;
    yield { type: 'swap', indices: [last], values: [0], meta: 'trim' };
    arr.splice(last, 1);
  }
  while (arr.length < finalLength) {
    const val = arr.length % 2 === 0 ? 6 : 7;
    arr.push(val);
    yield { type: 'swap', indices: [arr.length - 1], values: [val], meta: 'grow' };
  }

  // Phase 3 : forcer l'alternance 6,7,6,7,...
  for (let i = 0; i < arr.length; i++) {
    const target = i % 2 === 0 ? 6 : 7;
    yield { type: 'compare', indices: [i], meta: 'evaluate' };
    if (arr[i] !== target) {
      arr[i] = target;
      yield { type: 'swap', indices: [i], values: [target], meta: 'force' };
    }
  }
}
