# CSS Styling Skill

## Purpose
Create beautiful, responsive, and performant CSS that brings creative/artistic designs to life while maintaining accessibility and browser compatibility.

## Capabilities

### 1. CSS Architecture Setup
- Implement CSS variable system
- Organize code structure (reset, typography, layout, components)
- Create modular, maintainable stylesheets
- Use modern CSS features (Grid, Flexbox, Custom Properties)

### 2. Creative/Artistic Styling
Generate bold, unique designs including:

#### Color Systems
```css
:root {
  --color-primary: #FF6B6B;
  --color-secondary: #4ECDC4;
  --color-accent: #FFE66D;
  --color-dark: #1A1A2E;
  --color-light: #F7F7F7;
  --color-gradient: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}
```

#### Typography Scales
```css
:root {
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-size-xs: 0.875rem;
  --font-size-sm: 1rem;
  --font-size-md: 1.25rem;
  --font-size-lg: 1.75rem;
  --font-size-xl: 2.5rem;
  --font-size-2xl: 3.5rem;
}
```

#### Spacing System
```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;
  --space-2xl: 8rem;
}
```

### 3. Layout Creation

#### Modern Grid Layouts
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-md);
}
```

#### Flexible Layouts
```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
}
```

#### Asymmetric Designs
```css
.asymmetric-layout {
  display: grid;
  grid-template-columns: 1fr 1.618fr; /* Golden ratio */
  gap: var(--space-lg);
}
```

### 4. Artistic Effects

#### Gradient Backgrounds
```css
.gradient-bg {
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-secondary) 100%);
}
```

#### Gradient Text
```css
.gradient-text {
  background: var(--color-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Abstract Shapes
```css
.decorative-shape {
  width: 400px;
  height: 400px;
  background: var(--color-accent);
  opacity: 0.1;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  position: absolute;
  z-index: -1;
}
```

#### Creative Shadows
```css
.card {
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08);
}
```

### 5. Animations & Transitions

#### Smooth Transitions
```css
:root {
  --transition-fast: 0.15s;
  --transition-base: 0.3s;
  --transition-slow: 0.6s;
  --easing: cubic-bezier(0.4, 0.0, 0.2, 1);
}

.animated {
  transition: all var(--transition-base) var(--easing);
}
```

#### Entrance Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp var(--transition-slow) var(--easing);
}
```

#### Hover Effects
```css
.interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

### 6. Responsive Design

#### Mobile-First Breakpoints
```css
/* Base: Mobile (0-767px) */
.container {
  padding: var(--space-sm);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: var(--space-md);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-lg);
  }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

#### Responsive Typography
```css
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
  line-height: 1.1;
}

p {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
}
```

### 7. Accessibility Features

#### Focus States
```css
a:focus,
button:focus {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

a:focus:not(:focus-visible) {
  outline: none;
}
```

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --color-primary: #000;
    --color-background: #fff;
  }
}
```

### 8. Performance Optimization

#### GPU Acceleration
```css
.optimized {
  will-change: transform;
  transform: translateZ(0);
}
```

#### Efficient Selectors
```css
/* Good: Class selector */
.button { }

/* Avoid: Overly specific */
div.section > div.container > p.text { }
```

## Usage Guidelines

### When to Use This Skill
- Creating new stylesheets
- Adding styles for new sections
- Implementing design updates
- Optimizing visual performance
- Ensuring responsive behavior

### Prerequisites
- HTML structure in place
- Design guidelines understood
- Color scheme decided
- Typography choices made

### Process
1. Review design guidelines
2. Set up CSS variables
3. Create base styles (reset, typography)
4. Build layout structure
5. Add component styles
6. Implement responsive breakpoints
7. Add animations and interactions
8. Test accessibility
9. Validate CSS

## Quality Checklist

### Structure
- [ ] CSS variables defined
- [ ] Logical organization (base → components → utilities)
- [ ] Mobile-first media queries
- [ ] Modular component styles

### Design
- [ ] Follows creative/artistic guidelines
- [ ] Consistent spacing system
- [ ] Typography hierarchy clear
- [ ] Color contrast sufficient (4.5:1 minimum)

### Responsiveness
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1024px+)
- [ ] Fluid typography implemented

### Accessibility
- [ ] Focus states visible
- [ ] Reduced motion supported
- [ ] High contrast mode considered
- [ ] Color not sole indicator

### Performance
- [ ] Efficient selectors used
- [ ] GPU acceleration where appropriate
- [ ] Minimal use of expensive properties
- [ ] No layout thrashing

### Code Quality
- [ ] 2-space indentation
- [ ] Consistent naming (BEM)
- [ ] Commented sections
- [ ] No duplicate styles

## Best Practices

### Do's
✓ Use CSS variables for theming
✓ Write mobile-first media queries
✓ Implement smooth transitions
✓ Use modern layout (Grid, Flexbox)
✓ Respect user preferences (motion, contrast)
✓ Keep specificity low

### Don'ts
✗ Use !important (except utilities)
✗ Hard-code colors (use variables)
✗ Use fixed pixel widths for containers
✗ Ignore accessibility
✗ Over-animate (causes performance issues)
✗ Use deprecated vendor prefixes manually

## Component Examples

### Hero Section
```css
.section--hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gradient);
  position: relative;
  overflow: hidden;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  color: var(--color-light);
  text-align: center;
  animation: fadeInUp 0.8s var(--easing);
}
```

### About Section
```css
.section--about {
  padding: var(--space-2xl) var(--space-md);
  background: var(--color-light);
}

.about__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .about__content {
    grid-template-columns: 1fr 1.5fr;
    align-items: center;
  }
}
```

## Expandability

### Adding New Sections
1. Create new section class: `.section--[name]`
2. Use existing CSS variables
3. Follow established patterns
4. Add responsive breakpoints
5. Test across devices

### Integration Points
- Works with HTML Generation Skill
- Coordinates with Validation Skill
- Supports Git Operations for deployment

## References
- CSS Instructions: `.github/prompts/css-instructions.md`
- Design Guidelines: `.github/prompts/design-guidelines.md`
- Coding Style: `.github/prompts/coding-style.md`
