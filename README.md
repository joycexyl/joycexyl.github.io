# Personal Website Agent System

## Overview
This repository uses a custom agent system built for GitHub Copilot CLI to create, maintain, and deploy a creative/artistic personal website. The system consists of specialized agents that work together to handle all aspects of web development without manual coding.

## Agent Architecture

### Specialized Agents

#### 1. Web Designer Agent
**File**: `.github/agents/web-designer.agent.md`  
**Role**: Design orchestrator and project coordinator  
**Responsibilities**:
- Define overall design strategy
- Coordinate other agents
- Ensure design consistency
- Make high-level design decisions
- Quality assurance

#### 2. HTML Builder Agent
**File**: `.github/agents/html-builder.agent.md`  
**Role**: Semantic HTML specialist  
**Responsibilities**:
- Generate valid HTML5 markup
- Ensure accessibility (WCAG 2.1 AA)
- Implement semantic structure
- Optimize for performance
- Follow HTML best practices

#### 3. CSS Stylist Agent
**File**: `.github/agents/css-stylist.agent.md`  
**Role**: Creative styling specialist  
**Responsibilities**:
- Implement creative/artistic designs
- Create responsive layouts
- Add animations and transitions
- Ensure accessibility (contrast, focus states)
- Optimize CSS performance

#### 4. Deployment Agent
**File**: `.github/agents/deployment.agent.md`  
**Role**: Deployment and validation specialist  
**Responsibilities**:
- Validate HTML/CSS
- Run accessibility checks
- Handle git operations
- Deploy to GitHub Pages
- Monitor deployment status

## Skills Library

### Available Skills

#### HTML Generation Skill
**File**: `.github/skills/html-generation.skill.md`  
Provides templates and patterns for semantic HTML generation, accessibility implementation, and component creation.

#### CSS Styling Skill
**File**: `.github/skills/css-styling.skill.md`  
Contains modern CSS techniques, creative design patterns, responsive strategies, and performance optimizations.

#### Git Operations Skill
**File**: `.github/skills/git-operations.skill.md`  
Defines git workflows, commit standards, deployment processes, and troubleshooting procedures.

#### Validation Skill
**File**: `.github/skills/validation.skill.md`  
Outlines validation processes for HTML, CSS, accessibility, performance, and responsive design.

## Design Guidelines

### Prompts & Standards

#### Design Guidelines
**File**: `.github/prompts/design-guidelines.md`  
Creative/artistic design principles, layout strategies, accessibility requirements, and performance standards.

#### HTML Instructions
**File**: `.github/prompts/html-instructions.md`  
HTML5 standards, semantic elements, accessibility requirements, and code quality rules.

#### CSS Instructions
**File**: `.github/prompts/css-instructions.md`  
CSS best practices, modern techniques, creative patterns, and responsive design strategies.

#### Deployment Instructions
**File**: `.github/prompts/deployment-instructions.md`  
GitHub Pages configuration, deployment workflows, validation checklists, and troubleshooting guides.

#### Coding Style
**File**: `.github/prompts/coding-style.md`  
General coding conventions, naming standards, formatting rules, and version control practices.

## How to Use the Agent System

### Paper Feed Management

The paper feed is automatically updated with the latest research from arXiv in:
- **stat.ME**: Statistics - Methodology
- **stat.AP**: Statistics - Applications
- **econ.EM**: Economics - Econometrics
- **q-bio.QM**: Quantitative Biology - Quantitative Methods (Biostatistics)

**Fetch new papers manually:**
```bash
cd scripts
npm install
node fetch-papers.js
```

**Features:**
- Fetches 50 most recent papers
- Handles rate limiting (3-second delays)
- Automatic retry with exponential backoff
- Data validation
- Clean JSON output to `data/papers.json`

### Using Custom Agents with GitHub Copilot CLI

The custom agents are automatically available in GitHub Copilot CLI when you reference them with the `@` symbol:

```bash
# Design coordination
@web-designer create homepage with hero and about sections

# HTML generation
@html-builder generate semantic HTML for About Me section

# CSS styling
@css-stylist style the About Me section with creative/artistic design

# Deployment
@deployment validate and deploy the website to GitHub Pages
```

### Agent Workflow Example

#### Creating a New Homepage

