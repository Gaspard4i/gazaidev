const COLORS = {
  bg: '#FBF6EE',
  barLow: '#1B3A5C',
  barHigh: '#E8621F',
  compare: '#A8C8E0',
  swap: '#F09A56',
  swept: '#27AE60',
  sweptGlow: 'rgba(39, 174, 96, 0.4)',
  watermark: 'rgba(27, 58, 92, 0.5)',
  stripe: 'rgba(168, 200, 224, 0.15)',
  overlayText: '#FFFFFF',
  overlaySubtext: 'rgba(255,255,255,0.7)',
  overlayBg: 'rgba(0,0,0,0.5)',
  progressBg: 'rgba(0,0,0,0.2)',
  progressFill: '#E8621F',
};

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.rainbow = false;
  }

  draw(data, step = null, stats = null) {
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    // Fond
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    // Rayures subtiles
    ctx.fillStyle = COLORS.stripe;
    for (let sy = 0; sy < height; sy += 8) {
      ctx.fillRect(0, sy, width, 1);
    }

    // Barres
    for (let i = 0; i < n; i++) {
      const barHeight = (data[i] / maxVal) * (height * 0.78);
      const x = i * barWidth;
      const y = height - barHeight - 30; // marge pour progress bar

      // Couleur
      const ratio = data[i] / maxVal;
      if (this.rainbow) {
        const hue = ratio * 300;
        ctx.fillStyle = `hsl(${hue}, 80%, 55%)`;
      } else {
        ctx.fillStyle = this._lerpColor(COLORS.barLow, COLORS.barHigh, ratio);
      }

      // Highlight compare/swap
      if (step && step.indices && step.indices.includes(i)) {
        ctx.fillStyle = step.type === 'swap' ? COLORS.swap : COLORS.compare;
      }

      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }

    // Overlays
    if (stats) this._drawOverlays(stats);

    // Watermark
    this._drawWatermark();
  }

  drawSweep(data, sweepIndex, stats = null) {
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = COLORS.stripe;
    for (let sy = 0; sy < height; sy += 8) {
      ctx.fillRect(0, sy, width, 1);
    }

    for (let i = 0; i < n; i++) {
      const barHeight = (data[i] / maxVal) * (height * 0.78);
      const x = i * barWidth;
      const y = height - barHeight - 30;

      if (i < sweepIndex) {
        ctx.fillStyle = COLORS.swept;
      } else if (i === sweepIndex) {
        ctx.fillStyle = '#2ECC71';
        ctx.shadowColor = COLORS.sweptGlow;
        ctx.shadowBlur = 20;
      } else {
        const ratio = data[i] / maxVal;
        if (this.rainbow) {
          ctx.fillStyle = `hsl(${ratio * 300}, 80%, 55%)`;
        } else {
          ctx.fillStyle = this._lerpColor(COLORS.barLow, COLORS.barHigh, ratio);
        }
      }

      ctx.fillRect(x, y, barWidth - 1, barHeight);
      ctx.shadowBlur = 0;
    }

    if (stats) this._drawOverlays(stats);
    this._drawWatermark();
  }

  drawFlash(opacity) {
    const { ctx, width, height } = this;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fillRect(0, 0, width, height);
  }

  _drawOverlays(stats) {
    const { ctx, width, height } = this;
    ctx.save();

    // Nom de l'algo — haut centre
    if (stats.algoName) {
      ctx.font = 'bold 52px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      // Ombre pour lisibilite
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillText(stats.algoName, width / 2 + 2, 42);
      ctx.fillStyle = COLORS.overlayText;
      ctx.fillText(stats.algoName, width / 2, 40);
    }

    // Complexite
    if (stats.complexity) {
      ctx.font = '36px "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = COLORS.overlaySubtext;
      ctx.textAlign = 'center';
      ctx.fillText(stats.complexity, width / 2, 100);
    }

    // Compteurs — coin haut-gauche
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Fond semi-transparent pour les compteurs
    ctx.fillStyle = COLORS.overlayBg;
    ctx.beginPath();
    ctx.roundRect(20, 150, 280, 90, 10);
    ctx.fill();

    ctx.fillStyle = COLORS.overlayText;
    ctx.fillText(`CMP  ${stats.compares.toLocaleString()}`, 35, 162);
    ctx.fillText(`SWAP ${stats.swaps.toLocaleString()}`, 35, 200);

    // Progress bar — tout en bas
    if (stats.progress !== undefined) {
      const barY = height - 20;
      const barH = 6;
      const margin = 30;
      const totalW = width - margin * 2;

      ctx.fillStyle = COLORS.progressBg;
      ctx.beginPath();
      ctx.roundRect(margin, barY, totalW, barH, 3);
      ctx.fill();

      ctx.fillStyle = COLORS.progressFill;
      ctx.beginPath();
      ctx.roundRect(margin, barY, totalW * Math.min(stats.progress, 1), barH, 3);
      ctx.fill();
    }

    ctx.restore();
  }

  _drawWatermark() {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = COLORS.watermark;
    ctx.font = 'bold italic 36px Georgia, Palatino, serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('GAZAIDEV', width - 30, height - 35);
    ctx.restore();
  }

  _lerpColor(hexA, hexB, t) {
    const a = this._hexToRgb(hexA);
    const b = this._hexToRgb(hexB);
    const r = Math.round(a.r + (b.r - a.r) * t);
    const g = Math.round(a.g + (b.g - a.g) * t);
    const bl = Math.round(a.b + (b.b - a.b) * t);
    return `rgb(${r},${g},${bl})`;
  }

  _hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
}
