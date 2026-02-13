# HTML Coding Standards

## Document Structure

### Required Elements
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[Descriptive page description]">
    <title>[Page Title]</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Content -->
</body>
</html>
```

## Semantic HTML

### Use Appropriate Tags
- `<header>` - Site header with logo/navigation
- `<nav>` - Navigation menus
- `<main>` - Primary content (one per page)
- `<section>` - Thematic content groupings
- `<article>` - Self-contained content
- `<aside>` - Tangential content
- `<footer>` - Site footer

### Heading Hierarchy
- One `<h1>` per page (main title)
- Use `<h2>` - `<h6>` in logical order
- Don't skip heading levels

## Accessibility Standards

### Images
```html
<img src="image.jpg" alt="Descriptive text" width="800" height="600">
```
- Always include `alt` attributes
- Decorative images: `alt=""`
- Include `width` and `height` to prevent layout shift

### Links
```html
<a href="#section" aria-label="Descriptive link text">Link</a>
```
- Use descriptive link text (avoid "click here")
- Add `aria-label` for icon-only links
- External links should indicate they open in new context

### Forms (Future Use)
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
```
- Associate labels with inputs
- Use appropriate input types
- Include validation attributes

## Modular Structure

### Section Components
Each section should be self-contained:
```html
<section id="about" class="section section--about" aria-labelledby="about-heading">
    <h2 id="about-heading">About Me</h2>
    <!-- Section content -->
</section>
```

### Class Naming (BEM-inspired)
- Block: `.section`
- Element: `.section__title`
- Modifier: `.section--dark`

## Performance Optimization

### Images
- Use appropriate formats (WebP with fallback)
- Implement lazy loading: `loading="lazy"`
- Use responsive images with `srcset`

### Scripts
- Place non-critical `<script>` tags before `</body>`
- Use `defer` or `async` attributes
- Minimize inline scripts

## Code Quality

### Formatting
- Use 2-space indentation
- Lowercase tag names and attributes
- Quote attribute values
- Self-close void elements: `<img />`, `<br />`

### Comments
```html
<!-- Hero Section -->
<!-- Add comments for major sections only -->
```

## HTML Don'ts
- Don't use deprecated tags (`<center>`, `<font>`)
- Avoid inline styles (use CSS)
- Don't use tables for layout
- Avoid excessive div nesting
- Don't repeat IDs (must be unique)

## Validation
- Validate HTML using W3C Validator
- Fix all errors before deployment
- Resolve warnings when possible
