# Valentine's Pac-Man Game Design Guidelines

## Game Overview
A browser-based Pac-Man game with Valentine's Day theme, featuring classic mechanics enhanced with a unique rose power-up system that enables heart projectile shooting.

## Core Mechanics

### Classic Pac-Man Elements

#### Maze
- **Layout**: Traditional Pac-Man maze design with corridors and corners
- **Size**: 28x31 grid (classic dimensions)
- **Elements**:
  - Walls (impassable)
  - Corridors (walkable paths)
  - Pellets (collectible dots)
  - Power pellet corners (future enhancement)

#### Pac-Man (Player)
- **Movement**: Grid-based, 4-direction (up, down, left, right)
- **Speed**: ~100-120 pixels per second
- **Controls**: Arrow keys
- **Animation**: Opening/closing mouth
- **Lives**: Start with 3 lives
- **Collision**: Loses life when touching ghost

#### Pellets
- **Placement**: Throughout walkable maze paths
- **Effect**: +10 points when collected
- **Win Condition**: Collect all pellets to complete level

#### Ghosts (Enemies)
- **Count**: 4 ghosts with distinct colors and behaviors
- **Colors** (Valentine's theme):
  - Red (aggressive chaser)
  - Pink (ambusher)
  - Purple (random/patrol)
  - Lavender (shy/scatter)
- **Speed**: ~80-100 pixels per second (slightly slower than Pac-Man)
- **AI Behaviors**:
  - **Chase Mode**: Target Pac-Man's position
  - **Scatter Mode**: Return to corners periodically
  - **Personality Variations**: Each ghost has unique targeting strategy
- **Collision**: Touching Pac-Man causes life loss

### Valentine's Enhancements

#### Rose Power-Up 🌹

**Appearance**:
- Rose emoji or custom rose sprite
- Pink/red color scheme
- Glowing or pulsing animation
- Larger than pellets for visibility

**Spawning Logic**:
- **Frequency**: Random spawn every 10-20 seconds
- **Location**: Random valid (walkable, empty) maze position
- **Duration**: Stays visible for 5-10 seconds before despawning
- **Max Active**: Only 1 rose at a time
- **Respawn**: New rose spawns after previous is eaten or despawns

**Effect When Collected**:
- Pac-Man enters "powered" state for 8 seconds
- Enables heart projectile shooting
- Visual indicator (glow, color change, or sparkles around Pac-Man)
- Power-up timer displayed in UI
- +50 bonus points

#### Heart Projectile System 💕

**Activation**:
- Only active during rose-powered state
- Automatic continuous fire (no button press needed)
- Fires in Pac-Man's current facing direction

**Projectile Behavior**:
- **Speed**: ~200 pixels per second (2x Pac-Man speed)
- **Firing Rate**: 1 heart every 0.5 seconds
- **Direction**: Straight line in Pac-Man's facing direction
- **Lifespan**: Travels until hitting wall or ghost
- **Max Active**: Limit to 5-8 hearts on screen simultaneously

**Visual Design**:
- Heart emoji 💕 or custom heart sprite
- Pink or red color
- Optional trail effect
- Small size (don't obscure maze)

**Collision**:
- **With Ghosts**: Heart disappears, ghost eliminated
- **With Walls**: Heart disappears
- **With Pac-Man**: No collision (passes through)
- **With Pellets**: No collision (hearts don't collect pellets)

**Ghost Elimination**:
- Ghost temporarily removed from game (5-10 seconds)
- Ghost respawns at starting position
- +200 points per ghost eliminated
- Visual effect (explosion, hearts, sparkles)

## Valentine's Theme Design

### Color Palette
- **Primary**: Pink (#FF69B4), Rose (#FF1493)
- **Secondary**: Red (#FF6B6B), Purple (#9B59B6)
- **Accents**: Lavender (#E6E6FA), White (#FFFFFF)
- **Background**: Light pink or cream (#FFF0F5)
- **Maze Walls**: Deep rose or burgundy (#8B0000)

### Visual Elements
- Rose sprites for power-up
- Heart sprites for projectiles
- Romantic maze wall styling (rounded corners)
- Valentine's UI elements (hearts for lives)
- Love-themed scoring display

### Typography
- Playful, romantic fonts
- Heart symbols in UI
- Pink/red text colors
- Soft shadows for depth

## Game States

### Menu State
- Title screen with "Valentine's Pac-Man"
- Instructions
- "Press SPACE to Start" prompt
- High score display

### Playing State
- Active gameplay
- Update all entities
- Check collisions
- Render maze, entities, UI
- Monitor lives and pellets

### Paused State
- Freeze game logic
- Display "PAUSED" overlay
- Press SPACE to resume

### Game Over State
- Display final score
- "GAME OVER" message
- "Press SPACE to Restart"
- Optional: High score entry

## UI Elements

### HUD (Heads-Up Display)
- **Score**: Top left, large font
- **Lives**: Top right, heart symbols (❤️❤️❤️)
- **Rose Power-Up Timer**: Progress bar or countdown when active
- **Level**: Top center (for future multi-level support)

### In-Game Messages
- "+10" for pellet collection (fade out)
- "+50" for rose collection
- "+200" for ghost elimination
- "READY!" at game start
- "PAUSED" when paused

## Scoring System

| Action | Points |
|--------|--------|
| Collect Pellet | +10 |
| Collect Rose | +50 |
| Eliminate Ghost | +200 |
| Complete Level | +1000 bonus |

## Difficulty Balance

### Pac-Man
- Speed: 100-120 px/s
- Powered State Duration: 8 seconds
- Lives: 3

### Ghosts
- Speed: 80-100 px/s (slower than Pac-Man)
- Chase/Scatter alternation every 20 seconds
- 4 ghosts with varied AI

### Power-Ups
- Rose spawn frequency: Every 10-20 seconds
- Rose duration on screen: 5-10 seconds
- Heart firing rate: 2 hearts/second
- Heart speed: 2x Pac-Man speed

## Accessibility

### Controls
- **Arrow Keys**: Move Pac-Man
- **Space**: Start game, pause/resume
- **Clear labeling** in instructions

### Visual
- High contrast between maze and background
- Color-blind friendly palette (test with simulators)
- Clear visual indicators for powered state

### Audio (Optional)
- Background music (muted by default)
- Sound effects for collection, elimination
- Mute toggle option

## Performance Requirements

- **Frame Rate**: 60 FPS
- **Canvas Size**: 800x600 pixels (or responsive)
- **Grid Cell Size**: ~20-30 pixels
- **Smooth movement**: Interpolation between grid positions
- **Collision Detection**: Efficient grid-based system

## Technical Specifications

### File Structure
```
game.html     - Game page structure
game.css      - Valentine's theme styling
pacman.js     - Main game logic
```

### Classes/Entities
- `Game` - Main game controller
- `Pacman` - Player entity
- `Ghost` - Enemy entity
- `Rose` - Power-up entity
- `Heart` - Projectile entity
- `Maze` - Level layout and collision
- `Pellet` - Collectible entity

### Game Loop
```javascript
function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  update(deltaTime);
  render();
  requestAnimationFrame(gameLoop);
}
```

## Future Enhancements
- Multiple levels with increasing difficulty
- Different maze layouts
- Additional power-up types
- Leaderboard
- Sound effects and music
- Mobile touch controls
- Difficulty settings

## Testing Requirements

### Functionality
- [ ] Pac-Man moves correctly in all directions
- [ ] Ghosts chase Pac-Man
- [ ] Pellets collected and counted
- [ ] Rose spawns randomly
- [ ] Hearts shoot and eliminate ghosts
- [ ] Collisions detected accurately
- [ ] Lives decrease on ghost collision
- [ ] Game over works
- [ ] Score tracks correctly

### Performance
- [ ] Runs at 60 FPS
- [ ] No lag or stuttering
- [ ] Smooth animations

### Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

### User Experience
- [ ] Controls responsive
- [ ] Visual feedback clear
- [ ] Instructions understandable
- [ ] Game balanced (not too easy/hard)

## Success Criteria
✓ Fun and engaging gameplay
✓ Valentine's theme visually appealing
✓ Rose power-up and heart mechanics work smoothly
✓ Classic Pac-Man feel maintained
✓ Smooth 60 FPS performance
✓ Accessible controls and visuals
✓ Works across modern browsers