1. **Start with Web Designer Agent**
   ```bash
   @web-designer design a creative homepage with About Me section
   ```
   - Analyzes requirements
   - Coordinates other agents
   - Ensures quality standards

2. **HTML Builder Generates Structure**
   - Creates semantic HTML5
   - Implements accessibility features
   - Optimizes for performance

3. **CSS Stylist Adds Visual Design**
   - Implements creative/artistic styling
   - Creates responsive layouts
   - Adds animations and effects

4. **Deployment Agent Validates & Deploys**
   - Validates HTML/CSS
   - Checks accessibility
   - Deploys to GitHub Pages
   - Verifies live site

## Current Website Structure

### Repository: joycexyl/joycexyl.github.io
### Live URL: https://joycexyl.github.io

### File Structure
```
joycexyl.github.io/
├── index.html          # Homepage
├── papers.html         # Research papers feed
├── game.html           # Interactive game
├── styles.css          # Main stylesheet
├── papers.css          # Papers page stylesheet
├── game.css            # Game stylesheet
├── papers.js           # Papers page client-side logic
├── pacman.js           # Game logic
├── data/
│   └── papers.json     # Cached arXiv papers data
├── scripts/
│   ├── fetch-papers.js # arXiv API fetcher
│   ├── package.json    # Node.js dependencies
│   └── node_modules/   # Dependencies
├── README.md           # This file
└── .github/
    ├── agents/         # Custom agent definitions
    │   ├── web-designer.agent.md
    │   ├── html-builder.agent.md
    │   ├── css-stylist.agent.md
    │   ├── game-developer.agent.md
    │   ├── api-integrator.agent.md
    │   ├── automation.agent.md
    │   └── deployment.agent.md
    ├── skills/         # Reusable skill definitions
    │   ├── html-generation.skill.md
    │   ├── css-styling.skill.md
    │   ├── javascript-canvas.skill.md
    │   ├── api-integration.skill.md
    │   ├── github-actions.skill.md
    │   ├── git-operations.skill.md
    │   └── validation.skill.md
    └── prompts/        # Design guidelines and standards
        ├── design-guidelines.md
        ├── html-instructions.md
        ├── css-instructions.md
        ├── game-design.md
        ├── api-guidelines.md
        ├── automation-guidelines.md
        ├── deployment-instructions.md
        └── coding-style.md
```

## Design Specifications

### Current Design: Creative/Artistic
- **Style**: Bold, unique, non-traditional layouts
- **Typography**: Expressive, large headings with mixed font styles
- **Colors**: Bold gradients and contrasting palettes
- **Layouts**: Asymmetric, creative positioning
- **Animations**: Smooth, artistic transitions
- **Sections**: Hero, About Me, Research Papers Feed, Footer

### Features
- **Homepage**: Creative hero section with about me content
- **Papers Feed**: arXiv research papers in Statistics, Econometrics, and Biostatistics
  - Client-side search and filtering
  - Responsive card-based layout
  - Collapsible abstracts
  - Category badges
  - Automated data fetching from arXiv API
- **Interactive Game**: Canvas-based game with creative design

### Technical Standards
- **Accessibility**: WCAG 2.1 Level AA
- **Responsive**: Mobile-first, breakpoints at 375px, 768px, 1024px, 1440px
- **Performance**: Lighthouse score ≥ 90
- **SEO**: Optimized meta tags and semantic structure
- **Browser Support**: Last 2 versions of major browsers

## Documentation

### Development Process with GitHub Copilot CLI

This section documents how GitHub Copilot CLI was used to build each component of the website, including the prompts used, what worked well, and what required iteration.

#### Homepage Development

**Initial Prompt:**
```
@.github/plan_prompt.md build a plan.md following these instructions
```

**What Worked Well:**
- The planning phase helped structure the multi-page website architecture
- Copilot CLI understood the creative/artistic design requirements
- Generated semantic HTML with proper accessibility attributes
- Created responsive CSS with smooth animations

**Iterations Required:**
- Initial design was too conservative - needed to emphasize "creative/artistic" theme
- Adjusted typography and color scheme multiple times for bolder appearance
- Fine-tuned responsive breakpoints for mobile devices

**Follow-up Prompts:**
```
implement the plan
push changes
```

