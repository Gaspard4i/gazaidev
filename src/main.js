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
};
const META = {
  bubble:    { name: 'BUBBLE SORT',    complexity: 'O(n\u00B2)' },
  quick:     { name: 'QUICK SORT',     complexity: 'O(n log n)' },
  merge:     { name: 'MERGE SORT',     complexity: 'O(n log n)' },
  thanos:    { name: 'THANOS SORT',    complexity: 'O(n/2... /2... /2)' },
  communism: { name: 'COMMUNISM SORT', complexity: 'O(equality)' },
  stalin:    { name: 'STALIN SORT',    complexity: 'O(n) guaranteed' },
  sort67:    { name: '67 SORT',        complexity: 'O(6+7)' },
  trump:     { name: 'TRUMP SORT',     complexity: 'O(only the best)' },
  hitler:    { name: 'HITLER SORT',    complexity: 'O(nein)' },
  diddy:     { name: 'DIDDY SORT',     complexity: 'O(party)' },
  epstein:   { name: 'EPSTEIN SORT',   complexity: 'O(under 18)' },
};
const NUM_BARS = 200;

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
    compares: stats.compares,
    swaps: stats.swaps,
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

function reset() {
  running = false;
  phase = 'idle';
  if (animFrameId) cancelAnimationFrame(animFrameId);
  data = generateData(NUM_BARS);
  generator = null;
  stats = { compares: 0, swaps: 0 };
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
  running = true;
  btnStart.textContent = 'Pause';

  // Start with shuffle animation
  phase = 'shuffling';
  shuffleFrame = 0;
  data = generateData(NUM_BARS);
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

function animateSort() {
  const stepsPerFrame = speedRamp();

  let lastStep = null;
  for (let i = 0; i < stepsPerFrame; i++) {
    const result = generator.next();
    if (result.done) {
      // Tri termine -> lancer le sweep
      phase = 'sweeping';
      sweepIndex = 0;
      statusEl.textContent = 'Sweep...';
      renderer.draw(data, null, getStats());
      return;
    }

    lastStep = result.value;
    if (lastStep.type === 'compare') stats.compares++;
    if (lastStep.type === 'swap') stats.swaps++;
    sonifier.play(lastStep, data);
  }

  renderer.draw(data, lastStep, getStats());
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
    return;
  }

  if (shuffleFrame === 10) {
    data = generateData(NUM_BARS);
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
