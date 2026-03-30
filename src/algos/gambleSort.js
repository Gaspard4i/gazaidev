// Gamble Sort — On mise sur chaque comparaison
// Si arr[i] < arr[i+1] (deja en ordre) → on gagne le bet
// Sinon → on perd. Le but c'est finir positif.
// Les bets sont aleatoires (1-50)
export function* gambleSort(arr) {
  let balance = 1000;

  // Plusieurs passes comme un bubble sort, mais avec des paris
  for (let pass = 0; pass < arr.length; pass++) {
    for (let i = 0; i < arr.length - 1 - pass; i++) {
      const bet = Math.floor(Math.random() * 50) + 1;
      yield { type: 'compare', indices: [i, i + 1], meta: 'betting', bet, balance };

      if (arr[i] <= arr[i + 1]) {
        // Gagne !
        balance += bet;
        yield { type: 'compare', indices: [i, i + 1], meta: 'win', bet, balance };
      } else {
        // Perdu...
        balance -= bet;
        yield { type: 'compare', indices: [i, i + 1], meta: 'lose', bet, balance };
        // On swap quand meme pour trier
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'swap_after_loss', balance };
      }
    }
  }

  // Resultat final
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [], meta: balance >= 0 ? 'jackpot' : 'bankrupt', balance };
  }
}
