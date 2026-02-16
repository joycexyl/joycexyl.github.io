# Personal Website Project Plan

## Problem Statement
Build a personal website with a creative/artistic design featuring an About Me section, deployable to GitHub Pages at `joycexyl/joycexyl.github.io`. The project should use Terminal-based Copilot with custom agents, skills, and prompts to orchestrate the entire process without manual coding.

## Proposed Approach
Create a system of specialized custom agents that work together to:
1. Design and generate the HTML structure
2. Create stylish CSS for a creative/artistic design
3. Handle deployment configuration for GitHub Pages
4. Ensure expandability for future sections

The agents will follow GitHub Copilot CLI conventions with `.agent.md` files containing YAML frontmatter.

## Architecture Overview

### Agent System
- **Web Designer Agent**: Designs the overall layout and structure
- **HTML Builder Agent**: Generates semantic HTML
- **CSS Stylist Agent**: Creates creative/artistic styling
- **Deployment Agent**: Configures GitHub Pages deployment

### Skills Library
- **html-generation**: Generate semantic, accessible HTML
- **css-styling**: Create modern, responsive CSS
- **git-operations**: Handle git commits and pushes
- **validation**: Validate HTML/CSS syntax

### Prompts
- **design-guidelines**: Instructions for creative/artistic design
- **html-instructions**: HTML coding standards and structure
- **css-instructions**: CSS best practices and creative styling
- **deployment-instructions**: GitHub Pages deployment steps

## Workplan

### Phase 1: Setup Agent Infrastructure
- [ ] Create `.github/agents/` directory
- [ ] Create `.github/skills/` directory
- [ ] Create `.github/prompts/` directory

### Phase 2: Define Prompts & Guidelines
- [ ] Create `design-guidelines.md` (creative/artistic design principles)
- [ ] Create `html-instructions.md` (HTML coding standards)
- [ ] Create `css-instructions.md` (CSS best practices)
- [ ] Create `deployment-instructions.md` (GitHub Pages setup)
- [ ] Create `coding-style.md` (general coding conventions)

### Phase 3: Build Skills
- [ ] Create `html-generation.skill.md` (HTML generation skill)
- [ ] Create `css-styling.skill.md` (CSS styling skill)
- [ ] Create `git-operations.skill.md` (Git workflow skill)
- [ ] Create `validation.skill.md` (HTML/CSS validation skill)

### Phase 4: Create Custom Agents
- [ ] Create `web-designer.agent.md` (design orchestrator)
- [ ] Create `html-builder.agent.md` (HTML generation specialist)
- [ ] Create `css-stylist.agent.md` (CSS styling specialist)
- [ ] Create `deployment.agent.md` (GitHub Pages deployment)

### Phase 5: Documentation
- [ ] Create README explaining the agent system
- [ ] Document how to extend with new sections
- [ ] Create usage guide for future updates

## Technical Specifications

### Agent File Format
Each `.agent.md` file must include:
```yaml
---
type: agent
model: claude-sonnet-4.5  # or appropriate model
tools: [bash, edit, create, view]  # relevant tools
description: "Brief description"
---
```

### Design Requirements
- **Style**: Creative/Artistic with bold, unique design
- **Sections**: About Me (expandable for future additions)
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized loading times

### Deployment Configuration
- **Repository**: joycexyl/joycexyl.github.io
- **Platform**: GitHub Pages
- **Branch**: main (or gh-pages)
- **Custom domain**: Optional (configurable later)

## Notes & Considerations

### Expandability Strategy
- Modular section design (each section is a separate HTML component)
- CSS variables for consistent theming
- Component-based structure for easy additions
- Clear documentation for adding new sections

### Creative/Artistic Design Elements
- Bold typography and color schemes
- Unique layouts (not traditional grid-based)
- Artistic animations and transitions
- Custom illustrations or abstract shapes
- Asymmetric layouts

### Quality Assurance
- HTML validation via W3C validator
- CSS validation
- Cross-browser compatibility
- Mobile responsiveness testing
- Accessibility audit

