# Usage Guide: Custom Agent System

## Quick Reference

### Available Agents

| Agent | Command | Purpose |
|-------|---------|---------|
| Web Designer | `@web-designer` | Design coordination, project planning |
| HTML Builder | `@html-builder` | Semantic HTML generation |
| CSS Stylist | `@css-stylist` | Creative styling, responsive design |
| Deployment | `@deployment` | Validation, deployment, QA |

## Common Tasks

### Creating Content

#### Build a New Homepage
```bash
@web-designer create a creative homepage with hero and about sections
```

#### Add a New Section
```bash
@web-designer add a projects portfolio section
```

#### Update Existing Content
```bash
@html-builder update the About Me section with new text: [your content]
```

### Styling

#### Change Color Scheme
```bash
@css-stylist update color scheme to use [describe colors]
```

#### Improve Responsive Design
```bash
@css-stylist improve mobile responsiveness for the about section
```

#### Add Animations
```bash
@css-stylist add smooth entrance animations to all sections
```

### Deployment

#### Deploy with Full Validation
```bash
@deployment validate and deploy the website
```

#### Quick Deploy (Content Only)
```bash
@deployment deploy content updates
```

#### Troubleshoot Deployment
```bash
@deployment troubleshoot deployment issue: [describe problem]
```

### Validation

#### Check HTML
```bash
@deployment validate HTML structure
```

#### Check Accessibility
```bash
@deployment run accessibility checks
```

#### Test Performance
```bash
@deployment test website performance
```

## Agent Workflows

### Workflow 1: Complete Website from Scratch

```bash
# Step 1: Plan and design
@web-designer create a creative/artistic personal website with:
- Hero section with bold typography
- About Me section with image and bio
- Footer with social links

# The Web Designer will coordinate:
# - HTML Builder creates structure
# - CSS Stylist adds creative design
# - Deployment validates and deploys

# Step 2: Review and deploy
@deployment validate and deploy with full QA
```

### Workflow 2: Add New Feature

```bash
# Step 1: Request feature
@web-designer add a skills showcase section displaying my technical expertise

# Step 2: Review HTML structure
# (automatically coordinated by Web Designer)

# Step 3: Review CSS styling
# (automatically coordinated by Web Designer)

# Step 4: Deploy
@deployment deploy new section with validation
```

### Workflow 3: Update Design

```bash
# Step 1: Request design change
@css-stylist change the hero section to use a darker gradient background

# Step 2: Test responsive behavior
@css-stylist verify the new design works on mobile

# Step 3: Deploy
@deployment deploy design updates
```

### Workflow 4: Fix Issues

```bash
# Step 1: Identify issue
@web-designer troubleshoot: hero section text is hard to read on mobile

# Step 2: Get recommendation
# Web Designer analyzes and provides solution

# Step 3: Implement fix
# (Web Designer coordinates CSS Stylist)

# Step 4: Validate and deploy
@deployment validate and deploy fix
```

## Detailed Agent Capabilities

### Web Designer Agent

**What it does:**
- Coordinates all other agents
- Makes design decisions
- Ensures consistency
- Oversees quality

**When to use:**
- Starting a new project
- Adding major features
- Need design guidance
- Coordinating multiple changes
- Troubleshooting complex issues

**Example requests:**
```bash
@web-designer create homepage with creative/artistic style
@web-designer add portfolio section
@web-designer improve overall design consistency
@web-designer suggest improvements for better user experience
@web-designer troubleshoot [problem description]
```

### HTML Builder Agent

**What it does:**
- Generates semantic HTML5
- Implements accessibility features
- Creates component structure
- Follows best practices

**When to use:**
- Need HTML structure
- Adding new sections
- Updating content
- Fixing HTML issues
- Improving accessibility

**Example requests:**
```bash
@html-builder create semantic HTML for projects section
@html-builder update about section content
@html-builder add navigation menu
@html-builder improve heading hierarchy
@html-builder check HTML for accessibility issues
```

### CSS Stylist Agent

**What it does:**
- Creates beautiful designs
- Implements responsive layouts
- Adds animations
- Ensures visual consistency

**When to use:**
- Need styling
- Changing design
- Improving responsiveness
- Adding effects
- Updating color scheme

**Example requests:**
```bash
@css-stylist style the projects section with creative design
@css-stylist improve mobile responsiveness
@css-stylist add smooth animations
@css-stylist change color scheme to warmer tones
@css-stylist create asymmetric layout for about section
```

### Deployment Agent

**What it does:**
- Validates HTML/CSS
- Checks accessibility
- Tests performance
- Handles git operations
- Deploys to GitHub Pages

**When to use:**
- Ready to deploy
- Need validation
- Testing website
- Troubleshooting deployment
- Checking quality

**Example requests:**
```bash
@deployment validate and deploy website
@deployment run full validation checks
@deployment test performance
@deployment check accessibility
@deployment troubleshoot deployment failure
@deployment deploy with quick validation
```

## Tips & Best Practices

### Getting the Best Results

#### Be Specific
❌ **Vague**: `@web-designer update the website`  
✅ **Specific**: `@web-designer add a projects section with grid layout and hover effects`

