// WiFi Sort — Connexion instable, barres freeze, lag, reconnexion
export function* wifiSort(arr) {
  const n = arr.length;
  let signal = 3; // 0-3 bars

  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      // Signal fluctue
      signal = Math.max(0, Math.min(3, signal + (Math.random() < 0.3 ? -1 : Math.random() < 0.3 ? 1 : 0)));

      yield { type: 'compare', indices: [i, i + 1], meta: 'wifi_scan', signal };

      // Deconnexion
      if (signal === 0) {
        for (let f = 0; f < 6; f++) {
          yield { type: 'compare', indices: [], meta: 'wifi_lost', frame: f };
        }
        // Reconnexion
        yield { type: 'compare', indices: [], meta: 'wifi_reconnect' };
        signal = 2;
        continue;
      }

      if (arr[i] > arr[i + 1]) {
        // Lag before swap
        if (signal < 2) {
          for (let f = 0; f < 3; f++) {
            yield { type: 'compare', indices: [i, i + 1], meta: 'wifi_lag', signal };
          }
        }
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: 'swap', indices: [i, i + 1], values: [arr[i], arr[i + 1]], meta: 'wifi_swap', signal };
        sorted = false;
      }
    }
  }
}