### Future Enhancements
- Blog section capability
- Project portfolio gallery
- Contact form integration
- Dark/light mode toggle
- Animation library

## Deployment Target
**Repository**: `joycexyl/joycexyl.github.io`  
**URL**: `https://joycexyl.github.io`



# Personal Website Project Plan - Phase 2

## Problem Statement
Extend the existing personal website at `joycexyl/joycexyl.github.io` with two new interactive features:
1. **Valentine's-themed Pac-Man Game** - A playable game with custom mechanics (Rose power-up 🌹 that enables heart projectiles 💕)
2. **Auto-updating arXiv Paper Feed** - Automatically refreshes daily at midnight with papers on biostatistics, statistics, and econometrics

Both features should be on separate pages with links from the homepage, built using the existing custom agent system without manual coding.

## Current State
✅ **Completed (Phase 1)**:
- Creative/artistic homepage with Hero and About Me sections
- Complete agent system (Web Designer, HTML Builder, CSS Stylist, Deployment)
- Skills library (HTML Generation, CSS Styling, Git Operations, Validation)
- Design guidelines and prompts
- Deployed to https://joycexyl.github.io

## Proposed Approach
Leverage existing agent system and create specialized agents for:
1. **Game Development**: Canvas-based Pac-Man with custom mechanics
2. **Data Integration**: arXiv API integration and automated updates
3. **Automation**: GitHub Actions for daily paper feed updates
4. **Multi-page Architecture**: Navigation between homepage, game, and papers

The new agents will follow GitHub Copilot CLI conventions with `.agent.md` files containing YAML frontmatter.

## Architecture Overview

### Existing Agent System (Phase 1)
- **Web Designer Agent**: Design orchestrator
- **HTML Builder Agent**: Semantic HTML generation
- **CSS Stylist Agent**: Creative/artistic styling
- **Deployment Agent**: GitHub Pages deployment

### New Specialized Agents (Phase 2)

#### Game Development Agent
**File**: `.github/agents/game-developer.agent.md`
- Design game architecture and mechanics
- Generate Canvas-based rendering logic
- Implement collision detection and game state
- Create Valentine's-themed visual assets
- Coordinate with existing agents for page integration

#### API Integration Agent
**File**: `.github/agents/api-integrator.agent.md`
- Interface with arXiv API
- Fetch and parse paper data
- Format paper information for display
- Handle API errors and rate limiting
- Cache paper data in repository

#### Automation Agent
**File**: `.github/agents/automation.agent.md`
- Design GitHub Actions workflows
- Schedule daily updates at midnight UTC
- Trigger arXiv API fetches
- Commit updated paper data
- Deploy changes automatically

### Enhanced Skills Library

#### JavaScript/Canvas Skill
**File**: `.github/skills/javascript-canvas.skill.md`
- Canvas API usage
- Game loop implementation
- Collision detection algorithms
- Animation and rendering
- Event handling (keyboard input)

#### API Integration Skill
**File**: `.github/skills/api-integration.skill.md`
- RESTful API requests
- XML/JSON parsing
- Data transformation
- Error handling
- Response caching

#### GitHub Actions Skill
**File**: `.github/skills/github-actions.skill.md`
- Workflow YAML syntax
- Cron scheduling
- Action triggers
- Environment variables
- Artifact handling

### New Prompts

#### Game Design Guidelines
**File**: `.github/prompts/game-design.md`
- Pac-Man mechanics specification
- Valentine's theme requirements
- Rose power-up behavior
- Heart projectile mechanics
- Classic maze layout

#### API Integration Guidelines
**File**: `.github/prompts/api-guidelines.md`
- arXiv API documentation
- Query parameters for topics
- Rate limiting considerations
- Data parsing strategies
- Error handling patterns

#### Automation Guidelines
**File**: `.github/prompts/automation-guidelines.md`
- GitHub Actions best practices
- Cron syntax for scheduling
- Workflow security
- Commit automation
- Deployment triggers

