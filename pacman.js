// ===================================
// Valentine's Pac-Man Game
// ===================================

// Canvas and Context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Constants
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;
const CELL_SIZE = canvas.width / GRID_WIDTH;
const FPS = 60;

// Game States
const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver'
};

// Colors
const COLORS = {
  wall: '#8B0000',
  pellet: '#FFE66D',
  pacman: '#FFFF00',
  pacmanPowered: '#FFD700',
  rose: '#FF1493',
  heart: '#FF69B4',
  ghosts: ['#FF6B6B', '#FF69B4', '#9B59B6', '#E6E6FA']
};

// Game State
let currentState = GameState.MENU;
let score = 0;
let lives = 3;
let lastTime = 0;

// Input
const keys = {};

// Maze (28x31 grid - classic Pac-Man dimensions)
// 1 = wall, 0 = path, 2 = pellet
const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Clone maze for pellet tracking
let pellets = JSON.parse(JSON.stringify(maze));

// ===================================
// Entity Classes
// ===================================

class Pacman {
  constructor() {
    this.gridX = 14;
    this.gridY = 23;
    this.x = this.gridX * CELL_SIZE + CELL_SIZE / 2;
    this.y = this.gridY * CELL_SIZE + CELL_SIZE / 2;
    this.direction = { x: 0, y: 0 };
    this.nextDirection = { x: 0, y: 0 };
    this.speed = 100;
    this.radius = CELL_SIZE * 0.4;
    this.mouthAngle = 0;
    this.mouthSpeed = 8;
    this.powered = false;
    this.powerTimer = 0;
    this.facingAngle = 0;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    // Update power timer
    if (this.powered) {
      this.powerTimer -= deltaTime;
      if (this.powerTimer <= 0) {
        this.powered = false;
        this.powerTimer = 0;
      }
    }

    // Try to turn
    if (this.nextDirection.x !== 0 || this.nextDirection.y !== 0) {
      const nextGridX = Math.round(this.x / CELL_SIZE + this.nextDirection.x * 0.5);
      const nextGridY = Math.round(this.y / CELL_SIZE + this.nextDirection.y * 0.5);
      
      if (this.isWalkable(nextGridX, nextGridY)) {
        this.direction = { ...this.nextDirection };
        this.nextDirection = { x: 0, y: 0 };
      }
    }

    // Move
    const nextX = this.x + this.direction.x * this.speed * deltaTime;
    const nextY = this.y + this.direction.y * this.speed * deltaTime;
    
    const nextGridX = Math.floor(nextX / CELL_SIZE);
    const nextGridY = Math.floor(nextY / CELL_SIZE);
    
    if (this.isWalkable(nextGridX, nextGridY)) {
      this.x = nextX;
      this.y = nextY;
    }

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;

    // Update grid position
    this.gridX = Math.floor(this.x / CELL_SIZE);
    this.gridY = Math.floor(this.y / CELL_SIZE);

    // Animate mouth
    if (this.direction.x !== 0 || this.direction.y !== 0) {
      this.mouthAngle += this.mouthSpeed * deltaTime;
      if (this.mouthAngle > 0.4) this.mouthAngle = 0;
    }

    // Set facing angle
    if (this.direction.x === 1) this.facingAngle = 0;
    else if (this.direction.x === -1) this.facingAngle = Math.PI;
    else if (this.direction.y === -1) this.facingAngle = -Math.PI / 2;
    else if (this.direction.y === 1) this.facingAngle = Math.PI / 2;
  }

  isWalkable(gridX, gridY) {
    if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
      return false;
    }
    return maze[gridY][gridX] !== 1;
  }

  render() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.facingAngle);
    
    // Glow effect when powered
    if (this.powered) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = COLORS.rose;
    }
    
    ctx.fillStyle = this.powered ? COLORS.pacmanPowered : COLORS.pacman;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, this.mouthAngle, Math.PI * 2 - this.mouthAngle);
    ctx.lineTo(0, 0);
    ctx.fill();
    
    ctx.restore();
  }

  setDirection(x, y) {
    this.nextDirection = { x, y };
  }

  activatePower() {
    this.powered = true;
    this.powerTimer = 8;
  }
}

class Ghost {
  constructor(startX, startY, color, personality) {
    this.startX = startX;
    this.startY = startY;
    this.gridX = startX;
    this.gridY = startY;
    this.x = startX * CELL_SIZE + CELL_SIZE / 2;
    this.y = startY * CELL_SIZE + CELL_SIZE / 2;
    this.color = color;
    this.personality = personality;
    this.speed = 85;
    this.radius = CELL_SIZE * 0.4;
    this.direction = { x: 0, y: -1 };
    this.active = true;
    this.respawnTimer = 0;
  }

