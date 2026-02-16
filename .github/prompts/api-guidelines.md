# arXiv API Integration Guidelines

## API Overview

### Endpoint
```
http://export.arxiv.org/api/query
```

### Response Format
- **Type**: Atom XML feed
- **Encoding**: UTF-8
- **Namespace**: http://www.w3.org/2005/Atom

## Query Parameters

### Required Parameters
- `search_query`: Search expression using arXiv syntax
- `start`: Starting index for results (0-based)
- `max_results`: Number of results to return (max: 30,000)

### Optional Parameters
- `sortBy`: Sort order (`relevance`, `lastUpdatedDate`, `submittedDate`)
- `sortOrder`: `ascending` or `descending`

## Search Query Syntax

### Category Search
```
cat:stat.ME          # Single category
cat:stat.ME OR cat:stat.AP  # Multiple categories
```

### Our Categories
- **stat.ME**: Statistics - Methodology
- **stat.AP**: Statistics - Applications
- **econ.EM**: Economics - Econometrics
- **q-bio.QM**: Quantitative Biology - Quantitative Methods (biostatistics)

### Combined Query
```
search_query=cat:stat.ME OR cat:stat.AP OR cat:econ.EM OR cat:q-bio.QM
```

## Complete Query Example
```
http://export.arxiv.org/api/query?search_query=cat:stat.ME+OR+cat:stat.AP+OR+cat:econ.EM+OR+cat:q-bio.QM&sortBy=submittedDate&sortOrder=descending&start=0&max_results=50
```

## Rate Limiting

### Official Limits
- **Frequency**: ~1 request per 3 seconds
- **Burst**: No more than 1 request without delay
- **Recommendation**: Be respectful, implement delays

### Implementation
```javascript
const RATE_LIMIT_DELAY = 3000; // 3 seconds

async function fetchWithRateLimit(urls) {
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    results.push(await fetchUrl(urls[i]));
    if (i < urls.length - 1) {
      await sleep(RATE_LIMIT_DELAY);
    }
  }
  return results;
}
```

## Response Structure

### XML Format
```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <link href="http://arxiv.org/api/query?..."/>
  <title type="html">ArXiv Query: ...</title>
  <id>http://arxiv.org/api/...</id>
  <updated>2024-02-16T00:00:00-05:00</updated>
  <opensearch:totalResults xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">50</opensearch:totalResults>
  <opensearch:startIndex>0</opensearch:startIndex>
  <opensearch:itemsPerPage>50</opensearch:itemsPerPage>
  
  <entry>
    <id>http://arxiv.org/abs/2402.12345v1</id>
    <updated>2024-02-15T10:30:00Z</updated>
    <published>2024-02-15T10:30:00Z</published>
    <title>Paper Title Here</title>
    <summary>Abstract text goes here...</summary>
    <author>
      <name>Author One</name>
    </author>
    <author>
      <name>Author Two</name>
    </author>
    <arxiv:doi xmlns:arxiv="http://arxiv.org/schemas/atom">10.1000/xyz123</arxiv:doi>
    <link href="http://arxiv.org/abs/2402.12345v1" rel="alternate" type="text/html"/>
    <link title="pdf" href="http://arxiv.org/pdf/2402.12345v1" rel="related" type="application/pdf"/>
    <arxiv:primary_category xmlns:arxiv="http://arxiv.org/schemas/atom" term="stat.ME" scheme="http://arxiv.org/schemas/atom"/>
    <category term="stat.ME" scheme="http://arxiv.org/schemas/atom"/>
    <category term="stat.AP" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
  
  <!-- More entries... -->
</feed>
```

## XML Parsing (Node.js)

### Using xml2js
```javascript
const { parseString } = require('xml2js');

function parseArxivXML(xmlString) {
  return new Promise((resolve, reject) => {
    const options = {
      explicitArray: false,
      mergeAttrs: true,
      xmlns: true
    };
    
    parseString(xmlString, options, (err, result) => {
      if (err) {
        reject(new Error(`XML parsing failed: ${err.message}`));
      } else {
        resolve(result);
      }
    });
  });
}
```

### Extracting Entry Data
```javascript
function extractPaperData(entry) {
  // Extract ID (remove version suffix)
  const fullId = entry.id;
  const arxivId = fullId.split('/abs/')[1].replace(/v\d+$/, '');
  
  // Extract authors (handle single or multiple)
  const authors = Array.isArray(entry.author)
    ? entry.author.map(a => a.name)
    : [entry.author.name];
  
  // Extract categories
  const categories = Array.isArray(entry.category)
    ? entry.category.map(c => c.term)
    : [entry.category.term];
  
  // Find PDF link
  const links = Array.isArray(entry.link) ? entry.link : [entry.link];
  const pdfLink = links.find(l => l.title === 'pdf');
  
  return {
    id: arxivId,
    title: entry.title.trim(),
    authors: authors,
    abstract: entry.summary.trim(),
    published: entry.published.split('T')[0],
    updated: entry.updated.split('T')[0],
    categories: categories,
    primaryCategory: entry['arxiv:primary_category'].term,
    pdfUrl: pdfLink ? pdfLink.href : null,
    arxivUrl: entry.id,
    doi: entry['arxiv:doi'] || null
  };
}
```