## Workplan

### Phase 1: Homepage & Agent System ✅ COMPLETED
- [x] Create agent infrastructure
- [x] Design creative homepage
- [x] Deploy to GitHub Pages
- [x] Create documentation

### Phase 2: New Agents & Skills Infrastructure
- [ ] Create `.github/agents/game-developer.agent.md`
- [ ] Create `.github/agents/api-integrator.agent.md`
- [ ] Create `.github/agents/automation.agent.md`
- [ ] Create `.github/skills/javascript-canvas.skill.md`
- [ ] Create `.github/skills/api-integration.skill.md`
- [ ] Create `.github/skills/github-actions.skill.md`
- [ ] Create `.github/prompts/game-design.md`
- [ ] Create `.github/prompts/api-guidelines.md`
- [ ] Create `.github/prompts/automation-guidelines.md`

### Phase 3: Valentine's Pac-Man Game
- [ ] Design game architecture and file structure
- [ ] Create `game.html` page with Canvas element
- [ ] Create `game.css` for Valentine's theme styling
- [ ] Create `pacman.js` - Core game logic
  - [ ] Maze rendering (classic layout)
  - [ ] Pac-Man movement (keyboard controls)
  - [ ] Pellet system
  - [ ] Ghost AI and movement
  - [ ] Collision detection
- [ ] Implement Rose power-up system
  - [ ] Random rose spawning
  - [ ] Power-up timer
  - [ ] Visual indicator
- [ ] Implement Heart projectile system
  - [ ] Heart shooting in facing direction
  - [ ] Projectile movement and collision
  - [ ] Ghost elimination
- [ ] Add game states (start, playing, game over)
- [ ] Add score and lives display
- [ ] Add Valentine's theme graphics and colors
- [ ] Test game mechanics and balance
- [ ] Add link from homepage to game page

### Phase 4: arXiv Paper Feed
- [ ] Design paper feed page layout
- [ ] Create `papers.html` page
- [ ] Create `papers.css` for feed styling
- [ ] Create `papers.js` for dynamic loading
- [ ] Create `scripts/fetch-papers.js` - Node.js script
  - [ ] Query arXiv API for biostatistics
  - [ ] Query arXiv API for statistics
  - [ ] Query arXiv API for econometrics
  - [ ] Parse XML responses
  - [ ] Format paper data (title, authors, abstract, PDF link)
  - [ ] Save to `data/papers.json`
- [ ] Design paper card layout
  - [ ] Paper title (linked to PDF)
  - [ ] Authors list
  - [ ] Abstract (expandable/collapsible)
  - [ ] Publication date
  - [ ] arXiv category tags
- [ ] Implement search/filter functionality
- [ ] Add pagination or infinite scroll
- [ ] Add link from homepage to papers page

### Phase 5: GitHub Actions Automation
- [ ] Create `.github/workflows/update-papers.yml`
  - [ ] Schedule: Daily at midnight UTC (cron: '0 0 * * *')
  - [ ] Setup Node.js environment
  - [ ] Run fetch-papers.js script
  - [ ] Configure git user
  - [ ] Commit updated papers.json
  - [ ] Push changes to main branch
- [ ] Test workflow manually
- [ ] Verify automatic deployment after workflow
- [ ] Add workflow status badge to README

### Phase 6: Homepage Integration & Navigation
- [ ] Update `index.html` with navigation menu
- [ ] Add link to Pac-Man game
- [ ] Add link to arXiv papers feed
- [ ] Create consistent header/navigation across all pages
- [ ] Ensure responsive navigation
- [ ] Add back-to-home links on all pages

### Phase 7: Testing & Validation
- [ ] Test Pac-Man game
  - [ ] Keyboard controls
  - [ ] Ghost AI behavior
  - [ ] Rose power-up mechanics
  - [ ] Heart projectile system
  - [ ] Game over conditions
  - [ ] Score tracking
