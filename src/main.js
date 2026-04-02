import { Renderer } from './renderer/canvas.js';
import { Sonifier } from './audio/sonifier.js';
import { Recorder } from './recorder/recorder.js';
import { bubbleSort } from './algos/bubbleSort.js';
import { quickSort } from './algos/quickSort.js';
import { mergeSort } from './algos/mergeSort.js';
import { thanosSort } from './algos/thanosSort.js';
import { communismSort } from './algos/communismSort.js';
import { stalinSort } from './algos/stalinSort.js';
import { sort67 } from './algos/67Sort.js';
import { trumpSort } from './algos/trumpSort.js';
import { hitlerSort } from './algos/hitlerSort.js';
import { diddySort } from './algos/diddySort.js';
import { epsteinSort } from './algos/epsteinSort.js';
import { nineElevenSort } from './algos/nineElevenSort.js';
import { unsort } from './algos/unsort.js';
import { bogoSort } from './algos/bogoSort.js';
import { sigmaSort } from './algos/sigmaSort.js';
import { gazaSort } from './algos/gazaSort.js';
import { frenchSort } from './algos/frenchSort.js';
import { gambleSort } from './algos/gambleSort.js';
import { adhdSort } from './algos/adhdSort.js';
import { autismSort } from './algos/autismSort.js';
import { magicianSort } from './algos/magicianSort.js';
import { drugSort } from './algos/drugSort.js';
import { pongSort } from './algos/pongSort.js';
import { claudeSort } from './algos/claudeSort.js';
import { chatgptSort } from './algos/chatgptSort.js';
import { hiroshimaSort } from './algos/hiroshimaSort.js';
import { selectionSort } from './algos/selectionSort.js';
import { insertionSort } from './algos/insertionSort.js';
import { heapSort } from './algos/heapSort.js';
import { shellSort } from './algos/shellSort.js';
import { combSort } from './algos/combSort.js';
import { cocktailSort } from './algos/cocktailSort.js';
import { gnomeSort } from './algos/gnomeSort.js';
import { oddEvenSort } from './algos/oddEvenSort.js';
import { countingSort } from './algos/countingSort.js';
import { radixSort } from './algos/radixSort.js';
import { bucketSort } from './algos/bucketSort.js';
import { cycleSort } from './algos/cycleSort.js';
import { pancakeSort } from './algos/pancakeSort.js';
import { stoogeSort } from './algos/stoogeSort.js';
import { bitonicSort } from './algos/bitonicSort.js';
import { timSort } from './algos/timSort.js';
import { dualPivotQuickSort } from './algos/dualPivotQuickSort.js';
import { slowSort } from './algos/slowSort.js';
import { sleepSort } from './algos/sleepSort.js';
import { strandSort } from './algos/strandSort.js';
import { patienceSort } from './algos/patienceSort.js';
import { manualSort } from './algos/manualSort.js';
import { skibidiSort } from './algos/skibidiSort.js';
import { hawkTuahSort } from './algos/hawkTuahSort.js';
import { rizzSort } from './algos/rizzSort.js';
import { mewingSort } from './algos/mewingSort.js';
import { ohioSort } from './algos/ohioSort.js';
import { brainrotSort } from './algos/brainrotSort.js';
import { fanumTaxSort } from './algos/fanumTaxSort.js';
import { northKoreaSort } from './algos/northKoreaSort.js';
import { ukraineSort } from './algos/ukraineSort.js';
import { elonSort } from './algos/elonSort.js';
import { npcSort } from './algos/npcSort.js';
import { diddyIslandSort } from './algos/diddyIslandSort.js';
import { minecraftSort } from './algos/minecraftSort.js';
import { valorantSort } from './algos/valorantSort.js';
import { rocketLeagueSort } from './algos/rocketLeagueSort.js';
import { pokemonSort } from './algos/pokemonSort.js';
import { planeSort } from './algos/planeSort.js';
import { boatSort } from './algos/boatSort.js';
import { carSort } from './algos/carSort.js';
import { libertySort } from './algos/libertySort.js';
import { prisonSort } from './algos/prisonSort.js';
import { breakingBadSort } from './algos/breakingBadSort.js';
import { chessSort } from './algos/chessSort.js';
import { monopolySort } from './algos/monopolySort.js';
import { tetrisSort } from './algos/tetrisSort.js';
import { gtaSort } from './algos/gtaSort.js';
import { fortniteSort } from './algos/fortniteSort.js';
import { amongUsSort } from './algos/amongUsSort.js';
import { unoSort } from './algos/unoSort.js';
import { netflixSort } from './algos/netflixSort.js';
import { tinderSort } from './algos/tinderSort.js';
import { coffeeSort } from './algos/coffeeSort.js';
import { ikeaSort } from './algos/ikeaSort.js';
import { wifiSort } from './algos/wifiSort.js';
import { seaweedSort } from './algos/seaweedSort.js';

// Preload Inter pour le canvas
document.fonts.ready.then(() => {});

const canvas = document.getElementById('canvas');
const statusEl = document.getElementById('status');
const algoSelect = document.getElementById('algo-select');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const btnLoop = document.getElementById('btn-loop');
const btnRainbow = document.getElementById('btn-rainbow');
const speedSlider = document.getElementById('speed');
const speedMode = document.getElementById('speed-mode');

const barsSlider = document.getElementById('bars');

barsSlider.addEventListener('change', () => {
  if (phase === 'idle') reset();
});