#### Research Papers Feed (arXiv Integration)

**Initial Prompt:**
```
[[PLAN]] add arXiv paper feed for biostatistics, statistics, and econometrics papers
```

**What Worked Well:**
- Copilot CLI correctly implemented arXiv API integration
- Generated proper XML parsing for arXiv responses
- Created responsive card-based layout automatically
- Implemented client-side search/filter functionality

**Iterations Required:**
- **API Rate Limiting**: Initial implementation didn't handle 3-second delays between requests
  - Fixed: Added exponential backoff and retry logic
- **Data Validation**: Needed better error handling for malformed XML
  - Fixed: Added try-catch blocks and data validation
- **Category Filtering**: Initial implementation only searched titles
  - Fixed: Extended search to abstracts and authors

**Key Learning:** When working with external APIs, always plan for error cases and rate limiting upfront.

#### Valentine's Pac-Man Game

**Initial Prompt:**
```
[[PLAN]] create Valentine's themed Pac-Man game with rose power-ups and heart projectiles
```

**What Worked Well:**
- Canvas rendering setup was generated correctly
- Game loop and basic movement mechanics worked immediately
- Rose power-up and heart projectile systems implemented as specified

**Iterations Required (Many):**

1. **Canvas Sizing Issues** (3 iterations)
   - Problem: Ghosts and Pac-Man spawned off-screen
   - Root Cause: Fixed 800x600px canvas with CSS scaling caused coordinate mismatch
   - Solution: Dynamic `resizeCanvas()` function with proper aspect ratio calculation
   - Prompt: `"the Pac Man game is not working all the way. three of the ghosts instantly float off the screen"`

2. **Display Zoom** (2 iterations)
   - Problem: Game too large to see everything
   - First attempt: Made canvas 50% bigger (misunderstood requirement)
   - Solution: Added `zoom: 0.5` CSS property
   - Prompt: `"i mean change the default zoom so that everything is smaller by 50%, not bigger"`

3. **Ghost Release Timing** (4 iterations)
   - Problem: All ghosts tried to exit immediately, clipped through walls
   - Solution: Staggered release timers (0s, 3s, 6s, 9s) + smart exit logic
   - Key Fix: Ghosts move horizontally to center columns (13-14) before moving up
   - Prompt: `"Ghost 1 doesn't move at all. Ghost 2 releases at 3s but still moves upwards through walls"`

4. **Ghost AI Pathfinding** (7+ iterations) ⭐ **Most Complex**
   
   **Iteration 1-2:** Wall Collision Detection
   - Initial: Ghosts could move through walls
   - Added: `isWalkable()` check before movement
   - Problem: Ghosts got stuck when hitting walls
   
   **Iteration 3-4:** Random Direction Picker
   - Added: Pick random valid direction at wall collision
   - Problem: Created conflict with chase AI, ghosts stuck on walls
   
   **Iteration 5:** Unified AI System
   - Problem: Two AI systems fighting (grid center AI vs wall collision AI)
   - Solution: Single decision point with personality-based behavior
   - Added: `hasExitedHouse` flag to separate exit logic from chase logic
   - Prompt: `"the ghosts are stuck and don't chase the player"`
   
   **Iteration 6:** Wall Collision Direction Change
   - Problem: Ghosts bounced left-right indefinitely
   - Attempted: Perpendicular-only filter with personality scoring
   - Failed: Over-complicated, still bounced
   - Prompt: `"the ghosts get stuck on the wall and don't change directions once colliding"`
   
   **Iteration 7:** Simplified Random Selection
   - Simplified: Remove forward direction, pick random from remaining
   - Problem: Still bouncing
   - Prompt: `"can't you just write the code so that whenever a ghost bumps into the wall, its new direction is different randomly chosen among the other three directions"`
   
   **Iteration 8:** Perpendicular-Only Turns
   - Added: Strict rule - horizontal movement → vertical turns only
   - Code worked correctly, but still appeared broken
   - Cause: Browser cache showing old code
   - Solution: Added cache-busting `?v=2` parameter
   - Prompt: `"please change it so that if the ghost hits the wall from the right or left, it has to go up or down"`
   
   **Iteration 9:** Grid Center Direction Changes
   - Final Problem: Ghosts hitting walls 60 times/second causing rapid flickering
   - Solution: Only allow direction changes when at grid center (within 3px)
   - This prevented bouncing effect between frames
   - Prompt: `"the ghosts are not making the correct turns. the changes are not properly being implemented"`