#### Provide Context
❌ **No context**: `@css-stylist make it better`  
✅ **With context**: `@css-stylist improve readability on mobile by increasing font size and line height`

#### Break Down Complex Tasks
❌ **Too complex**: `@web-designer completely redesign everything with new colors, fonts, sections, and animations`  
✅ **Broken down**:
```bash
@web-designer update color scheme to use blues and greens
# Wait for completion, then:
@web-designer add smooth animations to sections
# Then:
@web-designer add new skills section
```

#### Use the Right Agent
❌ **Wrong agent**: `@css-stylist add a new HTML section`  
✅ **Right agent**: 
```bash
@html-builder create HTML for new section
# Then:
@css-stylist style the new section
```

Or better yet:
```bash
@web-designer add a new section
# Web Designer coordinates both HTML Builder and CSS Stylist
```

### Validation Workflow

**Before every deployment:**
```bash
@deployment validate HTML and CSS
```

**For major updates:**
```bash
@deployment run full validation including:
- HTML validation
- CSS validation
- Accessibility checks
- Performance testing
- Responsive design verification
```

**Quick content updates:**
```bash
@deployment deploy content updates
# Runs minimal validation, faster deployment
```

### Iterative Development

**Start simple:**
```bash
@web-designer create basic homepage with hero and about sections
```

**Then enhance:**
```bash
@css-stylist add creative animations to hero section
```

**Then expand:**
```bash
@web-designer add skills section
```

**Then optimize:**
```bash
@deployment optimize performance and validate
```

## Troubleshooting

### Issue: "Website not updating after deployment"

```bash
# Step 1: Check deployment status
@deployment check deployment status

# Step 2: Verify build
# Visit GitHub Actions tab in repository

# Step 3: Clear cache
# Hard refresh browser (Ctrl+Shift+R)

# Step 4: Wait
# GitHub Pages can take 2-5 minutes to update
```

### Issue: "Styling looks wrong on mobile"

```bash
# Step 1: Identify problem
@css-stylist check mobile responsiveness at 375px width

# Step 2: Request fix
@css-stylist fix mobile layout issues

# Step 3: Test
# Use browser DevTools responsive mode

# Step 4: Deploy
@deployment deploy mobile fixes
```

### Issue: "Accessibility warnings"

```bash
# Step 1: Run accessibility check
@deployment check accessibility compliance

# Step 2: Fix issues
@html-builder fix accessibility issues

# Step 3: Verify
@deployment validate accessibility

# Step 4: Deploy
@deployment deploy accessibility fixes
```

### Issue: "Colors have poor contrast"

```bash
# Step 1: Check contrast
@deployment verify color contrast ratios

# Step 2: Request improvement
@css-stylist improve color contrast to meet WCAG AA standards

# Step 3: Validate
@deployment validate accessibility

# Step 4: Deploy
@deployment deploy contrast improvements
```

## Advanced Usage

### Custom Design Requests

```bash
@web-designer create homepage with:
- Full-screen hero with animated gradient background
- Asymmetric about section with image on left, text on right
- Skills section with animated progress bars
- Projects section in masonry grid layout
- Contact section with social media links
- Sticky navigation menu
```

### Specific Styling Requests

```bash
@css-stylist style projects section with:
- CSS Grid layout, 3 columns on desktop, 1 on mobile
- Card design with hover lift effect
- Gradient overlay on images
- Smooth transitions
- Bold typography
```

### Performance Optimization

```bash
@deployment optimize website for performance:
- Minimize CSS
- Optimize images
- Implement lazy loading
- Target Lighthouse score 95+
```

## Resource Reference

### Documentation
- Full README: `README.md`
- Extension Guide: `.github/EXTENDING.md`
- This Usage Guide: `.github/USAGE.md`

### Design Guidelines
- Creative Design: `.github/prompts/design-guidelines.md`
- HTML Standards: `.github/prompts/html-instructions.md`
- CSS Best Practices: `.github/prompts/css-instructions.md`
- Deployment Process: `.github/prompts/deployment-instructions.md`
- Coding Style: `.github/prompts/coding-style.md`

### Skills Reference
- HTML Generation: `.github/skills/html-generation.skill.md`
- CSS Styling: `.github/skills/css-styling.skill.md`
- Git Operations: `.github/skills/git-operations.skill.md`
- Validation: `.github/skills/validation.skill.md`

### Agent Definitions
- Web Designer: `.github/agents/web-designer.agent.md`
- HTML Builder: `.github/agents/html-builder.agent.md`
- CSS Stylist: `.github/agents/css-stylist.agent.md`
- Deployment: `.github/agents/deployment.agent.md`

## Getting Help

### Ask for Clarification
```bash
@web-designer explain how to add a new section
@html-builder show me examples of semantic HTML structure
@css-stylist what are the current CSS variables I can use?
@deployment what validation checks are performed?
```

### Request Examples
```bash
@web-designer show me examples of creative/artistic designs
@css-stylist provide examples of asymmetric layouts
```

### Debugging
```bash
@web-designer debug: [describe unexpected behavior]
```

---

**Quick Start**: `@web-designer create a creative personal website`

**Last Updated**: 2026-02-13