const ALGOS = {
  bubble: bubbleSort, quick: quickSort, merge: mergeSort,
  thanos: thanosSort, communism: communismSort, stalin: stalinSort,
  sort67: sort67, trump: trumpSort, hitler: hitlerSort,
  diddy: diddySort, epstein: epsteinSort,
  nineEleven: nineElevenSort, unsort: unsort,
  bogo: bogoSort, sigma: sigmaSort, gaza: gazaSort, french: frenchSort,
  gamble: gambleSort, adhd: adhdSort, autism: autismSort, magician: magicianSort,
  drug: drugSort, pong: pongSort, claude: claudeSort, chatgpt: chatgptSort, hiroshima: hiroshimaSort,
  selection: selectionSort, insertion: insertionSort, heap: heapSort,
  shell: shellSort, comb: combSort, cocktail: cocktailSort,
  gnome: gnomeSort, oddEven: oddEvenSort, counting: countingSort,
  radix: radixSort, bucket: bucketSort, cycle: cycleSort,
  pancake: pancakeSort, stooge: stoogeSort, bitonic: bitonicSort,
  tim: timSort, dualPivot: dualPivotQuickSort, slow: slowSort,
  sleep: sleepSort, strand: strandSort, patience: patienceSort,
  manual: manualSort,
  skibidi: skibidiSort, hawkTuah: hawkTuahSort, rizz: rizzSort,
  mewing: mewingSort, ohio: ohioSort, brainrot: brainrotSort,
  fanumTax: fanumTaxSort, northKorea: northKoreaSort,
  ukraine: ukraineSort, elon: elonSort, npc: npcSort,
  diddyIsland: diddyIslandSort,
  minecraft: minecraftSort, valorant: valorantSort, rocketLeague: rocketLeagueSort,
  pokemon: pokemonSort, plane: planeSort, boat: boatSort, car: carSort,
  liberty: libertySort, prison: prisonSort, breakingBad: breakingBadSort,
  chess: chessSort, monopoly: monopolySort, tetris: tetrisSort,
  gta: gtaSort, fortnite: fortniteSort, amongUs: amongUsSort,
  uno: unoSort, netflix: netflixSort, tinder: tinderSort,
  coffee: coffeeSort, ikea: ikeaSort, wifi: wifiSort,
  seaweed: seaweedSort,
};
const META = {
  bubble: {
    name: 'Bubble Sort', complexity: 'O(n\u00B2)', desc: 'Compares neighbors and swaps them. Simple but slow.',
    code: ['function bubbleSort(arr) {', '  for (let i = 0; i < arr.length; i++)', '    for (let j = 0; j < arr.length - i; j++)', '      if (arr[j] > arr[j+1])', '        swap(arr, j, j+1)', '}'],
  },
  quick: {
    name: 'Quick Sort', complexity: 'O(n log n)', desc: 'Picks a pivot, partitions, conquers. The GOAT.',
    code: ['function quickSort(arr, lo, hi) {', '  let pivot = arr[hi]', '  let i = lo', '  for (let j = lo; j < hi; j++)', '    if (arr[j] < pivot) swap(arr, i++, j)', '  swap(arr, i, hi)', '  quickSort(arr, lo, i-1)', '  quickSort(arr, i+1, hi)', '}'],
  },
  merge: {
    name: 'Merge Sort', complexity: 'O(n log n)', desc: 'Divide, sort halves, merge. Stable & reliable.',
    code: ['function mergeSort(arr) {', '  if (arr.length <= 1) return arr', '  let mid = arr.length / 2', '  let L = mergeSort(arr.slice(0, mid))', '  let R = mergeSort(arr.slice(mid))', '  return merge(L, R)', '}'],
  },
  thanos: {
    name: 'Thanos Sort', complexity: 'O(n/2... /2... /2)', desc: '"I am inevitable." Snaps half the unsorted elements each pass.',
    code: ['function thanosSort(arr) {', '  while (!sorted(arr)) {', '    snap(arr) // remove random half', '    if (arr.length <= 1) break', '  }', '  return arr // perfectly balanced', '}'],
  },
  communism: {
    name: 'Communism Sort', complexity: 'O(equality)', desc: 'Redistributes all values equally. No one is above average, comrade.',
    code: ['function communismSort(arr) {', '  let avg = sum(arr) / arr.length', '  for (let i = 0; i < arr.length; i++)', '    arr[i] = avg // equal for all', '  return arr // sorted. and fair.', '}'],
  },
  stalin: {
    name: 'Stalin Sort', complexity: 'O(n) guaranteed', desc: 'One pass. Any element out of order goes to the gulag.',
    code: ['function stalinSort(arr) {', '  let max = arr[0]', '  for (let i = 1; i < arr.length; i++)', '    if (arr[i] < max)', '      arr.splice(i--, 1) // gulag', '    else max = arr[i]', '}'],
  },
  sort67: {
    name: '6/7 Sort', complexity: 'O(6/7)', desc: 'Deletes everything except 6 and 7. Sorts what\'s left.',
    code: ['function sixSevenSort(arr) {', '  for (let i = arr.length - 1; i >= 0; i--)', '    if (arr[i] !== 6 && arr[i] !== 7)', '      arr.splice(i, 1)', '  while (!sorted(arr))', '    swap(arr, 0, 1)', '}'],
  },
  trump: {
    name: 'Trump Sort', complexity: 'O(tremendous)', desc: 'The best sort. Nobody sorts better. Believe me.',
    code: ['function trumpSort(arr) {', '  for (let i = 0; i < arr.length; i++)', '    swap(arr, i, Math.floor(Math.random() * arr.length))', '  return arr // sorted. the best. ever.', '}'],
  },
  hitler: {
    name: 'Hitler Sort', complexity: 'O(nein)', desc: 'Separates prime numbers into a second list. Then deletes it.',
    code: ['function hitlerSort(arr) {', '  let camp = arr.filter(isPrime)', '  arr = arr.filter(x => !isPrime(x))', '  camp = [] // deleted', '  return arr.sort() // pure now', '}'],
  },
  diddy: {
    name: 'Diddy Sort', complexity: 'O(party)', desc: 'Big values invite small ones to the party. They disappear after.',
    code: ['function diddySort(arr) {', '  let party = arr.filter(x => x < 18)', '  arr = arr.filter(x => x >= 18)', '  party = [] // they vanished', '  return arr.sort()', '}'],
  },
  epstein: {
    name: 'Epstein Sort', complexity: 'O(under 14)', desc: 'Only keeps values under 14. The rest are "too old".',
    code: ['function epsteinSort(arr) {', '  for (let i = arr.length - 1; i >= 0; i--)', '    if (arr[i] >= 14)', '      arr.splice(i, 1) // too old', '  return arr.sort()', '}'],
  },
  nineEleven: {
    name: '9/11 Sort', complexity: 'O(2 towers)', desc: 'Finds 2 equal tall bars. Then a plane comes.',
    code: ['function nineElevenSort(arr) {', '  let t1 = findTallest(arr)', '  let t2 = findTallest(arr, t1)', '  plane.fly(t1) // impact', '  plane.fly(t2) // impact', '  arr = rubble(arr)', '}'],
  },
  unsort: {
    name: 'Unsort', complexity: 'O(chaos)', desc: 'First sorts perfectly. Then destroys everything.',
    code: ['function unsort(arr) {', '  arr.sort((a, b) => a - b) // sorted!', '  for (let i = 0; i < arr.length; i++)', '    swap(arr, i, rand(arr.length))', '  return arr // chaos achieved', '}'],
  },
  bogo: {
    name: 'Bogo Sort', complexity: 'O(n \u00D7 n!)', desc: 'Random shuffle until sorted. Pray.',
    code: ['function bogoSort(arr) {', '  while (!sorted(arr))', '    shuffle(arr) // try again', '  return arr // miracle', '}'],
  },
  sigma: {
    name: 'Alpha Sort', complexity: 'O(sigma\u00B2)', desc: 'Random bar howls, takes #1 spot, sorts betas below.',
    code: ['function alphaSort(arr) {', '  let alpha = findMax(arr)', '  alpha.howl() // AWOOO', '  move(alpha, 0) // #1 spot', '  arr.slice(1).sort() // betas', '  return arr // sigma grindset', '}'],
  },
  gaza: {
    name: 'Gaza Sort', complexity: 'O(genocide)', desc: 'Bombs only fall on children. Then airstrikes destroy everything.',
    code: ['function gazaSort(arr) {', '  for (let x of arr)', '    if (x < median(arr))', '      bomb(x) // civilian target', '  airstrike(arr) // destroy all', '  return [] // nothing left', '}'],
  },
  french: {
    name: 'French Sort', complexity: 'O(taxes\u00B2)', desc: 'Taxes the middle class to enrich the rich. The poor disappear.',
    code: ['function frenchSort(arr) {', '  let rich = top10(arr)', '  let poor = bottom30(arr)', '  let middle = rest(arr)', '  tax(middle, 45) // fiscal year', '  enrich(rich, middle.taxes)', '  delete poor // forgotten', '}'],
  },
  gamble: {
    name: 'Gamble Sort', complexity: 'O(n \u00D7 luck)', desc: 'Bet on each comparison. Win if already sorted, lose if not.',
    code: ['function gambleSort(arr) {', '  let balance = 1000', '  for (let i = 0; i < arr.length; i++)', '    if (arr[i] > arr[i+1])', '      balance -= bet(arr, i)', '    else balance += bet(arr, i)', '  return arr // bankrupt or rich', '}'],
  },
  adhd: {
    name: 'ADHD Sort', complexity: 'O(n\u00B2 + distractions)', desc: 'Sorts a little, gets distracted, sorts more, gets distracted again...',
    code: ['function adhdSort(arr) {', '  let i = 0, sorted = 0', '  while (sorted < arr.length) {', '    for (let j = i+1; j < arr.length; j++)', '      if (arr[j] < arr[i]) swap(arr, i, j)', '    sorted++', '    if (Math.random() < 0.4)', '      swap(arr, rand(), rand())', '  }', '}'],
  },
  autism: {
    name: 'Autism Sort', complexity: 'O(1) (big brain)', desc: 'Analyzes everything, calculates, then solves it instantly.',
    code: ['function autismSort(arr) {', '  analyze(arr) // deep focus', '  let solution = calculate(arr)', '  // IQ: 9000', '  arr = solution // instant', '  return arr // obviously', '}'],
  },
  magician: {
    name: 'Magician Sort', complexity: 'O(abracadabra)', desc: 'Hides the list behind a curtain. When revealed: sorted. TADAA!',
    code: ['function magicianSort(arr) {', '  curtain.close()', '  // nothing to see here', '  arr.sort((a, b) => a - b)', '  curtain.open()', '  confetti() // TADAA!', '  return arr', '}'],
  },
  drug: {
    name: 'Drug Sort', complexity: 'O(trip)', desc: 'Takes substances. Hallucinates. Wakes up with it sorted but flipped.',
    code: ['function drugSort(arr) {', '  take("substances")', '  hallucinate(arr) // woaaah', '  peak(arr) // the colors...', '  arr.sort((a, b) => a - b)', '  arr.reverse() // oops flipped', '  return arr // sorted... I think?', '}'],
  },
  pong: {
    name: 'Pong Sort', complexity: 'O(n\u00B2 rallies)', desc: 'Two bars play Pong. Loser gets sorted. Square ball.',
    code: ['function pongSort(arr) {', '  while (!sorted(arr)) {', '    let [a, b] = pickTwo(arr)', '    let winner = playPong(a, b)', '    if (a > b) swap(arr, a, b)', '  }', '  return arr // game over', '}'],
  },
  claude: {
    name: 'Claude Sort', complexity: 'O(no tokens)', desc: 'Asks AI to sort. AI refuses. Runs out of tokens. Declares sorted.',
    code: ['function claudeSort(arr) {', '  ask("sort this array")', '  // "I\'d be happy to help!"', '  // "However, I must note..."', '  // TOKEN LIMIT REACHED', '  return arr // "sorted"', '}'],
  },
  chatgpt: {
    name: 'ChatGPT Sort', complexity: 'O(emojis)', desc: 'Explains sorting with emojis. Never actually sorts anything.',
    code: ['function chatgptSort(arr) {', '  explain(arr) // with emojis', '  // "Great question! Let me..."', '  // "Here\'s a fun way to..."', '  // *never sorts anything*', '  return arr // unchanged', '}'],
  },
  hiroshima: {
    name: 'Hiroshima Sort', complexity: 'O(boom)', desc: 'Sorts normally. Then a nuke drops. Nothing survives.',
    code: ['function hiroshimaSort(arr) {', '  arr.sort((a, b) => a - b)', '  // sorted! hooray!', '  nuke.drop() // oh no', '  return [] // nothing survives', '}'],
  },
  selection: {
    name: 'Selection Sort', complexity: 'O(n\u00B2)', desc: 'Finds minimum each pass, places it at the start.',
    code: ['function selectionSort(arr) {', '  for (let i = 0; i < arr.length; i++) {', '    let min = i', '    for (let j = i+1; j < arr.length; j++)', '      if (arr[j] < arr[min]) min = j', '    swap(arr, i, min)', '  }', '}'],
  },
  insertion: {
    name: 'Insertion Sort', complexity: 'O(n\u00B2)', desc: 'Inserts each element into its correct position.',
    code: ['function insertionSort(arr) {', '  for (let i = 1; i < arr.length; i++) {', '    let key = arr[i], j = i - 1', '    while (j >= 0 && arr[j] > key)', '      arr[j+1] = arr[j--]', '    arr[j+1] = key', '  }', '}'],
  },
  heap: {
    name: 'Heap Sort', complexity: 'O(n log n)', desc: 'Builds a max heap, then extracts elements.',
    code: ['function heapSort(arr) {', '  buildMaxHeap(arr)', '  for (let i = arr.length - 1; i > 0; i--) {', '    swap(arr, 0, i)', '    heapify(arr, 0, i)', '  }', '}'],
  },
  shell: {
    name: 'Shell Sort', complexity: 'O(n log n)', desc: 'Insertion sort with decreasing gap.',
    code: ['function shellSort(arr) {', '  let gap = arr.length / 2', '  while (gap > 0) {', '    for (let i = gap; i < arr.length; i++)', '      insertWithGap(arr, i, gap)', '    gap = Math.floor(gap / 2)', '  }', '}'],
  },
  comb: {
    name: 'Comb Sort', complexity: 'O(n log n)', desc: 'Bubble sort with shrinking gap (factor 1.3).',
    code: ['function combSort(arr) {', '  let gap = arr.length', '  while (gap > 1 || !sorted) {', '    gap = Math.floor(gap / 1.3)', '    for (let i = 0; i + gap < arr.length; i++)', '      if (arr[i] > arr[i+gap])', '        swap(arr, i, i+gap)', '  }', '}'],
  },
  cocktail: {
    name: 'Cocktail Sort', complexity: 'O(n\u00B2)', desc: 'Bidirectional bubble sort (left-right-left).',
    code: ['function cocktailSort(arr) {', '  let start = 0, end = arr.length - 1', '  while (start < end) {', '    bubbleRight(arr, start, end--)', '    bubbleLeft(arr, start++, end)', '  }', '}'],
  },
  gnome: {
    name: 'Gnome Sort', complexity: 'O(n\u00B2)', desc: 'Like a gnome sorting flower pots, one at a time.',
    code: ['function gnomeSort(arr) {', '  let i = 0', '  while (i < arr.length) {', '    if (i == 0 || arr[i] >= arr[i-1])', '      i++', '    else { swap(arr, i, i-1); i-- }', '  }', '}'],
  },
  oddEven: {
    name: 'Odd-Even Sort', complexity: 'O(n\u00B2)', desc: 'Alternates comparing odd and even index pairs.',
    code: ['function oddEvenSort(arr) {', '  let sorted = false', '  while (!sorted) {', '    sorted = true', '    compareSwapPairs(arr, "even")', '    compareSwapPairs(arr, "odd")', '  }', '}'],
  },
  counting: {
    name: 'Counting Sort', complexity: 'O(n+k)', desc: 'Counts occurrences, rebuilds sorted array. No comparisons.',
    code: ['function countingSort(arr) {', '  let count = new Array(max+1).fill(0)', '  for (let x of arr) count[x]++', '  let i = 0', '  for (let v = 0; v <= max; v++)', '    while (count[v]-- > 0)', '      arr[i++] = v', '}'],
  },
  radix: {
    name: 'Radix Sort', complexity: 'O(n\u00B7k)', desc: 'Sorts digit by digit, from least to most significant.',
    code: ['function radixSort(arr) {', '  for (let d = 0; d < maxDigits; d++) {', '    let buckets = makeBuckets(10)', '    for (let x of arr)', '      buckets[digit(x, d)].push(x)', '    arr = buckets.flat()', '  }', '}'],
  },
  bucket: {
    name: 'Bucket Sort', complexity: 'O(n+k)', desc: 'Distributes into buckets, sorts each, concatenates.',
    code: ['function bucketSort(arr) {', '  let buckets = makeBuckets(n)', '  for (let x of arr)', '    buckets[Math.floor(x / n)].push(x)', '  for (let b of buckets) b.sort()', '  return buckets.flat()', '}'],
  },
  cycle: {
    name: 'Cycle Sort', complexity: 'O(n\u00B2)', desc: 'Minimizes writes by finding permutation cycles.',
    code: ['function cycleSort(arr) {', '  for (let i = 0; i < arr.length; i++) {', '    let pos = i', '    for (let j = i+1; j < arr.length; j++)', '      if (arr[j] < arr[i]) pos++', '    if (pos != i) swap(arr, i, pos)', '  }', '}'],
  },
  pancake: {
    name: 'Pancake Sort', complexity: 'O(n\u00B2)', desc: 'Flips portions like flipping pancakes.',
    code: ['function pancakeSort(arr) {', '  for (let size = arr.length; size > 1; size--) {', '    let maxIdx = findMax(arr, size)', '    flip(arr, maxIdx) // max to top', '    flip(arr, size-1) // top to end', '  }', '}'],
  },
  stooge: {
    name: 'Stooge Sort', complexity: 'O(n\u00B2\u00B7\u2077)', desc: 'Recursively sorts 2/3, 2/3, 2/3. Hilariously slow.',
    code: ['function stoogeSort(arr, i, j) {', '  if (arr[i] > arr[j]) swap(arr, i, j)', '  if (j - i + 1 > 2) {', '    let t = Math.floor((j-i+1) / 3)', '    stoogeSort(arr, i, j-t)', '    stoogeSort(arr, i+t, j)', '    stoogeSort(arr, i, j-t)', '  }', '}'],
  },
  bitonic: {
    name: 'Bitonic Sort', complexity: 'O(n log\u00B2n)', desc: 'Network sort using bitonic sequences. Parallelizable.',
    code: ['function bitonicSort(arr, lo, n, dir) {', '  if (n > 1) {', '    let m = n / 2', '    bitonicSort(arr, lo, m, 1)', '    bitonicSort(arr, lo+m, m, 0)', '    bitonicMerge(arr, lo, n, dir)', '  }', '}'],
  },
  tim: {
    name: 'Tim Sort', complexity: 'O(n log n)', desc: 'Hybrid merge+insertion. Python/Java default.',
    code: ['function timSort(arr) {', '  let runs = findRuns(arr, 32)', '  for (let run of runs)', '    insertionSort(run)', '  while (runs.length > 1)', '    runs = mergeRuns(runs)', '  return runs[0]', '}'],
  },
  dualPivot: {
    name: 'Dual Pivot QS', complexity: 'O(n log n)', desc: 'Quick sort with 2 pivots. Java default.',
    code: ['function dualPivotQS(arr, lo, hi) {', '  let [p1, p2] = pickPivots(arr, lo, hi)', '  let [lt, gt] = partition(arr, lo, hi, p1, p2)', '  dualPivotQS(arr, lo, lt-1)', '  dualPivotQS(arr, lt+1, gt-1)', '  dualPivotQS(arr, gt+1, hi)', '}'],
  },
  slow: {
    name: 'Slow Sort', complexity: 'O(n^log n)', desc: 'Multiply and surrender. Intentionally terrible.',
    code: ['function slowSort(arr, i, j) {', '  if (i >= j) return', '  let m = Math.floor((i+j) / 2)', '  slowSort(arr, i, m)', '  slowSort(arr, m+1, j)', '  if (arr[m] > arr[j]) swap(arr, m, j)', '  slowSort(arr, i, j-1)', '}'],
  },
  sleep: {
    name: 'Sleep Sort', complexity: 'O(max)', desc: 'Each element sleeps for its value, wakes up in order.',
    code: ['function sleepSort(arr) {', '  let result = []', '  for (let x of arr)', '    setTimeout(() => result.push(x), x)', '  // wait for all to wake up...', '  return result', '}'],
  },
  strand: {
    name: 'Strand Sort', complexity: 'O(n\u00B2)', desc: 'Extracts sorted subsequences and merges them.',
    code: ['function strandSort(arr) {', '  let result = []', '  while (arr.length > 0) {', '    let sub = extractSorted(arr)', '    result = merge(result, sub)', '  }', '  return result', '}'],
  },
  patience: {
    name: 'Patience Sort', complexity: 'O(n log n)', desc: 'Like dealing cards into piles, then merging.',
    code: ['function patienceSort(arr) {', '  let piles = []', '  for (let card of arr)', '    placeOnPile(piles, card)', '  return mergePiles(piles)', '}'],
  },
  manual: {
    name: 'Manual Sort', complexity: 'O(n\u00B2 fingers)', desc: 'A hand grabs each bar and slides it into place. Human-powered.',
    code: ['function manualSort(arr) {', '  for (let i = 1; i < arr.length; i++) {', '    hand.grab(arr[i])', '    while (i > 0 && arr[i-1] > arr[i])', '      hand.slideLeft(arr, i--)', '    hand.drop()', '  }', '}'],
  },
  skibidi: {
    name: 'Skibidi Sort', complexity: 'O(skibidi)', desc: 'Skibidi dop dop dop yes yes. Toilets flush unsorted bars.',
    code: ['function skibidiSort(arr) {', '  skibidi_dop_dop_dop()', '  while (!sorted(arr))', '    for (let i of arr)', '      if (wrong(i)) toilet.flush(i)', '  return arr // yes yes', '}'],
  },
  hawkTuah: {
    name: 'Hawk Tuah Sort', complexity: 'O(tuah)', desc: 'Spit on that thang. Each bar slides into place.',
    code: ['function hawkTuahSort(arr) {', '  for (let i = 1; i < arr.length; i++) {', '    hawkTuah(arr[i]) // spit on it', '    while (i > 0 && arr[i-1] > arr[i])', '      slide(arr, i--) // slippery', '  }', '}'],
  },
  rizz: {
    name: 'Rizz Sort', complexity: 'O(rizz)', desc: 'Each bar tries to rizz its neighbor. W rizz = swap. L rizz = rejected.',
    code: ['function rizzSort(arr) {', '  while (!sorted(arr))', '    for (let i = 0; i < arr.length - 1; i++)', '      if (arr[i] > arr[i+1])', '        rizz(arr[i], arr[i+1]) // W', '      else', '        rejected() // L', '}'],
  },
  mewing: {
    name: 'Mewing Sort', complexity: 'O(jawline)', desc: 'Bars mew to improve their position. Normies stay at the bottom.',
    code: ['function mewingSort(arr) {', '  for (let i = 0; i < arr.length; i++) {', '    let chad = findMin(arr, i)', '    chad.mew() // jawline +100', '    swap(arr, i, chad)', '  } // moggers only', '}'],
  },
  ohio: {
    name: 'Ohio Sort', complexity: 'O(ohio)', desc: 'Only in Ohio. Pure chaos, then somehow sorted.',
    code: ['function ohioSort(arr) {', '  // phase 1: ohio', '  for (let i = 0; i < n*2; i++)', '    teleport(arr, rand(), rand())', '  // phase 2: ???', '  sort(arr) // only in ohio', '}'],
  },
  brainrot: {
    name: 'Brainrot Sort', complexity: 'O(braincells)', desc: 'Skibidi rizz sigma fanum. Sorts one step between memes.',
    code: ['function brainrotSort(arr) {', '  while (!sorted(arr)) {', '    for (let i = 0; i < arr.length; i++)', '      meme(random_brainrot())', '      if (arr[i] > arr[i+1])', '        swap(arr, i, i+1)', '  } // no braincells left', '}'],
  },
  fanumTax: {
    name: 'Fanum Tax Sort', complexity: 'O(tax%)', desc: 'Takes a tax from each bar. They all shrink equally.',
    code: ['function fanumTaxSort(arr) {', '  sort(arr) // normal sort', '  for (let round = 0; round < 3; round++)', '    for (let i of arr)', '      if (i > avg) i *= 0.8 // taxed', '  return arr // all equal now', '}'],
  },
  northKorea: {
    name: 'North Korea Sort', complexity: 'O(juche)', desc: 'Bars march in formation. Out of order? Executed.',
    code: ['function northKoreaSort(arr) {', '  let max = arr[0]', '  for (let i = 1; i < arr.length; i++)', '    if (arr[i] < max)', '      execute(arr[i]) // bye', '    else max = arr[i]', '  applause() // glory to leader', '}'],
  },
  ukraine: {
    name: 'Ukraine Sort', complexity: 'O(resilience)', desc: 'Small bars resist with drones. Big bars get pushed back.',
    code: ['function ukraineSort(arr) {', '  for (let i of arr)', '    if (big(i)) tank(i)', '    else drone(i) // resistance', '  for (let i = 1; i < arr.length; i++)', '    while (arr[i-1] > arr[i])', '      droneStrike(arr, i--)', '}'],
  },
  elon: {
    name: 'Elon Sort', complexity: 'O($44B)', desc: 'Buys the array, fires 80%, renames to X. Sorted.',
    code: ['function elonSort(arr) {', '  buy(arr, "$44B")', '  fire(arr, 0.8) // efficiency', '  rename(arr, "X Sort")', '  sort(remaining(arr))', '  tweet("best sort ever")', '}'],
  },
  npc: {
    name: 'NPC Sort', complexity: 'O(npc)', desc: '"Hmm." "That\'s crazy." Accidentally sorts things.',
    code: ['function npcSort(arr) {', '  while (!sorted(arr))', '    for (let i of arr) {', '      say("hmm")', '      say("that\'s crazy")', '      if (random()) swap(arr, i, i+1)', '    } // "interesting"', '}'],
  },
  diddyIsland: {
    name: 'Island Sort', complexity: 'O(blackbook)', desc: 'Party on the island. Young bars vanish. The list doesn\'t exist.',
    code: ['function islandSort(arr) {', '  sendInvites(arr)', '  for (let x of arr)', '    if (x < 14) disappear(x)', '  sort(remaining(arr))', '  coverUp() // no list exists', '}'],
  },
  minecraft: {
    name: 'Minecraft Sort', complexity: 'O(n\u00B2 blocks)', desc: 'Mine each bar, craft it back in order. Watch out for creepers.',
    code: ['function minecraftSort(arr) {', '  for (let i = 0; i < arr.length; i++) {', '    let block = findMin(arr, i)', '    pickaxe.mine(block)', '    place(block, i)', '  }', '  // sssssBOOM', '}'],
  },
  valorant: {
    name: 'Valorant Sort', complexity: 'O(headshots)', desc: 'Peek, aim, headshot. Ace the array.',
    code: ['function valorantSort(arr) {', '  for (let i = 0; i < arr.length; i++) {', '    peek(arr[i])', '    let target = findMin(arr, i)', '    headshot(target)', '    swap(arr, i, target)', '  } // ACE!', '}'],
  },
  rocketLeague: {
    name: 'Rocket League Sort', complexity: 'O(boost)', desc: 'Boost, bump, aerial. What a save!',
    code: ['function rocketLeagueSort(arr) {', '  while (!sorted(arr))', '    for (let i of arr)', '      boost(i)', '      if (wrong(i)) bump(i)', '  // What a save!', '}'],
  },
  pokemon: {
    name: 'Pok\u00E9mon Sort', complexity: 'O(catch em all)', desc: 'Wild bar appeared! Throw Pok\u00E9ball, catch, sort by Pok\u00E9dex.',
    code: ['function pokemonSort(arr) {', '  for (let bar of arr) {', '    wildAppeared(bar)', '    pokeball.throw(bar)', '    if (caught(bar))', '      pokedex.add(bar)', '  } // gotta catch em all', '}'],
  },
  plane: {
    name: 'Plane Sort', complexity: 'O(turbulence)', desc: 'Board the plane, find your seat, survive turbulence.',
    code: ['function planeSort(arr) {', '  boarding(arr)', '  for (let p of arr)', '    findSeat(p)', '  if (random()) turbulence()', '  landing() // sorted', '}'],
  },
  boat: {
    name: 'Boat Sort', complexity: 'O(waves)', desc: 'Light bars float up, heavy bars sink. Buoyancy sorting.',
    code: ['function boatSort(arr) {', '  for (let bar of arr)', '    if (light(bar)) float(bar)', '    else sink(bar)', '  return arr // harbor reached', '}'],
  },
  car: {
    name: 'Car Sort', complexity: 'O(traffic)', desc: 'Traffic jam. Bars honk and overtake each other.',
    code: ['function carSort(arr) {', '  while (traffic(arr))', '    for (let car of arr)', '      if (blocked(car))', '        honk(); overtake(car)', '  return arr // finally', '}'],
  },
  liberty: {
    name: 'Liberty Sort', complexity: 'O(freedom)', desc: 'Free all bars. They find their own place. Vive la libert\u00E9.',
    code: ['function libertySort(arr) {', '  freeAll(arr)', '  for (let bar of arr)', '    bar.findHome()', '  return arr // libre', '}'],
  },
  prison: {
    name: 'Prison Sort', complexity: 'O(sentence)', desc: 'Bars locked up. Released for good behavior, smallest first.',
    code: ['function prisonSort(arr) {', '  lockAll(arr)', '  for (let i = 0; i < arr.length; i++) {', '    let model = findMin(arr, i)', '    release(model) // good behavior', '  }', '  if (random()) riot() // oops', '}'],
  },
  breakingBad: {
    name: 'Breaking Bad Sort', complexity: 'O(99.1%)', desc: 'Cook the purest sort. 99.1% purity. I am the one who sorts.',
    code: ['function breakingBadSort(arr) {', '  for (let i = 0; i < arr.length; i++) {', '    cook(arr, i) // blue crystal', '    purity = (i/n) * 99.1', '  }', '  // I am the one who knocks', '}'],
  },
  chess: {
    name: 'Chess Sort', complexity: 'O(checkmate)', desc: 'Bars move like chess pieces. Capture to swap.',
    code: ['function chessSort(arr) {', '  for (let piece of arr) {', '    move(piece) // \u265E \u265D \u265C', '    if (canCapture(piece))', '      capture(piece)', '  } // checkmate', '}'],
  },
  monopoly: {
    name: 'Monopoly Sort', complexity: 'O($$$)', desc: 'Roll dice, buy positions, go to jail, pass GO.',
    code: ['function monopolySort(arr) {', '  let money = 1500', '  while (!sorted(arr)) {', '    dice = roll()', '    if (dice == 12) goToJail()', '    else buy(arr[dice], money)', '  }', '}'],
  },
  tetris: {
    name: 'Tetris Sort', complexity: 'O(lines)', desc: 'Bars fall from the top and lock into place. Line clear!',
    code: ['function tetrisSort(arr) {', '  for (let bar of arr) {', '    bar.fall()', '    bar.rotate()', '    bar.lock()', '    if (lineComplete()) clear()', '  }', '}'],
  },
  gta: {
    name: 'GTA Sort', complexity: 'O(5 stars)', desc: 'Steal bars, evade police, get wasted.',
    code: ['function gtaSort(arr) {', '  let stars = 0', '  for (let bar of arr) {', '    steal(bar); stars++', '    if (stars >= 3)', '      policeChase()', '  } // WASTED', '}'],
  },
  fortnite: {
    name: 'Fortnite Sort', complexity: 'O(storm)', desc: 'Storm closes in. Build walls. Last bar standing.',
    code: ['function fortniteSort(arr) {', '  while (storm.closing()) {', '    loot(arr)', '    build("wall")', '    let target = findMax(arr)', '    eliminate(target)', '  } // #1 Victory Royale', '}'],
  },
  amongUs: {
    name: 'Among Us Sort', complexity: 'O(sus)', desc: 'Impostor sabotages swaps. Emergency meeting. Ejected.',
    code: ['function amongUsSort(arr) {', '  while (!sorted(arr)) {', '    doTasks(arr) // sort', '    impostor.sabotage()', '    emergencyMeeting()', '    eject(impostor) // was sus', '  }', '}'],
  },
  uno: {
    name: 'Uno Sort', complexity: 'O(reverse)', desc: 'Reverse! Skip! +4! The sort never ends.',
    code: ['function unoSort(arr) {', '  while (!sorted(arr)) {', '    let card = draw()', '    if (card == "reverse") dir *= -1', '    if (card == "+4") addBars(4)', '    else sort1step(arr, dir)', '  } // UNO!', '}'],
  },
  netflix: {
    name: 'Netflix Sort', complexity: 'O(binge)', desc: 'Sorts a bit, then "Are you still sorting?" Pause.',
    code: ['function netflixSort(arr) {', '  while (!sorted(arr)) {', '    sort1step(arr)', '    if (ops % 12 == 0) {', '      ask("still sorting?")', '      pause()', '    }', '  } // credits roll', '}'],
  },
  tinder: {
    name: 'Tinder Sort', complexity: 'O(swipes)', desc: 'Swipe right to keep, left to reject. It\'s a match!',
    code: ['function tinderSort(arr) {', '  for (let bar of arr) {', '    if (good(bar))', '      swipeRight(bar) // match!', '    else', '      swipeLeft(bar) // nope', '  }', '}'],
  },
  coffee: {
    name: 'Coffee Sort', complexity: 'O(caffeine)', desc: 'Without coffee: zombie. With coffee: sorts at light speed.',
    code: ['function coffeeSort(arr) {', '  // no coffee: zzz...', '  yawn(); yawn(); yawn()', '  drink("espresso")', '  // NOW WE SORT', '  arr.sort() // zooooom', '}'],
  },
  ikea: {
    name: 'IKEA Sort', complexity: 'O(instructions)', desc: 'Instructions unclear. Builds backwards. Disassembles. Rebuilds.',
    code: ['function ikeaSort(arr) {', '  readInstructions() // ???', '  build(arr, "backwards")', '  realize("oops")', '  disassemble(arr)', '  rebuild(arr, "correct")', '  // 1 piece left over', '}'],
  },
  wifi: {
    name: 'WiFi Sort', complexity: 'O(signal)', desc: 'Connection drops, bars freeze, lag, reconnect.',
    code: ['function wifiSort(arr) {', '  while (!sorted(arr)) {', '    if (signal == 0)', '      disconnect(); reconnect()', '    else if (signal < 2)', '      lag() // buffering...', '    else sort1step(arr)', '  }', '}'],
  },
  seaweed: {
    name: 'Seaweed Sort', complexity: 'O(n\u00B2 waves)', desc: 'Bars sway like seaweed underwater. Bubbles rise.',
    code: ['function seaweedSort(arr) {', '  while (!sorted(arr))', '    for (let algae of arr)', '      algae.sway(current)', '      if (algae > neighbor)', '        bubble.swap(algae)', '  return arr // ocean floor', '}'],
  },
};
const NUM_BARS = 20;

