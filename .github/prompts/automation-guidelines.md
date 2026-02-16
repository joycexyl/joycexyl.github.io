# GitHub Actions Automation Guidelines

## Overview
Best practices for creating reliable, secure, and efficient GitHub Actions workflows for continuous integration, deployment, and scheduled automation tasks.

## Workflow Fundamentals

### Basic Structure
```yaml
name: Descriptive Workflow Name

on:
  # Triggers
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
        uses: action-name@v4
      
      - name: Run command
        run: echo "Hello World"
```

### Trigger Types

#### Push Trigger
```yaml
on:
  push:
    branches:
      - main
      - develop
    paths:
      - '**.js'
      - '!docs/**'
```

#### Schedule Trigger (Cron)
```yaml
on:
  schedule:
    - cron: '0 0 * * *'     # Daily at midnight UTC
    - cron: '0 */6 * * *'   # Every 6 hours
    - cron: '0 0 * * 1'     # Every Monday
    - cron: '30 5 * * 1-5'  # 5:30 AM weekdays
```

**Cron Format**: `minute hour day month weekday`
- `*` = any value
- `*/n` = every n units
- `0-5` = range
- `1,3,5` = list

#### Manual Trigger
```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      debug_enabled:
        description: 'Enable debug logging'
        required: false
        type: boolean
```

## Job Configuration

### Runner Selection
```yaml
runs-on: ubuntu-latest  # Recommended for most cases
runs-on: macos-latest   # For macOS-specific tasks
runs-on: windows-latest # For Windows-specific tasks
```

### Job Dependencies
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
  
  test:
    needs: build  # Wait for build to complete
    runs-on: ubuntu-latest
    steps:
      - run: npm test
  
  deploy:
    needs: [build, test]  # Wait for both
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy
```

### Conditional Execution
```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - name: Only on main branch
        run: echo "Deploying to production"
```

## Common Actions

### Repository Checkout
```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 1        # Shallow clone (faster)
    submodules: 'false'   # Don't clone submodules
```

### Setup Actions
```yaml
# Node.js
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

# Python
- name: Setup Python
  uses: actions/setup-python@v5
  with:
    python-version: '3.11'
    cache: 'pip'

# Go
- name: Setup Go
  uses: actions/setup-go@v5
  with:
    go-version: '1.21'
```

### Dependency Caching
```yaml
- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

## Git Operations

### Configure Git Identity
```yaml
- name: Configure Git
  run: |
    git config --global user.name "github-actions[bot]"
    git config --global user.email "github-actions[bot]@users.noreply.github.com"
```

### Commit and Push Changes
```yaml
- name: Commit changes
  run: |
    git add .
    git diff --staged --quiet || git commit -m "Auto: Update files"

- name: Push changes
  run: git push
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Conditional Commit
```yaml
- name: Commit if changes exist
  run: |
    git add data/papers.json
    
    if git diff --staged --quiet; then
      echo "No changes to commit"
    else
      git commit -m "[Auto] Update papers - $(date +'%Y-%m-%d')"
      git push
    fi
```

## Environment Variables & Secrets

### Using Secrets
```yaml
steps:
  - name: Use secret
    run: echo "Deploying..."
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Built-in Variables
```yaml
- name: Access context
  run: |
    echo "Repository: ${{ github.repository }}"
    echo "Branch: ${{ github.ref }}"
    echo "Commit: ${{ github.sha }}"
    echo "Actor: ${{ github.actor }}"
    echo "Workflow: ${{ github.workflow }}"
```

## Error Handling

### Continue on Error
```yaml
- name: Run tests
  continue-on-error: true
  run: npm test
```

### Conditional Steps
```yaml
- name: Notify on success
  if: success()
  run: echo "Workflow succeeded"

- name: Notify on failure
  if: failure()
  run: echo "Workflow failed"

- name: Always run cleanup
  if: always()
  run: echo "Cleanup step"
```

### Retry Failed Steps
```yaml
- name: Fetch with retry
  uses: nick-invision/retry@v2
  with:
    timeout_minutes: 10
    max_attempts: 3
    retry_wait_seconds: 30
    command: npm run fetch-data
```

