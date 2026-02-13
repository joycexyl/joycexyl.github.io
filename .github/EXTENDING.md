# Extending Your Website

## Overview
This guide explains how to add new sections, features, and content to your personal website using the custom agent system. The website is designed with modularity in mind, making it easy to expand over time.

## Adding New Sections

### Quick Start: Use the Web Designer Agent

The easiest way to add a new section is to ask the Web Designer Agent:

```bash
@web-designer add a [section name] section to the homepage
```

**Example requests:**
- `@web-designer add a projects portfolio section`
- `@web-designer add a skills showcase section`
- `@web-designer add a blog section`
- `@web-designer add a contact form`

The Web Designer will:
1. Design the section structure
2. Coordinate HTML Builder to create markup
3. Direct CSS Stylist to add styling
4. Oversee Deployment Agent to deploy changes

### Manual Process (Step-by-Step)

If you want more control, follow these steps:

#### Step 1: Plan Your Section

**Ask yourself:**
- What is the purpose of this section?
- What content will it contain?
- How does it fit with the existing design?
- What interactions does it need?

**Review guidelines:**
- Design principles: `.github/prompts/design-guidelines.md`
- Layout patterns in existing sections
- Color scheme and typography

#### Step 2: Create HTML Structure

**Option A: Use HTML Builder Agent**
```bash
@html-builder create semantic HTML for a [section name] section
```

**Provide details:**
- Section purpose
- Content outline
- Required elements (images, links, etc.)
- Accessibility needs

**Option B: Use Template**
```html
<section id="new-section" class="section section--new-section" aria-labelledby="new-section-heading">
  <div class="section__container">
    <h2 id="new-section-heading" class="section__title">Section Title</h2>
    <div class="section__content">
      <!-- Your content here -->
    </div>
  </div>
</section>
```

**Best practices:**
- Use semantic HTML5 elements
- Include unique ID for section
- Add ARIA labelledby for accessibility
- Follow BEM naming: `section--[name]`
- Maintain consistent structure

#### Step 3: Style Your Section

**Option A: Use CSS Stylist Agent**
```bash
@css-stylist style the [section name] with creative/artistic design
```

**Provide guidance:**
- Color preferences
- Layout structure (grid, asymmetric, etc.)
- Animation desires
- Responsive behavior

**Option B: Follow CSS Pattern**
```css
/* Section Styles */
.section--new-section {
  padding: var(--space-xl) var(--space-sm);
  background: var(--color-light);
}

.section--new-section .section__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--color-dark);
  margin-bottom: var(--space-lg);
  text-align: center;
}

.section__content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive */
@media (min-width: 768px) {
  .section--new-section {
    padding: var(--space-2xl) var(--space-md);
  }
}
```

**Best practices:**
- Use CSS variables for colors, spacing, fonts
- Write mobile-first media queries
- Follow existing section patterns
- Ensure adequate color contrast
- Add smooth transitions

#### Step 4: Validate Changes

**Run validation checks:**
```bash
@deployment validate HTML and CSS
```

**Manual checks:**
- [ ] HTML validates (W3C)
- [ ] CSS validates (W3C)
- [ ] Accessible (keyboard navigation, alt text)
- [ ] Responsive (test at 375px, 768px, 1024px, 1440px)
- [ ] Performance optimized
- [ ] Cross-browser compatible

#### Step 5: Deploy

**Deploy with validation:**
```bash
@deployment deploy website with full validation
```

**Or manually:**
```bash
git add .
git commit -m "[Add] New [section name] section"
git push origin main
```

**Verify deployment:**
- Visit https://joycexyl.github.io
- Test new section on mobile
- Check all browsers
- Verify accessibility

## Common Section Examples

### Projects/Portfolio Section

**Purpose**: Showcase your work, projects, or portfolio items

**HTML Structure:**
```html
<section id="projects" class="section section--projects" aria-labelledby="projects-heading">
  <div class="section__container">
    <h2 id="projects-heading" class="section__title">Projects</h2>
    <div class="projects__grid">
      <article class="project-card">
        <img src="project1.jpg" alt="Project 1 description" class="project-card__image">
        <h3 class="project-card__title">Project Title</h3>
        <p class="project-card__description">Brief description...</p>
        <a href="#" class="project-card__link">View Project</a>
      </article>
      <!-- More project cards -->
    </div>
  </div>
</section>
```

**CSS Pattern:**
```css
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.project-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed);
}

.project-card:hover {
  transform: translateY(-8px);
}
```

### Skills Section

**Purpose**: Display your skills, expertise, or technologies

**HTML Structure:**
```html
<section id="skills" class="section section--skills" aria-labelledby="skills-heading">
  <div class="section__container">
    <h2 id="skills-heading" class="section__title">Skills</h2>
    <div class="skills__list">
      <div class="skill">
        <h3 class="skill__name">Skill Name</h3>
        <div class="skill__bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
          <div class="skill__progress" style="width: 90%;"></div>
        </div>
      </div>
      <!-- More skills -->
    </div>
  </div>
</section>
```

**Request from agent:**
```bash
@web-designer add a skills section showcasing my expertise in [list technologies]
```

### Contact Section

**Purpose**: Provide contact information or form

