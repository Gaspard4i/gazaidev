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
    barColor: (ratio) => {
      const r = Math.round(90 + ratio * 155);
      const g = Math.round(50 + ratio * 140);
      const b = Math.round(30 + ratio * 110);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FFD700',
    swap: '#FF4444',
    metaColors: {
      vetting: '#FFD700',
      deported: '#FF0000',
    },
    endMessage: [
      { text: 'MAKE AMERICA', style: 'normal', color: '#FF0000' },
      { text: 'GREAT', style: 'strikethrough', color: '#FF0000' },
      { text: 'WHITE', style: 'bold', color: '#FFFFFF' },
      { text: 'AGAIN', style: 'normal', color: '#FF0000' },
    ],
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
    barColor: (ratio) => {
      const v = Math.round(80 + ratio * 175);
      return `rgb(${v},${v},${Math.round(v * 0.9)})`;
    },
    compare: '#CC0000',
    swap: '#FF0000',
    metaColors: {
      selection: '#FFCC00',
      separated: '#888800',
      deported: '#CCCC00',
      smoke: '#AA8866',
    },
    endMessage: [
      { text: 'NEVER AGAIN', style: 'normal', color: '#FFFFFF' },
    ],
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
      purge: '#FF0000',
      trim: '#880000',
      grow: '#00FF00',
    },
  },
  nineEleven: {
    bg: '#87CEEB',
    stripe: 'rgba(255,255,255,0.05)',
    barColor: (ratio) => {
      // Gris acier pour les tours
      const v = Math.round(120 + ratio * 60);
      return `rgb(${v},${v},${Math.round(v * 0.95)})`;
    },
    compare: '#888888',
    swap: '#AAAAAA',
    metaColors: {
      scanning: '#4488FF',
      clearing: '#444444',
      build_tower: '#CCCCCC',
      standing: '#DDDDDD',
      collapse: '#FF4400',
      plane: '#333333',
      dust: '#AA8866',
    },
  },
  unsort: {
    bg: '#1a0a0a',
    stripe: 'rgba(255, 0, 0, 0.04)',
    barColor: (ratio) => {
      // Du vert (ordre) au rouge (chaos)
      const r = Math.round(50 + ratio * 200);
      const g = Math.round(200 - ratio * 150);
      return `rgb(${r},${g},50)`;
    },
    compare: '#FFFF00',
    swap: '#FF0000',
    metaColors: {
      chaos: '#FF8800',
      destroy: '#FF0000',
    },
  },
  bogo: {
    bg: '#0a0a1a',
    stripe: 'rgba(255, 255, 0, 0.04)',
    barColor: (ratio) => {
      // Couleurs chaotiques qui changent avec le temps
      const hue = (ratio * 360 + Date.now() * 0.01) % 360;
      return `hsl(${hue}, 70%, 55%)`;
    },
    compare: '#FFFFFF',
    swap: '#FFFF00',
    metaColors: {
      shuffle: '#FF00FF',
    },
  },
  sigma: {
    bg: '#0a0a0a',
    stripe: 'rgba(100, 0, 255, 0.06)',
    barColor: (ratio) => {
      // Gris froid avec accent violet pour les hautes valeurs
      const r = Math.round(60 + ratio * 100);
      const g = Math.round(60 + ratio * 60);
      const b = Math.round(80 + ratio * 175);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#8800FF',
    swap: '#AA44FF',
    metaColors: {
      howl: '#FFD700',
      sigma_push: '#FF4400',
      beta_sort: '#666688',
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

  drawEndMessage() {
    const theme = this._getTheme();
    if (!theme.endMessage) return;

    const { ctx, width, height } = this;
    ctx.save();

    const centerY = height * 0.55;
    const fontSize = 64;
    ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Fond semi-transparent derriere le message
    const parts = theme.endMessage;
    const totalText = parts.map(p => p.text).join(' ');
    const totalWidth = ctx.measureText(totalText).width + 60;
    const blockHeight = parts.length > 2 ? fontSize * 2.8 : fontSize * 1.8;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.beginPath();
    ctx.roundRect(width / 2 - totalWidth / 2, centerY - blockHeight / 2, totalWidth, blockHeight, 16);
    ctx.fill();

    // Dessiner chaque partie du message sur 2 lignes
    // Ligne 1 : MAKE AMERICA
    // Ligne 2 : GREAT (barre) WHITE AGAIN
    const line1 = parts.filter(p => p.text === 'MAKE AMERICA');
    const line2parts = parts.filter(p => p.text !== 'MAKE AMERICA');

    // Ligne 1
    if (line1.length > 0) {
      ctx.fillStyle = line1[0].color;
      ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`;
      ctx.fillText(line1[0].text, width / 2, centerY - fontSize * 0.6);
    }

    // Ligne 2 : GREAT WHITE AGAIN avec GREAT barre
    let x2 = width / 2;
    ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`;
    const line2text = line2parts.map(p => p.text).join('  ');
    const line2width = ctx.measureText(line2text).width;
    let curX = width / 2 - line2width / 2;

    for (const part of line2parts) {
      const w = ctx.measureText(part.text).width;
      const partCenterX = curX + w / 2;

      ctx.fillStyle = part.color;

      if (part.style === 'strikethrough') {
        // Texte rouge + barre au milieu
        ctx.globalAlpha = 0.5;
        ctx.fillText(part.text, partCenterX, centerY + fontSize * 0.6);
        ctx.globalAlpha = 1;
        // Ligne de barre
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(curX - 4, centerY + fontSize * 0.6);
        ctx.lineTo(curX + w + 4, centerY + fontSize * 0.6);
        ctx.stroke();
      } else {
        ctx.fillText(part.text, partCenterX, centerY + fontSize * 0.6);
      }

      curX += w + ctx.measureText('  ').width;
    }

    ctx.restore();
  }

  // Dessine la seconde liste (camps) pour Hitler Sort
  drawCamps(camps, maxVal) {
    if (!camps || camps.length === 0) return;
    const { ctx, width, height } = this;
    const campZoneX = width * 0.75;
    const campZoneW = width * 0.22;
    const campBarW = campZoneW / Math.max(camps.length, 1);

    // Fond du camp — gris sombre avec bordure barbelees
    ctx.fillStyle = 'rgba(40, 30, 20, 0.7)';
    ctx.fillRect(campZoneX - 5, height * 0.15, campZoneW + 10, height * 0.7);

    // Label
    ctx.save();
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.fillStyle = '#888866';
    ctx.textAlign = 'center';
    ctx.fillText('CAMP', campZoneX + campZoneW / 2, height * 0.13);
    ctx.restore();

    // Barres dans le camp
    for (let i = 0; i < camps.length; i++) {
      const barH = (camps[i] / maxVal) * (height * 0.6);
      const x = campZoneX + i * campBarW;
      const y = height * 0.82 - barH;
      ctx.fillStyle = '#CCCC00'; // jaune etoile
      ctx.fillRect(x, y, campBarW - 1, barH);
    }
  }

  // Fumee/poussiere qui monte
  drawSmoke(frame, maxFrames) {
    const { ctx, width, height } = this;
    ctx.save();
    const alpha = 0.6 - (frame / maxFrames) * 0.5;
    for (let i = 0; i < 20; i++) {
      const x = width * 0.75 + Math.sin(frame * 0.5 + i) * 80 + Math.random() * 40;
      const y = height * 0.5 - frame * 8 - i * 15 + Math.random() * 20;
      const r = 15 + Math.random() * 25;
      ctx.fillStyle = `rgba(100, 90, 80, ${alpha * (1 - i / 20)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Avion pour 9/11 Sort
  drawPlane(planeX) {
    const { ctx, width, height } = this;
    ctx.save();
    const x = planeX * width;
    const y = height * 0.35;

    // Corps de l'avion
    ctx.fillStyle = '#444444';
    ctx.fillRect(x - 40, y - 8, 80, 16);
    // Ailes
    ctx.fillRect(x - 15, y - 30, 30, 60);
    // Queue
    ctx.fillRect(x + 30, y - 20, 15, 40);

    ctx.restore();
  }

  // Poussiere / effondrement pour 9/11
  drawDust(frame) {
    const { ctx, width, height } = this;
    ctx.save();
    const alpha = 0.8 - frame * 0.04;
    // Nuage de poussiere qui s'expand
    const spread = frame * 30;
    for (let i = 0; i < 40; i++) {
      const x = width / 2 + (Math.random() - 0.5) * spread * 2;
      const y = height * 0.9 - Math.random() * spread;
      const r = 10 + Math.random() * (spread * 0.3);
      const gray = Math.round(150 + Math.random() * 80);
      ctx.fillStyle = `rgba(${gray}, ${gray - 10}, ${gray - 20}, ${alpha * Math.random()})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Effet howl pour Sigma Sort — pleine lune + cercles + AWOOO
  drawHowl(index, data) {
    if (index === undefined || !data || data.length === 0) return;
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const maxVal = Math.max(...data);
    const x = index * barWidth + barWidth / 2;
    const barH = (data[index] / maxVal) * (height * 0.78);
    const y = height - barH - 30;

    ctx.save();

    // Pleine lune en haut a droite
    const moonX = width * 0.8;
    const moonY = height * 0.12;
    const moonR = 70;

    // Halo de la lune
    const glow = ctx.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, moonR * 3);
    glow.addColorStop(0, 'rgba(255, 250, 200, 0.3)');
    glow.addColorStop(0.5, 'rgba(255, 250, 200, 0.08)');
    glow.addColorStop(1, 'rgba(255, 250, 200, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(moonX - moonR * 3, moonY - moonR * 3, moonR * 6, moonR * 6);

    // Lune
    ctx.fillStyle = '#FFFDE0';
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();

    // Crateres subtils
    ctx.fillStyle = 'rgba(200, 195, 160, 0.4)';
    ctx.beginPath(); ctx.arc(moonX - 20, moonY - 15, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(moonX + 25, moonY + 10, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(moonX - 5, moonY + 25, 15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(moonX + 15, moonY - 25, 6, 0, Math.PI * 2); ctx.fill();

    // Ondes de choc dores autour du sigma
    const pulse = (Date.now() % 600) / 600; // 0->1 pulsation
    for (let r = 0; r < 3; r++) {
      const radius = 20 + r * 40 + pulse * 30;
      ctx.strokeStyle = `rgba(255, 215, 0, ${0.7 - r * 0.2 - pulse * 0.3})`;
      ctx.lineWidth = 4 - r;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Texte AWOOO
    ctx.font = 'bold 52px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    // Ombre
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText('AWOOO!', width / 2 + 2, height * 0.45 + 2);
    // Texte dore
    ctx.fillStyle = '#FFD700';
    ctx.fillText('AWOOO!', width / 2, height * 0.45);

    ctx.restore();
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
