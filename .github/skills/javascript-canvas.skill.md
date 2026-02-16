# JavaScript & Canvas Game Development Skill

## Purpose
Provide expertise in building interactive browser games using HTML5 Canvas API and JavaScript, focusing on game loops, rendering, collision detection, and entity management.

## Capabilities

### Canvas API Mastery
- 2D rendering context
- Shape drawing and fills
- Image and sprite rendering
- Text rendering
- Transformations (translate, rotate, scale)
- Clipping and compositing

### Game Loop Implementation
- requestAnimationFrame usage
- Delta time calculation
- Fixed vs variable time steps
- Update and render separation
- Performance optimization

### Collision Detection
- Bounding box (AABB) collision
- Circle collision
- Grid-based collision
- Pixel-perfect collision
- Spatial partitioning

### Entity Systems
- Entity base classes
- Component-based architecture
- Entity pooling
- Lifecycle management
- State machines

### Input Handling
- Keyboard events
- Mouse events
- Touch events (mobile)
- Input buffering
- Key mapping

## Canvas API Essentials

### Setup
```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;
```

### Drawing Primitives
```javascript
// Rectangle
ctx.fillStyle = '#FF6B6B';
ctx.fillRect(x, y, width, height);

// Circle
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fill();

// Line
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```

### Sprites and Images
```javascript
const sprite = new Image();
sprite.src = 'pacman.png';

sprite.onload = () => {
  ctx.drawImage(sprite, x, y, width, height);
};

// Sprite sheet frame
ctx.drawImage(
  spriteSheet,
  frameX, frameY, frameWidth, frameHeight,  // Source
  x, y, width, height                        // Destination
);
```

### Text Rendering
```javascript
ctx.font = '24px Arial';
ctx.fillStyle = '#FFFFFF';
ctx.textAlign = 'center';
ctx.fillText('Score: 100', x, y);
```

## Game Loop Pattern

### Basic Game Loop
```javascript
let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
  lastTime = timestamp;
  
  update(deltaTime);
  render();
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
```

### Update Function
```javascript
function update(deltaTime) {
  // Update game state
  player.update(deltaTime);
  
  // Update enemies
  enemies.forEach(enemy => enemy.update(deltaTime));
  
  // Check collisions
  checkCollisions();
  
  // Update particles, projectiles, etc.
  updateParticles(deltaTime);
}
```

### Render Function
```javascript
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background
  renderBackground();
  
  // Draw entities (order matters - back to front)
  renderMaze();
  renderPellets();
  renderPowerUps();
  renderPlayer();
  renderEnemies();
  renderProjectiles();
  
  // Draw UI
  renderUI();
}
```

## Collision Detection

### Bounding Box (AABB)
```javascript
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}
```

### Circle Collision
```javascript
function checkCircleCollision(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}
```

### Grid-Based Collision (Pac-Man)
```javascript
function isWalkable(gridX, gridY) {
  if (gridX < 0 || gridX >= gridWidth || 
      gridY < 0 || gridY >= gridHeight) {
    return false;
  }
  return maze[gridY][gridX] !== WALL;
}
```

## Entity Management

### Entity Base Class
```javascript
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.active = true;
  }
  
  update(deltaTime) {
    // Override in subclasses
  }
  
  render(ctx) {
    // Override in subclasses
  }
  
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}
```

### Pac-Man Entity
```javascript
class Pacman extends Entity {
  constructor(x, y) {
    super(x, y);
    this.speed = 100; // pixels per second
    this.direction = { x: 0, y: 0 };
    this.mouthAngle = 0;
    this.powered = false;
    this.powerTimer = 0;
  }
  
  update(deltaTime) {
    // Move based on direction
    const nextX = this.x + this.direction.x * this.speed * deltaTime;
    const nextY = this.y + this.direction.y * this.speed * deltaTime;
    
    // Check if next position is walkable
    if (isWalkable(nextX, nextY)) {
      this.x = nextX;
      this.y = nextY;
    }
    
    // Update power-up timer
    if (this.powered) {
      this.powerTimer -= deltaTime;
      if (this.powerTimer <= 0) {
        this.powered = false;
      }
    }
    
    // Animate mouth
    this.mouthAngle = (this.mouthAngle + deltaTime * 10) % (Math.PI / 4);
  }
  
  render(ctx) {
    ctx.fillStyle = this.powered ? '#FFE66D' : '#FFFF00';
    
    // Draw Pac-Man with mouth animation
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 
            this.mouthAngle, Math.PI * 2 - this.mouthAngle);
    ctx.lineTo(this.x, this.y);
    ctx.fill();
  }
  
  activatePowerUp(duration) {
    this.powered = true;
    this.powerTimer = duration;
  }
}
```