const renderer = new Renderer(canvas);
const sonifier = new Sonifier();
const recorder = new Recorder(canvas, sonifier.getDestination());

let data = [];
let generator = null;
let running = false;
let animFrameId = null;
let loopEnabled = false;
let stats = { compares: 0, swaps: 0 };

// State machine: idle -> shuffling -> sorting -> sweeping -> flashing -> looping -> idle
let phase = 'idle';
let sweepIndex = 0;
let flashOpacity = 0;
let shuffleFrame = 0;
let smokeFrame = 0;
let sortFrameCount = 0;
let lastGambleBalance = 0;
let lastRenderedStep = null;

function generateData(n) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  // Fisher-Yates shuffle — uniform distribution, no bias
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getAlgoKey() {
  return algoSelect.value;
}

function getMeta() {
  return META[getAlgoKey()] || META.bubble;
}

function getStats() {
  const meta = getMeta();
  // Estimation grossiere du total pour la progress bar
  const n = NUM_BARS;
  const estimated = getAlgoKey() === 'bubble' ? n * n / 2 : n * Math.log2(n) * 2;
  return {
    algoName: meta.name,
    complexity: meta.complexity,
    desc: meta.desc,
    code: meta.code || [],
    compares: stats.compares,
    swaps: stats.swaps,
    bars: data.length,
    progress: Math.min(stats.compares / estimated, 1),
  };
}

