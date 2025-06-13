# Flapbird - Mario Edition

A simple HTML5 Canvas & JavaScript game replacing the bird with a Mario Bros sprite. Click or press SPACE to flap and navigate through procedurally generated pipes.

## Setup

1. Ensure you serve files via a local server (e.g., VS Code Live Server extension or Python HTTP server):
   ```sh
   python -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser.

## Files

- `index.html`: Game canvas and script inclusion
- `script.js`: Game logic and rendering
- `assets/mario.png`: Mario sprite image (replace with your own)

## Controls

- Click or press SPACE to flap. On game over, click/SPACE resets.

## To-Do

- Add start screen and difficulty scaling
- Add sound effects
- Optimize performance
