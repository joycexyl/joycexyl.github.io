# Validation Skill

## Purpose
Ensure HTML and CSS code meets quality standards, accessibility requirements, and best practices before deployment.

## Capabilities

### 1. HTML Validation

#### W3C Markup Validation
```bash
# Using W3C Validator API
curl -H "Content-Type: text/html; charset=utf-8" \
  --data-binary @index.html \
  https://validator.w3.org/nu/?out=json
```

#### Common HTML Issues to Check
- Unclosed tags
- Improper nesting
- Missing required attributes (alt, lang, charset)
- Duplicate IDs
- Invalid attribute values
- Deprecated elements

#### Manual HTML Checks
- [ ] Valid HTML5 doctype
- [ ] Language attribute on `<html>`
- [ ] Character encoding specified
- [ ] Viewport meta tag present
- [ ] Title tag present and descriptive
- [ ] One `<main>` element
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] All images have alt attributes
- [ ] No deprecated elements

### 2. CSS Validation

#### W3C CSS Validation
```bash
# Using W3C CSS Validator API
curl -H "Content-Type: text/css; charset=utf-8" \
  --data-binary @styles.css \
  "https://jigsaw.w3.org/css-validator/validator?output=json"
```

#### Common CSS Issues to Check
- Invalid property values
- Unknown properties
- Syntax errors (missing semicolons, braces)
- Vendor prefixes without standard property
- Invalid color values
- Malformed media queries

#### Manual CSS Checks
- [ ] No syntax errors
- [ ] Properties spelled correctly
- [ ] Valid color values
- [ ] Proper units specified
- [ ] Media queries formatted correctly
- [ ] No duplicate selectors
- [ ] Vendor prefixes with fallbacks
- [ ] CSS variables defined before use

### 3. Accessibility Validation

#### WCAG 2.1 Level AA Checklist

**Color Contrast**
- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Large text contrast ratio ≥ 3:1 (18pt+ or 14pt bold+)
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators are visible

**Keyboard Navigation**
- [ ] All interactive elements keyboard accessible
- [ ] Focus order is logical
- [ ] No keyboard traps
- [ ] Skip links provided (if needed)

**Semantic Structure**
- [ ] Proper heading hierarchy
- [ ] ARIA landmarks used correctly
- [ ] Form labels associated with inputs
- [ ] Link text is descriptive

**Images & Media**
- [ ] All images have alt text
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Complex images have detailed descriptions
- [ ] No text in images (or alt includes text)

**Responsive Design**
- [ ] Content readable when zoomed to 200%
- [ ] No horizontal scrolling at 320px width
- [ ] Touch targets at least 44×44px
- [ ] Text can be resized without breaking layout

### 4. Performance Validation

#### File Size Checks
```bash
# Check HTML file size
ls -lh index.html

# Check CSS file size
ls -lh styles.css

# Check total size of images
du -sh images/
```

#### Performance Targets
- [ ] HTML file < 100KB
- [ ] CSS file < 100KB
- [ ] Individual images < 500KB
- [ ] Total page size < 1MB (initial load)

#### Image Optimization
```bash
# Check image dimensions and size
file image.jpg
identify -format "%wx%h %b" image.jpg
```

### 5. Browser Compatibility

#### CSS Features to Verify
- [ ] CSS Grid supported (or fallback provided)
- [ ] CSS Custom Properties supported (or fallback)
- [ ] Flexbox implemented correctly
- [ ] Vendor prefixes for experimental features

#### Testing Browsers
- Chrome/Edge (Chromium)
- Firefox
- Safari (WebKit)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 6. Responsive Design Validation

#### Breakpoint Testing
Test at these viewport widths:
- [ ] 375px (Mobile - iPhone SE)
- [ ] 768px (Tablet - iPad)
- [ ] 1024px (Small desktop)
- [ ] 1440px (Desktop)
- [ ] 1920px (Large desktop)

#### Responsive Checklist
- [ ] Mobile layout works (single column)
- [ ] Tablet layout transitions smoothly
- [ ] Desktop layout utilizes space well
- [ ] Images scale appropriately
- [ ] Typography is readable at all sizes
- [ ] Navigation works on all devices

### 7. Link Validation

#### Link Checks
```bash
# Check for broken internal links (manual)
# 1. Open site in browser
# 2. Click all links
# 3. Verify destinations

# Or use link checker tool
# (if available)
```

#### Link Checklist
- [ ] All internal links work
- [ ] Anchor links navigate to correct section
- [ ] External links open correctly
- [ ] No broken links (404 errors)
- [ ] Links have descriptive text

### 8. SEO Validation

#### SEO Checklist
- [ ] `<title>` tag unique and descriptive (50-60 chars)
- [ ] Meta description present (150-160 chars)
- [ ] Heading hierarchy logical
- [ ] URLs are clean and descriptive
- [ ] Images have alt text
- [ ] Page loads quickly (< 3 seconds)
- [ ] Mobile-friendly design
- [ ] Valid HTML structure

