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

// Themes visuels par algo absurde
const THEMES = {
  default: {
    bg: '#FBF6EE',
    stripe: 'rgba(168, 200, 224, 0.15)',
    barColor: (ratio) => null, // utilise barLow/barHigh par defaut
    compare: '#A8C8E0',
    swap: '#F09A56',
    metaColors: {}, // couleurs speciales pour les meta steps
  },
  trump: {
    bg: '#1a1a2e',
    stripe: 'rgba(200, 160, 120, 0.08)',
    // Gradient de couleur de peau : clair (haut) -> fonce (bas)
    barColor: (ratio) => {
      // Du brun fonce au peche clair
      const r = Math.round(90 + ratio * 155);  // 90 -> 245
      const g = Math.round(50 + ratio * 140);  // 50 -> 190
      const b = Math.round(30 + ratio * 110);  // 30 -> 140
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FFD700', // or
    swap: '#FF4444',
    metaColors: {
      vetting: '#FFD700',
      deported: '#FF0000',
    },
  },
  thanos: {
    bg: '#1a0a2e',
    stripe: 'rgba(128, 0, 255, 0.08)',
    // Gradient violet/dore comme le gant de l'infini
    barColor: (ratio) => {
      const r = Math.round(75 + ratio * 180);  // violet -> dore
      const g = Math.round(0 + ratio * 165);
      const b = Math.round(130 - ratio * 50);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#E8A0FF',
    swap: '#FFD700',
    metaColors: {
      snap: '#FF6600',
    },
  },
  communism: {
    bg: '#1a0000',
    stripe: 'rgba(255, 0, 0, 0.06)',
    // Tout en rouge — nuances de rouge
    barColor: (ratio) => {
      const r = Math.round(120 + ratio * 135);
      const g = Math.round(10 + ratio * 30);
      const b = Math.round(10 + ratio * 20);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FFCC00', // etoile jaune
    swap: '#FF0000',
    metaColors: {
      redistribute: '#FFCC00',
      verify_equality: '#FF4444',
    },
  },
  stalin: {
    bg: '#0d0d0d',
    stripe: 'rgba(139, 0, 0, 0.08)',
    // Gris acier froid avec pointes de rouge
    barColor: (ratio) => {
      const r = Math.round(60 + ratio * 100);
      const g = Math.round(60 + ratio * 80);
      const b = Math.round(70 + ratio * 70);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#CC0000',
    swap: '#FF0000',
    metaColors: {
      goulag: '#880000',
      approved: '#00CC00',
    },
  },
  hitler: {
    bg: '#0a0a0a',
    stripe: 'rgba(100, 100, 100, 0.05)',
    // Noir, blanc, rouge — palette nazie
    barColor: (ratio) => {
      // Gris froid qui monte vers le blanc
      const v = Math.round(80 + ratio * 175);
      return `rgb(${v},${v},${Math.round(v * 0.9)})`;
    },
    compare: '#CC0000',
    swap: '#FF0000',
    metaColors: {
      selection: '#FFCC00', // etoile jaune
      separated: '#888800',
    },
  },
  diddy: {
    bg: '#0d001a',
    stripe: 'rgba(255, 0, 200, 0.06)',
    // Neon party — rose/violet/magenta
    barColor: (ratio) => {
      const r = Math.round(150 + ratio * 105);
      const g = Math.round(0 + ratio * 50);
      const b = Math.round(100 + ratio * 155);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FF00FF',
    swap: '#00FFFF',
    metaColors: {
      scouting: '#FF69B4',
      invited: '#FFD700',
      disappeared: '#330033',
    },
  },
  epstein: {
    bg: '#0a0a1a',
    stripe: 'rgba(0, 100, 200, 0.06)',
    // Bleu sombre / institutionnel
    barColor: (ratio) => {
      const r = Math.round(30 + ratio * 60);
      const g = Math.round(50 + ratio * 100);
      const b = Math.round(100 + ratio * 155);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FF4444',
    swap: '#FF8800',
    metaColors: {
      screening: '#4488FF',
      rejected: '#888888',
    },
  },
  sort67: {
    bg: '#001a00',
    stripe: 'rgba(0, 255, 0, 0.04)',
    // Matrix vert
    barColor: (ratio) => {
      const g = Math.round(80 + ratio * 175);
      return `rgb(0,${g},0)`;
    },
    compare: '#00FF00',
    swap: '#88FF88',
    metaColors: {
      evaluate: '#00FF00',
      reduce: '#008800',
      force: '#FFFF00',
    },
  },
};

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.rainbow = false;
    this.theme = 'default';
  }

  _getTheme() {
    return THEMES[this.theme] || THEMES.default;
  }

  _getBarColor(ratio, step, i) {
    const theme = this._getTheme();

    // Meta step special colors
    if (step && step.meta && theme.metaColors[step.meta] && step.indices && step.indices.includes(i)) {
      return theme.metaColors[step.meta];
    }

    // Highlight compare/swap
    if (step && step.indices && step.indices.includes(i)) {
      return step.type === 'swap' ? theme.swap : theme.compare;
    }

    // Rainbow override
    if (this.rainbow) {
      return `hsl(${ratio * 300}, 80%, 55%)`;
    }

    // Theme custom color
    const custom = theme.barColor(ratio);
    if (custom) return custom;

    // Default gradient
    return this._lerpColor(COLORS.barLow, COLORS.barHigh, ratio);
  }

  draw(data, step = null, stats = null) {
    const { ctx, width, height } = this;
    const theme = this._getTheme();
    const n = data.length;
    if (n === 0) return;
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    // Fond
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    // Rayures
    ctx.fillStyle = theme.stripe;
    for (let sy = 0; sy < height; sy += 8) {
      ctx.fillRect(0, sy, width, 1);
    }

    // Barres
    for (let i = 0; i < n; i++) {
      const barHeight = (data[i] / maxVal) * (height * 0.78);
      const x = i * barWidth;
      const y = height - barHeight - 30;
      const ratio = data[i] / maxVal;

      ctx.fillStyle = this._getBarColor(ratio, step, i);
      ctx.fillRect(x, y, barWidth - (n > 100 ? 1 : 2), barHeight);
    }

    if (stats) this._drawOverlays(stats);
    this._drawWatermark();
  }

  drawSweep(data, sweepIndex, stats = null) {
    const { ctx, width, height } = this;
    const theme = this._getTheme();
    const n = data.length;
    if (n === 0) return;
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = theme.stripe;
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
        ctx.fillStyle = this._getBarColor(ratio, null, i);
      }

      ctx.fillRect(x, y, barWidth - (n > 100 ? 1 : 2), barHeight);
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

    if (stats.algoName) {
      ctx.font = 'bold 52px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillText(stats.algoName, width / 2 + 2, 42);
      ctx.fillStyle = COLORS.overlayText;
      ctx.fillText(stats.algoName, width / 2, 40);
    }

    if (stats.complexity) {
      ctx.font = '36px "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = COLORS.overlaySubtext;
      ctx.textAlign = 'center';
      ctx.fillText(stats.complexity, width / 2, 100);
    }

    // Description du tri — style @swapjs
    if (stats.desc) {
      ctx.font = 'italic 26px "Segoe UI", system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.textAlign = 'center';
      // Word wrap basique sur 2 lignes max
      const words = stats.desc.split(' ');
      let line = '';
      let lineY = 145;
      for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width > width - 80) {
          ctx.fillText(line, width / 2, lineY);
          line = word;
          lineY += 34;
          if (lineY > 185) break; // max 2 lignes
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, width / 2, lineY);
    }

    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Hauteur du bloc ajustee pour inclure BARS
    ctx.fillStyle = COLORS.overlayBg;
    ctx.beginPath();
    ctx.roundRect(20, 220, 280, 130, 10);
    ctx.fill();

    ctx.fillStyle = COLORS.overlayText;
    ctx.fillText(`CMP  ${stats.compares.toLocaleString()}`, 35, 232);
    ctx.fillText(`SWAP ${stats.swaps.toLocaleString()}`, 35, 270);
    ctx.fillText(`BARS ${stats.bars !== undefined ? stats.bars : '?'}`, 35, 308);

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
