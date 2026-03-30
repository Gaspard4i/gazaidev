const COLORS = {
  bg: '#1A1A1A',
  barLow: '#D35400',
  barHigh: '#F5EEDC',
  compare: '#2C5F6F',
  swap: '#4A707A',
  watermark: 'rgba(211, 84, 0, 0.6)',
};

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }

  draw(data, step = null) {
    const { ctx, width, height } = this;
    const n = data.length;
    const barWidth = width / n;
    const maxVal = Math.max(...data);

    // Fond
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    // Barres
    for (let i = 0; i < n; i++) {
      const barHeight = (data[i] / maxVal) * (height * 0.85);
      const x = i * barWidth;
      const y = height - barHeight;

      // Couleur : gradient chaud selon la valeur
      const ratio = data[i] / maxVal;
      ctx.fillStyle = this._lerpColor(COLORS.barLow, COLORS.barHigh, ratio);

      // Highlight si compare ou swap
      if (step && step.indices) {
        if (step.indices.includes(i)) {
          ctx.fillStyle = step.type === 'swap' ? COLORS.swap : COLORS.compare;
        }
      }

      ctx.fillRect(x, y, barWidth - 1, barHeight);
    }

    // Watermark
    this._drawWatermark();
  }

  _drawWatermark() {
    const { ctx, width, height } = this;
    ctx.save();
    ctx.fillStyle = COLORS.watermark;
    ctx.font = 'bold 36px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('GAZAIDEV', width - 30, height - 30);
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
