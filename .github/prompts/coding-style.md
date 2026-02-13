# General Coding Style Guidelines

## Code Philosophy
Write clean, readable, maintainable code that prioritizes clarity and simplicity.

## Universal Principles

### 1. Readability First
- Code is read more often than written
- Use descriptive names for variables, functions, and classes
- Keep functions/methods short and focused (single responsibility)
- Avoid clever code; prefer obvious code

### 2. Consistency
- Follow established patterns in the codebase
- Use consistent naming conventions
- Maintain consistent formatting
- Apply rules uniformly across all files

### 3. DRY (Don't Repeat Yourself)
- Extract repeated code into reusable components
- Use variables for repeated values
- Create utility functions for common operations

### 4. KISS (Keep It Simple, Stupid)
- Choose simple solutions over complex ones
- Avoid premature optimization
- Don't add features "just in case"
- Refactor when complexity grows

## Naming Conventions

### General Rules
- Use descriptive, meaningful names
- Avoid abbreviations unless widely understood
- Be consistent within each language's conventions

### HTML
- Lowercase with hyphens: `class="hero-section"`
- IDs for unique elements: `id="about-heading"`
- Data attributes: `data-scroll-speed="0.5"`

### CSS
- Lowercase with hyphens: `.primary-button`
- BEM methodology: `.block__element--modifier`
- Utility classes: `.mt-2`, `.text-center`

### JavaScript (Future Use)
- camelCase for variables: `userName`, `isActive`
- PascalCase for classes: `UserProfile`
- UPPERCASE for constants: `MAX_WIDTH`
- Prefix booleans with is/has/can: `isVisible`, `hasAccess`

## Formatting Standards

### Indentation
- Use **2 spaces** for indentation (not tabs)
- Be consistent across all file types
- Align nested elements properly

### Line Length
- Aim for 80-100 characters per line
- Break long lines logically
- Indent continuation lines

### Whitespace
- Add blank lines between logical sections
- Space around operators: `x = y + 5`
- No trailing whitespace
- One blank line at end of file

## Comments

### When to Comment
- Complex logic that isn't immediately obvious
- Workarounds or hacks (with explanation)
- TODO notes for future improvements
- API documentation (if building tools)

### When NOT to Comment
- Obvious code (let code speak for itself)
- Redundant explanations
- Commented-out code (use version control)

### Comment Style
```html
<!-- Section: Hero -->
```

```css
/* === Typography === */

/* Gradient text effect for headings */
```

```javascript
// Calculate viewport-relative font size
```

## File Organization

### Directory Structure
```
project/
├── index.html
├── styles.css
├── scripts.js (future)
├── images/
├── fonts/
└── .github/
    ├── agents/
    ├── skills/
    └── prompts/
```

### File Naming
- Lowercase with hyphens: `hero-section.html`
- Descriptive names: `about-section-styles.css`
- Avoid generic names: `style1.css`, `page.html`

## Version Control

### Git Commit Messages
Format: `[Type] Brief description`

Types:
- `[Add]` - New feature or file
- `[Update]` - Modify existing feature
- `[Fix]` - Bug fix
- `[Refactor]` - Code restructuring
- `[Style]` - Formatting, no code change
- `[Docs]` - Documentation only

Examples:
- `[Add] Hero section with gradient background`
- `[Update] Improve mobile responsiveness for About section`
- `[Fix] Correct color contrast in navigation`

### Git Best Practices
- Commit logical, atomic changes
- Write descriptive commit messages
- Don't commit sensitive data
- Pull before pushing
- Review changes before committing

## Code Quality

### Before Committing
- [ ] Remove console.logs and debug code
- [ ] Delete commented-out code
- [ ] Check for typos
- [ ] Validate HTML/CSS
- [ ] Test in multiple browsers
- [ ] Verify responsive design
- [ ] Check accessibility

### Code Review Checklist
- Does it follow project conventions?
- Is it readable and maintainable?
- Are there any security concerns?
- Is it properly documented?
- Does it handle errors gracefully?

## Error Handling

### HTML
- Validate with W3C Validator
- Check for missing required attributes
- Ensure proper nesting

### CSS
- Validate with CSS Validator
- Check for browser compatibility
- Test fallbacks for modern features

### General
- Fail gracefully
- Provide helpful error messages
- Don't expose sensitive information in errors

## Accessibility

### Universal Considerations
- Semantic HTML structure
- Sufficient color contrast
- Keyboard navigation support
- Screen reader compatibility
- Responsive design
- Performance optimization

## Performance

### General Guidelines
- Minimize file sizes
- Optimize images
- Reduce HTTP requests
- Use browser caching
- Lazy load non-critical resources
- Minimize and concatenate files (in production)

## Documentation

### Project Documentation
- README.md with project overview
- Setup/installation instructions
- Usage examples
- Contribution guidelines

### Code Documentation
- Document complex algorithms
- Explain non-obvious decisions
- Keep documentation up-to-date with code

## Anti-Patterns to Avoid

### Don't:
- Copy-paste code without understanding it
- Use magic numbers (use named constants)
- Nest too deeply (max 3-4 levels)
- Write functions longer than one screen
- Ignore warnings from validators
- Mix languages (e.g., inline CSS/JS in HTML)
- Over-engineer simple solutions
- Sacrifice readability for brevity

## Language-Specific Guidelines

### HTML
- See `html-instructions.md` for detailed standards
- Use semantic elements
- Maintain proper document structure
- Ensure accessibility

### CSS
- See `css-instructions.md` for detailed standards
- Use CSS variables for theming
- Mobile-first responsive design
- Modern layout techniques (Flexbox, Grid)

## Continuous Improvement
- Refactor as you go
- Learn from code reviews
- Stay updated with best practices
- Test new techniques in isolation
- Document lessons learned
