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

const canvas = document.getElementById('canvas');
const statusEl = document.getElementById('status');
const algoSelect = document.getElementById('algo-select');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const btnRec = document.getElementById('btn-rec');
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
  drug: drugSort, pong: pongSort, claude: claudeSort, chatgpt: chatgptSort,
  selection: selectionSort, insertion: insertionSort, heap: heapSort,
  shell: shellSort, comb: combSort, cocktail: cocktailSort,
  gnome: gnomeSort, oddEven: oddEvenSort, counting: countingSort,
  radix: radixSort, bucket: bucketSort, cycle: cycleSort,
  pancake: pancakeSort, stooge: stoogeSort, bitonic: bitonicSort,
  tim: timSort, dualPivot: dualPivotQuickSort, slow: slowSort,
  sleep: sleepSort, strand: strandSort, patience: patienceSort,
};
const META = {
  bubble:    { name: 'BUBBLE SORT',    complexity: 'O(n\u00B2)', desc: 'Compares neighbors and swaps them. Simple but slow.' },
  quick:     { name: 'QUICK SORT',     complexity: 'O(n log n)', desc: 'Picks a pivot, partitions, conquers. The GOAT.' },
  merge:     { name: 'MERGE SORT',     complexity: 'O(n log n)', desc: 'Divide, sort halves, merge. Stable & reliable.' },
  thanos:    { name: 'THANOS SORT',    complexity: 'O(n/2... /2... /2)', desc: '"I am inevitable." Snaps half the unsorted elements each pass.' },
  communism: { name: 'COMMUNISM SORT', complexity: 'O(equality)', desc: 'Redistributes all values equally. No one is above average, comrade.' },
  stalin:    { name: 'STALIN SORT',    complexity: 'O(n) guaranteed', desc: 'One pass. Any element out of order goes to the gulag.' },
  sort67:    { name: '67 SORT',        complexity: 'O(6+7)', desc: 'Forces every value to become 6 or 7. Nothing else matters.' },
  trump:     { name: 'TRUMP SORT',     complexity: 'O(only the best)', desc: 'Extreme vetting. Only the top 30% stay. The rest are deported.' },
  hitler:    { name: 'HITLER SORT',    complexity: 'O(nein)', desc: 'Separates prime numbers into a second list. Then deletes it.' },
  diddy:     { name: 'DIDDY SORT',     complexity: 'O(party)', desc: 'Big values invite small ones to the party. They disappear after.' },
  epstein:   { name: 'EPSTEIN SORT',   complexity: 'O(under 18)', desc: 'Only keeps values under 18. The rest are "too old".' },
  nineEleven:{ name: '9/11 SORT',     complexity: 'O(2 towers)', desc: 'Finds 2 equal tall bars. Then a plane comes.' },
  unsort:    { name: 'UNSORT',        complexity: 'O(chaos)', desc: 'First sorts perfectly. Then destroys everything.' },
  bogo:      { name: 'BOGO SORT',     complexity: 'O(n \u00D7 n!)', desc: 'Random shuffle until sorted. Pray.' },
  sigma:     { name: 'SIGMA SORT',    complexity: 'O(sigma\u00B2)', desc: 'Random bar howls, takes #1 spot, sorts betas below.' },
  gaza:      { name: 'GAZA SORT',     complexity: 'O(genocide)', desc: 'Bombs only fall on children. Then airstrikes destroy everything.' },
  french:    { name: 'FRENCH SORT',   complexity: 'O(taxes\u00B2)', desc: 'Taxes the middle class to enrich the rich. The poor disappear.' },
  gamble:    { name: 'GAMBLE SORT',   complexity: 'O(n \u00D7 luck)', desc: 'Bet on each comparison. Win if already sorted, lose if not.' },
  adhd:      { name: 'ADHD SORT',     complexity: 'O(n\u00B2 + distractions)', desc: 'Sorts but keeps getting distracted and messing things up.' },
  autism:    { name: 'AUTISM SORT',   complexity: 'O(1) (big brain)', desc: 'Analyzes everything, calculates, then solves it instantly.' },
  magician:  { name: 'MAGICIAN SORT', complexity: 'O(abracadabra)', desc: 'Hides the list behind a curtain. When revealed: sorted. TADAA!' },
  drug:      { name: 'DRUG SORT',     complexity: 'O(trip)', desc: 'Takes substances. Hallucinates. Wakes up with it sorted but flipped.' },
  pong:      { name: 'PONG SORT',    complexity: 'O(n\u00B2 rallies)', desc: 'Two bars play Pong. Loser gets sorted. Square ball.' },
  claude:    { name: 'CLAUDE SORT',  complexity: 'O(no tokens)', desc: 'Asks AI to sort. AI refuses. Runs out of tokens. Declares sorted.' },
  chatgpt:   { name: 'CHATGPT SORT', complexity: 'O(emojis)', desc: 'Explains sorting with emojis. Never actually sorts anything.' },
  selection: { name: 'SELECTION SORT', complexity: 'O(n\u00B2)', desc: 'Finds minimum each pass, places it at the start.' },
  insertion: { name: 'INSERTION SORT', complexity: 'O(n\u00B2)', desc: 'Inserts each element into its correct position.' },
  heap:      { name: 'HEAP SORT',     complexity: 'O(n log n)', desc: 'Builds a max heap, then extracts elements.' },
  shell:     { name: 'SHELL SORT',    complexity: 'O(n log n)', desc: 'Insertion sort with decreasing gap.' },
  comb:      { name: 'COMB SORT',     complexity: 'O(n log n)', desc: 'Bubble sort with shrinking gap (factor 1.3).' },
  cocktail:  { name: 'COCKTAIL SORT', complexity: 'O(n\u00B2)', desc: 'Bidirectional bubble sort (left-right-left).' },
  gnome:     { name: 'GNOME SORT',    complexity: 'O(n\u00B2)', desc: 'Like a gnome sorting flower pots, one at a time.' },
  oddEven:   { name: 'ODD-EVEN SORT', complexity: 'O(n\u00B2)', desc: 'Alternates comparing odd and even index pairs.' },
  counting:  { name: 'COUNTING SORT', complexity: 'O(n+k)', desc: 'Counts occurrences, rebuilds sorted array. No comparisons.' },
  radix:     { name: 'RADIX SORT',    complexity: 'O(n\u00B7k)', desc: 'Sorts digit by digit, from least to most significant.' },
  bucket:    { name: 'BUCKET SORT',   complexity: 'O(n+k)', desc: 'Distributes into buckets, sorts each, concatenates.' },
  cycle:     { name: 'CYCLE SORT',    complexity: 'O(n\u00B2)', desc: 'Minimizes writes by finding permutation cycles.' },
  pancake:   { name: 'PANCAKE SORT',  complexity: 'O(n\u00B2)', desc: 'Flips portions like flipping pancakes.' },
  stooge:    { name: 'STOOGE SORT',   complexity: 'O(n\u00B2\u00B7\u2077)', desc: 'Recursively sorts 2/3, 2/3, 2/3. Hilariously slow.' },
  bitonic:   { name: 'BITONIC SORT',  complexity: 'O(n log\u00B2n)', desc: 'Network sort using bitonic sequences. Parallelizable.' },
  tim:       { name: 'TIM SORT',      complexity: 'O(n log n)', desc: 'Hybrid merge+insertion. Python/Java default.' },
  dualPivot: { name: 'DUAL PIVOT QS', complexity: 'O(n log n)', desc: 'Quick sort with 2 pivots. Java default.' },
  slow:      { name: 'SLOW SORT',     complexity: 'O(n^log n)', desc: 'Multiply and surrender. Intentionally terrible.' },
  sleep:     { name: 'SLEEP SORT',    complexity: 'O(max)', desc: 'Each element sleeps for its value, wakes up in order.' },
  strand:    { name: 'STRAND SORT',   complexity: 'O(n\u00B2)', desc: 'Extracts sorted subsequences and merges them.' },
  patience:  { name: 'PATIENCE SORT', complexity: 'O(n log n)', desc: 'Like dealing cards into piles, then merging.' },
};
const NUM_BARS = 80;

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

