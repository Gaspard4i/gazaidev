// Sleep Sort — simulated: places elements one by one from smallest to largest
// (real sleep sort uses threads with delays, we simulate the result)
export function* sleepSort(arr) {
  const sorted = [...arr].sort((a, b) => a - b);

  // Simulate "waking up" one by one
  for (let i = 0; i < sorted.length; i++) {
    // Find where this value currently is
    const currentIdx = arr.indexOf(sorted[i]);
    yield { type: 'compare', indices: [currentIdx], meta: 'sleeping' };

    // "Wake up" — place it
    if (currentIdx !== i) {
      [arr[i], arr[currentIdx]] = [arr[currentIdx], arr[i]];
      yield { type: 'swap', indices: [i, currentIdx], values: [arr[i], arr[currentIdx]], meta: 'wakeup' };
    }

    // Pause between wakeups (simulates the sleep delay)
    yield { type: 'compare', indices: [i], meta: 'placed' };
  }
}
