const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const GRAVITY = 0.6;
const FLAP_STRENGTH = -10;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const PIPE_INTERVAL = 90; // frames

// Game variables
let frames = 0;
let pipes = [];
let score = 0;
let gameOver = false;

// Mario character
const mario = {
  x: 100,
  y: canvas.height / 2,
  width: 50,
  height: 50,
  velocity: 0,
  img: new Image(),
};
mario.img.src = 'assets/mario.png';

// Reset game state
function reset() {
  frames = 0;
  pipes = [];
  score = 0;
  gameOver = false;
  mario.y = canvas.height / 2;
  mario.velocity = 0;
  loop();
}

// Handle flap input
function flap() {
  if (!gameOver) {
    mario.velocity = FLAP_STRENGTH;
  } else {
    reset();
  }
}

// Generate a new pair of pipes
function createPipe() {
  const topHeight = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
  pipes.push({ x: canvas.width, y: 0, width: PIPE_WIDTH, height: topHeight, passed: false });
  pipes.push({ x: canvas.width, y: topHeight + PIPE_GAP, width: PIPE_WIDTH, height: canvas.height - topHeight - PIPE_GAP, passed: false });
}

// Update game objects
function update() {
  frames++;
  // Mario physics
  mario.velocity += GRAVITY;
  mario.y += mario.velocity;

  // Create pipes at intervals
  if (frames % PIPE_INTERVAL === 0) {
    createPipe();
  }

  // Update pipes
  pipes.forEach(pipe => {
    pipe.x -= 2;
    // Score when Mario passes a pipe pair
    if (!pipe.passed && pipe.x + PIPE_WIDTH < mario.x) {
      pipe.passed = true;
      score += 0.5;
    }
    // Collision detection
    if (
      mario.x < pipe.x + pipe.width &&
      mario.x + mario.width > pipe.x &&
      mario.y < pipe.y + pipe.height &&
      mario.y + mario.height > pipe.y
    ) {
      gameOver = true;
    }
  });

  // Floor and ceiling collision
  if (mario.y + mario.height > canvas.height || mario.y < 0) {
    gameOver = true;
  }

  // Remove off-screen pipes
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

// Draw game objects
function draw() {
  // Clear canvas
  ctx.fillStyle = '#70c5ce';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Mario
  ctx.drawImage(mario.img, mario.x, mario.y, mario.width, mario.height);

  // Draw pipes
  ctx.fillStyle = '#00b33c';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
  });

  // Draw score
  ctx.fillStyle = '#000';
  ctx.font = '32px Arial';
  ctx.fillText('Score: ' + Math.floor(score), 20, 40);

  // Game over text
  if (gameOver) {
    ctx.fillStyle = '#f00';
    ctx.font = '64px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 160, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Click or press SPACE to restart', canvas.width / 2 - 180, canvas.height / 2 + 40);
  }
}

// Main game loop
function loop() {
  update();
  draw();
  if (!gameOver) {
    requestAnimationFrame(loop);
  }
}

// Event listeners
window.addEventListener('mousedown', flap);
window.addEventListener('keydown', e => {
  if (e.code === 'Space') flap();
});

// Start when Mario image is loaded
mario.img.onload = () => {
  loop();
};