## Data Structure (papers.json)

### Format
```json
{
  "papers": [
    {
      "id": "2402.12345",
      "title": "Statistical Methods for Large-Scale Data Analysis",
      "authors": ["Jane Smith", "John Doe", "Alice Johnson"],
      "abstract": "We propose a novel statistical methodology...",
      "published": "2024-02-15",
      "updated": "2024-02-15",
      "categories": ["stat.ME", "stat.AP"],
      "primaryCategory": "stat.ME",
      "pdfUrl": "https://arxiv.org/pdf/2402.12345.pdf",
      "arxivUrl": "https://arxiv.org/abs/2402.12345",
      "doi": "10.1000/xyz123"
    }
  ],
  "metadata": {
    "lastUpdated": "2024-02-16T00:00:00Z",
    "totalPapers": 50,
    "categories": ["stat.ME", "stat.AP", "econ.EM", "q-bio.QM"],
    "queryDate": "2024-02-16"
  }
}
```

## Error Handling

### Network Errors
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await sleep(delay);
    }
  }
}
```

### API Response Errors
```javascript
function validateArxivResponse(parsed) {
  if (!parsed.feed) {
    throw new Error('Invalid arXiv response: missing feed');
  }
  
  if (!parsed.feed.entry) {
    console.warn('No papers found in response');
    return { papers: [], metadata: {} };
  }
  
  return parsed;
}
```

### Data Validation
```javascript
function validatePaper(paper) {
  const required = ['id', 'title', 'authors', 'abstract', 'pdfUrl'];
  const missing = required.filter(field => !paper[field]);
  
  if (missing.length > 0) {
    console.warn(`Paper ${paper.id} missing fields: ${missing.join(', ')}`);
    return false;
  }
  
  if (paper.authors.length === 0) {
    console.warn(`Paper ${paper.id} has no authors`);
    return false;
  }
  
  return true;
}
```

## Caching Strategy

### Local File Caching
```javascript
const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../data/papers.json');

function saveToCache(data) {
  const cacheData = {
    ...data,
    metadata: {
      ...data.metadata,
      lastUpdated: new Date().toISOString()
    }
  };
  
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  console.log(`Saved ${data.papers.length} papers to cache`);
}

function loadFromCache() {
  if (!fs.existsSync(CACHE_FILE)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(CACHE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load cache:', error.message);
    return null;
  }
}
```

## Best Practices

### Do's
✓ Respect rate limits (3-second delays)
✓ Implement retry logic with exponential backoff
✓ Validate all parsed data
✓ Cache responses to minimize API calls
✓ Handle missing/optional fields gracefully
✓ Log errors with context
✓ Use URL encoding for query parameters
✓ Check for empty result sets

### Don'ts
✗ Make rapid consecutive requests
✗ Ignore rate limit guidelines
✗ Assume all fields are present
✗ Parse XML without error handling
✗ Expose sensitive data in logs
✗ Hard-code query parameters
✗ Skip data validation
✗ Ignore network errors

## Testing

### Local Testing
```javascript
// Test query
const testUrl = 'http://export.arxiv.org/api/query?search_query=cat:stat.ME&max_results=5';

// Test parsing
const testData = await fetchArxivPapers(testUrl);
const parsed = await parseArxivXML(testData);
console.log(`Found ${parsed.feed.entry.length} papers`);
```

### Validation Checklist
- [ ] Query URL formatted correctly
- [ ] XML parses without errors
- [ ] All required fields extracted
- [ ] Authors array populated
- [ ] PDF URLs valid
- [ ] Dates in correct format
- [ ] Categories array populated
- [ ] Cache file saves successfully

## Deployment Integration

### GitHub Actions
- Workflow runs daily at midnight
- Fetches latest 50 papers
- Updates data/papers.json
- Commits and pushes automatically
- See: `.github/workflows/update-papers.yml`

### Client-Side Loading
```javascript
// Load papers.json on page load
fetch('data/papers.json')
  .then(response => response.json())
  .then(data => displayPapers(data.papers))
  .catch(error => console.error('Failed to load papers:', error));
```

## Resources
- [arXiv API User Manual](http://export.arxiv.org/api_help)
- [arXiv Category Taxonomy](https://arxiv.org/category_taxonomy)
- [Atom Specification](https://validator.w3.org/feed/docs/atom.html)