**Key Learnings from Ghost AI:**
- Start simple, add complexity only when needed
- Debug with console logging before making assumptions
- Browser caching can make working code appear broken - use cache-busting
- Frame-by-frame collision can cause unexpected behavior - gate changes to specific positions
- Clear requirements help: "perpendicular turns only" was easier to implement than "smart AI that avoids walls"

**Final Ghost AI Architecture:**
```javascript
// Two decision points:
1. Grid Center (every grid intersection):
   - Get all walkable directions
   - Filter out reverse direction
   - Pick based on personality (aggressive, ambush, random, scatter)

2. Wall Collision (when hitting wall at grid center):
   - Get all walkable directions
   - Filter to ONLY perpendicular (horizontal → vertical, vertical → horizontal)
   - Pick random perpendicular direction
   - Only execute when at grid center (prevents flickering)
```

#### Content Updates

**Prompts:**
```
"create an index.html, all i can see is the read me"
"push changes"
```

**What Worked Well:**
- Quick updates to personal information worked smoothly
- Git operations handled automatically
- No manual file editing required

### Overall Development Insights

**What Worked Exceptionally Well:**
1. **Planning Mode (`[[PLAN]]`)**: Creating structured plans before implementation prevented scope creep
2. **Iterative Refinement**: Copilot CLI handled multiple rounds of fixes without losing context
3. **Specific Problem Descriptions**: Clear descriptions of issues led to faster solutions
4. **Code Analysis**: Copilot CLI could analyze existing code and identify issues

**What Required Multiple Iterations:**
1. **Complex Game Physics**: Ghost AI required 9+ iterations to get right
2. **Browser Caching Issues**: Had to learn to add cache-busting parameters
3. **Coordinate System Mismatches**: Canvas sizing issues required understanding root causes
4. **AI Behavior Conflicts**: Multiple systems interacting required careful orchestration

**Best Practices Discovered:**
1. **Use Planning Mode First**: `[[PLAN]]` before `implement` prevents wasted iterations
2. **Be Specific About Problems**: "ghosts bounce left-right" better than "ghosts broken"
3. **Request Debug Logging**: Ask for console logs when behavior unclear
4. **Test Incrementally**: Push small changes and test rather than large complex updates
5. **Cache-Bust When Needed**: Add `?v=N` to script tags for forcing fresh loads
6. **Clarify Ambiguity Immediately**: When Copilot asks questions, answer them clearly

**Prompts That Worked Best:**
- ✅ `"[[PLAN]] <specific feature request>"`
- ✅ `"implement the plan"`
- ✅ `"<specific observed problem> please fix"`
- ✅ `"push changes"`

**Prompts That Needed Improvement:**
- ❌ `"make it better"` (too vague)
- ❌ `"fix the game"` (not specific enough)
- ⚠️ `"debug this"` (worked, but asking for specific debug logging better)

**Time Investment:**
- Homepage: ~30 minutes (1 iteration)
- Papers Feed: ~1 hour (3 iterations for API handling)
- Pac-Man Game: ~4 hours (9+ iterations for ghost AI)
- Content Updates: ~5 minutes (minimal iterations)

**Total Development Time:** ~5.5 hours with Copilot CLI assistance
**Estimated Time Without AI:** ~20-30 hours (especially for game physics and AI)

### Development Process with GitHub Copilot CLI

### Guides
- **Extension Guide**: `.github/EXTENDING.md` - How to add new sections and features
- **Usage Guide**: `.github/USAGE.md` - Quick reference for using agents

### Quick Start

**Create a homepage:**
```bash
@web-designer create a creative homepage with About Me section
```

**Add new section:**
```bash
@web-designer add a projects portfolio section
```

**Deploy:**
```bash
@deployment validate and deploy website
```

## Resources

### Validation Tools
- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

### Documentation
- [GitHub Copilot Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: 2026-02-13  
**Version**: 1.0  
**Agent System**: GitHub Copilot CLI Custom Agents