### Ghost Entity
```javascript
class Ghost extends Entity {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
    this.speed = 80;
    this.targetX = 0;
    this.targetY = 0;
  }
  
  update(deltaTime) {
    // Simple AI: move towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      this.x += (dx / distance) * this.speed * deltaTime;
      this.y += (dy / distance) * this.speed * deltaTime;
    }
  }
  
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }
}
```

## Input Handling

### Keyboard Input
```javascript
const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  
  // Prevent default for arrow keys
  if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// In game loop
function handleInput() {
  if (keys['ArrowUp']) {
    player.setDirection(0, -1);
  } else if (keys['ArrowDown']) {
    player.setDirection(0, 1);
  } else if (keys['ArrowLeft']) {
    player.setDirection(-1, 0);
  } else if (keys['ArrowRight']) {
    player.setDirection(1, 0);
  }
}
```

## Performance Optimization

### Dirty Rectangle Rendering
```javascript
// Only redraw changed areas
const dirtyRects = [];

function render() {
  dirtyRects.forEach(rect => {
    ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
    // Render only entities in this rect
    renderInRect(rect);
  });
  dirtyRects.length = 0;
}
```

### Entity Pooling
```javascript
class ProjectilePool {
  constructor(size) {
    this.pool = [];
    for (let i = 0; i < size; i++) {
      this.pool.push(new Projectile());
    }
  }
  
  get() {
    return this.pool.find(p => !p.active) || new Projectile();
  }
  
  release(projectile) {
    projectile.active = false;
  }
}
```

### Frame Rate Limiting
```javascript
const FPS = 60;
const frameDelay = 1000 / FPS;
let lastFrameTime = 0;

function gameLoop(timestamp) {
  if (timestamp - lastFrameTime >= frameDelay) {
    const deltaTime = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;
    
    update(deltaTime);
    render();
  }
  
  requestAnimationFrame(gameLoop);
}
```

## State Management

### Game State Machine
```javascript
const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver'
};

let currentState = GameState.MENU;

function update(deltaTime) {
  switch(currentState) {
    case GameState.MENU:
      updateMenu(deltaTime);
      break;
    case GameState.PLAYING:
      updateGame(deltaTime);
      break;
    case GameState.PAUSED:
      // Don't update game
      break;
    case GameState.GAME_OVER:
      updateGameOver(deltaTime);
      break;
  }
}
```

## Best Practices

### Do's
✓ Use requestAnimationFrame for smooth animations
✓ Calculate delta time for frame-rate independent movement
✓ Clear canvas before each render
✓ Organize code into classes/modules
✓ Pool frequently created objects
✓ Use sprite sheets for multiple images
✓ Implement pause functionality
✓ Test on different frame rates

### Don'ts
✗ Use setInterval or setTimeout for game loop
✗ Hard-code frame rate dependencies
✗ Create new objects every frame
✗ Ignore performance profiling
✗ Draw everything every frame (when avoidable)
✗ Forget to remove event listeners
✗ Skip error handling for image loading

## Common Patterns

### Sprite Animation
```javascript
class AnimatedSprite {
  constructor(spriteSheet, frameWidth, frameHeight, frameCount) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCount = frameCount;
    this.currentFrame = 0;
    this.frameTime = 0;
    this.frameDelay = 0.1; // seconds per frame
  }
  
  update(deltaTime) {
    this.frameTime += deltaTime;
    if (this.frameTime >= this.frameDelay) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.frameTime = 0;
    }
  }
  
  render(ctx, x, y) {
    const frameX = this.currentFrame * this.frameWidth;
    ctx.drawImage(
      this.spriteSheet,
      frameX, 0, this.frameWidth, this.frameHeight,
      x, y, this.frameWidth, this.frameHeight
    );
  }
}
```

### Particle System
```javascript
class Particle {
  constructor(x, y, vx, vy, color, lifetime) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.lifetime = lifetime;
    this.age = 0;
  }
  
  update(deltaTime) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.age += deltaTime;
    return this.age < this.lifetime;
  }
  
  render(ctx) {
    const alpha = 1 - (this.age / this.lifetime);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 4, 4);
    ctx.globalAlpha = 1;
  }
}
```

## Integration Points
- Works with Game Developer Agent for game implementation
- Provides patterns for HTML Builder Agent (canvas setup)
- Guides CSS Stylist Agent on game container styling
- Supports Deployment Agent with performance testing

## References
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [HTML5 Game Development](https://developer.mozilla.org/en-US/docs/Games)
- Game Design: `.github/prompts/game-design.md`