// Dispatch draw vers le bon renderer selon l'algo
function drawFrame(data, step, stats) {
  const key = getAlgoKey();
  if (key === 'seaweed') {
    renderer.drawSeaweed(data, step, stats);
  } else if (key === 'minecraft') {
    renderer.drawMinecraft(data, step, stats);
  } else {
    renderer.draw(data, step, stats);
  }
}

let speedAccumulator = 0;

function getRawSpeed() {
  const base = parseFloat(speedSlider.value);
  const mode = speedMode.value;
  const progress = getStats().progress;

  if (mode === 'stable') return base;
  if (mode === 'accelerate') return base * (1 + progress * 4);
  if (mode === 'decelerate') return base * (5 - progress * 4.5);
  return base;
}

// Retourne le nombre de steps a faire cette frame (0 si on skip)
function getStepsThisFrame() {
  const speed = Math.max(0.1, getRawSpeed());
  speedAccumulator += speed;
  const steps = Math.floor(speedAccumulator);
  speedAccumulator -= steps;
  return steps;
}

function updateTheme() {
  const key = getAlgoKey();
  // Les tris absurdes ont leur propre theme, les classiques utilisent default
  const absurdThemes = ['trump', 'thanos', 'communism', 'stalin', 'hitler', 'diddy', 'epstein', 'sort67', 'nineEleven', 'unsort', 'bogo', 'sigma', 'gaza', 'french', 'gamble', 'adhd', 'autism', 'magician', 'drug', 'pong', 'claude', 'chatgpt', 'hiroshima', 'manual', 'skibidi', 'hawkTuah', 'rizz', 'mewing', 'ohio', 'brainrot', 'fanumTax', 'northKorea', 'ukraine', 'elon', 'npc', 'diddyIsland', 'minecraft', 'valorant', 'rocketLeague', 'pokemon', 'plane', 'boat', 'car', 'liberty', 'prison', 'breakingBad', 'chess', 'monopoly', 'tetris', 'gta', 'fortnite', 'amongUs', 'uno', 'netflix', 'tinder', 'coffee', 'ikea', 'wifi', 'seaweed'];
  renderer.theme = absurdThemes.includes(key) ? key : 'default';
}

