const COLORS = {
  bg: '#EDE8DE',
  barDefault: '#FFFFFF',
  barLow: '#1B3A5C',
  barHigh: '#E8621F',
  compare: '#E8621F',
  swap: '#E8621F',
  swept: '#27AE60',
  sweptGlow: 'rgba(39, 174, 96, 0.4)',
  watermark: 'rgba(27, 58, 92, 0.5)',
  stripe: 'rgba(168, 200, 224, 0.15)',
  overlayText: '#2A2A2A',
  overlaySubtext: '#888888',
  overlayBg: 'rgba(0,0,0,0.5)',
  progressBg: 'rgba(0,0,0,0.2)',
  progressFill: '#E8621F',
};

// Layout zones for 1080x1920 (9:16 portrait)
// Safe zones: evite les overlays des plateformes (IG, YT, TikTok)
// Top ~240px: status bar + tabs plateforme
// Right ~150px: icones like/comment/share
// Bottom ~470px: username, caption, music, nav bar
const LAYOUT = {
  titleY: 275,
  subtitleY: 350,
  pillY: 405,
  barsTop: 465,
  barsBottom: 1170,
  barsMaxH: 705,
  barsLeftPad: 150,
  barsRightPad: 150,
  labelsY: 1185,
  codeTop: 1240,
  codeBottom: 1430,
  codePadX: 150,
};

