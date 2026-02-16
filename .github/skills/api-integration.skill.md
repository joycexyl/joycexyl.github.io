# API Integration Skill

## Purpose
Master techniques for integrating external APIs, with focus on arXiv API for academic paper feeds. Covers HTTP requests, XML/JSON parsing, error handling, and caching strategies.

## Core Capabilities
- RESTful API communication
- XML and JSON parsing
- Rate limiting and throttling
- Error handling and retries
- Data caching and validation

## arXiv API Integration

### API Endpoint
```
http://export.arxiv.org/api/query
```

### Query Construction
```javascript
function buildArxivQuery(categories, maxResults = 50) {
  const searchQuery = categories.map(cat => `cat:${cat}`).join(' OR ');
  const params = new URLSearchParams({
    search_query: searchQuery,
    sortBy: 'submittedDate',
    sortOrder: 'descending',
    start: 0,
    max_results: maxResults
  });
  return `http://export.arxiv.org/api/query?${params}`;
}
```

### Fetching Data (Node.js)
```javascript
const https = require('https');

function fetchArxivPapers(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}
```

### XML Parsing
```javascript
const { parseString } = require('xml2js');

async function parseArxivXML(xmlString) {
  return new Promise((resolve, reject) => {
    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) reject(err);
      else resolve(transformArxivData(result));
    });
  });
}

function transformArxivData(parsed) {
  const entries = parsed.feed.entry;
  if (!Array.isArray(entries)) {
    return [transformEntry(entries)];
  }
  return entries.map(transformEntry);
}

function transformEntry(entry) {
  return {
    id: entry.id.split('/').pop(),
    title: entry.title.trim(),
    authors: Array.isArray(entry.author) 
      ? entry.author.map(a => a.name)
      : [entry.author.name],
    abstract: entry.summary.trim(),
    published: entry.published.split('T')[0],
    updated: entry.updated.split('T')[0],
    categories: Array.isArray(entry.category)
      ? entry.category.map(c => c.$.term)
      : [entry.category.$.term],
    pdfUrl: entry.link.find(l => l.$.title === 'pdf').$.href,
    arxivUrl: entry.id
  };
}
```

## Rate Limiting

### Simple Delay
```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRateLimit(urls, delayMs = 3000) {
  const results = [];
  for (const url of urls) {
    results.push(await fetchArxivPapers(url));
    if (urls.length > 1) await sleep(delayMs);
  }
  return results;
}
```

## Error Handling

### Retry Logic
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchArxivPapers(url);
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
}
```

### Graceful Fallback
```javascript
async function fetchOrLoadCached(url, cacheFile) {
  try {
    const data = await fetchArxivPapers(url);
    fs.writeFileSync(cacheFile, data); // Cache successful response
    return data;
  } catch (error) {
    console.warn('Fetch failed, loading cached data');
    if (fs.existsSync(cacheFile)) {
      return fs.readFileSync(cacheFile, 'utf8');
    }
    throw new Error('No cached data available');
  }
}
```

## Client-Side Loading

### Fetch Papers JSON
```javascript
async function loadPapers() {
  try {
    const response = await fetch('data/papers.json');
    if (!response.ok) throw new Error('Failed to load papers');
    const data = await response.json();
    return data.papers;
  } catch (error) {
    console.error('Error loading papers:', error);
    return [];
  }
}
```

### Display Papers
```javascript
async function displayPapers() {
  const papers = await loadPapers();
  const container = document.getElementById('papers-container');
  
  papers.forEach(paper => {
    const card = createPaperCard(paper);
    container.appendChild(card);
  });
  
  updateLastUpdated(data.metadata.lastUpdated);
}

function createPaperCard(paper) {
  const card = document.createElement('article');
  card.className = 'paper-card';
  card.innerHTML = `
    <h3 class="paper-title">
      <a href="${paper.pdfUrl}" target="_blank">${paper.title}</a>
    </h3>
    <p class="paper-authors">${paper.authors.join(', ')}</p>
    <p class="paper-date">${new Date(paper.published).toLocaleDateString()}</p>
    <div class="paper-categories">
      ${paper.categories.map(cat => `<span class="category-badge">${cat}</span>`).join('')}
    </div>
    <details class="paper-abstract">
      <summary>Abstract</summary>
      <p>${paper.abstract}</p>
    </details>
  `;
  return card;
}
```

## Data Validation

### Validate Paper Data
```javascript
function validatePaper(paper) {
  const required = ['id', 'title', 'authors', 'abstract', 'pdfUrl'];
  for (const field of required) {
    if (!paper[field]) {
      console.warn(`Missing field: ${field} in paper ${paper.id || 'unknown'}`);
      return false;
    }
  }
  return true;
}
```

## Best Practices

### Do's
✓ Respect API rate limits (arXiv: 1 request per 3 seconds)
✓ Cache responses to minimize requests
✓ Implement retry logic with exponential backoff
✓ Validate data before storing
✓ Handle network errors gracefully
✓ Provide fallback to cached data
✓ Log errors for debugging
✓ Use async/await for cleaner code

### Don'ts
✗ Make excessive API requests
✗ Ignore rate limiting
✗ Skip error handling
✗ Trust API data without validation
✗ Expose API keys in client-side code
✗ Parse XML/JSON without error handling
✗ Fail silently without user notification

## Integration Points
- Works with API Integrator Agent for implementation
- Provides patterns for Automation Agent (scheduled fetching)
- Guides HTML Builder Agent on data display structure
- Supports Deployment Agent with error testing

## References
- arXiv API: http://export.arxiv.org/api_help
- API Guidelines: `.github/prompts/api-guidelines.md`