  update(deltaTime) {
    if (!deltaTime) return;

    if (!this.active) {
      this.respawnTimer -= deltaTime;
      if (this.respawnTimer <= 0) {
        this.respawn();
      }
      return;
    }

    // Simple AI: move towards Pac-Man with some randomness
    const dx = pacman.gridX - this.gridX;
    const dy = pacman.gridY - this.gridY;
    
    // Choose direction at intersections
    const currentGridX = Math.round(this.x / CELL_SIZE);
    const currentGridY = Math.round(this.y / CELL_SIZE);
    
    if (Math.abs(this.x - currentGridX * CELL_SIZE - CELL_SIZE / 2) < 2 &&
        Math.abs(this.y - currentGridY * CELL_SIZE - CELL_SIZE / 2) < 2) {
      
      const possibleDirs = [];
      
      // Check all directions
      if (this.isWalkable(currentGridX, currentGridY - 1)) possibleDirs.push({ x: 0, y: -1, score: -dy });
      if (this.isWalkable(currentGridX, currentGridY + 1)) possibleDirs.push({ x: 0, y: 1, score: dy });
      if (this.isWalkable(currentGridX - 1, currentGridY)) possibleDirs.push({ x: -1, y: 0, score: -dx });
      if (this.isWalkable(currentGridX + 1, currentGridY)) possibleDirs.push({ x: 1, y: 0, score: dx });
      
      // Don't reverse
      possibleDirs.filter(d => !(d.x === -this.direction.x && d.y === -this.direction.y));
      
      if (possibleDirs.length > 0) {
        // Personality-based behavior
        let chosen;
        if (this.personality === 'aggressive') {
          // Always chase
          possibleDirs.sort((a, b) => b.score - a.score);
          chosen = possibleDirs[0];
        } else if (this.personality === 'ambush') {
          // Mix of chase and random
          if (Math.random() < 0.7) {
            possibleDirs.sort((a, b) => b.score - a.score);
            chosen = possibleDirs[0];
          } else {
            chosen = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
          }
        } else if (this.personality === 'random') {
          // Mostly random
          chosen = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        } else {
          // Scatter - avoid Pac-Man
          possibleDirs.sort((a, b) => a.score - b.score);
          chosen = possibleDirs[0];
        }
        
        this.direction = { x: chosen.x, y: chosen.y };
      }
    }

    // Move
    this.x += this.direction.x * this.speed * deltaTime;
    this.y += this.direction.y * this.speed * deltaTime;

    // Wrap around
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;

    // Update grid position
    this.gridX = Math.floor(this.x / CELL_SIZE);
    this.gridY = Math.floor(this.y / CELL_SIZE);
  }

  isWalkable(gridX, gridY) {
    if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
      return false;
    }
    return maze[gridY][gridX] !== 1;
  }

  render() {
    if (!this.active) return;

    ctx.fillStyle = this.color;
    
    // Body
    ctx.beginPath();
    ctx.arc(this.x, this.y - this.radius * 0.2, this.radius, Math.PI, 0);
    ctx.lineTo(this.x + this.radius, this.y + this.radius);
    ctx.lineTo(this.x + this.radius * 0.6, this.y + this.radius * 0.6);
    ctx.lineTo(this.x + this.radius * 0.2, this.y + this.radius);
    ctx.lineTo(this.x - this.radius * 0.2, this.y + this.radius * 0.6);
    ctx.lineTo(this.x - this.radius * 0.6, this.y + this.radius);
    ctx.lineTo(this.x - this.radius, this.y + this.radius);
    ctx.closePath();
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.2, this.radius * 0.25, 0, Math.PI * 2);
    ctx.arc(this.x + this.radius * 0.3, this.y - this.radius * 0.2, this.radius * 0.25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.2, this.radius * 0.15, 0, Math.PI * 2);
    ctx.arc(this.x + this.radius * 0.3, this.y - this.radius * 0.2, this.radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }

  eliminate() {
    this.active = false;
    this.respawnTimer = 8;
    score += 200;
  }

  respawn() {
    this.active = true;
    this.gridX = this.startX;
    this.gridY = this.startY;
    this.x = this.startX * CELL_SIZE + CELL_SIZE / 2;
    this.y = this.startY * CELL_SIZE + CELL_SIZE / 2;
  }
}

