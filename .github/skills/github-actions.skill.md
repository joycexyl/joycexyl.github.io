# GitHub Actions Automation Skill

## Purpose
Expert knowledge for creating reliable, secure, and efficient GitHub Actions workflows for CI/CD, scheduled tasks, and automated deployments.

## Core Capabilities
- Workflow YAML syntax
- Cron scheduling
- Job orchestration
- Secret management
- Automated git operations

## Workflow Structure

### Basic Workflow
```yaml
name: Workflow Name

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - name: Step description
        run: echo "Command"
```

## Triggers

### Schedule (Cron)
```yaml
on:
  schedule:
    - cron: '0 0 * * *'    # Daily at midnight UTC
    - cron: '0 */6 * * *'  # Every 6 hours
    - cron: '0 0 * * 1'    # Every Monday
```

Cron format: `minute hour day-of-month month day-of-week`

### Manual Trigger
```yaml
on:
  workflow_dispatch:
    inputs:
      max_results:
        description: 'Number of papers to fetch'
        required: false
        default: '50'
```

## Common Actions

### Checkout Repository
```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 1
```

### Setup Node.js
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

### Setup Python
```yaml
- name: Setup Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'
    cache: 'pip'
```

### Cache Dependencies
```yaml
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

## Git Operations in Workflows

### Configure Git
```yaml
- name: Configure Git
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
```

### Commit and Push
```yaml
- name: Commit and Push
  run: |
    git add data/papers.json
    if git diff --staged --quiet; then
      echo "No changes to commit"
    else
      git commit -m "[Auto] Update arXiv papers - $(date +'%Y-%m-%d')"
      git push
    fi
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Example: Daily Paper Update Workflow

```yaml
name: Update arXiv Papers

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:

jobs:
  update-papers:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd scripts
          npm install xml2js
      
      - name: Fetch arXiv papers
        run: node scripts/fetch-papers.js
      
      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - name: Commit changes
        run: |
          git add data/papers.json
          if git diff --staged --quiet; then
            echo "No changes to commit"
          else
            git commit -m "[Auto] Update arXiv papers - $(date +'%Y-%m-%d')"
            git push
          fi
```

## Error Handling

### Conditional Steps
```yaml
- name: On failure, create issue
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: 'Paper update workflow failed',
        body: `Workflow run: ${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`
      })
```

### Retry Failed Steps
```yaml
- name: Fetch with retry
  uses: nick-invision/retry@v2
  with:
    timeout_minutes: 5
    max_attempts: 3
    command: node scripts/fetch-papers.js
```

## Security Best Practices

### Use GITHUB_TOKEN
```yaml
- name: Push changes
  run: git push
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Don't Echo Secrets
```yaml
# ❌ Bad
- run: echo "Token is ${{ secrets.API_KEY }}"

# ✅ Good  
- run: echo "Using API key"
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

## Optimization

### Matrix Strategy
```yaml
jobs:
  test:
    strategy:
      matrix:
        node: [18, 20, 21]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
```

### Dependency Caching
```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
```

## Monitoring

### Workflow Status Badge
```markdown
![Update Papers](https://github.com/user/repo/workflows/Update%20arXiv%20Papers/badge.svg)
```

### Slack Notifications
```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Best Practices

### Do's
✓ Use official actions when possible
✓ Pin action versions (e.g., `@v4`)
✓ Enable manual triggers for debugging
✓ Cache dependencies
✓ Use meaningful workflow names
✓ Add descriptive step names
✓ Implement error handling
✓ Test workflows before deploying

### Don'ts
✗ Hard-code secrets in workflows
✗ Use `@latest` for action versions
✗ Run workflows too frequently (cost)
✗ Ignore failed workflow runs
✗ Skip input validation
✗ Commit large files in automated commits

## Debugging

### Enable Debug Logging
Repository Settings → Secrets → Add:
- `ACTIONS_STEP_DEBUG`: `true`
- `ACTIONS_RUNNER_DEBUG`: `true`

### View Logs
Actions tab → Select workflow run → View job logs

## Cost Management

### Free Tier Limits
- Public repos: Unlimited minutes
- Private repos: 2,000 minutes/month

### Optimization Tips
- Cache dependencies
- Use `fetch-depth: 1` for shallow clones
- Run only when necessary
- Use matrix sparingly
- Cleanup artifacts regularly

## Integration Points
- Works with Automation Agent for workflow creation
- Coordinates with API Integrator Agent (script execution)
- Triggers Deployment Agent (GitHub Pages rebuild)
- Uses Git Operations Skill (automated commits)

## References
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Automation Guidelines: `.github/prompts/automation-guidelines.md`