function generateData(n) {
  return Array.from({ length: n }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);
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
    compares: stats.compares,
    swaps: stats.swaps,
    bars: data.length,
    progress: Math.min(stats.compares / estimated, 1),
  };
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
  const absurdThemes = ['trump', 'thanos', 'communism', 'stalin', 'hitler', 'diddy', 'epstein', 'sort67', 'nineEleven', 'unsort', 'bogo', 'sigma', 'gaza', 'french', 'gamble', 'adhd', 'autism', 'magician', 'drug', 'pong', 'claude', 'chatgpt'];
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
  renderer.draw(data, null, getStats());
  statusEl.textContent = 'Pret';
  btnStart.textContent = 'Play';
}

function start() {
  if (running) {
    running = false;
    phase = 'idle';
    btnStart.textContent = 'Play';
    return;
  }

  stats = { compares: 0, swaps: 0 };
  smokeFrame = 0;
  sortFrameCount = 0;
  speedAccumulator = 0;
  lastGambleBalance = 0;
  running = true;
  btnStart.textContent = 'Pause';

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
  if (shuffleFrame % 3 === 0) sonifier.playShuffle();
  renderer.draw(data, null, getStats());

  if (shuffleFrame >= 20) {
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
  'gpt_typing', 'gpt_pause', 'gpt_done',
]);