class Rose {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.gridX = 0;
    this.gridY = 0;
    this.radius = CELL_SIZE * 0.35;
    this.lifespan = 8;
    this.timer = 0;
    this.pulsePhase = 0;
  }

  spawn() {
    // Find random walkable position
    let attempts = 0;
    while (attempts < 100) {
      const gx = Math.floor(Math.random() * GRID_WIDTH);
      const gy = Math.floor(Math.random() * GRID_HEIGHT);
      
      if (maze[gy][gx] === 0 || maze[gy][gx] === 2) {
        this.gridX = gx;
        this.gridY = gy;
        this.x = gx * CELL_SIZE + CELL_SIZE / 2;
        this.y = gy * CELL_SIZE + CELL_SIZE / 2;
        this.active = true;
        this.timer = this.lifespan;
        break;
      }
      attempts++;
    }
  }

  update(deltaTime) {
    if (!this.active) return;

    this.timer -= deltaTime;
    this.pulsePhase += deltaTime * 5;
    
    if (this.timer <= 0) {
      this.active = false;
    }
  }

  render() {
    if (!this.active) return;

    const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
    const renderRadius = this.radius * pulse;

    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS.rose;
    ctx.fillStyle = COLORS.rose;
    ctx.font = `${renderRadius * 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌹', this.x, this.y);
    ctx.restore();
  }

  checkCollision(px, py, radius) {
    if (!this.active) return false;
    const dx = this.x - px;
    const dy = this.y - py;
    return Math.sqrt(dx * dx + dy * dy) < this.radius + radius;
  }
}

class Heart {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = 200;
    this.radius = CELL_SIZE * 0.25;
  }

  shoot(x, y, angle) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;
  }

  update(deltaTime) {
    if (!this.active) return;

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    // Check wall collision
    const gridX = Math.floor(this.x / CELL_SIZE);
    const gridY = Math.floor(this.y / CELL_SIZE);
    
    if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT ||
        maze[gridY][gridX] === 1) {
      this.active = false;
    }
  }

  render() {
    if (!this.active) return;

    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = COLORS.heart;
    ctx.fillStyle = COLORS.heart;
    ctx.font = `${this.radius * 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💕', this.x, this.y);
    ctx.restore();
  }

  checkCollision(gx, gy, radius) {
    if (!this.active) return false;
    const dx = this.x - gx;
    const dy = this.y - gy;
    return Math.sqrt(dx * dx + dy * dy) < this.radius + radius;
  }
}

// ===================================
// Game Entities
// ===================================

let pacman;
let ghosts = [];
let rose;
let hearts = [];
let roseSpawnTimer = 0;
let heartShootTimer = 0;

function initGame() {
  pacman = new Pacman();
  
  ghosts = [
    new Ghost(12, 14, COLORS.ghosts[0], 'aggressive'),
    new Ghost(14, 14, COLORS.ghosts[1], 'ambush'),
    new Ghost(15, 14, COLORS.ghosts[2], 'random'),
    new Ghost(16, 14, COLORS.ghosts[3], 'scatter')
  ];
  
  rose = new Rose();
  hearts = [];
  for (let i = 0; i < 8; i++) {
    hearts.push(new Heart());
  }
  
  pellets = JSON.parse(JSON.stringify(maze));
  score = 0;
  lives = 3;
  roseSpawnTimer = Math.random() * 10 + 10;
  heartShootTimer = 0;
  
  updateUI();
}

// ===================================
// Game Loop
// ===================================