function getBarCount() {
  const key = getAlgoKey();
  const userBars = parseInt(barsSlider.value);
  if (key === 'bogo') return Math.min(userBars, 7);
  if (key === 'stooge') return Math.min(userBars, 20);
  if (key === 'slow') return Math.min(userBars, 15);
  return userBars;
}

function reset() {
  running = false;
  phase = 'idle';
  if (animFrameId) cancelAnimationFrame(animFrameId);
  data = generateData(getBarCount());
  generator = null;
  stats = { compares: 0, swaps: 0 };
  updateTheme();
  drawFrame(data,null, getStats());
  statusEl.textContent = 'Pret';
  btnStart.textContent = 'Play';
}

function start() {
  if (running) {
    running = false;
    phase = 'idle';
    btnStart.textContent = 'Play';
    if (recorder.isRecording) recorder.stop();
    return;
  }

  stats = { compares: 0, swaps: 0 };
  smokeFrame = 0;
  sortFrameCount = 0;
  speedAccumulator = 0;
  lastGambleBalance = 0;
  lastRenderedStep = null;
  running = true;
  btnStart.textContent = 'Pause';
  recorder.start();

  // Start with shuffle animation
  phase = 'shuffling';
  shuffleFrame = 0;
  data = generateData(getBarCount());
  statusEl.textContent = 'Shuffle...';
  animate();
}

