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
    const freq = 200 + (val / maxVal) * 800;

    if (step.type === 'swap') {
      this._beep(freq, 0.04, 'square');
    } else {
      this._beep(freq, 0.02, 'sine');
    }
  }

  _beep(freq, duration, waveType) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = waveType;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}