// Themes visuels par algo absurde
const THEMES = {
  default: {
    bg: '#EDE8DE',
    stripe: 'rgba(168, 200, 224, 0.15)',
    barColor: (ratio) => COLORS.barDefault,
    compare: '#E8621F',
    swap: '#E8621F',
    metaColors: {},
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
      { text: 'It was the best sort ever', style: 'normal', color: '#FFD700' },
      { text: 'hm hmm', style: 'italic', color: '#FFFFFF' },
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
  hiroshima: {
    bg: '#0a0808',
    stripe: 'rgba(200, 100, 0, 0.04)',
    barColor: (ratio) => {
      const r = Math.round(100 + ratio * 155);
      const g = Math.round(60 + ratio * 100);
      const b = Math.round(30 + ratio * 40);
      return `rgb(${r},${g},${b})`;
    },
    compare: '#FFAA44',
    swap: '#FF6600',
    metaColors: {
      siren: '#FF0000',
      bomber: '#666666',
      nuke_falling: '#FFFF00',
      nuke_flash: '#FFFFFF',
      mushroom_cloud: '#FF4400',
      ashes: '#444444',
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
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);

    // Fond
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    // Rayures
    ctx.fillStyle = theme.stripe;
    for (let sy = 0; sy < height; sy += 8) {
      ctx.fillRect(0, sy, width, 1);
    }

    // Header (titre, sous-titre, badge complexite)
    if (stats) this._drawHeader(stats);

    // Barres
    for (let i = 0; i < n; i++) {
      const barHeight = (data[i] / maxVal) * LAYOUT.barsMaxH;
      const x = LAYOUT.barsLeftPad + i * barWidth;
      const y = LAYOUT.barsBottom - barHeight;
      const ratio = data[i] / maxVal;

      ctx.fillStyle = this._getBarColor(ratio, step, i);
      ctx.fillRect(x, y, barWidth - (n > 100 ? 1 : 2), barHeight);
    }

    // Labels de valeur sous les barres
    this._drawValueLabels(data, step, n, barWidth);

    // Bloc de code
    if (stats && stats.code) this._drawCodeBlock(stats.code);

    // Barre commentaire


    this._drawWatermark();
  }

  drawSweep(data, sweepIndex, stats = null) {
    const { ctx, width, height } = this;
    const theme = this._getTheme();
    const n = data.length;
    if (n === 0) return;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = theme.stripe;
    for (let sy = 0; sy < height; sy += 8) {
      ctx.fillRect(0, sy, width, 1);
    }

    if (stats) this._drawHeader(stats);

    for (let i = 0; i < n; i++) {
      const barHeight = (data[i] / maxVal) * LAYOUT.barsMaxH;
      const x = LAYOUT.barsLeftPad + i * barWidth;
      const y = LAYOUT.barsBottom - barHeight;

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

    this._drawValueLabels(data, null, n, barWidth);
    if (stats && stats.code) this._drawCodeBlock(stats.code);

    this._drawWatermark();
  }

  drawThresholdLine(threshold, data, label) {
    if (!data || data.length === 0) return;
    const { ctx, width } = this;
    const maxVal = Math.max(...data);
    const barH = (threshold / maxVal) * LAYOUT.barsMaxH;
    const y = LAYOUT.barsBottom - barH;

    ctx.save();
    ctx.setLineDash([12, 8]);
    ctx.strokeStyle = '#FF4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillStyle = '#FF4444';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(label, 16, y - 8);
    ctx.restore();
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
    ctx.font = `bold ${fontSize}px Inter, -apple-system, sans-serif`;
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
    ctx.font = `bold ${fontSize}px Inter, -apple-system, sans-serif`;
    const fullText = parts.map(p => p.text).join('  ');
    const totalW = ctx.measureText(fullText).width;
    let curX = centerX - totalW / 2;

    for (const part of parts) {
      const w = ctx.measureText(part.text).width;
      const px = curX + w / 2;

      ctx.fillStyle = part.color;

      if (part.style === 'italic') {
        ctx.font = `italic bold ${fontSize}px Inter, -apple-system, sans-serif`;
      } else {
        ctx.font = `bold ${fontSize}px Inter, -apple-system, sans-serif`;
      }

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
    const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
    const maxVal = Math.max(...data);
    const x = LAYOUT.barsLeftPad + index * barWidth + barWidth / 2;
    const barH = (data[index] / maxVal) * LAYOUT.barsMaxH;
    const y = LAYOUT.barsBottom - barH;

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
    ctx.font = 'bold 52px Inter, -apple-system, sans-serif';
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
    ctx.font = 'bold 80px Inter, -apple-system, sans-serif';
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
    const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
    const maxVal = Math.max(...data);

    ctx.save();
    for (const idx of markedIndices) {
      if (idx >= n) continue;
      const x = LAYOUT.barsLeftPad + idx * barWidth + barWidth / 2;
      const barH = (data[idx] / maxVal) * LAYOUT.barsMaxH;
      const y = LAYOUT.barsBottom - barH - 15;

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
    const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
    const x = LAYOUT.barsLeftPad + index * barWidth + barWidth / 2;
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
    const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
    const maxVal = Math.max(...data);
    const barH = (data[index] / maxVal) * LAYOUT.barsMaxH;
    const x = LAYOUT.barsLeftPad + index * barWidth + barWidth / 2;
    const targetY = LAYOUT.barsBottom - barH;
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
    const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
    const x = (index < n ? LAYOUT.barsLeftPad + index * barWidth + barWidth / 2 : width / 2);
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
      ctx.font = 'bold 72px Inter, -apple-system, sans-serif';
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
    ctx.font = 'bold 48px Inter, -apple-system, sans-serif';
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
    ctx.font = `bold ${Math.round(80 * scale)}px Inter, -apple-system, sans-serif`;
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
      ctx.font = `bold ${Math.round(90 * scale)}px Inter, -apple-system, sans-serif`;
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

  // Hiroshima Sort — champignon atomique
  drawMushroomCloud(frame) {
    const { ctx, width, height } = this;
    ctx.save();

    const t = frame / 60;

    // Ciel — gradient qui change du bleu sombre au rouge intense
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    const skyR = Math.round(20 + t * 200);
    const skyG = Math.round(15 + t * 40);
    grad.addColorStop(0, `rgb(${skyR}, ${skyG}, ${Math.round(30 - t * 20)})`);
    grad.addColorStop(0.6, `rgb(${Math.round(skyR * 0.4)}, ${Math.round(skyG * 0.3)}, 5)`);
    grad.addColorStop(1, `rgb(10, 5, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Point d'impact — lueur au sol
    const glowR = 200 + t * 300;
    const groundGlow = ctx.createRadialGradient(width / 2, height * 0.85, 0, width / 2, height * 0.85, glowR);
    groundGlow.addColorStop(0, `rgba(255, 200, 50, ${0.6 - t * 0.4})`);
    groundGlow.addColorStop(0.5, `rgba(255, 100, 0, ${0.3 - t * 0.2})`);
    groundGlow.addColorStop(1, 'rgba(200, 50, 0, 0)');
    ctx.fillStyle = groundGlow;
    ctx.fillRect(0, height * 0.5, width, height * 0.5);

    // Tige du champignon — s'eleve progressivement
    const stemTopY = height * 0.85 - height * 0.55 * Math.min(t * 1.5, 1);
    const stemBottomY = height * 0.85;
    const stemW = 60 + t * 30;

    // Tige avec gradient interne (chaud au centre)
    const stemGrad = ctx.createLinearGradient(width / 2 - stemW, 0, width / 2 + stemW, 0);
    stemGrad.addColorStop(0, `rgba(120, 50, 10, ${0.7 - t * 0.2})`);
    stemGrad.addColorStop(0.3, `rgba(200, 100, 20, ${0.8 - t * 0.2})`);
    stemGrad.addColorStop(0.5, `rgba(255, 180, 50, ${0.9 - t * 0.3})`);
    stemGrad.addColorStop(0.7, `rgba(200, 100, 20, ${0.8 - t * 0.2})`);
    stemGrad.addColorStop(1, `rgba(120, 50, 10, ${0.7 - t * 0.2})`);
    ctx.fillStyle = stemGrad;
    ctx.fillRect(width / 2 - stemW / 2, stemTopY, stemW, stemBottomY - stemTopY);

    // Tete du champignon — boule de feu avec couches
    const headY = stemTopY;
    const headR = (60 + t * 180) * Math.min(t * 2, 1);

    // Couche externe — fumee sombre
    const smokeGrad = ctx.createRadialGradient(width / 2, headY, headR * 0.3, width / 2, headY, headR * 1.3);
    smokeGrad.addColorStop(0, 'rgba(255, 160, 30, 0)');
    smokeGrad.addColorStop(0.7, `rgba(80, 40, 10, ${0.4 * Math.min(t * 2, 1)})`);
    smokeGrad.addColorStop(1, `rgba(40, 20, 5, ${0.3 * Math.min(t * 2, 1)})`);
    ctx.fillStyle = smokeGrad;
    ctx.beginPath();
    ctx.arc(width / 2, headY, headR * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Couche interne — boule de feu
    for (let layer = 4; layer >= 0; layer--) {
      const r = headR * (1 - layer * 0.18);
      const intensity = 1 - layer * 0.15;
      const fireGrad = ctx.createRadialGradient(width / 2, headY, 0, width / 2, headY, r);
      fireGrad.addColorStop(0, `rgba(255, ${Math.round(255 * intensity)}, ${Math.round(100 * intensity)}, ${0.8 * intensity})`);
      fireGrad.addColorStop(0.6, `rgba(255, ${Math.round(120 * intensity)}, 0, ${0.6 * intensity})`);
      fireGrad.addColorStop(1, `rgba(${Math.round(200 * intensity)}, ${Math.round(40 * intensity)}, 0, 0)`);
      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(width / 2 + Math.sin(frame * 0.3 + layer) * 5, headY + Math.cos(frame * 0.2 + layer) * 3, Math.max(0, r), 0, Math.PI * 2);
      ctx.fill();
    }

    // Ondes de choc concentriques
    for (let w = 0; w < 3; w++) {
      const waveR = t * width * (0.5 + w * 0.2) - w * 50;
      if (waveR > 0) {
        ctx.strokeStyle = `rgba(255, 220, 150, ${Math.max(0, 0.4 - t * 0.3 - w * 0.1)})`;
        ctx.lineWidth = 4 - w;
        ctx.beginPath();
        ctx.arc(width / 2, height * 0.85, waveR, Math.PI, 0);
        ctx.stroke();
      }
    }

    // Particules de debris
    for (let i = 0; i < 15; i++) {
      const seed = i * 13 + 7;
      const angle = (seed * 0.5 + frame * 0.02);
      const dist = t * 200 + seed * 3;
      const px = width / 2 + Math.cos(angle) * dist;
      const py = height * 0.85 - Math.sin(angle) * dist * 0.5 - seed * t * 2;
      const size = 3 + (seed % 5);
      const alpha = Math.max(0, 0.6 - t * 0.5);
      ctx.fillStyle = `rgba(255, ${100 + seed % 100}, 0, ${alpha})`;
      ctx.fillRect(px, py, size, size);
    }

    ctx.restore();
  }

  drawNukeFlash(frame) {
    const { ctx, width, height } = this;
    const alpha = frame < 5 ? frame / 5 : 1 - (frame - 5) / 15;
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
    ctx.fillRect(0, 0, width, height);
  }

  drawAshes(frame) {
    const { ctx, width, height } = this;
    ctx.save();

    // Fond gris sombre
    ctx.fillStyle = '#1a1510';
    ctx.fillRect(0, 0, width, height);

    // Cendres qui tombent
    ctx.fillStyle = 'rgba(150, 140, 130, 0.4)';
    for (let i = 0; i < 40; i++) {
      const seed = i * 17 + 7;
      const x = (seed * 41 + frame * (1 + i % 3)) % width;
      const y = (frame * (2 + i % 2) + seed * 23) % height;
      const size = 2 + (seed % 4);
      ctx.fillRect(x, y, size, size);
    }

    this._drawWatermark();
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

  // Pong Sort — animation de transformation entites -> barres
  drawPongTransform(positions) {
    const { ctx, width, height } = this;
    ctx.save();

    // Fond qui transition du noir au theme
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    if (!positions) { ctx.restore(); return; }

    const maxSize = Math.max(...positions.map(p => p.size));

    for (const pos of positions) {
      const x = pos.x * width;
      const y = pos.y * height;
      const morph = pos.morphProgress;

      // Interpoler entre la forme pong (rectangle fin/carre) et une barre
      const barHeight = (pos.size / maxSize) * (height * 0.6);

      // Forme pong : paddle = rectangle vertical fin, balle = carre
      const isBall = pos.label === 'Ball';
      const pongW = isBall ? 20 : 20;
      const pongH = isBall ? 20 : height * 0.12;

      // Forme finale : barre large en bas
      const barW = width * 0.2;
      const barFinalY = LAYOUT.barsBottom - barHeight;
      const barFinalX = x - barW / 2;

      // Interpolation
      const currentW = pongW + (barW - pongW) * morph;
      const currentH = pongH + (barHeight - pongH) * morph;
      const currentX = x - currentW / 2;
      const currentY = y - pongH / 2 + (barFinalY - (y - pongH / 2)) * morph;

      // Couleur : blanc pong -> couleur selon taille
      const ratio = pos.size / maxSize;
      const r = Math.round(255 - morph * (255 - 27));
      const g = Math.round(255 - morph * (255 - 58));
      const b = Math.round(255 - morph * (255 - 92));
      ctx.fillStyle = morph < 0.5
        ? `rgb(255,255,255)`
        : this._lerpColor('#1B3A5C', '#E8621F', ratio);

      // Ombre
      ctx.shadowColor = 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = 10 * (1 - morph);

      ctx.fillRect(currentX, currentY, currentW, currentH);
      ctx.shadowBlur = 0;

      // Label
      ctx.font = 'bold 24px Inter, -apple-system, sans-serif';
      ctx.fillStyle = `rgba(255,255,255,${0.8 - morph * 0.3})`;
      ctx.textAlign = 'center';
      ctx.fillText(`${pos.label} (${pos.size})`, x, currentY - 15);
    }

    // Texte "Sorting..."
    ctx.font = 'italic 32px Inter, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.textAlign = 'center';
    ctx.fillText('Sorting entities by size...', width / 2, height * 0.15);

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
    ctx.font = 'bold 48px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(winner === 'left' ? 'LEFT WINS!' : 'RIGHT WINS!', width / 2, height * 0.52);

    ctx.font = '32px Inter, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Now sorting the 3 entities...', width / 2, height * 0.6);

    ctx.restore();
  }

  // Claude Sort — prompt/reponse
  drawClaudePrompt(prompt, frame, totalChars) {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = '#2A1A0A';
    ctx.fillRect(0, 0, width, height);

    // Header Claude
    ctx.fillStyle = '#3A2515';
    ctx.fillRect(0, 0, width, 55);
    ctx.font = 'bold 26px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#DD8844';
    ctx.textAlign = 'center';
    ctx.fillText('Claude', width / 2, 36);

    // Prompt (user) — lettre par lettre
    ctx.fillStyle = 'rgba(210, 150, 100, 0.1)';
    ctx.beginPath();
    ctx.roundRect(30, height * 0.35, width - 60, 80, 12);
    ctx.fill();

    ctx.font = 'bold 18px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#AA8866';
    ctx.textAlign = 'left';
    ctx.fillText('You', 50, height * 0.35 + 25);

    const chars = Math.min(totalChars || prompt.length, frame * 2);
    ctx.font = '26px "Courier New", monospace';
    ctx.fillStyle = '#DDBB88';
    ctx.fillText(prompt.slice(0, chars), 50, height * 0.35 + 58);

    // Cursor
    if (chars < (totalChars || prompt.length) && frame % 8 < 4) {
      const tw = ctx.measureText(prompt.slice(0, chars)).width;
      ctx.fillRect(50 + tw + 2, height * 0.35 + 40, 14, 22);
    }

    ctx.restore();
  }

  drawClaudeResponse(prompt, response, frame, totalChars) {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = '#2A1A0A';
    ctx.fillRect(0, 0, width, height);

    // Header
    ctx.fillStyle = '#3A2515';
    ctx.fillRect(0, 0, width, 55);
    ctx.font = 'bold 26px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#DD8844';
    ctx.textAlign = 'center';
    ctx.fillText('Claude', width / 2, 36);

    // Prompt complet (en haut)
    ctx.fillStyle = 'rgba(210, 150, 100, 0.08)';
    ctx.beginPath();
    ctx.roundRect(30, 75, width - 60, 65, 10);
    ctx.fill();
    ctx.font = 'bold 16px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#887766';
    ctx.textAlign = 'left';
    ctx.fillText('You', 50, 95);
    ctx.font = '20px "Courier New", monospace';
    ctx.fillStyle = '#AA9977';
    ctx.fillText(prompt, 50, 120);

    // Reponse Claude — lettre par lettre
    ctx.fillStyle = 'rgba(200, 120, 60, 0.08)';
    ctx.beginPath();
    ctx.roundRect(30, 160, width - 60, 180, 12);
    ctx.fill();

    ctx.font = 'bold 18px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#DD8844';
    ctx.textAlign = 'left';
    ctx.fillText('Claude', 50, 185);

    const chars = Math.min(totalChars || response.length, frame * 2);
    ctx.font = '24px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#CCAA88';

    // Word wrap
    const maxW = width - 100;
    const text = response.slice(0, chars);
    const words = text.split(' ');
    let line = '';
    let y = 215;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxW) {
        ctx.fillText(line, 50, y);
        line = word;
        y += 30;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 50, y);

    // Cursor
    if (chars < (totalChars || response.length) && frame % 6 < 3) {
      ctx.fillStyle = '#DD8844';
      ctx.fillRect(50, y + 8, 12, 20);
    }

    ctx.restore();
  }

  drawClaudeNoTokens(frame) {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = '#2A1A0A';
    ctx.fillRect(0, 0, width, height);

    // Token counter qui descend lentement
    const tokens = Math.max(0, 100000 - frame * 1300);
    ctx.font = 'bold 36px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = tokens > 30000 ? '#888877' : tokens > 10000 ? '#FF8800' : '#FF4444';
    ctx.fillText(`Tokens: ${tokens.toLocaleString()}`, width / 2, height * 0.32);

    // Barre de tokens
    const barW = width * 0.65;
    const progress = tokens / 100000;
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.roundRect(width * 0.175, height * 0.37, barW, 20, 10);
    ctx.fill();
    ctx.fillStyle = tokens > 30000 ? '#665544' : tokens > 10000 ? '#CC6600' : '#CC3333';
    ctx.beginPath();
    ctx.roundRect(width * 0.175, height * 0.37, barW * progress, 20, 10);
    ctx.fill();

    if (tokens === 0) {
      ctx.font = 'bold 44px Inter, -apple-system, sans-serif';
      ctx.fillStyle = '#FF4444';
      ctx.fillText('TOKEN LIMIT', width / 2, height * 0.50);
      ctx.fillText('REACHED', width / 2, height * 0.56);
      ctx.font = '28px Inter, -apple-system, sans-serif';
      ctx.fillStyle = '#AA6644';
      ctx.fillText('Please try again in 5 years', width / 2, height * 0.65);
    }

    ctx.restore();
  }

  drawClaudeDone() {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = '#2A1A0A';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 44px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#DD8844';
    ctx.fillText('Array is "sorted"', width / 2, height * 0.40);

    ctx.font = '30px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#886644';
    ctx.fillText('(it\'s not)', width / 2, height * 0.48);

    ctx.font = 'italic 24px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#554433';
    ctx.fillText('— Claude, 2026', width / 2, height * 0.56);

    ctx.restore();
  }

  // ChatGPT Sort — conversation complete avec bulles
  drawChatGPT(history, typingRole, typingDots) {
    const { ctx, width, height } = this;
    if (!history) return;
    ctx.save();

    // Fond ChatGPT
    ctx.fillStyle = '#343541';
    ctx.fillRect(0, 0, width, height);

    // Header
    ctx.fillStyle = '#444654';
    ctx.fillRect(0, 0, width, 60);
    ctx.font = 'bold 26px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('ChatGPT 4o', width / 2, 38);

    // Messages — afficher les derniers qui tiennent a l'ecran
    ctx.textAlign = 'left';
    const msgFont = '22px Inter, -apple-system, sans-serif';
    ctx.font = msgFont;
    const maxW = width - 100;
    const lineH = 28;
    const msgGap = 16;

    // Calculer la hauteur de chaque message pour scroller
    const rendered = [];
    for (const msg of history) {
      const lines = this._wrapText(ctx, msg.text, maxW);
      rendered.push({ role: msg.role, lines });
    }

    // Calculer la hauteur totale et scroller vers le bas
    let totalH = 0;
    for (const r of rendered) totalH += r.lines.length * lineH + msgGap + 10;

    const viewH = height - 80;
    const scrollOffset = Math.max(0, totalH - viewH);

    let y = 75 - scrollOffset;
    for (const msg of rendered) {
      if (y > height) break;

      const isUser = msg.role === 'user';
      const bgColor = isUser ? '#2b2c37' : '#444654';
      const blockH = msg.lines.length * lineH + 16;

      if (y + blockH > 60) {
        // Fond du message
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, y, width, blockH);

        // Icone
        ctx.font = 'bold 18px Inter, -apple-system, sans-serif';
        ctx.fillStyle = isUser ? '#8E8EA0' : '#19C37D';
        ctx.fillText(isUser ? 'You' : 'GPT', 25, y + 22);

        // Texte
        ctx.font = msgFont;
        ctx.fillStyle = '#D1D5DB';
        for (let l = 0; l < msg.lines.length; l++) {
          ctx.fillText(msg.lines[l], 70, y + 22 + l * lineH);
        }
      }
      y += blockH + msgGap;
    }

    // Typing indicator
    if (typingRole) {
      ctx.fillStyle = typingRole === 'user' ? '#2b2c37' : '#444654';
      ctx.fillRect(0, Math.max(y, height - 50), width, 50);
      ctx.font = '22px Inter, -apple-system, sans-serif';
      ctx.fillStyle = '#8E8EA0';
      ctx.fillText(
        typingRole === 'user' ? `You typing${typingDots || ''}` : `ChatGPT typing${typingDots || ''}`,
        70, Math.max(y + 28, height - 25)
      );
    }

    ctx.restore();
  }

  _wrapText(ctx, text, maxW) {
    const lines = [];
    for (const paragraph of text.split('\n')) {
      if (paragraph === '') { lines.push(''); continue; }
      const words = paragraph.split(' ');
      let line = '';
      for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width > maxW) {
          if (line) lines.push(line);
          line = word;
        } else {
          line = test;
        }
      }
      if (line) lines.push(line);
    }
    return lines;
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
    const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
    const maxVal = Math.max(...data);

    for (let i = 0; i < n; i++) {
      const barH = (data[i] / maxVal) * (LAYOUT.barsMaxH * 0.85);
      const wave = Math.sin(frame * 0.05 + i * 0.3) * 30 * intensity;
      const xWave = Math.sin(frame * 0.03 + i * 0.5) * 15 * intensity;
      const x = LAYOUT.barsLeftPad + i * barWidth + xWave;
      const y = LAYOUT.barsBottom - barH + wave;

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
    ctx.font = 'bold 36px Inter, -apple-system, sans-serif';
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
      const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
      const maxVal = Math.max(...data);
      for (let i = 0; i < n; i++) {
        const barH = (data[i] / maxVal) * (LAYOUT.barsMaxH * 0.85);
        const barHue = (i / n * 360 + frame * 10) % 360;
        ctx.fillStyle = `hsl(${barHue}, 100%, 55%)`;
        ctx.fillRect(LAYOUT.barsLeftPad + i * barWidth, LAYOUT.barsBottom - barH, barWidth - 1, barH);
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
      const barWidth = (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / n;
      const maxVal = Math.max(...data);
      for (let i = 0; i < n; i++) {
        const barH = (data[i] / maxVal) * (LAYOUT.barsMaxH * 0.9);
        const ratio = data[i] / maxVal;
        const hue = ratio * 120 + 200; // bleu-violet
        ctx.fillStyle = `hsl(${hue}, 50%, 55%)`;
        ctx.fillRect(LAYOUT.barsLeftPad + i * barWidth, LAYOUT.barsBottom - barH, barWidth - 1, barH);
      }
    }

    ctx.restore();

    // Texte "sorted... I think?"
    ctx.save();
    ctx.font = 'italic 36px Inter, -apple-system, sans-serif';
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

  _drawHeader(stats) {
    const { ctx, width } = this;
    const centerX = LAYOUT.barsLeftPad + (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / 2;
    ctx.save();

    // Titre — bold serif, encre sombre
    if (stats.algoName) {
      ctx.font = 'bold 58px Inter, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = COLORS.overlayText;
      ctx.fillText(stats.algoName, centerX, LAYOUT.titleY);
    }

    // Sous-titre / description
    if (stats.desc) {
      ctx.font = '24px Inter, -apple-system, sans-serif';
      ctx.fillStyle = COLORS.overlaySubtext;
      ctx.textAlign = 'center';
      const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
      const words = stats.desc.split(' ');
      let line = '';
      let lineY = LAYOUT.subtitleY;
      for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width > usableW - 80) {
          ctx.fillText(line, centerX, lineY);
          line = word;
          lineY += 30;
          if (lineY > LAYOUT.subtitleY + 35) break;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, centerX, lineY);
    }

    // Badge complexite — pill avec bordure
    if (stats.complexity) {
      ctx.font = '22px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const pillText = stats.complexity;
      const pillW = ctx.measureText(pillText).width + 32;
      const pillH = 34;
      const pillX = centerX - pillW / 2;
      const pillY = LAYOUT.pillY;

      ctx.strokeStyle = '#2A2A2A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
      ctx.stroke();

      ctx.fillStyle = '#2A2A2A';
      ctx.fillText(pillText, centerX, pillY + pillH / 2);
    }

    ctx.restore();
  }

  _drawValueLabels(data, step, n, barWidth) {
    if (n > 30) return; // trop de barres = illisible
    const { ctx, width } = this;
    ctx.save();
    ctx.font = '22px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let i = 0; i < n; i++) {
      const x = LAYOUT.barsLeftPad + i * barWidth + barWidth / 2;
      const isActive = step && step.indices && step.indices.includes(i);
      ctx.fillStyle = isActive ? '#E8621F' : '#888888';
      ctx.font = isActive ? 'bold 22px Inter, -apple-system, sans-serif' : '22px Inter, -apple-system, sans-serif';
      ctx.fillText(data[i], x, LAYOUT.labelsY);
    }

    ctx.restore();
  }

  _drawCodeBlock(code) {
    if (!code || code.length === 0) return;
    const { ctx, width } = this;
    ctx.save();

    const padX = LAYOUT.codePadX;
    const padY = 20;
    const blockW = width - padX * 2;
    const blockH = LAYOUT.codeBottom - LAYOUT.codeTop;

    // Fond du bloc de code — carte creme claire
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(padX, LAYOUT.codeTop, blockW, blockH, 16);
    ctx.fill();

    // Lignes de code (compact pour safe zone)
    const fontSize = 21;
    const lineH = 28;
    ctx.textBaseline = 'top';
    const codeX = padX + 48;
    let codeY = LAYOUT.codeTop + padY;

    for (let i = 0; i < code.length && codeY + lineH < LAYOUT.codeBottom; i++) {
      // Numero de ligne
      ctx.font = `${fontSize}px "Courier New", monospace`;
      ctx.fillStyle = '#9CA3AF';
      ctx.textAlign = 'right';
      ctx.fillText(`${i + 1}`, padX + 34, codeY);

      // Code avec coloration syntaxique
      ctx.textAlign = 'left';
      this._renderCodeLine(ctx, code[i], codeX, codeY, fontSize);
      codeY += lineH;
    }

    ctx.restore();
  }

  _renderCodeLine(ctx, line, x, y, fontSize) {
    let curX = x;
    // Separer commentaire
    const commentIdx = line.indexOf('//');
    const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : '';

    const tokens = this._tokenize(codePart);
    for (const t of tokens) {
      ctx.font = t.bold ? `bold ${fontSize}px "Courier New", monospace` : `${fontSize}px "Courier New", monospace`;
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, curX, y);
      curX += ctx.measureText(t.text).width;
    }

    if (commentPart) {
      ctx.font = `italic ${fontSize}px "Courier New", monospace`;
      ctx.fillStyle = '#9CA3AF';
      ctx.fillText(commentPart, curX, y);
    }
  }

  _tokenize(code) {
    const tokens = [];
    const kwRe = /^(function|let|const|var|for|while|if|else|return|throw|new|of|in|break|continue)\b/;
    const strRe = /^("[^"]*"|'[^']*')/;
    const numRe = /^\d+(\.\d+)?/;
    const methodRe = /^\.([a-zA-Z_]\w*)/;
    const funcCallRe = /^([a-zA-Z_]\w*)\s*\(/;
    const wordRe = /^[a-zA-Z_]\w*/;
    const opRe = /^(=>|[+\-*/<>=!&|^~%?:;,{}()\[\]])/;
    const spRe = /^\s+/;

    let r = code;
    while (r.length > 0) {
      let m;
      if ((m = r.match(strRe))) {
        tokens.push({ text: m[0], color: '#16A34A' });
      } else if ((m = r.match(kwRe))) {
        tokens.push({ text: m[0], color: '#8B5CF6', bold: true });
      } else if ((m = r.match(methodRe))) {
        tokens.push({ text: '.', color: '#374151' });
        tokens.push({ text: m[1], color: '#0891B2', bold: true });
      } else if ((m = r.match(funcCallRe))) {
        tokens.push({ text: m[1], color: '#0891B2', bold: true });
        r = r.slice(m[1].length);
        continue;
      } else if ((m = r.match(numRe))) {
        tokens.push({ text: m[0], color: '#D97706' });
      } else if ((m = r.match(wordRe))) {
        tokens.push({ text: m[0], color: '#374151' });
      } else if ((m = r.match(opRe))) {
        tokens.push({ text: m[0], color: '#6B7280' });
      } else if ((m = r.match(spRe))) {
        tokens.push({ text: m[0], color: '#374151' });
      } else {
        tokens.push({ text: r[0], color: '#374151' });
        r = r.slice(1);
        continue;
      }
      r = r.slice(m[0].length);
    }
    return tokens;
  }

  _drawCommentBar() {
    // supprime — plus de barre commentaire
  }

  // Manual Sort — main/curseur qui attrape les barres
  drawHand(handIdx, data, phase, frame) {
    if (handIdx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = handIdx < n ? (data[handIdx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + handIdx * barWidth + barWidth / 2;
    const barTop = LAYOUT.barsBottom - barH;

    ctx.save();

    // Barre surlignee (glow)
    if (phase === 'grabbing' || phase === 'sliding' || phase === 'comparing') {
      ctx.shadowColor = 'rgba(232, 98, 31, 0.6)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#E8621F';
      ctx.fillRect(LAYOUT.barsLeftPad + handIdx * barWidth, barTop, barWidth - 2, barH);
      ctx.shadowBlur = 0;
    }

    // La main (curseur pointeur stylise)
    const handY = phase === 'dropping'
      ? barTop - 20 - (frame || 0) * 8
      : phase === 'grabbing'
        ? barTop - 20 + Math.max(0, (3 - (frame || 0))) * 6
        : barTop - 20;

    // Bras/tige
    ctx.strokeStyle = '#2A2A2A';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, handY - 40);
    ctx.lineTo(x, handY);
    ctx.stroke();

    // Main (poing/pince)
    const handSize = phase === 'grabbing' || phase === 'sliding' ? 18 : 14;
    ctx.fillStyle = '#F5C6A0';
    ctx.strokeStyle = '#C49070';
    ctx.lineWidth = 2;

    // Paume
    ctx.beginPath();
    ctx.ellipse(x, handY, handSize, handSize * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Doigts (pince fermee si grab/slide, ouverte sinon)
    if (phase === 'grabbing' || phase === 'sliding') {
      // Pince fermee
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#C49070';
      // Doigt gauche
      ctx.beginPath();
      ctx.moveTo(x - 8, handY + 6);
      ctx.lineTo(x - 5, handY + 16);
      ctx.stroke();
      // Doigt droit
      ctx.beginPath();
      ctx.moveTo(x + 8, handY + 6);
      ctx.lineTo(x + 5, handY + 16);
      ctx.stroke();
      // Pouce
      ctx.beginPath();
      ctx.moveTo(x - 14, handY);
      ctx.lineTo(x - 10, handY + 10);
      ctx.stroke();
    } else {
      // Doigts ouverts
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#C49070';
      for (let d = -2; d <= 2; d++) {
        ctx.beginPath();
        ctx.moveTo(x + d * 6, handY + 8);
        ctx.lineTo(x + d * 8, handY + 22);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Chess Sort — rendu echiquier avec pieces
  drawChess(data, step, stats) {
    const { ctx, width, height } = this;
    const n = data.length;
    if (n === 0) return;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);

    // Fond bois
    const woodGrad = ctx.createLinearGradient(0, 0, 0, height);
    woodGrad.addColorStop(0, '#3e2723');
    woodGrad.addColorStop(0.5, '#4e342e');
    woodGrad.addColorStop(1, '#3e2723');
    ctx.fillStyle = woodGrad;
    ctx.fillRect(0, 0, width, height);

    // Header
    if (stats) this._drawHeader(stats);

    // Echiquier sous les barres
    const gridH = LAYOUT.barsMaxH;
    const gridY = LAYOUT.barsBottom - gridH;
    const cellW = barWidth;
    const cellH = gridH / 8;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < n; col++) {
        const isLight = (row + col) % 2 === 0;
        ctx.fillStyle = isLight ? '#f0d9b5' : '#b58863';
        ctx.fillRect(LAYOUT.barsLeftPad + col * cellW, gridY + row * cellH, cellW, cellH);
      }
    }

    // Bordure echiquier
    ctx.strokeStyle = '#2a1a0a';
    ctx.lineWidth = 4;
    ctx.strokeRect(LAYOUT.barsLeftPad, gridY, usableW, gridH);

    // Pieces d'echecs — assigner selon la valeur relative
    const sortedVals = [...new Set(data)].filter(v => v > 0).sort((a, b) => a - b);
    const pieceMap = this._getPieceForValue(sortedVals, maxVal);

    // Dessiner les barres comme des pieces d'echecs
    for (let i = 0; i < n; i++) {
      if (data[i] === 0) continue;
      const barH = (data[i] / maxVal) * LAYOUT.barsMaxH;
      const bx = LAYOUT.barsLeftPad + i * barWidth;
      const by = LAYOUT.barsBottom - barH;
      const bw = barWidth - 3;
      const isWhite = i % 2 === 0;
      const isActive = step && step.indices && step.indices.includes(i);

      // Couleur de la piece
      let pieceColor, pieceShadow, pieceHighlight;
      if (isWhite) {
        pieceColor = '#f5f5f0';
        pieceShadow = '#c0b8a8';
        pieceHighlight = '#ffffff';
      } else {
        pieceColor = '#2a2a2a';
        pieceShadow = '#111111';
        pieceHighlight = '#4a4a4a';
      }

      // Glow si actif
      if (isActive) {
        ctx.save();
        ctx.shadowColor = step.quality === 'brilliant' ? '#00e676' :
                          step.quality === 'blunder' ? '#ff1744' :
                          step.quality === 'risky' ? '#ff9100' : '#ffd740';
        ctx.shadowBlur = 25;
        ctx.fillStyle = ctx.shadowColor;
        ctx.fillRect(bx + 2, by + 2, bw - 4, barH - 4);
        ctx.restore();
      }

      // Corps de la piece (barre avec socle)
      // Socle
      ctx.fillStyle = pieceShadow;
      ctx.beginPath();
      ctx.ellipse(bx + bw / 2, LAYOUT.barsBottom - 4, bw / 2, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Colonne principale
      const colW = bw * 0.55;
      const colX = bx + (bw - colW) / 2;
      ctx.fillStyle = pieceColor;
      ctx.fillRect(colX, by + 20, colW, barH - 24);

      // Highlight cote gauche
      ctx.fillStyle = pieceHighlight;
      ctx.fillRect(colX, by + 20, 3, barH - 24);

      // Shadow cote droit
      ctx.fillStyle = pieceShadow;
      ctx.fillRect(colX + colW - 3, by + 20, 3, barH - 24);

      // Tete de la piece (forme selon le type)
      const headY = by;
      const headSize = Math.min(bw * 0.8, 42);
      const piece = pieceMap[data[i]] || '♟';
      ctx.font = `${headSize}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = isWhite ? '#f5f5f0' : '#2a2a2a';
      ctx.strokeStyle = isWhite ? '#888' : '#555';
      ctx.lineWidth = 1;
      ctx.fillText(piece, bx + bw / 2, headY - 5);
      ctx.strokeText(piece, bx + bw / 2, headY - 5);
    }

    // Annotation du move
    if (step && step.quality && step.indices && step.indices.length > 0) {
      const qi = step.indices[0];
      const qx = LAYOUT.barsLeftPad + qi * barWidth + barWidth / 2;
      const barH = data[qi] ? (data[qi] / maxVal) * LAYOUT.barsMaxH : 200;
      const qy = LAYOUT.barsBottom - barH - 55;

      let icon, color;
      if (step.quality === 'brilliant') { icon = '!!'; color = '#00e676'; }
      else if (step.quality === 'good' || step.quality === 'already') { icon = '✓'; color = '#a5d6a7'; }
      else if (step.quality === 'risky') { icon = '?!'; color = '#ff9100'; }
      else if (step.quality === 'blunder') { icon = '??'; color = '#ff1744'; }
      else { icon = ''; color = '#888'; }

      if (icon) {
        ctx.font = 'bold 32px Inter, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Cercle de fond
        const tw = ctx.measureText(icon).width + 16;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.beginPath();
        ctx.arc(qx, qy, Math.max(tw / 2, 22), 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.fillText(icon, qx, qy);
      }
    }

    // Checkmate text
    if (step && step.meta === 'chess_checkmate') {
      const centerX = LAYOUT.barsLeftPad + usableW / 2;
      const frame = step.frame || 0;
      ctx.save();
      ctx.font = `bold ${48 + frame}px Inter, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(255,215,0,${Math.min(1, frame / 5)})`;
      ctx.fillText('CHECKMATE', centerX, 800);
      // Couronne
      ctx.font = `${60 + frame * 2}px serif`;
      ctx.fillText('♚', centerX, 730);
      ctx.restore();
    }

    // Value labels & code
    this._drawValueLabels(data, step, n, barWidth);
    if (stats && stats.code) this._drawCodeBlock(stats.code);
    this._drawWatermark();
  }

  // Assigner une piece d'echecs selon la valeur relative
  _getPieceForValue(sortedVals, maxVal) {
    const map = {};
    const n = sortedVals.length;
    const whitePieces = ['♙', '♙', '♘', '♗', '♖', '♕', '♔'];
    const blackPieces = ['♟', '♟', '♞', '♝', '♜', '♛', '♚'];

    for (let i = 0; i < n; i++) {
      const rank = Math.floor((i / n) * 6); // 0-6
      const val = sortedVals[i];
      // Alterner blanc/noir par position dans le sorted (pas par index)
      const pieces = i % 2 === 0 ? whitePieces : blackPieces;
      map[val] = pieces[Math.min(rank, pieces.length - 1)];
    }
    return map;
  }

  // Minecraft Sort — rendu complet style pixel art
  drawMinecraft(data, step, stats) {
    const { ctx, width, height } = this;
    const n = data.length;
    if (n === 0) return;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const creeperVal = step && step.creeperVal;
    const mineIdx = step && step.meta === 'mc_mining' ? step.mineIdx : -1;
    const crackStage = step ? (step.crackStage || 0) : 0;
    const isExplosion = step && step.meta === 'mc_explosion';
    const explosionFrame = step ? (step.explosionFrame || 0) : 0;

    // Fond cave / nuit minecraft
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);

    // Grille de pierre en fond (texture grossiere)
    ctx.strokeStyle = '#1a1f2a';
    ctx.lineWidth = 1;
    const gridSize = 48;
    for (let gx = 0; gx < width; gx += gridSize) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, height); ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(width, gy); ctx.stroke();
    }

    // Header
    if (stats) this._drawHeader(stats);

    // Dessiner les blocs
    for (let i = 0; i < n; i++) {
      if (data[i] === 0) continue; // barre detruite par l'explosion
      const barH = (data[i] / maxVal) * LAYOUT.barsMaxH;
      const bx = LAYOUT.barsLeftPad + i * barWidth;
      const by = LAYOUT.barsBottom - barH;
      const bw = barWidth - 3;
      const ratio = data[i] / maxVal;

      const isCreeper = creeperVal && data[i] === creeperVal;
      const isActive = step && step.indices && step.indices.includes(i);
      const isMining = mineIdx === i;

      // Couleurs du bloc
      let face, light, dark;
      if (isCreeper) {
        face = '#3d8b3d'; light = '#5dab5d'; dark = '#1d5b1d';
      } else if (isActive) {
        face = '#c8963c'; light = '#e8b65c'; dark = '#885a18';
      } else {
        // Pierre: grise, plus claire pour les hautes barres
        const g = Math.round(80 + ratio * 70);
        face = `rgb(${g},${g},${g})`;
        light = `rgb(${Math.min(255,g+40)},${Math.min(255,g+40)},${Math.min(255,g+40)})`;
        dark = `rgb(${Math.max(0,g-40)},${Math.max(0,g-40)},${Math.max(0,g-40)})`;
      }

      // Face principale
      ctx.fillStyle = face;
      ctx.fillRect(bx, by, bw, barH);

      // Highlight top-left (effet 3D bloc)
      ctx.fillStyle = light;
      ctx.fillRect(bx, by, bw, 3);
      ctx.fillRect(bx, by, 3, barH);

      // Shadow bottom-right
      ctx.fillStyle = dark;
      ctx.fillRect(bx, by + barH - 3, bw, 3);
      ctx.fillRect(bx + bw - 3, by, 3, barH);

      // Lignes de grille (blocs empiles)
      const blockH = Math.max(20, Math.round(bw));
      ctx.strokeStyle = dark;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.35;
      for (let lineY = by + blockH; lineY < by + barH; lineY += blockH) {
        ctx.beginPath(); ctx.moveTo(bx, lineY); ctx.lineTo(bx + bw, lineY); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Face creeper pixel art
      if (isCreeper) {
        this._drawCreeperFace(bx + bw / 2, by + 18, Math.min(bw * 0.75, 50));
      }

      // Fissures de minage
      if (isMining && crackStage >= 0) {
        this._drawBlockCracks(bx, by, bw, barH, crackStage);
      }
    }

    // Explosion
    if (isExplosion) {
      const ci = step.explosionIdx || 0;
      const ex = LAYOUT.barsLeftPad + ci * barWidth + barWidth / 2;
      const ey = LAYOUT.barsBottom - (data[ci] || 0) / maxVal * LAYOUT.barsMaxH / 2;
      this._drawMcExplosion(ex, ey, explosionFrame);
    }

    // Value labels & code block
    this._drawValueLabels(data, step, n, barWidth);
    if (stats && stats.code) this._drawCodeBlock(stats.code);
    this._drawWatermark();
  }

  _drawCreeperFace(cx, cy, size) {
    const { ctx } = this;
    const p = size / 8; // taille d'un "pixel"
    ctx.fillStyle = '#0d2b0d';

    // Yeux — 2 carres separes
    ctx.fillRect(cx - p * 2.5, cy - p * 0.5, p * 2, p * 2);
    ctx.fillRect(cx + p * 0.5, cy - p * 0.5, p * 2, p * 2);

    // Bouche — forme caracteristique creeper (N inversee)
    ctx.fillRect(cx - p * 1.5, cy + p * 1.5, p, p * 2);
    ctx.fillRect(cx - p * 0.5, cy + p * 2.5, p * 3, p);
    ctx.fillRect(cx + p * 1.5, cy + p * 1.5, p, p * 2);
    ctx.fillRect(cx - p * 0.5, cy + p * 1.5, p, p);
  }

  _drawBlockCracks(x, y, w, h, stage) {
    const { ctx } = this;
    const cx = x + w / 2;
    const cy = y + h / 2;
    ctx.save();

    // Overlay noir progressif
    ctx.fillStyle = `rgba(0,0,0,${0.1 + stage * 0.12})`;
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    const len = Math.min(w, h) * 0.35;
    // Fissures qui rayonnent depuis le centre, plus nombreuses a chaque stage
    const crackDirs = [
      [0, -1], [0.7, -0.7], [1, 0], [0.7, 0.7],
      [0, 1], [-0.7, 0.7], [-1, 0], [-0.7, -0.7],
    ];
    for (let c = 0; c <= stage * 2; c++) {
      const d = crackDirs[c % crackDirs.length];
      const cracLen = len * (0.4 + (c % 3) * 0.3);
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + d[0] * cracLen, cy + d[1] * cracLen);
      ctx.stroke();
      // Petite branche
      if (stage >= 2) {
        const mid = 0.6;
        ctx.beginPath();
        ctx.moveTo(cx + d[0] * cracLen * mid, cy + d[1] * cracLen * mid);
        ctx.lineTo(cx + d[0] * cracLen * mid + d[1] * cracLen * 0.3,
                   cy + d[1] * cracLen * mid - d[0] * cracLen * 0.3);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  _drawMcExplosion(ex, ey, frame) {
    const { ctx, width } = this;
    ctx.save();

    // Flash blanc au debut
    if (frame < 3) {
      ctx.fillStyle = `rgba(255,255,255,${0.9 - frame * 0.3})`;
      ctx.fillRect(0, 0, width, this.height);
    }

    // Boule de feu
    const r = 40 + frame * 55;
    const grad = ctx.createRadialGradient(ex, ey, 0, ex, ey, r);
    grad.addColorStop(0, `rgba(255,230,80,${Math.max(0, 0.95 - frame * 0.08)})`);
    grad.addColorStop(0.4, `rgba(255,120,0,${Math.max(0, 0.8 - frame * 0.07)})`);
    grad.addColorStop(1, 'rgba(80,20,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(ex, ey, r, 0, Math.PI * 2);
    ctx.fill();

    // Debris pixels (blocs brises)
    const colors = ['#4a4a4a', '#6b6b6b', '#3d8b3d', '#8B6914'];
    for (let d = 0; d < 18; d++) {
      const angle = (d / 18) * Math.PI * 2 + frame * 0.1;
      const dist = 30 + frame * 35 + (d % 5) * 20;
      const dx = ex + Math.cos(angle) * dist;
      const dy = ey + Math.sin(angle) * dist + frame * frame * 1.5; // gravite
      const ds = 10 + (d % 4) * 6;
      const alpha = Math.max(0, 1 - frame / 10);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = colors[d % colors.length];
      ctx.fillRect(dx - ds / 2, dy - ds / 2, ds, ds);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Seaweed Sort — dessine les barres comme des algues ondulantes
  drawSeaweed(data, step, stats) {
    const { ctx, width, height } = this;
    const n = data.length;
    if (n === 0) return;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const t = Date.now() * 0.003;

    // Fond sous-marin
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#0a3d5c');
    grad.addColorStop(0.5, '#0c4a5e');
    grad.addColorStop(1, '#1a2a3a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Rayons de lumiere sous l'eau
    ctx.save();
    ctx.globalAlpha = 0.04;
    for (let r = 0; r < 5; r++) {
      const rx = width * 0.2 + r * width * 0.15;
      ctx.fillStyle = '#88ccee';
      ctx.beginPath();
      ctx.moveTo(rx - 30, 0);
      ctx.lineTo(rx + 30, 0);
      ctx.lineTo(rx + 80 + Math.sin(t + r) * 20, height);
      ctx.lineTo(rx - 80 + Math.sin(t + r) * 20, height);
      ctx.fill();
    }
    ctx.restore();

    // Bulles
    ctx.save();
    for (let b = 0; b < 8; b++) {
      const bx = LAYOUT.barsLeftPad + ((b * 137 + t * 40) % usableW);
      const by = LAYOUT.barsBottom - ((t * 30 + b * 200) % (LAYOUT.barsMaxH + 100));
      const br = 3 + (b % 3) * 2;
      ctx.fillStyle = `rgba(180, 220, 255, ${0.15 + Math.sin(t + b) * 0.1})`;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Header
    if (stats) this._drawHeader(stats);

    // Dessiner les algues (barres ondulantes)
    for (let i = 0; i < n; i++) {
      const barH = (data[i] / maxVal) * LAYOUT.barsMaxH;
      const baseX = LAYOUT.barsLeftPad + i * barWidth + barWidth / 2;
      const baseY = LAYOUT.barsBottom;
      const ratio = data[i] / maxVal;

      // Couleur algue — vert qui varie
      const isActive = step && step.indices && step.indices.includes(i);
      const hue = isActive ? 40 : 110 + ratio * 30;
      const sat = isActive ? 90 : 60 + ratio * 20;
      const light = isActive ? 55 : 30 + ratio * 20;

      // Amplitude d'ondulation — plus grande pour les grandes algues
      const amplitude = 8 + barH * 0.02;
      const frequency = 2 + i * 0.3;
      const segments = Math.max(8, Math.floor(barH / 10));
      const segH = barH / segments;
      const halfW = (barWidth - 4) / 2;

      ctx.save();
      ctx.beginPath();

      // Cote gauche (bas vers haut)
      for (let s = 0; s <= segments; s++) {
        const sy = baseY - s * segH;
        const progress = s / segments; // 0 = base, 1 = sommet
        const sway = Math.sin(t * 1.5 + frequency + progress * 3) * amplitude * progress * progress;
        const narrowing = 1 - progress * 0.3;
        const sx = baseX + sway - halfW * narrowing;
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }

      // Cote droit (haut vers bas)
      for (let s = segments; s >= 0; s--) {
        const sy = baseY - s * segH;
        const progress = s / segments;
        const sway = Math.sin(t * 1.5 + frequency + progress * 3) * amplitude * progress * progress;
        const narrowing = 1 - progress * 0.3;
        const sx = baseX + sway + halfW * narrowing;
        ctx.lineTo(sx, sy);
      }

      ctx.closePath();
      ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
      ctx.fill();

      // Bord plus clair
      ctx.strokeStyle = `hsl(${hue}, ${sat}%, ${light + 15}%)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // Value labels
    this._drawValueLabels(data, step, n, barWidth);

    // Code block
    if (stats && stats.code) this._drawCodeBlock(stats.code);
    this._drawWatermark();
  }

  // Meme text overlay — affiche un gros texte meme au centre
  drawMemeText(text, options = {}) {
    const { ctx, width } = this;
    const {
      y = 750,
      fontSize = 48,
      color = '#FFFFFF',
      bg = 'rgba(0,0,0,0.6)',
      font = `bold ${fontSize}px Inter, -apple-system, sans-serif`,
    } = options;

    ctx.save();
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = LAYOUT.barsLeftPad + (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / 2;
    const textW = ctx.measureText(text).width + 40;
    const textH = fontSize + 20;

    // Fond pill
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(centerX - textW / 2, y - textH / 2, textW, textH, textH / 2);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.fillText(text, centerX, y);
    ctx.restore();
  }

  // Skibidi — toilette emoji au-dessus d'une barre
  drawSkibidiToilet(idx, data, frame) {
    if (idx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = idx < n ? (data[idx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + idx * barWidth + barWidth / 2;
    const y = LAYOUT.barsBottom - barH - 30;

    ctx.save();
    ctx.font = `${Math.min(barWidth * 0.8, 40)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    // Rotation flush
    if (frame !== undefined) {
      ctx.translate(x, y);
      ctx.rotate((frame / 5) * Math.PI * 0.3);
      ctx.fillText('\uD83D\uDEBD', 0, 0);
    } else {
      ctx.fillText('\uD83D\uDEBD', x, y);
    }
    ctx.restore();
  }

  // Hawk Tuah — spit effect
  drawSpit(idx, data) {
    if (idx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = idx < n ? (data[idx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + idx * barWidth + barWidth / 2;
    const y = LAYOUT.barsBottom - barH - 20;

    ctx.save();
    // Spit droplets
    for (let d = 0; d < 5; d++) {
      const dx = (Math.random() - 0.5) * barWidth * 1.5;
      const dy = (Math.random() - 0.5) * 30;
      const r = 3 + Math.random() * 5;
      ctx.fillStyle = `rgba(150, 200, 255, ${0.6 + Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.ellipse(x + dx, y + dy, r, r * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Rizz — coeur ou X au dessus des barres
  drawRizzResult(idx, data, success) {
    if (idx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = idx < n ? (data[idx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + idx * barWidth + barWidth;
    const y = LAYOUT.barsBottom - Math.max(barH, (data[Math.min(idx + 1, n - 1)] / maxVal) * LAYOUT.barsMaxH) - 35;

    ctx.save();
    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.fillText(success ? '\u2764\uFE0F' : '\uD83D\uDC94', x, y);
    ctx.restore();
  }

  // Mewing — glow jawline effect
  drawMewingGlow(idx, data, frame) {
    if (idx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = idx < n ? (data[idx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + idx * barWidth;
    const y = LAYOUT.barsBottom - barH;

    ctx.save();
    const glow = ctx.createLinearGradient(x, y, x, LAYOUT.barsBottom);
    const intensity = Math.sin((frame || 0) * 0.5) * 0.3 + 0.5;
    glow.addColorStop(0, `rgba(255, 215, 0, ${intensity})`);
    glow.addColorStop(1, `rgba(255, 215, 0, 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(x, y, barWidth - 2, barH);
    ctx.restore();
  }

  // Ohio — glitch effect sur tout l'ecran
  drawOhioGlitch(frame) {
    const { ctx, width, height } = this;
    ctx.save();
    // Glitch bars horizontaux
    for (let g = 0; g < 5; g++) {
      const gy = Math.random() * height;
      const gh = 5 + Math.random() * 15;
      const offset = (Math.random() - 0.5) * 40;
      ctx.drawImage(ctx.canvas, offset, gy, width, gh, 0, gy, width, gh);
    }
    // Color shift
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = `rgba(255, 0, ${(frame * 30) % 255}, 0.1)`;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  // NPC — speech bubble
  drawNpcBubble(idx, data, text) {
    if (idx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = idx < n ? (data[idx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + idx * barWidth + barWidth / 2;
    const y = LAYOUT.barsBottom - barH - 50;

    ctx.save();
    ctx.font = '18px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const textW = ctx.measureText(text).width + 16;
    const textH = 28;

    // Bulle
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(x - textW / 2, y - textH / 2, textW, textH, 8);
    ctx.fill();
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Fleche
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(x - 5, y + textH / 2);
    ctx.lineTo(x, y + textH / 2 + 8);
    ctx.lineTo(x + 5, y + textH / 2);
    ctx.fill();

    ctx.fillStyle = '#2A2A2A';
    ctx.fillText(text, x, y + 1);
    ctx.restore();
  }

  // Elon — X logo
  drawElonX(frame) {
    const { ctx, width } = this;
    const centerX = LAYOUT.barsLeftPad + (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / 2;
    const y = 800;
    const size = 60 + (frame || 0) * 3;

    ctx.save();
    ctx.font = `bold ${size}px Inter, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('𝕏', centerX, y);
    ctx.restore();
  }

  // Ukraine — drapeau ukrainien derriere les barres
  drawUkraineFlag() {
    const { ctx, width } = this;
    ctx.save();
    ctx.globalAlpha = 0.15;
    // Bleu
    ctx.fillStyle = '#0057B7';
    ctx.fillRect(LAYOUT.barsLeftPad, LAYOUT.barsTop, width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad, LAYOUT.barsMaxH / 2);
    // Jaune
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(LAYOUT.barsLeftPad, LAYOUT.barsTop + LAYOUT.barsMaxH / 2, width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad, LAYOUT.barsMaxH / 2);
    ctx.restore();
  }

  // Drone emoji
  drawDrone(targetIdx, data) {
    if (targetIdx === undefined || !data || data.length === 0) return;
    const { ctx, width } = this;
    const n = data.length;
    const usableW = width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad;
    const barWidth = usableW / n;
    const maxVal = Math.max(...data);
    const barH = targetIdx < n ? (data[targetIdx] / maxVal) * LAYOUT.barsMaxH : 0;
    const x = LAYOUT.barsLeftPad + targetIdx * barWidth + barWidth / 2;
    const y = LAYOUT.barsBottom - barH - 45;

    ctx.save();
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.fillText('\uD83D\uDEE9\uFE0F', x, y);
    // Explosion spark
    ctx.fillStyle = 'rgba(255, 150, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(x, y + 25, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // North Korea — drapeau + Kim portrait simplifie
  drawNKFlag() {
    const { ctx, width } = this;
    const centerX = LAYOUT.barsLeftPad + (width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad) / 2;
    ctx.save();
    ctx.globalAlpha = 0.12;
    // Rouge
    ctx.fillStyle = '#EF4234';
    ctx.fillRect(LAYOUT.barsLeftPad, LAYOUT.barsTop, width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad, LAYOUT.barsMaxH);
    // Bande blanche + bleu
    const h3 = LAYOUT.barsMaxH / 5;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(LAYOUT.barsLeftPad, LAYOUT.barsTop + h3 * 1.5, width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad, h3 * 2);
    ctx.fillStyle = '#024FA2';
    ctx.fillRect(LAYOUT.barsLeftPad, LAYOUT.barsTop + h3 * 1.8, width - LAYOUT.barsLeftPad - LAYOUT.barsRightPad, h3 * 1.4);
    ctx.restore();
  }

  _drawWatermark() {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = 'rgba(27, 58, 92, 0.5)';
    ctx.font = 'bold italic 28px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('gazaidev', this.width - LAYOUT.codePadX - 16, LAYOUT.codeBottom - 12);
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
