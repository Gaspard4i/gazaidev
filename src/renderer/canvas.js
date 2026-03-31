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
  french: {
    bg: '#0a0a1e',
    stripe: 'rgba(0, 0, 150, 0.06)',
    // Cuivre (pauvres) -> Argent (classe moyenne) -> Or (riches)
    barColor: (ratio) => {
      if (ratio < 0.33) {
        // Cuivre : brun-orange metallique
        const t = ratio / 0.33;
        return `rgb(${Math.round(140 + t * 40)}, ${Math.round(70 + t * 30)}, ${Math.round(40 + t * 20)})`;
      }
      if (ratio < 0.66) {
        // Argent : gris metallique brillant
        const t = (ratio - 0.33) / 0.33;
        const v = Math.round(160 + t * 60);
        return `rgb(${v}, ${v + 5}, ${v + 10})`;
      }
      // Or : dore brillant
      const t = (ratio - 0.66) / 0.34;
      return `rgb(${Math.round(200 + t * 55)}, ${Math.round(170 + t * 45)}, ${Math.round(30 + t * 30)})`;
    },
    compare: '#FFFFFF',
    swap: '#FFD700',
    metaColors: {
      rich: '#FFD700',        // or
      poor: '#B87333',        // cuivre
      middle_class: '#C0C0C0', // argent
      taxed: '#FF8800',       // orange flash — on te prend ton argent
      enriched: '#FFF44F',    // or brillant flash
      transfer: '#FFD700',
      impoverished: '#8B5A2B', // cuivre fonce
      homeless: '#4A3520',    // cuivre tres fonce
      fiscal_year: '#444444',
    },
    endMessage: [
      { text: 'VIVE LA FRANCE', style: 'normal', color: '#FFFFFF' },
    ],
  },
  gaza: {
    bg: '#1a1510',
    stripe: 'rgba(200, 150, 80, 0.05)',
    barColor: (ratio) => {
      // Sable/terre — ocre a beige
      const r = Math.round(120 + ratio * 100);
      const g = Math.round(90 + ratio * 80);
      const b = Math.round(50 + ratio * 40);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#DD8833',
    swap: '#FF4400',
    metaColors: {
      scanning: '#DDAA55',
      bomb_falling: '#FF6600',
      bomb_impact: '#FF0000',
      airstrike: '#888888',
      explosion: '#FF4400',
      destroyed: '#440000',
      ruins: '#554433',
      calm: '#DDAA55',
    },
    endMessage: 'FREE_PALESTINE_FLAG',
  },
  drug: {
    bg: '#0a0010',
    stripe: 'rgba(255, 0, 255, 0.04)',
    barColor: (ratio) => {
      const hue = (ratio * 360 + Date.now() * 0.1) % 360;
      return `hsl(${hue}, 90%, 55%)`;
    },
    compare: '#FF00FF',
    swap: '#00FFFF',
    metaColors: {
      sober: '#888888',
      taking_drugs: '#FF00FF',
      tripping: '#00FF00',
      peak: '#FFFF00',
      comedown: '#888888',
      flipped: '#AAAAAA',
    },
  },
  gamble: {
    bg: '#0d1a0d',
    stripe: 'rgba(0, 200, 0, 0.04)',
    barColor: (ratio) => {
      const r = Math.round(20 + ratio * 60);
      const g = Math.round(80 + ratio * 150);
      const b = Math.round(20 + ratio * 40);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FFD700',
    swap: '#FF4444',
    metaColors: {
      betting: '#FFD700',
      win: '#00FF00',
      lose: '#FF0000',
      swap_after_loss: '#FF4444',
      jackpot: '#FFD700',
      bankrupt: '#FF0000',
    },
  },
  adhd: {
    bg: '#1a1a0a',
    stripe: 'rgba(255, 200, 0, 0.04)',
    barColor: (ratio) => {
      const hue = (ratio * 60 + Date.now() * 0.02) % 360;
      return `hsl(${hue}, 60%, 55%)`;
    },
    compare: '#FFAA00',
    swap: '#FF6600',
    metaColors: {
      distracted: '#888888',
      fidgeting: '#FF00FF',
      refocusing: '#00FFAA',
    },
  },
  autism: {
    bg: '#050510',
    stripe: 'rgba(0, 100, 255, 0.04)',
    barColor: (ratio) => {
      const r = Math.round(30 + ratio * 50);
      const g = Math.round(60 + ratio * 120);
      const b = Math.round(150 + ratio * 105);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#00CCFF',
    swap: '#00FF88',
    metaColors: {
      analyzing: '#00CCFF',
      calculating: '#AAAAFF',
      high_iq: '#FFD700',
      placed: '#00FF88',
    },
  },
  magician: {
    bg: '#0a0010',
    stripe: 'rgba(200, 0, 255, 0.04)',
    barColor: (ratio) => {
      const r = Math.round(100 + ratio * 155);
      const g = Math.round(20 + ratio * 80);
      const b = Math.round(150 + ratio * 105);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FFD700',
    swap: '#FF44FF',
    metaColors: {
      showoff: '#FFD700',
      curtain_close: '#CC0000',
      behind_curtain: '#440000',
      curtain_open: '#CC0000',
      tadaa: '#FFD700',
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

    // Barres marquees (Hitler sort — etoile jaune)
    if (step && step.marked && step.marked.includes(i)) {
      return '#CCCC00';
    }

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

    // Cas special : FREE PALESTINE avec drapeau
    if (theme.endMessage === 'FREE_PALESTINE_FLAG') {
      this._drawFreePalestine(ctx, width, height);
      ctx.restore();
      return;
    }

    const parts = theme.endMessage;
    const fontSize = 64;
    ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Separer en lignes : chaque part avec line:1 va en ligne 1, sinon ligne 2
    // Par defaut: si <= 2 parts, tout sur une ligne. Sinon premiere part = ligne 1, reste = ligne 2
    const singleLine = parts.length <= 1;
    const line1parts = singleLine ? parts : [parts[0]];
    const line2parts = singleLine ? [] : parts.slice(1);

    const centerY = height * 0.55;
    const lineHeight = fontSize * 1.2;

    // Calculer la largeur totale
    const allText = parts.map(p => p.text).join('  ');
    const maxWidth = ctx.measureText(allText).width + 80;
    const blockH = singleLine ? lineHeight + 40 : lineHeight * 2 + 50;

    // Fond
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.beginPath();
    ctx.roundRect(width / 2 - maxWidth / 2, centerY - blockH / 2, maxWidth, blockH, 16);
    ctx.fill();

    // Ligne 1
    const y1 = singleLine ? centerY : centerY - lineHeight * 0.5;
    this._drawMessageLine(ctx, line1parts, width / 2, y1, fontSize);

    // Ligne 2
    if (line2parts.length > 0) {
      const y2 = centerY + lineHeight * 0.5;
      this._drawMessageLine(ctx, line2parts, width / 2, y2, fontSize);
    }

    ctx.restore();
  }

  _drawMessageLine(ctx, parts, centerX, y, fontSize) {
    ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`;
    const fullText = parts.map(p => p.text).join('  ');
    const totalW = ctx.measureText(fullText).width;
    let curX = centerX - totalW / 2;

    for (const part of parts) {
      const w = ctx.measureText(part.text).width;
      const px = curX + w / 2;

      ctx.fillStyle = part.color;

      if (part.style === 'strikethrough') {
        ctx.globalAlpha = 0.5;
        ctx.fillText(part.text, px, y);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(curX - 4, y);
        ctx.lineTo(curX + w + 4, y);
        ctx.stroke();
      } else {
        ctx.fillText(part.text, px, y);
      }

      curX += w + ctx.measureText('  ').width;
    }
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
  drawPlane(planeX, planeY) {
    const { ctx, width, height } = this;
    ctx.save();
    const x = planeX * width;
    const y = (planeY || 0.35) * height;

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

  // FREE PALESTINE avec drapeau palestinien
  _drawFreePalestine(ctx, width, height) {
    const centerY = height * 0.5;
    const flagW = width * 0.75;
    const flagH = flagW * 0.5;
    const flagX = (width - flagW) / 2;
    const flagY = centerY - flagH / 2 - 30;

    // Drapeau palestinien : 3 bandes horizontales + triangle rouge
    const bandH = flagH / 3;

    // Noir
    ctx.fillStyle = '#000000';
    ctx.fillRect(flagX, flagY, flagW, bandH);
    // Blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(flagX, flagY + bandH, flagW, bandH);
    // Vert
    ctx.fillStyle = '#009736';
    ctx.fillRect(flagX, flagY + bandH * 2, flagW, bandH);
    // Triangle rouge a gauche
    ctx.fillStyle = '#CE1126';
    ctx.beginPath();
    ctx.moveTo(flagX, flagY);
    ctx.lineTo(flagX + flagW * 0.35, flagY + flagH / 2);
    ctx.lineTo(flagX, flagY + flagH);
    ctx.closePath();
    ctx.fill();

    // Bordure du drapeau
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(flagX, flagY, flagW, flagH);

    // Texte FREE PALESTINE
    const textY = flagY + flagH + 60;
    ctx.font = 'bold 80px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Ombre
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillText('FREE', width / 2 + 3, textY + 3);
    ctx.fillText('PALESTINE', width / 2 + 3, textY + 90 + 3);

    // Texte blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('FREE', width / 2, textY);
    ctx.fillStyle = '#CE1126';
    ctx.fillText('PALESTINE', width / 2, textY + 90);
  }

  // Etoiles jaunes sur les barres marquees (Hitler Sort)
  drawStars(markedIndices, data) {
    if (!data || data.length === 0) return;
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    ctx.save();
    for (const idx of markedIndices) {
      if (idx >= n) continue;
      const x = idx * barWidth + barWidth / 2;
      const barH = (data[idx] / maxVal) * (height * 0.78);
      const y = height - barH - 45;

      // Etoile de David jaune
      ctx.fillStyle = '#FFD700';
      ctx.strokeStyle = '#886600';
      ctx.lineWidth = 2;
      this._drawStarOfDavid(ctx, x, y, 12);
    }
    ctx.restore();
  }

  _drawStarOfDavid(ctx, x, y, size) {
    // Triangle haut
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.866, y + size * 0.5);
    ctx.lineTo(x - size * 0.866, y + size * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Triangle bas (inverse)
    ctx.beginPath();
    ctx.moveTo(x, y + size);
    ctx.lineTo(x + size * 0.866, y - size * 0.5);
    ctx.lineTo(x - size * 0.866, y - size * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Fumee type cheminee qui monte d'une barre (Hitler Sort)
  drawChimneySmoke(index, data) {
    if (!data || data.length === 0 || index >= data.length) return;
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const x = index * barWidth + barWidth / 2;
    const baseY = height * 0.2;

    ctx.save();
    const t = Date.now() * 0.005;
    for (let i = 0; i < 8; i++) {
      const smokeX = x + Math.sin(t + i * 1.5) * 15;
      const smokeY = baseY - i * 20;
      const r = 8 + i * 4;
      const alpha = 0.4 - i * 0.04;
      ctx.fillStyle = `rgba(100, 90, 80, ${Math.max(0, alpha)})`;
      ctx.beginPath();
      ctx.arc(smokeX, smokeY, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Bombe qui tombe sur une barre
  drawBomb(index, data, frame) {
    if (index === undefined || !data || data.length === 0 || index >= data.length) return;
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const maxVal = Math.max(...data);
    const barH = (data[index] / maxVal) * (height * 0.78);
    const x = index * barWidth + barWidth / 2;
    const targetY = height - barH - 30;
    const startY = 50;
    const progress = frame / 6;
    const bombY = startY + (targetY - startY) * progress;

    ctx.save();
    // Bombe
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.ellipse(x, bombY, 8, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    // Ailettes
    ctx.fillStyle = '#555555';
    ctx.fillRect(x - 12, bombY - 14, 24, 4);
    ctx.restore();
  }

  // Explosion sur une position
  drawExplosion(index, data, frame) {
    if (!data || data.length === 0) return;
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const x = (index < n ? index * barWidth + barWidth / 2 : width / 2);
    const y = height * 0.7;
    const radius = 20 + frame * 25;

    ctx.save();
    // Cercle d'explosion
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, `rgba(255, 200, 0, ${0.9 - frame * 0.2})`);
    grad.addColorStop(0.4, `rgba(255, 100, 0, ${0.7 - frame * 0.15})`);
    grad.addColorStop(1, `rgba(255, 0, 0, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Avion militaire (plus gros, avec etoile)
  drawMilitaryPlane(planeX) {
    const { ctx, width, height } = this;
    ctx.save();
    const x = planeX * width;
    const y = height * 0.2;

    // Corps
    ctx.fillStyle = '#556655';
    ctx.fillRect(x - 50, y - 10, 100, 20);
    // Ailes
    ctx.fillRect(x - 20, y - 40, 40, 80);
    // Queue
    ctx.fillRect(x + 40, y - 25, 18, 50);
    // Etoile de David simplifiee
    ctx.strokeStyle = '#4488FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - 7); ctx.lineTo(x + 6, y + 4); ctx.lineTo(x - 6, y + 4); ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + 7); ctx.lineTo(x + 6, y - 4); ctx.lineTo(x - 6, y - 4); ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  // Ruines avec fumee
  drawRuins(frame) {
    const { ctx, width, height } = this;
    ctx.save();

    // Debris au sol
    ctx.fillStyle = '#443322';
    for (let i = 0; i < 15; i++) {
      const x = (i / 15) * width + Math.sin(i * 7) * 30;
      const w = 20 + Math.sin(i * 3) * 15;
      const h = 5 + Math.sin(i * 5) * 8;
      ctx.fillRect(x, height * 0.88 - h, w, h);
    }

    // Fumee qui monte
    const alpha = Math.max(0, 0.5 - frame * 0.008);
    for (let i = 0; i < 25; i++) {
      const x = (i / 25) * width + Math.sin(frame * 0.3 + i * 2) * 40;
      const y = height * 0.85 - frame * 4 - i * 12 + Math.sin(i * 4) * 20;
      const r = 15 + Math.random() * 20 + frame * 0.5;
      ctx.fillStyle = `rgba(80, 70, 60, ${alpha * (1 - i / 25)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Gamble Sort — affiche le bet et la balance
  drawGambleOverlay(bet, balance, isWin) {
    const { ctx, width, height } = this;
    ctx.save();

    // Balance en haut a droite
    ctx.font = 'bold 42px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.roundRect(width - 320, 370, 300, 120, 10);
    ctx.fill();

    ctx.fillStyle = balance >= 0 ? '#00FF00' : '#FF4444';
    ctx.fillText(`$${balance >= 0 ? '+' : ''}${balance}`, width - 40, 380);

    if (bet !== undefined) {
      ctx.font = '32px "Courier New", monospace';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(`BET: $${bet}`, width - 40, 430);
    }

    // WIN/LOSE flash au centre
    if (isWin !== undefined) {
      ctx.font = 'bold 72px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      if (isWin) {
        ctx.fillStyle = '#00FF00';
        ctx.fillText('+$' + bet, width / 2, height * 0.5);
      } else {
        ctx.fillStyle = '#FF4444';
        ctx.fillText('-$' + bet, width / 2, height * 0.5);
      }
    }

    ctx.restore();
  }

  // ADHD Sort — texte de distraction
  drawDistraction() {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.font = 'bold 48px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 250, height * 0.45 - 35, 500, 80, 12);
    ctx.fill();

    const msgs = ['*scrolling TikTok*', '*checking Discord*', '*ooh a butterfly*', '*what was I doing?*', '*plays with pen*'];
    const msg = msgs[Math.floor(Date.now() / 500) % msgs.length];
    ctx.fillStyle = '#FFAA00';
    ctx.fillText(msg, width / 2, height * 0.45 + 10);
    ctx.restore();
  }

  // Autism Sort — HIGH IQ + calculating animation
  drawHighIQ(frame) {
    const { ctx, width, height } = this;
    ctx.save();

    // Fond sombre overlay
    ctx.fillStyle = 'rgba(0, 0, 20, 0.85)';
    ctx.fillRect(0, 0, width, height);

    // Texte HIGH IQ qui pulse
    const scale = 1 + Math.sin(frame * 0.3) * 0.1;
    ctx.font = `bold ${Math.round(80 * scale)}px "Segoe UI", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFD700';
    ctx.fillText('HIGH IQ', width / 2, height * 0.4);

    // IQ number qui monte
    const iq = 140 + frame * 3;
    ctx.font = 'bold 60px "Courier New", monospace';
    ctx.fillStyle = '#00CCFF';
    ctx.fillText(`IQ: ${iq}`, width / 2, height * 0.55);

    // Formules qui flottent
    ctx.font = '24px "Courier New", monospace';
    ctx.fillStyle = 'rgba(100, 200, 255, 0.4)';
    const formulas = ['E=mc²', '∑(n²)', '∫f(x)dx', 'O(1)', 'λx.x', '∇²φ=0', 'P=NP?', 'π·r²'];
    for (let i = 0; i < formulas.length; i++) {
      const x = (width * 0.15) + (i % 4) * (width * 0.22);
      const y = height * 0.65 + Math.floor(i / 4) * 50 + Math.sin(frame * 0.1 + i) * 15;
      ctx.fillText(formulas[i], x, y);
    }

    ctx.restore();
  }

  drawCalculating(frame) {
    const { ctx, width, height } = this;
    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 20, 0.7)';
    ctx.fillRect(0, 0, width, height);

    // Barre de loading
    const loadW = width * 0.6;
    const loadH = 20;
    const loadX = width * 0.2;
    const loadY = height * 0.5;
    const progress = frame / 40;

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.roundRect(loadX, loadY, loadW, loadH, 10);
    ctx.fill();
    ctx.fillStyle = '#00CCFF';
    ctx.beginPath();
    ctx.roundRect(loadX, loadY, loadW * progress, loadH, 10);
    ctx.fill();

    ctx.font = 'bold 36px "Courier New", monospace';
    ctx.fillStyle = '#AAAAFF';
    ctx.textAlign = 'center';
    const dots = '.'.repeat((frame % 4));
    ctx.fillText(`Calculating${dots}`, width / 2, loadY - 30);

    ctx.font = '24px "Courier New", monospace';
    ctx.fillStyle = 'rgba(150, 200, 255, 0.5)';
    ctx.fillText(`${Math.round(progress * 100)}% neural pathways activated`, width / 2, loadY + 50);

    ctx.restore();
  }

  // Magician Sort — rideau rouge
  drawCurtain(progress) {
    const { ctx, width, height } = this;
    ctx.save();
    const curtainWidth = width * progress;

    // Rideau rouge avec plis
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(0, 0, curtainWidth, height);

    // Plis du rideau
    for (let x = 0; x < curtainWidth; x += 40) {
      const shade = Math.sin(x * 0.08) * 30;
      ctx.fillStyle = `rgba(${139 + shade}, 0, 0, 0.3)`;
      ctx.fillRect(x, 0, 20, height);
    }

    // Bord dore du rideau
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(curtainWidth - 6, 0, 6, height);

    // Tringle doree en haut
    ctx.fillStyle = '#DAA520';
    ctx.fillRect(0, 0, Math.min(curtainWidth + 20, width), 15);

    ctx.restore();
  }

  // Magician Sort — confettis + TADAA
  drawConfetti(frame) {
    const { ctx, width, height } = this;
    ctx.save();

    // TADAA!
    if (frame < 40) {
      const scale = Math.min(1, frame / 10);
      ctx.font = `bold ${Math.round(90 * scale)}px "Segoe UI", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fillText('TADAA!', width / 2 + 3, height * 0.4 + 3);
      ctx.fillStyle = '#FFD700';
      ctx.fillText('TADAA!', width / 2, height * 0.4);
    }

    // Confettis dores qui tombent
    const colors = ['#FFD700', '#FF6600', '#FF00FF', '#00FF88', '#00CCFF', '#FF4444'];
    for (let i = 0; i < 30; i++) {
      const seed = i * 7 + 13;
      const x = (seed * 37 + frame * (2 + i % 3)) % width;
      const y = ((seed * 53 + frame * (3 + i % 4)) % (height + 200)) - 100;
      const size = 6 + (seed % 8);
      const rotation = (frame * 0.05 + seed) * (i % 2 === 0 ? 1 : -1);

      ctx.fillStyle = colors[i % colors.length];
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillRect(-size / 2, -size / 4, size, size / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    ctx.restore();
  }

  // Pong Sort — vrai terrain de pong plein ecran
  drawPongGame(ballX, ballY, padLY, padRY, scoreL, scoreR) {
    const { ctx, width, height } = this;
    ctx.save();

    // Fond noir
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Ligne centrale pointillee
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 15]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Paddles
    const padW = 20;
    const padH = height * 0.12;
    // Gauche
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(40, padLY * height - padH / 2, padW, padH);
    // Droite
    ctx.fillRect(width - 40 - padW, padRY * height - padH / 2, padW, padH);

    // Balle carree
    const ballSize = 20;
    ctx.fillRect(ballX * width - ballSize / 2, ballY * height - ballSize / 2, ballSize, ballSize);

    // Score
    ctx.font = 'bold 80px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText(String(scoreL || 0), width * 0.3, 120);
    ctx.fillText(String(scoreR || 0), width * 0.7, 120);

    ctx.restore();
  }

  drawPongGameOver(winner, scoreL, scoreR) {
    const { ctx, width, height } = this;
    ctx.save();

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Score final
    ctx.font = 'bold 100px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`${scoreL} - ${scoreR}`, width / 2, height * 0.4);

    // Gagnant
    ctx.font = 'bold 48px "Segoe UI", sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(winner === 'left' ? 'LEFT WINS!' : 'RIGHT WINS!', width / 2, height * 0.52);

    ctx.font = '32px "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Now sorting the 3 entities...', width / 2, height * 0.6);

    ctx.restore();
  }

  // Claude Sort — prompt/reponse
  drawClaudePrompt(prompt, frame) {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, width, height);

    // Prompt (user)
    ctx.fillStyle = 'rgba(210, 150, 100, 0.15)';
    ctx.beginPath();
    ctx.roundRect(40, height * 0.3, width - 80, 80, 12);
    ctx.fill();

    const chars = Math.min(prompt.length, Math.floor(frame / 15 * prompt.length));
    ctx.font = '28px "Courier New", monospace';
    ctx.fillStyle = '#DDBB88';
    ctx.textAlign = 'left';
    ctx.fillText('> ' + prompt.slice(0, chars), 60, height * 0.3 + 45);

    // Cursor clignotant
    if (frame % 10 < 5) {
      const tw = ctx.measureText('> ' + prompt.slice(0, chars)).width;
      ctx.fillRect(60 + tw + 2, height * 0.3 + 28, 12, 24);
    }

    ctx.restore();
  }

  drawClaudeResponse(response, frame) {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, width, height);

    // Reponse (Claude)
    ctx.fillStyle = 'rgba(200, 120, 60, 0.1)';
    ctx.beginPath();
    ctx.roundRect(40, height * 0.4, width - 80, 120, 12);
    ctx.fill();

    // Logo Claude
    ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.fillStyle = '#DD8844';
    ctx.textAlign = 'left';
    ctx.fillText('Claude:', 60, height * 0.4 + 30);

    const chars = Math.min(response.length, Math.floor(frame / 20 * response.length));
    ctx.font = '22px "Segoe UI", sans-serif';
    ctx.fillStyle = '#CCAA88';

    // Word wrap
    const words = response.slice(0, chars).split(' ');
    let line = '';
    let y = height * 0.4 + 60;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > width - 140) {
        ctx.fillText(line, 60, y);
        line = word;
        y += 28;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 60, y);

    ctx.restore();
  }

  drawClaudeNoTokens(frame) {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, width, height);

    // Token counter qui descend
    const tokens = Math.max(0, 100000 - frame * 3500);
    ctx.font = 'bold 36px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = tokens > 20000 ? '#888888' : tokens > 5000 ? '#FF8800' : '#FF0000';
    ctx.fillText(`Tokens: ${tokens.toLocaleString()}`, width / 2, height * 0.35);

    // Barre de tokens
    const barW = width * 0.6;
    const progress = tokens / 100000;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.roundRect(width * 0.2, height * 0.4, barW, 16, 8);
    ctx.fill();
    ctx.fillStyle = tokens > 20000 ? '#666666' : '#FF4444';
    ctx.beginPath();
    ctx.roundRect(width * 0.2, height * 0.4, barW * progress, 16, 8);
    ctx.fill();

    if (tokens === 0) {
      ctx.font = 'bold 48px "Segoe UI", sans-serif';
      ctx.fillStyle = '#FF4444';
      ctx.fillText('TOKEN LIMIT REACHED', width / 2, height * 0.55);
      ctx.font = '26px "Segoe UI", sans-serif';
      ctx.fillStyle = '#AA6644';
      ctx.fillText('Please try again in 5 years', width / 2, height * 0.62);
    }

    ctx.restore();
  }

  drawClaudeDone() {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 42px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#DD8844';
    ctx.fillText('Array is "sorted"', width / 2, height * 0.4);

    ctx.font = '28px "Segoe UI", sans-serif';
    ctx.fillStyle = '#886644';
    ctx.fillText('(it\'s not)', width / 2, height * 0.48);

    ctx.font = 'italic 22px "Segoe UI", sans-serif';
    ctx.fillStyle = '#554433';
    ctx.fillText('- Claude, 2026', width / 2, height * 0.56);

    ctx.restore();
  }

  // ChatGPT Sort — texte avec emojis
  drawChatGPT(lines, typingFrame) {
    const { ctx, width, height } = this;
    if (!lines) return;
    ctx.save();

    ctx.fillStyle = '#343541';
    ctx.fillRect(0, 0, width, height);

    // Header ChatGPT
    ctx.fillStyle = '#444654';
    ctx.fillRect(0, 0, width, 60);
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('ChatGPT', width / 2, 38);

    // Lignes de texte
    ctx.font = '22px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    const startY = 90;
    const lineH = 30;
    const maxLines = Math.floor((height - 100) / lineH);
    const visibleLines = lines.filter(l => l !== '').slice(-maxLines);

    for (let i = 0; i < visibleLines.length; i++) {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      const text = visibleLines[i];
      // Tronquer si trop long
      const maxW = width - 80;
      let display = text;
      while (ctx.measureText(display).width > maxW && display.length > 0) {
        display = display.slice(0, -1);
      }
      ctx.fillText(display, 40, startY + i * lineH);
    }

    ctx.restore();
  }

  // Drug Sort — effets psychedeliques
  drawTrip(data, frame, intensity) {
    const { ctx, width, height } = this;
    ctx.save();

    // Fond qui pulse en couleurs
    const hue = (frame * 3) % 360;
    ctx.fillStyle = `hsla(${hue}, 80%, 10%, 0.9)`;
    ctx.fillRect(0, 0, width, height);

    // Barres qui ondulent
    const n = data.length;
    if (n === 0) { ctx.restore(); return; }
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    for (let i = 0; i < n; i++) {
      const barH = (data[i] / maxVal) * (height * 0.65);
      const wave = Math.sin(frame * 0.05 + i * 0.3) * 30 * intensity;
      const xWave = Math.sin(frame * 0.03 + i * 0.5) * 15 * intensity;
      const x = i * barWidth + xWave;
      const y = height - barH - 30 + wave;

      const barHue = (i / n * 360 + frame * 5) % 360;
      ctx.fillStyle = `hsl(${barHue}, 90%, ${50 + Math.sin(frame * 0.1 + i) * 20}%)`;
      ctx.fillRect(x, y, barWidth - 1, barH);
    }

    // Spirales psychedeliques
    const spiralCount = Math.floor(intensity * 4);
    for (let s = 0; s < spiralCount; s++) {
      ctx.strokeStyle = `hsla(${(hue + s * 90) % 360}, 100%, 60%, ${0.3 * intensity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const cx = width * (0.2 + s * 0.2);
      const cy = height * 0.4;
      for (let a = 0; a < 20; a++) {
        const angle = a * 0.5 + frame * 0.05;
        const r = a * 8 + frame * 0.5;
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      }
      ctx.stroke();
    }

    // Texte flottant
    ctx.font = 'bold 36px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    const msgs = ['woooah', 'dude...', 'the colors', 'i can taste sounds', 'bro...', 'is this real?'];
    const msg = msgs[Math.floor(frame / 30) % msgs.length];
    const textY = height * 0.3 + Math.sin(frame * 0.08) * 40;
    const textHue = (frame * 7) % 360;
    ctx.fillStyle = `hsla(${textHue}, 100%, 70%, ${0.6 + Math.sin(frame * 0.1) * 0.3})`;
    ctx.fillText(msg, width / 2 + Math.sin(frame * 0.06) * 30, textY);

    this._drawWatermark();
    ctx.restore();
  }

  // Drug Sort — ecran qui tourne pendant le peak
  drawPeak(data, frame) {
    const { ctx, width, height } = this;
    ctx.save();

    const rotation = (frame / 60) * Math.PI * 0.5; // tourne de 0 a 90 degres
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation);
    ctx.translate(-width / 2, -height / 2);

    // Dessiner les barres avec des couleurs folles
    const hue = (frame * 8) % 360;
    ctx.fillStyle = `hsla(${hue}, 60%, 8%, 1)`;
    ctx.fillRect(0, 0, width, height);

    const n = data.length;
    if (n > 0) {
      const barWidth = width / n;
      const maxVal = Math.max(...data);
      for (let i = 0; i < n; i++) {
        const barH = (data[i] / maxVal) * (height * 0.65);
        const barHue = (i / n * 360 + frame * 10) % 360;
        ctx.fillStyle = `hsl(${barHue}, 100%, 55%)`;
        ctx.fillRect(i * barWidth, height - barH - 30, barWidth - 1, barH);
      }
    }

    ctx.restore();
  }

  // Drug Sort — ecran retourne (trie mais a l'envers)
  drawFlipped(data) {
    const { ctx, width, height } = this;
    ctx.save();

    // Retourner verticalement
    ctx.translate(0, height);
    ctx.scale(1, -1);

    const theme = this._getTheme();
    ctx.fillStyle = '#0a0010';
    ctx.fillRect(0, 0, width, height);

    const n = data.length;
    if (n > 0) {
      const barWidth = width / n;
      const maxVal = Math.max(...data);
      for (let i = 0; i < n; i++) {
        const barH = (data[i] / maxVal) * (height * 0.70);
        const ratio = data[i] / maxVal;
        const hue = ratio * 120 + 200; // bleu-violet
        ctx.fillStyle = `hsl(${hue}, 50%, 55%)`;
        ctx.fillRect(i * barWidth, height - barH - 30, barWidth - 1, barH);
      }
    }

    ctx.restore();

    // Texte "sorted... I think?"
    ctx.save();
    ctx.font = 'italic 36px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.textAlign = 'center';
    ctx.fillText('sorted... I think?', width / 2, height * 0.1);
    this._drawWatermark();
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