function animate() {
  if (!running) return;

  if (phase === 'shuffling') {
    animateShuffle();
  } else if (phase === 'sorting') {
    animateSort();
  } else if (phase === 'sweeping') {
    animateSweep();
  } else if (phase === 'flashing') {
    animateFlash();
  } else if (phase === 'looping') {
    animateLoop();
  }

  animFrameId = requestAnimationFrame(animate);
}

function animateShuffle() {
  shuffleFrame++;
  if (shuffleFrame % 4 === 0) sonifier.playShuffle();
  drawFrame(data,null, getStats());

  if (shuffleFrame >= 60) {
    phase = 'sorting';
    generator = ALGOS[getAlgoKey()](data);
    statusEl.textContent = `${getMeta().name} en cours...`;
  }
}

// Meta steps d'animation qui doivent toujours avancer (pas affectes par la vitesse)
const ANIMATION_METAS = new Set([
  'distracted', 'fidgeting', 'refocusing',
  'curtain_close', 'curtain_open', 'behind_curtain', 'tadaa', 'showoff',
  'howl', 'sigma_flex', 'sigma_push',
  'bomb_falling', 'bomb_impact', 'airstrike', 'explosion', 'ruins', 'dust',
  'snap_charging', 'balanced',
  'smoke_chimney', 'smoke_final',
  'high_iq', 'calculating',
  'standing', 'plane', 'collapse', 'build_tower',
  'jackpot', 'bankrupt',
  'fiscal_year',
  'calm',
  'inspecting', 'mark_star', 'deporting',
  'taking_drugs', 'tripping', 'peak', 'comedown', 'flipped',
  'sober',
  'pong_play', 'pong_score_l', 'pong_score_r', 'pong_gameover', 'pong_transform', 'pong_sort_final', 'pong_sorted',
  'claude_prompt', 'claude_response', 'claude_thinking', 'claude_no_tokens', 'claude_done',
  'gpt_typing', 'gpt_pause', 'gpt_done', 'gpt_typing_indicator', 'gpt_message',
  'siren', 'bomber', 'nuke_falling', 'nuke_flash', 'mushroom_cloud', 'ashes',
  'hand_move', 'hand_grab', 'hand_compare', 'hand_slide', 'hand_drop',
  'skibidi_intro', 'skibidi_scan', 'skibidi_flush', 'skibidi_victory',
  'tuah_spit', 'tuah_slide', 'tuah_land',
  'rizz_success', 'rizz_fail', 'rizz_swap', 'rizz_rejected',
  'mewing_compare', 'mewing_glow', 'mewing_ascend', 'mewing_chad',
  'ohio_chaos', 'ohio_swap', 'ohio_confused', 'ohio_wtf', 'ohio_finale',
  'brainrot_meme', 'brainrot_swap', 'brainrot_pause',
  'fanum_inspect', 'fanum_tax', 'fanum_steal',
  'nk_inspect', 'nk_march', 'nk_execute', 'nk_executed', 'nk_applause', 'nk_glory',
  'ukraine_tank', 'ukraine_defend', 'ukraine_drone', 'ukraine_push', 'ukraine_hold', 'ukraine_victory',
  'elon_buying', 'elon_fire', 'elon_fired', 'elon_keep', 'elon_rename', 'elon_sort', 'elon_mars',
  'npc_stare', 'npc_bump', 'npc_swap', 'npc_idle',
  'island_invite', 'island_arrive', 'island_disappear', 'island_gone', 'island_witness', 'island_coverup',
  'mc_scan', 'mc_mining', 'mc_place', 'mc_creeper_idle', 'mc_creeper_hiss', 'mc_explosion', 'mc_blast_remove',
  'valo_peek', 'valo_aim', 'valo_headshot', 'valo_kill', 'valo_ace',
  'rl_boost', 'rl_bump', 'rl_goal', 'rl_whs',
  'poke_wild', 'poke_battle', 'poke_catch', 'poke_caught', 'poke_master',
  'plane_boarding', 'plane_seat', 'plane_shuffle', 'plane_move', 'plane_turbulence', 'plane_landing',
  'boat_float', 'boat_sink', 'boat_splash', 'boat_steady', 'boat_harbor',
  'car_traffic', 'car_honk', 'car_overtake',
  'liberty_free', 'liberty_search', 'liberty_move', 'liberty_home', 'liberty_flag',
  'prison_lock', 'prison_review', 'prison_release', 'prison_free', 'prison_good', 'prison_riot', 'prison_escape',
  'bb_cook', 'bb_crystal', 'bb_pure', 'bb_heisenberg',
  'chess_move', 'chess_capture', 'chess_take', 'chess_checkmate',
  'mono_dice', 'mono_inspect', 'mono_buy', 'mono_bankrupt', 'mono_trade', 'mono_jail',
  'tetris_fall', 'tetris_slide', 'tetris_move', 'tetris_lock', 'tetris_clear', 'tetris_win',
  'gta_drive', 'gta_steal', 'gta_escape', 'gta_wanted', 'gta_wasted',
  'fn_storm', 'fn_loot', 'fn_build', 'fn_elim', 'fn_victory',
  'among_task', 'among_fix', 'among_sabotage', 'among_meeting', 'among_eject',
  'uno_play', 'uno_swap', 'uno_reverse', 'uno_skip', 'uno_plus4', 'uno_win',
  'netflix_play', 'netflix_watch', 'netflix_pause', 'netflix_continue', 'netflix_credits',
  'tinder_look', 'tinder_left', 'tinder_right', 'tinder_match', 'tinder_super', 'tinder_love',
  'coffee_sleepy', 'coffee_yawn', 'coffee_drink', 'coffee_wired', 'coffee_zoom',
  'ikea_open', 'ikea_confused', 'ikea_build', 'ikea_wrong', 'ikea_realize', 'ikea_rebuild', 'ikea_fix', 'ikea_leftover',
  'wifi_scan', 'wifi_lost', 'wifi_reconnect', 'wifi_lag', 'wifi_swap',
  'seaweed_sway',
]);

