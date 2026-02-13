# GitHub Pages Deployment Instructions

## Repository Configuration

### Repository Details
- **Repository**: `joycexyl/joycexyl.github.io`
- **Deployment URL**: `https://joycexyl.github.io`
- **Branch**: `main` (primary deployment branch)

## File Structure

### Required Files
```
joycexyl.github.io/
├── index.html          # Homepage (required)
├── styles.css          # Stylesheet
├── README.md           # Repository documentation
└── .github/
    ├── agents/         # Custom agents
    ├── skills/         # Agent skills
    └── prompts/        # Design guidelines
```

## GitHub Pages Setup

### Enabling GitHub Pages
1. Navigate to repository Settings
2. Go to "Pages" section in sidebar
3. Under "Source", select branch: `main`
4. Select folder: `/ (root)`
5. Click "Save"
6. Site will deploy to: `https://joycexyl.github.io`

### Build & Deploy Process
GitHub Pages automatically builds and deploys when:
- Changes are pushed to the `main` branch
- Changes are committed directly on GitHub
- Pull requests are merged to `main`

## Deployment Checklist

### Pre-Deployment
- [ ] Validate HTML with W3C Validator
- [ ] Validate CSS
- [ ] Test responsive design (375px, 768px, 1024px, 1440px)
- [ ] Check accessibility (WCAG 2.1 AA)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Optimize images (WebP, compression)
- [ ] Test loading performance (Lighthouse)
- [ ] Verify all links work
- [ ] Check meta tags and SEO

### Git Workflow
```bash
# Check current status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add creative homepage with About Me section"

# Push to GitHub
git push origin main
```

### Post-Deployment
- [ ] Wait 1-2 minutes for GitHub Pages to build
- [ ] Visit `https://joycexyl.github.io` to verify
- [ ] Test all functionality on live site
- [ ] Check mobile responsiveness on actual devices
- [ ] Verify analytics (if implemented)

## Custom Domain (Optional)

### Adding Custom Domain
1. Purchase domain from registrar
2. Add `CNAME` file to repository root with domain name
3. Configure DNS records at registrar:
   - Type: `A` → Points to GitHub Pages IPs
   - Type: `CNAME` → Points to `joycexyl.github.io`
4. Enable "Enforce HTTPS" in GitHub Pages settings

## Troubleshooting

### Common Issues

**Site not updating:**
- Check GitHub Actions tab for build status
- Clear browser cache (Ctrl+Shift+R)
- Wait 5-10 minutes for CDN propagation

**404 Error:**
- Ensure `index.html` exists in root
- Check file names are lowercase
- Verify branch is set to `main` in settings

**Styling not loading:**
- Check CSS file path in HTML
- Verify CSS file is committed to repository
- Check browser console for errors

**Images not displaying:**
- Use relative paths (e.g., `./images/photo.jpg`)
- Verify image files are committed
- Check file extensions match exactly

## Performance Monitoring

### Tools to Use
- Google Lighthouse (in Chrome DevTools)
- PageSpeed Insights
- WebPageTest.org
- GTmetrix

### Target Metrics
- Performance Score: 90+
- Accessibility Score: 95+
- Best Practices: 90+
- SEO: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

## Security

### Best Practices
- Always use HTTPS (enforced by GitHub Pages)
- No API keys or secrets in code
- Sanitize any user input (if forms added later)
- Keep dependencies updated
- Use Content Security Policy headers (if needed)

## Maintenance

### Regular Updates
- Review and update content quarterly
- Test on new browser versions
- Monitor performance metrics
- Check for broken links monthly
- Update dependencies (if using build tools)

## Rollback Procedure

### If deployment has issues:
```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push (use carefully)
git push origin main --force
```

## Documentation

### Update README.md
Include:
- Project description
- Local development instructions
- Deployment process
- How to add new sections
- Contact information
