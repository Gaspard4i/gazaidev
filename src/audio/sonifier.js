export class Sonifier {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.destination = this.ctx.createMediaStreamDestination();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.15;
    this.masterGain.connect(this.ctx.destination);
    this.masterGain.connect(this.destination);
    this.enabled = true;
  }

  getDestination() {
    return this.destination;
  }

  play(step, data) {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const maxVal = Math.max(...data);
    const idx = step.indices[0];
    const val = data[idx] || 1;
    const freq = 120 + (val / maxVal) * 1080;

    if (step.type === 'swap') {
      this._beepADSR(freq, 0.05, 0.4);
    } else {
      this._beepADSR(freq, 0.03, 0.25);
    }
  }

  playSweep(index, total) {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const freq = 120 + (index / total) * 1080;
    this._beepADSR(freq, 0.04, 0.3);
  }

  playShuffle() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    noise.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
  }

  playCompletion() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    // Accord C-E-G ascendant
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      this._beepAt(freq, t + i * 0.08, 0.15, 0.35);
    });
  }

  _beepADSR(freq, duration, peakGain) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;

    // ADSR envelope
    const attack = 0.005;
    const decay = 0.02;
    const sustainLevel = peakGain * 0.5;
    const release = duration - attack - decay;

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peakGain, t + attack);
    gain.gain.linearRampToValueAtTime(sustainLevel, t + attack + decay);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + duration + 0.01);
  }

  _beepAt(freq, startTime, duration, peakGain) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}