- [ ] Test arXiv feed
  - [ ] API integration
  - [ ] Data display
  - [ ] Link functionality
  - [ ] Auto-update workflow
- [ ] Cross-browser testing (all pages)
- [ ] Mobile responsiveness (all pages)
- [ ] Accessibility validation (all pages)
- [ ] Performance optimization
- [ ] HTML/CSS validation

### Phase 8: Documentation & Deployment
- [ ] Update README with new features
- [ ] Document game controls and mechanics
- [ ] Document arXiv feed configuration
- [ ] Update `.github/EXTENDING.md` with game/API patterns
- [ ] Update `.github/USAGE.md` with new agent examples
- [ ] Create troubleshooting guide
- [ ] Final deployment
- [ ] Verify all features live on https://joycexyl.github.io

## Technical Specifications

### Site Structure
```
joycexyl.github.io/
├── index.html           # Homepage (existing)
├── styles.css           # Homepage styles (existing)
├── game.html            # Pac-Man game page (new)
├── game.css             # Game styles (new)
├── pacman.js            # Game logic (new)
├── papers.html          # arXiv feed page (new)
├── papers.css           # Papers page styles (new)
├── papers.js            # Papers display logic (new)
├── data/
│   └── papers.json      # Cached paper data (new)
├── scripts/
│   └── fetch-papers.js  # arXiv API fetcher (new)
├── .github/
│   ├── workflows/
│   │   └── update-papers.yml  # Daily update workflow (new)
│   ├── agents/
│   │   ├── web-designer.agent.md (existing)
│   │   ├── html-builder.agent.md (existing)
│   │   ├── css-stylist.agent.md (existing)
│   │   ├── deployment.agent.md (existing)
│   │   ├── game-developer.agent.md (new)
│   │   ├── api-integrator.agent.md (new)
│   │   └── automation.agent.md (new)
│   ├── skills/
│   │   ├── html-generation.skill.md (existing)
│   │   ├── css-styling.skill.md (existing)
│   │   ├── git-operations.skill.md (existing)
│   │   ├── validation.skill.md (existing)
│   │   ├── javascript-canvas.skill.md (new)
│   │   ├── api-integration.skill.md (new)
│   │   └── github-actions.skill.md (new)
│   └── prompts/
│       ├── design-guidelines.md (existing)
│       ├── html-instructions.md (existing)
│       ├── css-instructions.md (existing)
│       ├── deployment-instructions.md (existing)
│       ├── coding-style.md (existing)
│       ├── game-design.md (new)
│       ├── api-guidelines.md (new)
│       └── automation-guidelines.md (new)
└── README.md (updated)
```

### Valentine's Pac-Man Game Requirements

#### Core Mechanics
1. **Classic Pac-Man**
   - Grid-based maze with classic layout
   - Pac-Man controlled by arrow keys
   - Dots (pellets) to collect
   - 4 ghosts with chase AI
   - Lives system (3 lives)
   - Score tracking
   - Game over when all lives lost

2. **Valentine's Rose Power-Up 🌹**
   - Randomly spawns in maze
   - Temporary spawn (disappears after time)
   - When eaten: enters powered state
   - Duration: 5-10 seconds
   - Visual indicator for active state

3. **Heart Projectile System 💕**
   - Shoots hearts in facing direction
   - Hearts travel across maze
   - Eliminates ghosts on contact
   - Continuous shooting while powered
   - Hearts disappear at walls/edges

#### Visual Design
- Valentine's color scheme (pinks, reds, purples)
- Rose sprite for power-up
- Heart sprites for projectiles
- Pac-Man with Valentine's styling
- Ghost colors: pink, red, purple, lavender
- Maze walls with romantic styling
- Score and lives display
- Power-up timer display

#### Technical Implementation
- HTML5 Canvas for rendering
- JavaScript game loop (60 FPS)
- Grid-based collision detection
- State machine for game states
- Keyboard event handlers
- Sprite rendering system
- Particle effects (optional)

