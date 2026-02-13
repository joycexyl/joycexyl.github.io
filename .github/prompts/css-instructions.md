# CSS Best Practices & Creative Styling

## CSS Architecture

### File Organization
```css
/* 1. CSS Variables */
/* 2. Reset/Base Styles */
/* 3. Typography */
/* 4. Layout */
/* 5. Components */
/* 6. Utilities */
/* 7. Animations */
/* 8. Media Queries */
```

## CSS Variables (Custom Properties)

### Define Theme Variables
```css
:root {
    /* Colors */
    --color-primary: #FF6B6B;
    --color-secondary: #4ECDC4;
    --color-accent: #FFE66D;
    --color-dark: #1A1A2E;
    --color-light: #F7F7F7;
    
    /* Typography */
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Inter', sans-serif;
    --font-size-base: 16px;
    
    /* Spacing */
    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 2rem;
    --space-lg: 4rem;
    --space-xl: 6rem;
    
    /* Animation */
    --transition-speed: 0.3s;
    --easing: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

## Modern CSS Techniques

### Flexbox & Grid
```css
/* Flexbox for single-axis layouts */
.container {
    display: flex;
    gap: var(--space-md);
    align-items: center;
}

/* Grid for complex layouts */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-md);
}
```

### Creative Positioning
```css
.creative-element {
    position: absolute;
    top: 20%;
    left: -10%;
    transform: rotate(-15deg);
    z-index: -1;
}
```

## Typography

### Responsive Font Sizes
```css
h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 900;
    line-height: 1.1;
}

body {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
}
```

## Creative Design Patterns

### Gradients
```css
.gradient-bg {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
}

.gradient-text {
    background: linear-gradient(to right, var(--color-primary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Artistic Shapes
```css
.shape {
    width: 300px;
    height: 300px;
    background: var(--color-accent);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    opacity: 0.1;
}
```

### Shadows & Depth
```css
.card {
    box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.1),
        0 1px 8px rgba(0, 0, 0, 0.05);
}
```

## Animations

### Entrance Animations
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeInUp 0.6s var(--easing) forwards;
}
```

### Hover Effects
```css
.interactive {
    transition: transform var(--transition-speed) var(--easing);
}

.interactive:hover {
    transform: scale(1.05) rotate(2deg);
}
```

### Respect User Preferences
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

## Responsive Design

### Mobile-First Approach
```css
/* Base styles (mobile) */
.container {
    padding: var(--space-sm);
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        padding: var(--space-md);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        padding: var(--space-lg);
    }
}
```

## Performance Optimization

### GPU Acceleration
```css
.smooth-animation {
    will-change: transform;
    transform: translateZ(0);
}
```

### Efficient Selectors
- Use classes over element selectors
- Avoid overly specific selectors
- Minimize use of universal selector (*)

## Accessibility

### Focus States
```css
a:focus,
button:focus {
    outline: 3px solid var(--color-accent);
    outline-offset: 2px;
}
```

### Color Contrast
- Ensure 4.5:1 ratio for normal text
- Ensure 3:1 ratio for large text (18pt+)
- Test with accessibility tools

## Code Quality

### Formatting
- 2-space indentation
- One selector per line
- Space after colons
- Semicolons on all declarations
- Alphabetize properties (optional)

### Comments
```css
/* === Hero Section === */

/* Descriptive comment for complex code */
```

## CSS Don'ts
- Avoid `!important` (except for utilities)
- Don't use deprecated prefixes without autoprefixer
- Avoid inline styles in HTML
- Don't use fixed pixel widths for containers
- Avoid overly specific selectors (e.g., `div.class#id`)

## Browser Support
- Support last 2 versions of major browsers
- Graceful degradation for older browsers
- Use feature detection (@supports) when needed