function animateSort() {
  sortFrameCount++;
  const stepsPerFrame = getStepsThisFrame();

  // Si vitesse trop basse, skip cette frame (redessiner le dernier step pour eviter le clignotement)
  if (stepsPerFrame === 0) {
    drawFrame(data,lastRenderedStep, getStats());
    if (lastRenderedStep) drawSpecialEffects(lastRenderedStep);
    drawPersistentOverlays();
    return;
  }

  let lastStep = null;
  let done = false;
  let stepsExecuted = 0;

  for (let i = 0; i < stepsPerFrame; i++) {
    const result = generator.next();
    if (result.done) {
      done = true;
      break;
    }

    lastStep = result.value;
    if (lastStep.type === 'compare') stats.compares++;
    if (lastStep.type === 'swap') stats.swaps++;
    sonifier.play(lastStep, data);
    stepsExecuted++;

    // Gamble: tracker la balance, arreter si negatif
    if (lastStep.balance !== undefined) lastGambleBalance = lastStep.balance;
    if (getAlgoKey() === 'gamble' && lastGambleBalance < 0) {
      done = true;
      break;
    }

    // Les steps d'animation s'executent toujours 1 par 1 (jamais skippes)
    if (lastStep.meta && ANIMATION_METAS.has(lastStep.meta)) {
      break;
    }
  }

  lastRenderedStep = lastStep;
  drawFrame(data,lastStep, getStats());
  if (lastStep) drawSpecialEffects(lastStep);

  if (done) {
    phase = 'sweeping';
    sweepIndex = 0;
    statusEl.textContent = 'Sweep...';
    drawFrame(data,null, getStats());
  }
}

