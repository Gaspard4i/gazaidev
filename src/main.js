import { Renderer } from './renderer/canvas.js';
import { Sonifier } from './audio/sonifier.js';
import { Recorder } from './recorder/recorder.js';
import { bubbleSort } from './algos/bubbleSort.js';
import { quickSort } from './algos/quickSort.js';
import { mergeSort } from './algos/mergeSort.js';

const canvas = document.getElementById('canvas');
const status = document.getElementById('status');
const algoSelect = document.getElementById('algo-select');
const modeSelect = document.getElementById('mode-select');
const btnStart = document.getElementById('btn-start');
const btnReset = document.getElementById('btn-reset');
const btnRec = document.getElementById('btn-rec');
const speedSlider = document.getElementById('speed');

const ALGOS = { bubble: bubbleSort, quick: quickSort, merge: mergeSort };
const NUM_BARS = 200;

const renderer = new Renderer(canvas);
const sonifier = new Sonifier();
const recorder = new Recorder(canvas, sonifier.getDestination());

let data = [];
let generator = null;
let running = false;
let animFrameId = null;

function generateData(n) {
  return Array.from({ length: n }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);
}

function reset() {
  running = false;
  if (animFrameId) cancelAnimationFrame(animFrameId);
  data = generateData(NUM_BARS);
  generator = null;
  renderer.draw(data);
  status.textContent = 'Pret';
  btnStart.textContent = 'Play';
}

function getAlgoFn() {
  return ALGOS[algoSelect.value] || bubbleSort;
}

function start() {
  if (running) {
    running = false;
    btnStart.textContent = 'Play';
    return;
  }

  const algoFn = getAlgoFn();
  generator = algoFn(data);
  running = true;
  btnStart.textContent = 'Pause';
  status.textContent = `${algoSelect.value} sort en cours...`;
  animate();
}

function animate() {
  if (!running) return;

  const stepsPerFrame = parseInt(speedSlider.value);

  let lastStep = null;

  for (let i = 0; i < stepsPerFrame; i++) {
    const result = generator.next();
    if (result.done) {
      running = false;
      renderer.draw(data, null);
      status.textContent = 'Termine !';
      btnStart.textContent = 'Play';
      if (recorder.isRecording) recorder.stop();
      return;
    }

    lastStep = result.value;
    // Les generateurs modifient arr en place, data pointe vers la meme ref
    sonifier.play(lastStep, data);
  }

  renderer.draw(data, lastStep);
  animFrameId = requestAnimationFrame(animate);
}

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

reset();