function animateSort() {
  sortFrameCount++;
  const stepsPerFrame = getStepsThisFrame();

  // Toujours avancer d'au moins 1 step pour les animations
  const minSteps = Math.max(stepsPerFrame, 1);

  let lastStep = null;
  let done = false;
  let stepsExecuted = 0;

  for (let i = 0; i < minSteps; i++) {
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

    // Si c'est un step d'animation et que la vitesse est basse,
    // on s'arrete apres 1 step pour pas skipper l'animation
    if (lastStep.meta && ANIMATION_METAS.has(lastStep.meta) && stepsPerFrame <= 1) {
      break;
    }
  }

  renderer.draw(data, lastStep, getStats());
  if (lastStep) drawSpecialEffects(lastStep);

  if (done) {
    phase = 'sweeping';
    sweepIndex = 0;
    statusEl.textContent = 'Sweep...';
    renderer.draw(data, null, getStats());
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

  // Claude: prompts et reponses
  if (key === 'claude') {
    if (step.meta === 'claude_prompt') renderer.drawClaudePrompt(step.prompt, step.typingFrame);
    if (step.meta === 'claude_response') renderer.drawClaudeResponse(step.response, step.typingFrame);
    if (step.meta === 'claude_no_tokens') renderer.drawClaudeNoTokens(step.tokenFrame);
    if (step.meta === 'claude_done') renderer.drawClaudeDone();
  }

  // ChatGPT: texte avec emojis
  if (key === 'chatgpt') {
    if (step.meta === 'gpt_typing' || step.meta === 'gpt_done') renderer.drawChatGPT(step.allLines, step.typingFrame);
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
}

function drawPersistentOverlays() {
  if (getAlgoKey() === 'gamble') {
    renderer.drawGambleOverlay(undefined, lastGambleBalance);
  }
}

function animateSweep() {
  sonifier.playSweep(sweepIndex, data.length);
  const statsObj = getStats();
  statsObj.progress = 1;
  renderer.drawSweep(data, sweepIndex, statsObj);
  drawPersistentOverlays();

  sweepIndex++;
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
  flashOpacity -= 0.03;

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
    renderer.draw(data, null, getStats());
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

btnRec.addEventListener('click', () => {
  if (recorder.isRecording) {
    recorder.stop();
    btnRec.classList.remove('recording');
    btnRec.textContent = 'REC';
  } else {
    recorder.start();
    btnRec.classList.add('recording');
    btnRec.textContent = 'STOP';
  }
});

btnLoop.addEventListener('click', () => {
  loopEnabled = !loopEnabled;
  btnLoop.classList.toggle('active', loopEnabled);
  btnLoop.textContent = loopEnabled ? 'Loop ON' : 'Loop';
});

btnRainbow.addEventListener('click', () => {
  renderer.rainbow = !renderer.rainbow;
  btnRainbow.classList.toggle('active', renderer.rainbow);
  btnRainbow.textContent = renderer.rainbow ? 'Rainbow ON' : 'Rainbow';
  if (phase === 'idle') renderer.draw(data, null, getStats());
});

reset();
