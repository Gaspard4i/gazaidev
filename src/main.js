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

const canvas = document.getElementById('canvas');
const statusEl = document.getElementById('status');
const algoSelect = document.getElementById('algo-select');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const btnRec = document.getElementById('btn-rec');
const btnLoop = document.getElementById('btn-loop');
const btnRainbow = document.getElementById('btn-rainbow');
const speedSlider = document.getElementById('speed');

const ALGOS = {
  bubble: bubbleSort, quick: quickSort, merge: mergeSort,
  thanos: thanosSort, communism: communismSort, stalin: stalinSort,
  sort67: sort67, trump: trumpSort, hitler: hitlerSort,
  diddy: diddySort, epstein: epsteinSort,
  nineEleven: nineElevenSort, unsort: unsort,
  bogo: bogoSort, sigma: sigmaSort,
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
const MIN_ABSURD_FRAMES = 600; // ~10s a 60fps

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

function speedRamp() {
  const base = parseInt(speedSlider.value);
  const progress = getStats().progress;
  if (progress < 0.15) return base;
  if (progress < 0.80) return Math.round(base * (2 + progress * 3));
  if (progress < 0.95) return Math.max(1, Math.round(base * 0.5));
  return base;
}

function updateTheme() {
  const key = getAlgoKey();
  // Les tris absurdes ont leur propre theme, les classiques utilisent default
  const absurdThemes = ['trump', 'thanos', 'communism', 'stalin', 'hitler', 'diddy', 'epstein', 'sort67', 'nineEleven', 'unsort', 'bogo', 'sigma'];
  renderer.theme = absurdThemes.includes(key) ? key : 'default';
}

function getBarCount() {
  const key = getAlgoKey();
  if (key === 'bogo') return 5; // bogo sort avec plus de 5 = heat death of universe
  return NUM_BARS;
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

function isAbsurd() {
  const absurd = ['trump', 'thanos', 'communism', 'stalin', 'hitler', 'diddy', 'epstein', 'sort67', 'nineEleven', 'unsort', 'bogo', 'sigma'];
  return absurd.includes(getAlgoKey());
}

function animateSort() {
  // Les tris absurdes avancent a 1 step/frame pour durer au moins 10s
  const stepsPerFrame = isAbsurd() ? 1 : speedRamp();
  sortFrameCount++;

  let lastStep = null;
  let done = false;
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
  }

  renderer.draw(data, lastStep, getStats());
  if (lastStep) drawSpecialEffects(lastStep);

  if (done) {
    // Si tri absurde et pas assez de frames, on attend
    if (isAbsurd() && sortFrameCount < MIN_ABSURD_FRAMES) {
      // Continuer a animer le resultat en attendant les 10s
      return;
    }
    // Tri termine -> lancer le sweep
    phase = 'sweeping';
    sweepIndex = 0;
    statusEl.textContent = 'Sweep...';
    renderer.draw(data, null, getStats());
  }
}

function drawSpecialEffects(step) {
  if (!step) return;
  const key = getAlgoKey();

  // Hitler: dessiner les camps + fumee
  if (key === 'hitler' && step.camps) {
    const maxVal = Math.max(...data, ...step.camps, 1);
    renderer.drawCamps(step.camps, maxVal);
  }
  if (key === 'hitler' && step.meta === 'smoke') {
    // Fumee qui monte des camps
    renderer.drawSmoke(smokeFrame++, 30);
  }

  // 9/11: avion, poussiere
  if (key === 'nineEleven') {
    if (step.meta === 'plane' && step.planeX !== undefined) {
      renderer.drawPlane(step.planeX);
    }
    if (step.meta === 'dust' && step.dustFrame !== undefined) {
      renderer.drawDust(step.dustFrame);
    }
  }

  // Sigma: howl effect
  if (key === 'sigma' && step.meta === 'howl' && step.indices && step.indices.length > 0) {
    renderer.drawHowl(step.indices[0], data);
  }
}

function animateSweep() {
  sonifier.playSweep(sweepIndex, data.length);
  const statsObj = getStats();
  statsObj.progress = 1;
  renderer.drawSweep(data, sweepIndex, statsObj);

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
  renderer.drawEndMessage();
  renderer.drawFlash(flashOpacity);
  flashOpacity -= 0.05;

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
  if (phase === 'idle') reset();
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
