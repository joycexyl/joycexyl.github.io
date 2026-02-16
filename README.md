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