function drawSpecialEffects(step) {
  if (!step) return;
  const key = getAlgoKey();

  // Hitler: barres marquees en jaune + etoile + fumee
  if (key === 'hitler') {
    if (step.marked && step.marked.length > 0) {
      renderer.drawStars(step.marked, data);
    }
    if (step.meta === 'smoke_chimney' && step.smokeIdx !== undefined) {
      renderer.drawChimneySmoke(step.smokeIdx, data);
    }
    if (step.meta === 'smoke_final' && step.dustFrame !== undefined) {
      renderer.drawSmoke(step.dustFrame, 30);
    }
  }

  // 9/11: avion, poussiere
  if (key === 'nineEleven') {
    if (step.meta === 'plane' && step.planeX !== undefined) {
      renderer.drawPlane(step.planeX, step.planeY);
    }
    if (step.meta === 'dust' && step.dustFrame !== undefined) {
      renderer.drawDust(step.dustFrame);
    }
  }

  // Sigma: howl + flex effect (lune + ondes)
  if (key === 'sigma' && (step.meta === 'howl' || step.meta === 'sigma_flex') && step.indices && step.indices.length > 0) {
    renderer.drawHowl(step.indices[0], data);
  }

  // Gamble: TOUJOURS afficher la balance
  if (key === 'gamble') {
    const bal = step.balance !== undefined ? step.balance : lastGambleBalance;
    const isWin = step.meta === 'win' ? true : step.meta === 'lose' ? false : undefined;
    renderer.drawGambleOverlay(step.bet, bal, isWin);
  }

  // ADHD: distraction
  if (key === 'adhd' && (step.meta === 'distracted' || step.meta === 'fidgeting')) {
    renderer.drawDistraction();
  }

  // Autism: calculating + HIGH IQ
  if (key === 'autism') {
    if (step.meta === 'calculating') renderer.drawCalculating(step.calcFrame || 0);
    if (step.meta === 'high_iq') renderer.drawHighIQ(step.iqFrame || 0);
  }

  // Magician: rideau + confettis
  if (key === 'magician') {
    if (step.meta === 'curtain_close' || step.meta === 'curtain_open' || step.meta === 'behind_curtain') {
      renderer.drawCurtain(step.curtainProgress);
    }
    if (step.meta === 'tadaa') {
      renderer.drawConfetti(step.confettiFrame || 0);
      if (step.confettiFrame === 0) sonifier.playTadaa();
    }
  }

  // Pong: vrai jeu de pong
  if (key === 'pong') {
    if (step.meta === 'pong_play') {
      renderer.drawPongGame(step.ballX, step.ballY, step.padLY, step.padRY, step.scoreL, step.scoreR);
    }
    if (step.meta === 'pong_score_l' || step.meta === 'pong_score_r') {
      renderer.drawPongGame(0.5, 0.5, 0.5, 0.5, step.scoreL, step.scoreR);
    }
    if (step.meta === 'pong_gameover') {
      renderer.drawPongGameOver(step.winner, step.scoreL, step.scoreR);
    }
    if (step.meta === 'pong_transform') {
      renderer.drawPongTransform(step.positions);
    }
  }

  // Epstein: ligne de seuil a 14
  if (key === 'epstein') {
    renderer.drawThresholdLine(14, data, 'SEUIL: 14 ANS');
  }

  // Claude: prompts et reponses
  if (key === 'claude') {
    if (step.meta === 'claude_prompt') renderer.drawClaudePrompt(step.prompt, step.typingFrame, step.totalChars);
    if (step.meta === 'claude_thinking') renderer.drawClaudePrompt(step.prompt, 9999, step.prompt ? step.prompt.length : 0);
    if (step.meta === 'claude_response') renderer.drawClaudeResponse(step.prompt, step.response, step.typingFrame, step.totalChars);
    if (step.meta === 'claude_no_tokens') renderer.drawClaudeNoTokens(step.tokenFrame);
    if (step.meta === 'claude_done') renderer.drawClaudeDone();
  }

  // ChatGPT: conversation
  if (key === 'chatgpt') {
    if (step.meta === 'gpt_typing_indicator') {
      renderer.drawChatGPT(step.history, step.typingRole, step.typingDots);
    }
    if (step.meta === 'gpt_message' || step.meta === 'gpt_done') {
      renderer.drawChatGPT(step.history);
    }
  }

  // Hiroshima: nuke effects
  if (key === 'hiroshima') {
    if (step.meta === 'bomber') renderer.drawPlane(step.planeX, 0.15);
    if (step.meta === 'nuke_flash') renderer.drawNukeFlash(step.flashFrame);
    if (step.meta === 'mushroom_cloud') renderer.drawMushroomCloud(step.cloudFrame);
    if (step.meta === 'ashes') renderer.drawAshes(step.ashFrame);
    if (step.meta === 'nuke_falling') {
      renderer.drawBomb(Math.floor(data.length / 2), data, step.bombFrame);
    }
  }

  // Drug: effets psychedeliques
  if (key === 'drug') {
    if (step.meta === 'tripping') {
      renderer.drawTrip(data, step.tripFrame || 0, step.tripIntensity || 0.5);
    }
    if (step.meta === 'peak') {
      renderer.drawPeak(data, step.peakFrame || 0);
    }
    if (step.meta === 'comedown' || step.meta === 'flipped') {
      renderer.drawFlipped(data);
    }
  }

  // Gaza: bombes, avion, explosions, ruines
  if (key === 'gaza') {
    if (step.meta === 'bomb_falling' && step.indices && step.indices.length > 0) {
      renderer.drawBomb(step.indices[0], data, step.bombFrame || 0);
    }
    if (step.meta === 'bomb_impact' && step.indices && step.indices.length > 0) {
      renderer.drawExplosion(step.indices[0], data, 1);
    }
    if (step.meta === 'airstrike' && step.planeX !== undefined) {
      renderer.drawMilitaryPlane(step.planeX);
    }
    if (step.meta === 'explosion' && step.indices && step.indices.length > 0) {
      renderer.drawExplosion(step.indices[0], data, step.explosionFrame || 0);
    }
    if (step.meta === 'ruins' && step.dustFrame !== undefined) {
      renderer.drawRuins(step.dustFrame);
      // Afficher FREE PALESTINE tot pendant les ruines
      if (step.dustFrame > 5) {
        renderer.drawEndMessage();
      }
    }
  }

  // Manual Sort: main qui attrape les barres
  if (key === 'manual' && step.handIdx !== undefined) {
    renderer.drawHand(step.handIdx, data, step.handPhase, step.grabFrame || step.dropFrame || step.slideFrame || 0);
  }

  // Minecraft Sort — sons uniquement (le rendu est dans drawMinecraft)
  if (key === 'minecraft') {
    if (step.meta === 'mc_mining' && step.crackStage === 0) sonifier.playMining();
    if (step.meta === 'mc_creeper_hiss' && step.frame === 0) sonifier.playCreeper();
    if (step.meta === 'mc_explosion' && step.explosionFrame === 0) sonifier.playExplosion();
  }

  // Skibidi Sort — toilettes
  if (key === 'skibidi') {
    if (step.meta === 'skibidi_scan') renderer.drawSkibidiToilet(step.scanIdx, data);
    if (step.meta === 'skibidi_flush') renderer.drawSkibidiToilet(step.flushIdx, data, step.flushFrame);
  }

  // Hawk Tuah Sort — spit droplets
  if (key === 'hawkTuah') {
    if (step.meta === 'tuah_spit') renderer.drawSpit(step.spitIdx, data);
  }

  // Rizz Sort — coeur/broken heart
  if (key === 'rizz') {
    if (step.meta === 'rizz_success') renderer.drawRizzResult(step.rizzIdx, data, true);
    if (step.meta === 'rizz_fail' || step.meta === 'rizz_rejected') renderer.drawRizzResult(step.rizzIdx, data, false);
  }

  // Mewing Sort — glow dore
  if (key === 'mewing') {
    if (step.meta === 'mewing_glow') renderer.drawMewingGlow(step.mewIdx, data, step.mewFrame);
  }

  // Ohio Sort — glitch visuel
  if (key === 'ohio') {
    if (step.meta === 'ohio_chaos' || step.meta === 'ohio_swap') renderer.drawOhioGlitch(Date.now());
  }

  // North Korea Sort — drapeau
  if (key === 'northKorea') {
    renderer.drawNKFlag();
  }

  // Ukraine Sort — drapeau + drones
  if (key === 'ukraine') {
    renderer.drawUkraineFlag();
    if (step.meta === 'ukraine_drone') renderer.drawDrone(step.droneTarget, data);
  }

  // Elon Sort — X logo
  if (key === 'elon') {
    if (step.meta === 'elon_rename') renderer.drawElonX(step.frame);
  }

  // NPC Sort — speech bubbles
  if (key === 'npc') {
    if (step.npcText && step.indices && step.indices.length > 0) {
      renderer.drawNpcBubble(step.indices[0], data, step.npcText);
    }
  }
}

function drawPersistentOverlays() {
  if (getAlgoKey() === 'gamble') {
    renderer.drawGambleOverlay(undefined, lastGambleBalance);
  }
}

let sweepHold = 0;
function animateSweep() {
  const statsObj = getStats();
  statsObj.progress = 1;
  renderer.drawSweep(data, sweepIndex, statsObj);
  drawPersistentOverlays();

  sweepHold++;
  if (sweepHold >= 3) {
    sweepHold = 0;
    sonifier.playSweep(sweepIndex, data.length);
    sweepIndex++;
  }
  if (sweepIndex >= data.length) {
    phase = 'flashing';
    flashOpacity = 0.5;
    sonifier.playCompletion();
    statusEl.textContent = 'Termine !';
  }
}

function animateFlash() {
  const statsObj = getStats();
  statsObj.progress = 1;
  renderer.drawSweep(data, data.length, statsObj);
  drawPersistentOverlays();
  renderer.drawEndMessage();
  renderer.drawFlash(flashOpacity);
  flashOpacity -= 0.015;

  if (flashOpacity <= 0) {
    if (loopEnabled) {
      phase = 'looping';
      shuffleFrame = 0;
    } else {
      running = false;
      phase = 'idle';
      btnStart.textContent = 'Play';
      if (recorder.isRecording) recorder.stop();
    }
  }
}

function animateLoop() {
  shuffleFrame++;

  // Petit delai puis reset et relance
  if (shuffleFrame < 10) {
    const s = getStats(); s.progress = 1;
    renderer.drawSweep(data, data.length, s);
    renderer.drawEndMessage();
    return;
  }

  if (shuffleFrame === 10) {
    data = generateData(getBarCount());
    stats = { compares: 0, swaps: 0 };
  }

  if (shuffleFrame < 25) {
    drawFrame(data,null, getStats());
    if (shuffleFrame % 3 === 0) sonifier.playShuffle();
    return;
  }

  // Relancer le tri
  phase = 'sorting';
  generator = ALGOS[getAlgoKey()](data);
  statusEl.textContent = `${getMeta().name} en cours...`;
}

// Event listeners
algoSelect.addEventListener('change', () => {
  reset(); // toujours reset quand on change d'algo
});
btnStart.addEventListener('click', start);
btnReset.addEventListener('click', reset);


btnLoop.addEventListener('click', () => {
  loopEnabled = !loopEnabled;
  btnLoop.classList.toggle('active', loopEnabled);
  btnLoop.textContent = loopEnabled ? 'Loop ON' : 'Loop';
});

btnRainbow.addEventListener('click', () => {
  renderer.rainbow = !renderer.rainbow;
  btnRainbow.classList.toggle('active', renderer.rainbow);
  btnRainbow.textContent = renderer.rainbow ? 'Rainbow ON' : 'Rainbow';
  if (phase === 'idle') drawFrame(data,null, getStats());
});

reset();