### arXiv Paper Feed Requirements

#### Data Source
- **arXiv API**: http://export.arxiv.org/api/query
- **Categories**:
  - stat.ME (Statistics Methodology)
  - stat.AP (Statistics Applications)
  - econ.EM (Econometrics)
  - q-bio (Quantitative Biology - biostatistics)

#### Query Parameters
```
search_query=cat:stat.ME OR cat:stat.AP OR cat:econ.EM OR cat:q-bio.QM
sortBy=submittedDate
sortOrder=descending
max_results=50
```

#### Paper Data Structure
```json
{
  "papers": [
    {
      "id": "2024.12345",
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2"],
      "abstract": "Full abstract text...",
      "published": "2024-02-15",
      "categories": ["stat.ME", "stat.AP"],
      "pdfUrl": "https://arxiv.org/pdf/2024.12345.pdf",
      "arxivUrl": "https://arxiv.org/abs/2024.12345"
    }
  ],
  "lastUpdated": "2024-02-16T00:00:00Z"
}
```

#### Page Features
1. **Paper Listing**
   - Card-based layout
   - Paper title (linked to PDF)
   - Authors (comma-separated)
   - Abstract (collapsible)
   - Publication date
   - Category tags
   - arXiv link

2. **Interactions**
   - Click abstract to expand/collapse
   - Click title → opens PDF
   - Click arXiv link → opens abstract page
   - Filter by category
   - Search by keyword

3. **Auto-Update**
   - GitHub Actions workflow
   - Runs daily at midnight UTC
   - Fetches latest papers
   - Updates papers.json
   - Commits and deploys automatically

#### Technical Implementation
- Node.js script for API fetching
- XML parsing (arXiv returns XML)
- JSON data storage
- Vanilla JS for display logic
- Responsive card layout
- GitHub Actions for automation

## Notes & Considerations

### Game Development Considerations

#### Performance
- Optimize game loop for 60 FPS
- Use requestAnimationFrame for smooth rendering
- Minimize canvas redraws (dirty rectangles)
- Sprite caching for repeated elements
- Efficient collision detection (grid-based)

#### Cross-Browser Compatibility
- Test Canvas API support
- Test keyboard event handling
- Fallback for older browsers
- Mobile touch controls (optional)

#### Game Balance
- Ghost speed relative to Pac-Man
- Rose spawn frequency (not too common/rare)
- Power-up duration (5-10 seconds)
- Heart projectile speed
- Difficulty progression

#### Accessibility
- Keyboard controls only (arrows + space)
- Color-blind friendly palette
- Clear visual feedback
- Pause functionality
- Instructions/tutorial

### arXiv Integration Considerations

#### API Rate Limiting
- arXiv allows ~1 request per 3 seconds
- Implement delays between requests
- Cache results in papers.json
- Update once daily (not on every page load)

#### Error Handling
- Network failures
- API changes
- Malformed XML responses
- Empty result sets
- Timeout handling

#### Data Freshness
- Daily updates sufficient
- Display last update timestamp
- Manual refresh option (future)
- Fallback to cached data if API fails

#### Content Display
- Truncate long abstracts
- Handle LaTeX in titles/abstracts
- Format author names consistently
- Category badge styling
- Responsive card layout

### GitHub Actions Considerations

#### Workflow Security
- No API keys needed (arXiv is public)
- Use GITHUB_TOKEN for commits
- Configure git user properly
- Verify commit signatures

#### Workflow Reliability
- Handle API failures gracefully
- Don't fail if no new papers
- Retry logic for network issues
- Notification on failures (optional)

#### Cost & Performance
- Free tier: 2000 minutes/month
- Workflow should complete in <5 minutes
- Run once daily = ~150 minutes/month
- Well within free tier limits

### Multi-Page Architecture

#### Navigation
- Consistent header across all pages
- Active page indicator
- Mobile-responsive menu
- Breadcrumb navigation

