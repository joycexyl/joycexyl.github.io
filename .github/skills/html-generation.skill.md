# HTML Generation Skill

## Purpose
Generate semantic, accessible, and well-structured HTML that follows best practices and design guidelines.

## Capabilities

### 1. Document Structure Creation
- Generate complete HTML5 document structure
- Include all required meta tags
- Set up proper document hierarchy
- Configure viewport for responsive design

### 2. Semantic Element Selection
- Choose appropriate semantic HTML5 elements
- Create logical heading hierarchy (h1-h6)
- Implement ARIA landmarks when needed
- Use descriptive IDs and classes

### 3. Accessibility Implementation
- Add alt text for images
- Include ARIA labels where appropriate
- Ensure keyboard navigation support
- Maintain proper contrast and readability
- Structure content for screen readers

### 4. Component Generation
Generate modular HTML components:

#### Hero Section
```html
<section id="hero" class="section section--hero" aria-labelledby="hero-title">
  <div class="hero__content">
    <h1 id="hero-title" class="hero__title">Welcome</h1>
    <p class="hero__subtitle">Subtitle text</p>
  </div>
  <div class="hero__visual" aria-hidden="true">
    <!-- Decorative elements -->
  </div>
</section>
```

#### About Section
```html
<section id="about" class="section section--about" aria-labelledby="about-heading">
  <div class="section__container">
    <h2 id="about-heading" class="section__title">About Me</h2>
    <div class="about__content">
      <div class="about__image">
        <img src="image.jpg" alt="Description" width="400" height="400">
      </div>
      <div class="about__text">
        <p>Biography content...</p>
      </div>
    </div>
  </div>
</section>
```

#### Footer
```html
<footer class="footer" role="contentinfo">
  <div class="footer__content">
    <nav class="footer__nav" aria-label="Footer navigation">
      <ul class="footer__links">
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
    <div class="footer__social" aria-label="Social media links">
      <!-- Social links -->
    </div>
  </div>
</footer>
```

### 5. Performance Optimization
- Add width and height to images (prevent layout shift)
- Implement lazy loading: `loading="lazy"`
- Use appropriate image formats
- Minimize inline scripts and styles

### 6. SEO Optimization
- Include descriptive title tags
- Add meta description
- Use semantic heading structure
- Implement Open Graph tags (optional)

## Usage Guidelines

### When to Use This Skill
- Creating new HTML pages
- Adding new sections to existing pages
- Refactoring HTML structure
- Implementing accessibility improvements

### Prerequisites
- Understanding of design requirements
- Knowledge of content to be displayed
- Awareness of existing site structure
- Access to design guidelines

### Process
1. Review design guidelines and requirements
2. Plan semantic structure
3. Generate HTML with proper hierarchy
4. Add accessibility features
5. Optimize for performance
6. Validate with W3C Validator

## Quality Checklist

### Structure
- [ ] Valid HTML5 doctype
- [ ] Proper meta tags (charset, viewport, description)
- [ ] Logical heading hierarchy
- [ ] Semantic elements used appropriately
- [ ] One main element per page

### Accessibility
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Sufficient color contrast (handled in CSS)

### Performance
- [ ] Image dimensions specified
- [ ] Lazy loading implemented
- [ ] Minimal inline styles
- [ ] External resources optimized

### Code Quality
- [ ] 2-space indentation
- [ ] Lowercase tags and attributes
- [ ] Quoted attribute values
- [ ] Commented sections
- [ ] No deprecated elements

### Validation
- [ ] Passes W3C HTML Validator
- [ ] No accessibility errors
- [ ] Proper nesting
- [ ] Unique IDs

## Best Practices

### Do's
✓ Use semantic HTML5 elements
✓ Follow BEM naming convention for classes
✓ Include descriptive comments for major sections
✓ Ensure all images have alt attributes
✓ Use relative URLs for internal resources
✓ Structure content hierarchically

### Don'ts
✗ Use deprecated HTML elements
✗ Add inline styles (use CSS classes)
✗ Skip alt attributes on images
✗ Nest elements incorrectly
✗ Use divs when semantic elements exist
✗ Duplicate IDs

## Example: Complete Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Personal website of [Name]">
  <title>Your Name | Personal Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Hero Section -->
  <section id="hero" class="section section--hero">
    <div class="hero__content">
      <h1 class="hero__title">Your Name</h1>
      <p class="hero__subtitle">Creative Professional</p>
    </div>
  </section>

  <!-- Main Content -->
  <main>
    <!-- About Section -->
    <section id="about" class="section section--about">
      <div class="section__container">
        <h2 class="section__title">About Me</h2>
        <div class="about__content">
          <p>Your story here...</p>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer__content">
      <p>&copy; 2026 Your Name. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
```

## Expandability

### Adding New Sections
1. Use semantic `<section>` element
2. Include unique ID for navigation
3. Add ARIA label or labelledby
4. Follow BEM naming: `section--[name]`
5. Maintain consistent structure

### Integration Points
- Works with CSS Styling Skill for appearance
- Coordinates with Git Operations for deployment
- Uses Validation Skill for quality assurance

## References
- HTML Instructions: `.github/prompts/html-instructions.md`
- Design Guidelines: `.github/prompts/design-guidelines.md`
- Coding Style: `.github/prompts/coding-style.md`