## Daily Paper Update Workflow (Complete Example)

```yaml
name: Update arXiv Papers

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:      # Manual trigger option

jobs:
  update-papers:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write  # Required for git push
    
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
        continue-on-error: false
      
      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - name: Commit and push if changed
        run: |
          git add data/papers.json
          
          if git diff --staged --quiet; then
            echo "No changes to commit"
          else
            git commit -m "[Auto] Update arXiv papers - $(date +'%Y-%m-%d %H:%M UTC')"
            git push
            echo "Changes pushed successfully"
          fi
      
      - name: Notify on failure
        if: failure()
        run: |
          echo "::error::Paper update workflow failed"
          echo "Check logs at: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
```

## Best Practices

### Security

#### Do's
✓ Use `GITHUB_TOKEN` for authentication
✓ Store sensitive data in Secrets
✓ Set minimum required permissions
✓ Validate external inputs
✓ Use official actions when possible
✓ Pin action versions (e.g., `@v4`, not `@latest`)
✓ Review action source code before using

#### Don'ts
✗ Echo secrets in logs
✗ Commit secrets to repository
✗ Use unverified third-party actions
✗ Grant excessive permissions
✗ Use `@latest` tags (unpredictable)

### Performance

#### Optimization Strategies
✓ Cache dependencies
✓ Use shallow clones (`fetch-depth: 1`)
✓ Parallelize independent jobs
✓ Use matrix strategy for testing
✓ Minimize checkout operations
✓ Skip unnecessary steps with conditions

#### Example: Matrix Testing
```yaml
jobs:
  test:
    strategy:
      matrix:
        node: [18, 20, 21]
        os: [ubuntu-latest, macos-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm test
```

### Reliability

✓ Implement retry logic for flaky operations
✓ Handle errors gracefully
✓ Provide clear error messages
✓ Add timeout limits to prevent hanging
✓ Use `continue-on-error` judiciously
✓ Test workflows on non-default branches first

### Maintainability

✓ Use descriptive workflow and job names
✓ Add comments for complex logic
✓ Keep workflows DRY (reusable workflows)
✓ Document required secrets
✓ Version control workflow files
✓ Regular dependency updates

## Monitoring & Debugging

### Enable Debug Logging
Set repository secrets:
- `ACTIONS_STEP_DEBUG`: `true`
- `ACTIONS_RUNNER_DEBUG`: `true`

### Workflow Status Badge
```markdown
![Update Papers](https://github.com/username/repo/workflows/Update%20arXiv%20Papers/badge.svg)
```

### Notifications
```yaml
- name: Send notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Cost Management

### Free Tier Limits
- **Public repos**: Unlimited minutes
- **Private repos**: 2,000 minutes/month

### Optimization Tips
- Run workflows only when necessary
- Use caching aggressively
- Minimize job execution time
- Clean up old workflow runs
- Use self-hosted runners for intensive tasks (advanced)

## Testing Workflows

### Local Testing with act
```bash
# Install act (GitHub Actions local runner)
brew install act

# Run workflow locally
act -j job-name

# Run with specific event
act push

# Run scheduled workflow
act schedule
```

### Manual Trigger Testing
1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"
4. Choose branch and inputs
5. Monitor execution

## Common Patterns

### Conditional Deployment
```yaml
- name: Deploy to production
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  run: npm run deploy:prod

- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: npm run deploy:staging
```

### Artifact Upload/Download
```yaml
- name: Upload artifact
  uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/

- name: Download artifact
  uses: actions/download-artifact@v4
  with:
    name: build-output
```

## Success Criteria

### Workflow is successful when:
✓ Runs on schedule reliably
✓ Handles errors gracefully
✓ Completes within time limits
✓ Commits changes correctly
✓ Triggers deployments as expected
✓ Logs are clear and helpful
✓ Secrets are secure
✓ Cost-effective (within free tier)
✓ Can be triggered manually
✓ Status is monitorable

## Resources
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Action Marketplace](https://github.com/marketplace?type=actions)
- [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
