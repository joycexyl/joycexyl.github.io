# Git Operations Skill

## Purpose
Manage version control, commits, and deployment to GitHub Pages efficiently and safely.

## Capabilities

### 1. Repository Status Checking
```bash
# Check current status
git status

# View changes
git diff

# Check branch
git branch
```

### 2. Staging Changes
```bash
# Stage specific file
git add index.html

# Stage all changes
git add .

# Stage specific file type
git add *.css

# Interactive staging
git add -p
```

### 3. Committing Changes
Follow commit message format: `[Type] Brief description`

```bash
# Commit with message
git commit -m "[Add] Hero section with creative design"

# Commit all tracked changes
git commit -am "[Update] Improve mobile responsiveness"

# Amend last commit
git commit --amend -m "[Fix] Correct typo in previous commit"
```

#### Commit Types
- `[Add]` - New feature, section, or file
- `[Update]` - Modify existing feature
- `[Fix]` - Bug fix or correction
- `[Refactor]` - Code restructuring
- `[Style]` - Formatting, whitespace
- `[Docs]` - Documentation updates

### 4. Pushing to GitHub
```bash
# Push to main branch
git push origin main

# Force push (use carefully!)
git push origin main --force

# Push with upstream tracking
git push -u origin main
```

### 5. Pulling Changes
```bash
# Pull latest changes
git pull origin main

# Pull with rebase
git pull --rebase origin main
```

### 6. Branch Management
```bash
# List branches
git branch

# Create new branch
git branch feature-name

# Switch branch
git checkout feature-name

# Create and switch
git checkout -b feature-name

# Delete branch
git branch -d feature-name
```

### 7. Viewing History
```bash
# View commit history
git log

# Compact log
git log --oneline

# Last 5 commits
git log -5

# Show specific commit
git show <commit-hash>
```

### 8. Undoing Changes

#### Before Commit
```bash
# Discard changes in file
git checkout -- filename

# Unstage file
git reset HEAD filename

# Discard all changes
git reset --hard
```

#### After Commit
```bash
# Revert last commit (creates new commit)
git revert HEAD

# Reset to specific commit (dangerous!)
git reset --hard <commit-hash>
```

### 9. GitHub Pages Deployment

#### Initial Setup
```bash
# Ensure on main branch
git checkout main

# Add all files
git add .

# Commit
git commit -m "[Add] Initial website deployment"

# Push to GitHub
git push origin main
```

#### Subsequent Deployments
```bash
# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "[Update] Enhance About Me section styling"

# Push to trigger deployment
git push origin main
```

### 10. Pre-Deployment Checks
Run before pushing to production:

```bash
# Check what will be committed
git status

# Review changes
git diff

# Verify branch
git branch

# Check remote
git remote -v
```

## Usage Guidelines

### When to Use This Skill
- Deploying website to GitHub Pages
- Saving progress with version control
- Collaborating with others
- Rolling back changes
- Managing multiple features

### Best Practices

#### Commit Frequency
- Commit after completing a logical unit of work
- Don't commit broken code
- Commit before major changes
- Multiple small commits > one large commit

#### Commit Messages
✓ Good examples:
- `[Add] Hero section with gradient background`
- `[Fix] Color contrast issue in navigation`
- `[Update] Mobile responsive layout for About section`
- `[Refactor] Reorganize CSS structure`

✗ Bad examples:
- `update`
- `fixes`
- `wip`
- `asdfasdf`

#### Before Every Push
1. Check `git status`
2. Review `git diff`
3. Test locally
4. Validate HTML/CSS
5. Check responsive design

## Workflow Patterns

### Standard Deployment Workflow
```bash
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Commit with message
git commit -m "[Type] Description"

# 4. Pull latest (if collaborating)
git pull origin main

# 5. Push to deploy
git push origin main

# 6. Wait 1-2 minutes for GitHub Pages build

# 7. Verify at https://joycexyl.github.io
```

### Feature Development Workflow
```bash
# 1. Create feature branch
git checkout -b add-projects-section

# 2. Make changes and commit
git add .
git commit -m "[Add] Projects section structure"

# 3. Switch back to main
git checkout main

# 4. Merge feature
git merge add-projects-section

# 5. Delete feature branch
git branch -d add-projects-section

# 6. Push to deploy
git push origin main
```

### Emergency Rollback
```bash
# 1. Find last good commit
git log --oneline

# 2. Revert to that commit
git revert <commit-hash>

# 3. Push immediately
git push origin main
```

## Safety Checklist

### Before Committing
- [ ] Code is working
- [ ] No sensitive data (API keys, passwords)
- [ ] No debug code or console.logs
- [ ] Files are properly named
- [ ] Comments are clear

### Before Pushing
- [ ] Tested locally
- [ ] HTML validated
- [ ] CSS validated
- [ ] Responsive design checked
- [ ] Accessibility verified
- [ ] Images optimized
- [ ] Links working

### After Pushing
- [ ] GitHub Pages build succeeded
- [ ] Live site displays correctly
- [ ] All functionality works
- [ ] Mobile view working
- [ ] No console errors

## Common Operations

### Quick Deploy
```bash
git add . && git commit -m "[Update] Quick content update" && git push origin main
```

### View Changes Before Commit
```bash
git diff
```

### See What's Staged
```bash
git diff --staged
```

### Unstage Everything
```bash
git reset
```

### Discard All Local Changes
```bash
git reset --hard HEAD
```

### View Remote URL
```bash
git remote -v
```

## Troubleshooting

### Problem: Push Rejected
```bash
# Pull first, then push
git pull origin main
git push origin main
```

### Problem: Merge Conflict
```bash
# 1. Open conflicted files
# 2. Resolve conflicts (remove <<<, ===, >>>)
# 3. Stage resolved files
git add .
# 4. Commit
git commit -m "[Fix] Resolve merge conflict"
```

### Problem: Committed Wrong File
```bash
# Remove from staging
git reset HEAD unwanted-file

# Remove from last commit
git reset --soft HEAD~1
git reset HEAD unwanted-file
git commit -m "[Type] Correct commit message"
```

### Problem: Wrong Commit Message
```bash
# Amend last commit message
git commit --amend -m "[Type] Correct message"
```

## GitHub Pages Specific

### Deployment Time
- Usually 1-2 minutes after push
- Can take up to 10 minutes during high traffic
- Check Actions tab for build status

### Deployment URL
- Primary: `https://joycexyl.github.io`
- Test in incognito mode (avoid cache)

### Force Rebuild
```bash
# Make trivial change
echo " " >> index.html
git add index.html
git commit -m "[Update] Trigger rebuild"
git push origin main
```

### Check Build Status
1. Go to GitHub repository
2. Click "Actions" tab
3. View latest workflow run
4. Check for errors if deployment fails

## Integration Points
- Works with HTML Generation Skill (commit HTML files)
- Works with CSS Styling Skill (commit CSS files)
- Works with Validation Skill (validate before commit)
- Triggers GitHub Pages deployment automatically

## References
- Deployment Instructions: `.github/prompts/deployment-instructions.md`
- Coding Style: `.github/prompts/coding-style.md`
