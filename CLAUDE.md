## Gazaidev — regles globales

### Identite Git
- `git config user.name "Gaspard"` et `git config user.email "catry.gaspard@gmail.com"`
- JAMAIS de "Co-Authored-By" dans les commits
- Format commit: `type(scope): description` (ex: `feat(algo): bubble sort visualizer`)
- Tous les commits doivent apparaitre sous le nom "Gaspard" dans git log

### Stack validee (Sprint 0 — Deep Researcher)
- **Rendu:** Canvas 2D API (natif) — `fillRect()` pour les barres, `requestAnimationFrame` pour 60fps
- **UI:** Vanilla JS + HTML/CSS + ES Modules (`<script type="module">`) — pas de framework, pas de build step
- **Capture:** MediaRecorder API (natif) — `canvas.captureStream(60)` + audio stream combine
- **Export MP4:** ffmpeg.wasm (lazy-loaded au clic export, ~25 Mo)
- **Audio:** Web Audio API (natif) — OscillatorNode, freq = 200 + (val/max) * 800 Hz
- **Dependances au chargement:** 0

### Palette couleurs (vibe moodboard marin/scrapbook)
- `#E8621F` — orange vif (poisson rouge)
- `#F09A56` — corail / orange doux
- `#1B3A5C` — bleu marine profond (fond pingouin)
- `#A8C8E0` — bleu ciel (damier / rayures)
- `#D4E4F0` — bleu ciel clair
- `#FBF6EE` — creme chaud (fond papier)
- `#F5F0E8` — blanc casse (cartes)
- `#2A2A2A` — encre sombre (texte)
- Style: illustratif, ludique, "handmade", serif (Georgia)

### Format export
- 1080x1920 (9:16 portrait)
- 60fps
- WebM (VP9) via MediaRecorder, puis MP4 via ffmpeg.wasm
- videoBitsPerRate: 8_000_000 (8 Mbps minimum)

### Architecture
```
src/
  algos/     — generateurs JS (yield par operation)
  renderer/  — dessin canvas (barres, palette, watermark)
  audio/     — sonification Web Audio API
  recorder/  — capture MediaRecorder + export
```

### Patterns techniques
- Algorithmes implementes comme generateurs (`function*`) qui `yield` a chaque operation
- Chaque yield = {type: 'compare'|'swap', indices: [...], values: [...]}
- 1 yield = 1 frame (ou N frames selon vitesse) — rendu deterministe
- Watermark Gazaidev en bas a droite, opacite 60%