#### Design Consistency
- Use existing CSS variables
- Maintain Valentine's theme across game page
- Maintain creative/artistic style
- Responsive on all pages

#### Code Organization
- Separate JS files for game and papers
- Shared CSS utilities
- Modular component structure
- Clear file naming conventions

## Deployment Target
**Repository**: `joycexyl/joycexyl.github.io`  
**URL**: `https://joycexyl.github.io`

## Agent Coordination Strategy

### Valentine's Pac-Man Game Implementation

**Lead Agent**: Game Developer Agent

**Workflow**:
1. **Game Developer Agent** designs game architecture
2. **HTML Builder Agent** creates game.html structure
3. **Game Developer Agent** implements pacman.js logic
4. **CSS Stylist Agent** styles game.css with Valentine's theme
5. **Deployment Agent** validates and deploys

**Key Coordination Points**:
- Game Developer provides Canvas element specs to HTML Builder
- Game Developer defines color palette for CSS Stylist
- All agents ensure Valentine's theme consistency

### arXiv Paper Feed Implementation

**Lead Agent**: API Integrator Agent

**Workflow**:
1. **API Integrator Agent** designs API integration
2. **HTML Builder Agent** creates papers.html structure
3. **API Integrator Agent** implements fetch-papers.js script
4. **CSS Stylist Agent** styles papers.css with card layout
5. **Automation Agent** creates GitHub Actions workflow
6. **Deployment Agent** validates and deploys

**Key Coordination Points**:
- API Integrator defines data structure for display
- Automation Agent schedules daily updates
- HTML Builder creates dynamic paper card templates

### Homepage Integration

**Lead Agent**: Web Designer Agent

**Workflow**:
1. **Web Designer Agent** coordinates navigation updates
2. **HTML Builder Agent** adds navigation menu to index.html
3. **CSS Stylist Agent** styles navigation consistently
4. **Deployment Agent** deploys integrated site

## Success Metrics

### Valentine's Pac-Man Game
✓ Game loads and renders properly
✓ Keyboard controls work smoothly
✓ Ghosts chase Pac-Man intelligently
✓ Rose power-up spawns randomly
✓ Heart projectiles eliminate ghosts
✓ Score and lives tracked correctly
✓ Game over works as expected
✓ Valentine's theme is visually appealing
✓ Runs at 60 FPS on modern browsers
✓ Accessible via homepage link

### arXiv Paper Feed
✓ Daily update workflow runs successfully
✓ Papers fetch from arXiv API
✓ Data displays correctly (title, authors, abstract, link)
✓ Links to PDFs work
✓ Page updates daily at midnight
✓ Error handling works gracefully
✓ Responsive on mobile devices
✓ Search/filter works (if implemented)
✓ Accessible via homepage link
✓ Last update timestamp displayed

### Overall Integration
✓ Navigation works across all pages
✓ Design consistency maintained
✓ All pages responsive
✓ All pages accessible (WCAG 2.1 AA)
✓ All pages validated (HTML/CSS)
✓ Performance optimized (Lighthouse 90+)
✓ Cross-browser compatible
✓ Documentation complete

## Deployment Target
**Repository**: `joycexyl/joycexyl.github.io`  
**URL**: `https://joycexyl.github.io`  
**New Pages**:
- `https://joycexyl.github.io/game.html` - Valentine's Pac-Man
- `https://joycexyl.github.io/papers.html` - arXiv Paper Feed

## Timeline Estimate
- **Phase 2** (New Agents/Skills): ~30 minutes
- **Phase 3** (Pac-Man Game): ~2-3 hours
- **Phase 4** (arXiv Feed): ~1-2 hours
- **Phase 5** (GitHub Actions): ~30 minutes
- **Phase 6** (Homepage Integration): ~30 minutes
- **Phase 7** (Testing): ~1 hour
- **Phase 8** (Documentation): ~30 minutes

**Total**: ~6-8 hours of implementation time

*Note: Using the agent system should significantly reduce manual coding time*