function update(deltaTime) {
  if (currentState !== GameState.PLAYING) return;

  // Update Pac-Man
  pacman.update(deltaTime);

  // Collect pellets
  if (pellets[pacman.gridY] && pellets[pacman.gridY][pacman.gridX] === 2) {
    pellets[pacman.gridY][pacman.gridX] = 0;
    score += 10;
  }

  // Update ghosts
  ghosts.forEach(ghost => ghost.update(deltaTime));

  // Rose spawning
  if (!rose.active) {
    roseSpawnTimer -= deltaTime;
    if (roseSpawnTimer <= 0) {
      rose.spawn();
      roseSpawnTimer = Math.random() * 10 + 10;
    }
  }

  // Update rose
  rose.update(deltaTime);

  // Collect rose
  if (rose.checkCollision(pacman.x, pacman.y, pacman.radius)) {
    rose.active = false;
    pacman.activatePower();
    score += 50;
    roseSpawnTimer = Math.random() * 10 + 10;
  }

  // Shoot hearts
  if (pacman.powered) {
    heartShootTimer -= deltaTime;
    if (heartShootTimer <= 0) {
      const heart = hearts.find(h => !h.active);
      if (heart) {
        heart.shoot(pacman.x, pacman.y, pacman.facingAngle);
      }
      heartShootTimer = 0.5;
    }
  }

  // Update hearts
  hearts.forEach(heart => heart.update(deltaTime));

  // Heart-Ghost collision
  hearts.forEach(heart => {
    if (!heart.active) return;
    ghosts.forEach(ghost => {
      if (!ghost.active) return;
      if (heart.checkCollision(ghost.x, ghost.y, ghost.radius)) {
        heart.active = false;
        ghost.eliminate();
      }
    });
  });

  // Pac-Man-Ghost collision
  ghosts.forEach(ghost => {
    if (!ghost.active) return;
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < pacman.radius + ghost.radius) {
      lives--;
      if (lives <= 0) {
        gameOver();
      } else {
        resetPositions();
      }
    }
  });

  // Check win condition
  let pelletsRemaining = 0;
  pellets.forEach(row => {
    row.forEach(cell => {
      if (cell === 2) pelletsRemaining++;
    });
  });
  
  if (pelletsRemaining === 0) {
    score += 1000;
    pellets = JSON.parse(JSON.stringify(maze));
  }

  updateUI();
}

function resetPositions() {
  pacman.gridX = 14;
  pacman.gridY = 23;
  pacman.x = pacman.gridX * CELL_SIZE + CELL_SIZE / 2;
  pacman.y = pacman.gridY * CELL_SIZE + CELL_SIZE / 2;
  pacman.direction = { x: 0, y: 0 };
  pacman.nextDirection = { x: 0, y: 0 };
  
  ghosts.forEach(ghost => ghost.respawn());
}

function render() {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render maze
  ctx.fillStyle = COLORS.wall;
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (maze[y][x] === 1) {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  // Render pellets
  ctx.fillStyle = COLORS.pellet;
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (pellets[y][x] === 2) {
        ctx.beginPath();
        ctx.arc(
          x * CELL_SIZE + CELL_SIZE / 2,
          y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE * 0.15,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }

  // Render rose
  rose.render();

  // Render hearts
  hearts.forEach(heart => heart.render());

  // Render ghosts
  ghosts.forEach(ghost => ghost.render());

  // Render Pac-Man
  pacman.render();
}

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(deltaTime);
  render();

  requestAnimationFrame(gameLoop);
}

// ===================================
// UI Updates
// ===================================

function updateUI() {
  document.getElementById('scoreDisplay').textContent = score;
  
  const heartsText = '❤️'.repeat(Math.max(0, lives));
  document.getElementById('livesDisplay').textContent = heartsText;
  
  const powerPercent = pacman.powered ? (pacman.powerTimer / 8) * 100 : 0;
  document.getElementById('powerTimerFill').style.width = powerPercent + '%';
  document.getElementById('powerTimerText').textContent = 
    pacman.powered ? pacman.powerTimer.toFixed(1) + 's' : '0s';
}

// ===================================
// Game State Functions
// ===================================

function startGame() {
  currentState = GameState.PLAYING;
  document.getElementById('instructionsOverlay').classList.add('hidden');
  initGame();
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function pauseGame() {
  if (currentState === GameState.PLAYING) {
    currentState = GameState.PAUSED;
    document.getElementById('pausedOverlay').classList.remove('hidden');
  } else if (currentState === GameState.PAUSED) {
    currentState = GameState.PLAYING;
    document.getElementById('pausedOverlay').classList.add('hidden');
    lastTime = performance.now();
  }
}

function gameOver() {
  currentState = GameState.GAME_OVER;
  document.getElementById('finalScore').textContent = score;
  document.getElementById('gameOverOverlay').classList.remove('hidden');
}

function restartGame() {
  document.getElementById('gameOverOverlay').classList.add('hidden');
  initGame();
  currentState = GameState.PLAYING;
  lastTime = performance.now();
}

// ===================================
// Input Handling
// ===================================

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault();
  }

  if (currentState === GameState.PLAYING || currentState === GameState.PAUSED) {
    if (e.key === 'ArrowUp') pacman.setDirection(0, -1);
    else if (e.key === 'ArrowDown') pacman.setDirection(0, 1);
    else if (e.key === 'ArrowLeft') pacman.setDirection(-1, 0);
    else if (e.key === 'ArrowRight') pacman.setDirection(1, 0);
    else if (e.key === ' ') pauseGame();
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// ===================================
// Button Event Listeners
// ===================================

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', restartGame);

// ===================================
// Initialize
// ===================================

initGame();
render();