**HTML Structure:**
```html
<section id="contact" class="section section--contact" aria-labelledby="contact-heading">
  <div class="section__container">
    <h2 id="contact-heading" class="section__title">Get in Touch</h2>
    <div class="contact__content">
      <div class="contact__info">
        <p>Email: <a href="mailto:your@email.com">your@email.com</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/yourprofile">LinkedIn Profile</a></p>
        <p>GitHub: <a href="https://github.com/joycexyl">GitHub Profile</a></p>
      </div>
    </div>
  </div>
</section>
```

**Request from agent:**
```bash
@web-designer add a contact section with email and social links
```

## Modifying Existing Sections

### Updating Content

**Quick update with HTML Builder:**
```bash
@html-builder update the About Me section with new content: [your new content]
```

**Or edit directly:**
1. Open `index.html`
2. Find the section by ID (e.g., `id="about"`)
3. Update the content
4. Deploy: `@deployment deploy content updates`

### Changing Design

**Request style changes:**
```bash
@css-stylist change the About Me section to use a darker background with lighter text
```

**Or edit CSS:**
1. Open `styles.css`
2. Find section styles (e.g., `.section--about`)
3. Modify colors, spacing, layout
4. Validate and deploy

## Expanding Design System

### Adding New Colors

**Update CSS variables in `styles.css`:**
```css
:root {
  --color-tertiary: #Your-New-Color;
  --color-muted: #Another-Color;
}
```

**Use in styles:**
```css
.new-section {
  background: var(--color-tertiary);
  color: var(--color-muted);
}
```

### Adding New Fonts

**1. Link font in `index.html` `<head>`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Font+Name&display=swap" rel="stylesheet">
```

**2. Add to CSS variables:**
```css
:root {
  --font-accent: 'Font Name', sans-serif;
}
```

**3. Use in styles:**
```css
.special-text {
  font-family: var(--font-accent);
}
```

### Adding Animations

**Define keyframes:**
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Apply to element:**
```css
.animated-element {
  animation: slideIn 0.6s var(--easing);
}
```

**Or ask CSS Stylist:**
```bash
@css-stylist add a slide-in animation to the new section
```

## Navigation

### Adding Navigation Menu

**HTML Structure:**
```html
<nav class="nav" aria-label="Main navigation">
  <ul class="nav__list">
    <li class="nav__item"><a href="#about" class="nav__link">About</a></li>
    <li class="nav__item"><a href="#projects" class="nav__link">Projects</a></li>
    <li class="nav__item"><a href="#skills" class="nav__link">Skills</a></li>
    <li class="nav__item"><a href="#contact" class="nav__link">Contact</a></li>
  </ul>
</nav>
```

**CSS Pattern:**
```css
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.nav__list {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  list-style: none;
  padding: var(--space-sm);
}

.nav__link {
  color: var(--color-dark);
  text-decoration: none;
  transition: color var(--transition-speed);
}

.nav__link:hover {
  color: var(--color-primary);
}
```

**Request from agent:**
```bash
@web-designer add a fixed navigation menu linking to all sections
```

## Best Practices for Extension

### Maintain Consistency

✓ **Do:**
- Use existing CSS variables for colors, spacing, fonts
- Follow BEM naming convention
- Match existing section structure
- Keep similar animation styles
- Maintain accessibility standards

✗ **Don't:**
- Introduce new color schemes without updating variables
- Use different naming conventions
- Break from established layout patterns
- Add inaccessible content
- Ignore responsive design

### Plan Before Building

1. **Sketch or wireframe** the new section
2. **Review existing sections** for patterns
3. **Check design guidelines** for requirements
4. **Consider mobile view** from the start
5. **Think about accessibility** early

### Test Thoroughly

After adding new content:
- [ ] Test on mobile devices
- [ ] Verify keyboard navigation
- [ ] Check color contrast
- [ ] Validate HTML/CSS
- [ ] Test in multiple browsers
- [ ] Run Lighthouse audit
- [ ] Verify responsive behavior

## Getting Help

### Ask the Agents

**Design questions:**
```bash
@web-designer how should I structure a [section type] section?
```

**HTML questions:**
```bash
@html-builder what's the best semantic structure for [content type]?
```

**CSS questions:**
```bash
@css-stylist how can I create [specific effect or layout]?
```

**Deployment questions:**
```bash
@deployment how do I fix [specific issue]?
```

### Reference Documentation

- **Design Guidelines**: `.github/prompts/design-guidelines.md`
- **HTML Standards**: `.github/prompts/html-instructions.md`
- **CSS Best Practices**: `.github/prompts/css-instructions.md`
- **Deployment Guide**: `.github/prompts/deployment-instructions.md`
- **Coding Style**: `.github/prompts/coding-style.md`

### Skills Reference

- **HTML Generation**: `.github/skills/html-generation.skill.md`
- **CSS Styling**: `.github/skills/css-styling.skill.md`
- **Git Operations**: `.github/skills/git-operations.skill.md`
- **Validation**: `.github/skills/validation.skill.md`

## Examples of Extensions

### Timeline Section
```bash
@web-designer add a timeline section showing my career journey
```

### Testimonials Section
```bash
@web-designer add a testimonials section with quotes from colleagues
```

### Blog Section
```bash
@web-designer add a blog section with article previews
```

### Photo Gallery
```bash
@web-designer add a photo gallery with lightbox functionality
```

### Downloadable Resume
```bash
@web-designer add a section with a downloadable resume button
```

---

**Remember**: The agent system is designed to help you. Don't hesitate to ask agents for guidance, examples, or assistance with any aspect of extending your website.

**Last Updated**: 2026-02-13