### 9. Code Quality Validation

#### HTML Code Quality
- [ ] Proper indentation (2 spaces)
- [ ] Lowercase tag names
- [ ] Quoted attribute values
- [ ] Consistent class naming (BEM)
- [ ] Commented major sections
- [ ] No inline styles
- [ ] No deprecated elements

#### CSS Code Quality
- [ ] Proper indentation (2 spaces)
- [ ] Consistent naming convention
- [ ] Properties alphabetized (optional)
- [ ] No duplicate rules
- [ ] Efficient selectors
- [ ] Commented sections
- [ ] CSS variables used for theme values

## Validation Workflow

### Pre-Commit Validation
```bash
# 1. Validate HTML
# (Use online validator or local tool)

# 2. Validate CSS
# (Use online validator or local tool)

# 3. Check file sizes
ls -lh index.html styles.css

# 4. Visual test in browser
# Open index.html locally

# 5. Test responsive design
# Use browser DevTools
```

### Pre-Deployment Validation
1. **HTML Validation**
   - Run W3C HTML Validator
   - Fix all errors
   - Resolve warnings

2. **CSS Validation**
   - Run W3C CSS Validator
   - Fix all errors
   - Check browser compatibility

3. **Accessibility Check**
   - Verify color contrast
   - Test keyboard navigation
   - Check screen reader compatibility

4. **Responsive Testing**
   - Test at all breakpoints
   - Verify mobile layout
   - Check tablet and desktop

5. **Performance Check**
   - Verify file sizes
   - Check image optimization
   - Test load time

6. **Cross-Browser Test**
   - Test in Chrome
   - Test in Firefox
   - Test in Safari (if available)

7. **Final Review**
   - Click all links
   - Check all images load
   - Verify all content displays
   - Check for typos

### Post-Deployment Validation
1. Visit live URL: `https://joycexyl.github.io`
2. Test on actual mobile device
3. Check in multiple browsers
4. Verify all functionality works
5. Test with accessibility tools
6. Run Lighthouse audit

## Validation Tools

### Online Tools
- **HTML**: https://validator.w3.org/
- **CSS**: https://jigsaw.w3.org/css-validator/
- **Accessibility**: https://wave.webaim.org/
- **Mobile-Friendly**: https://search.google.com/test/mobile-friendly
- **Performance**: https://pagespeed.web.dev/

### Browser DevTools
- Chrome DevTools (F12)
  - Lighthouse audit
  - Responsive design mode
  - Console for errors
- Firefox DevTools
  - Accessibility inspector
  - Responsive design mode

### Manual Testing
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader testing (if available)
- Zoom to 200%
- Print preview

## Common Issues & Fixes

### HTML Issues

**Missing alt attribute**
```html
<!-- Bad -->
<img src="photo.jpg">

<!-- Good -->
<img src="photo.jpg" alt="Description of photo">
```

**Improper heading hierarchy**
```html
<!-- Bad -->
<h1>Title</h1>
<h3>Subtitle</h3>

<!-- Good -->
<h1>Title</h1>
<h2>Subtitle</h2>
```

**Duplicate IDs**
```html
<!-- Bad -->
<div id="section">...</div>
<div id="section">...</div>

<!-- Good -->
<div id="section-1">...</div>
<div id="section-2">...</div>
```

### CSS Issues

**Missing units**
```css
/* Bad */
.element {
  width: 100;
}

/* Good */
.element {
  width: 100px;
}
```

**Invalid color values**
```css
/* Bad */
color: #00;

/* Good */
color: #000000;
```

### Accessibility Issues

**Low contrast**
```css
/* Bad - Contrast ratio 2.5:1 */
color: #777;
background: #fff;

/* Good - Contrast ratio 4.6:1 */
color: #595959;
background: #fff;
```

**Missing focus styles**
```css
/* Bad */
a { outline: none; }

/* Good */
a:focus {
  outline: 3px solid #FFE66D;
  outline-offset: 2px;
}
```

## Quality Gates

### Must Pass Before Commit
✓ HTML validates with 0 errors
✓ CSS validates with 0 errors
✓ All images have alt attributes
✓ Code follows style guidelines

### Must Pass Before Deploy
✓ Accessibility checklist complete
✓ Responsive design tested
✓ Performance targets met
✓ Cross-browser compatibility verified
✓ All links working

## Integration Points
- Works with HTML Generation Skill (validates HTML)
- Works with CSS Styling Skill (validates CSS)
- Integrates with Git Operations (validate before commit)

## References
- HTML Instructions: `.github/prompts/html-instructions.md`
- CSS Instructions: `.github/prompts/css-instructions.md`
- Design Guidelines: `.github/prompts/design-guidelines.md`
