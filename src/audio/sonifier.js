export class Sonifier {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.destination = this.ctx.createMediaStreamDestination();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.08;
    this.masterGain.connect(this.ctx.destination);
    this.masterGain.connect(this.destination);
    this.enabled = true;
    this._lastPlayTime = 0;
    this._minInterval = 0.015; // 15ms minimum entre 2 sons
    this._activeOscCount = 0;
    this._maxActiveOsc = 8; // max 8 oscillateurs simultanes
  }

  getDestination() {
    return this.destination;
  }

  play(step, data) {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Limiter le debit sonore
    const now = this.ctx.currentTime;
    if (now - this._lastPlayTime < this._minInterval) return;
    if (this._activeOscCount >= this._maxActiveOsc) return;
    this._lastPlayTime = now;

    if (!step.indices || step.indices.length === 0) return;
    const maxVal = Math.max(...data);
    const idx = step.indices[0];
    if (idx >= data.length) return;
    const val = data[idx] || 1;
    const freq = 200 + (val / maxVal) * 800;

    if (step.type === 'swap') {
      this._beepADSR(freq, 0.05, 0.2);
    } else {
      this._beepADSR(freq, 0.03, 0.12);
    }
  }

  playSweep(index, total) {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const freq = 200 + (index / total) * 800;
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

  playTadaa() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    // Fanfare TADAA : C5-E5-G5-C6 rapide puis C6 long
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      this._beepAt(freq, t + i * 0.1, 0.2, 0.4);
    });
    // Note finale longue
    this._beepAt(1046.5, t + 0.5, 0.5, 0.35);
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

    this._activeOscCount++;
    osc.onended = () => { this._activeOscCount = Math.max(0, this._activeOscCount - 1); };
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

  // Son de minage Minecraft — bruit sourd + impact
  playMining() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const bufSize = Math.round(this.ctx.sampleRate * 0.12);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      // Bruit grave avec decay
      out[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.3)) * 0.6;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 400;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    noise.connect(lpf);
    lpf.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  // Sifflement creeper — ssssss (bruit blanc avec montee)
  playCreeper() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const bufSize = Math.round(this.ctx.sampleRate * 0.35);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      const env = i / bufSize; // montee
      out[i] = (Math.random() * 2 - 1) * env * 0.4;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const hpf = this.ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = 1500;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    noise.connect(hpf);
    hpf.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  // Explosion Minecraft — boom grave doux
  playExplosion() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.3);
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.3, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.4);
    // Bruit filtre (moins agressif)
    const bufSize = Math.round(this.ctx.sampleRate * 0.3);
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const out = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      out[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.2)) * 0.4;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const lpf = this.ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = 600;
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.3, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    noise.connect(lpf);
    lpf.connect(nGain);
    nGain.connect(this.masterGain);
    noise.start(t);
  }

  // Tetris — son de lock de piece (boop grave)
  playTetrisLock() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.08);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.12);
  }

  // Tetris — line clear (ascending arpeggio rapide)
  playTetrisClear() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    [400, 500, 600, 800].forEach((freq, i) => {
      this._beepAt(freq, t + i * 0.04, 0.08, 0.3);
    });
  }

  // Tetris — chute de piece (descente rapide)
  playTetrisFall() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.15);
  }

  // Among Us — kill sound (impact sourd)
  playAmongKill() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(500, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.15);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.2);
  }

  // Among Us — emergency meeting (alarm douce)
  playAmongMeeting() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    [0, 0.12, 0.24].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 700;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.08);
      osc.connect(gain); gain.connect(this.masterGain);
      osc.start(t + delay); osc.stop(t + delay + 0.1);
    });
  }

  // Among Us — eject (woooosh descendant)
  playAmongEject() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.6);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.65);
  }

  // UNO — son de carte posee (pop doux)
  playUnoCard() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.06);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.1);
  }

  // UNO — reverse (whoosh montant)
  playUnoReverse() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.2);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.27);
  }

  // GTA — vol (bruit de moteur bref)
  playGTASteal() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.linearRampToValueAtTime(150, t + 0.1);
    osc.frequency.linearRampToValueAtTime(60, t + 0.2);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.22);
  }

  // GTA — sirene police (wee-woo bref)
  playGTASiren() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.linearRampToValueAtTime(800, t + 0.1);
    osc.frequency.linearRampToValueAtTime(600, t + 0.2);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.27);
  }

  // Pokemon — pokeball throw (woosh + pop)
  playPokeCatch() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.15);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.2);
  }

  // Pokemon — wild encounter (dun-dun montant)
  playPokeWild() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    [440, 550, 660].forEach((freq, i) => {
      this._beepAt(freq, t + i * 0.06, 0.08, 0.2);
    });
  }

  // Breaking Bad — cristallisation (tinkle aigu)
  playBBCrystal() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000 + Math.random() * 500, t);
    osc.frequency.exponentialRampToValueAtTime(1500, t + 0.1);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.14);
  }

  // Fortnite — elimination (punch descendant)
  playFortniteElim() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.17);
  }

  // Tinder — swipe (whoosh lateral)
  playTinderSwipe() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.08);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.12);
  }

  // Tinder — match (accord joyeux)
  playTinderMatch() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    [523, 659, 784].forEach((freq, i) => {
      this._beepAt(freq, t + i * 0.07, 0.12, 0.2);
    });
  }

  // Valorant — headshot (crack sec)
  playValoHeadshot() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.09);
  }

  // Valorant — ace (fanfare rapide)
  playValoAce() {
    if (!this.enabled) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;
    [440, 554, 659, 880].forEach((freq, i) => {
      this._beepAt(freq, t + i * 0.08, 0.15, 0.25);
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}
