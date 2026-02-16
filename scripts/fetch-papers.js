#!/usr/bin/env node

/**
 * fetch-papers.js - Fetch papers from arXiv API
 * Query categories: stat.ME, stat.AP, econ.EM, q-bio.QM
 * Save to data/papers.json
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

// Configuration
const CATEGORIES = ['stat.ME', 'stat.AP', 'econ.EM', 'q-bio.QM'];
const MAX_RESULTS = 50;
const RATE_LIMIT_DELAY = 3000; // 3 seconds
const MAX_RETRIES = 3;
const OUTPUT_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'papers.json');

/**
 * Build arXiv API query URL
 */
function buildQueryUrl(categories, maxResults) {
  const searchQuery = categories.map(cat => `cat:${cat}`).join(' OR ');
  const params = new URLSearchParams({
    search_query: searchQuery,
    sortBy: 'submittedDate',
    sortOrder: 'descending',
    start: '0',
    max_results: maxResults.toString()
  });
  
  return `http://export.arxiv.org/api/query?${params.toString()}`;
}

/**
 * Fetch data from URL with retry logic and redirect handling
 */
function fetchUrl(url, attempt = 1, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    console.log(`[Attempt ${attempt}] Fetching: ${url}`);
    
    // Use http or https based on URL protocol
    const client = url.startsWith('https://') ? https : http;
    
    client.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (maxRedirects === 0) {
          reject(new Error('Too many redirects'));
          return;
        }
        
        const redirectUrl = res.headers.location;
        console.log(`Following redirect to: ${redirectUrl}`);
        
        // Recursively follow redirect
        fetchUrl(redirectUrl, attempt, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✓ Successfully fetched data');
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Fetch with retry and exponential backoff
 */
async function fetchWithRetry(url, maxRetries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchUrl(url, attempt);
    } catch (error) {
      console.error(`✗ Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Waiting ${delay}ms before retry...`);
      await sleep(delay);
    }
  }
}

/**
 * Parse arXiv XML response
 */
function parseArxivXML(xmlString) {
  return new Promise((resolve, reject) => {
    const options = {
      explicitArray: false,
      mergeAttrs: false,
      xmlns: false,
      tagNameProcessors: [],
      attrNameProcessors: [],
      valueProcessors: [],
      attrValueProcessors: []
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

/**
 * Extract paper data from entry
 */
function extractPaperData(entry) {
  try {
    // Extract arXiv ID (remove version suffix)
    const fullId = entry.id || '';
    const arxivId = fullId.split('/abs/')[1]?.replace(/v\d+$/, '') || 'unknown';
    
    // Extract authors
    let authors = [];
    if (entry.author) {
      if (Array.isArray(entry.author)) {
        authors = entry.author.map(a => a.name).filter(Boolean);
      } else {
        authors = [entry.author.name].filter(Boolean);
      }
    }
    
    // Extract categories
    let categories = [];
    if (entry.category) {
      if (Array.isArray(entry.category)) {
        categories = entry.category.map(c => c.$.term).filter(Boolean);
      } else {
        categories = [entry.category.$.term].filter(Boolean);
      }
    }
    
    // Find PDF link
    let pdfUrl = '';
    if (entry.link) {
      const links = Array.isArray(entry.link) ? entry.link : [entry.link];
      const pdfLink = links.find(l => l.$.title === 'pdf');
      pdfUrl = pdfLink ? pdfLink.$.href : '';
    }
    
    // Extract primary category
    let primaryCategory = '';
    if (entry['arxiv:primary_category']) {
      primaryCategory = entry['arxiv:primary_category'].$.term || '';
    }
    
    // Extract DOI (optional)
    const doi = entry['arxiv:doi'] || null;
    
    return {
      id: arxivId,
      title: (entry.title || '').trim().replace(/\s+/g, ' '),
      authors: authors,
      abstract: (entry.summary || '').trim().replace(/\s+/g, ' '),
      published: (entry.published || '').split('T')[0],
      updated: (entry.updated || '').split('T')[0],
      categories: categories,
      primaryCategory: primaryCategory,
      pdfUrl: pdfUrl,
      arxivUrl: entry.id || '',
      doi: doi
    };
  } catch (error) {
    console.error('Error extracting paper data:', error);
    return null;
  }
}

/**
 * Validate paper data
 */
function validatePaper(paper) {
  if (!paper) return false;
  
  const required = ['id', 'title', 'authors', 'abstract', 'pdfUrl'];
  const missing = required.filter(field => !paper[field]);
  
  if (missing.length > 0) {
    console.warn(`⚠ Paper ${paper.id} missing fields: ${missing.join(', ')}`);
    return false;
  }
  
  if (paper.authors.length === 0) {
    console.warn(`⚠ Paper ${paper.id} has no authors`);
    return false;
  }
  
  return true;
}

/**
 * Transform parsed XML to JSON structure
 */
function transformToJSON(parsed) {
  if (!parsed.feed) {
    throw new Error('Invalid arXiv response: missing feed');
  }
  
  if (!parsed.feed.entry) {
    console.warn('⚠ No papers found in response');
    return {
      papers: [],
      metadata: {
        lastUpdated: new Date().toISOString(),
        totalPapers: 0,
        categories: CATEGORIES,
        queryDate: new Date().toISOString().split('T')[0]
      }
    };
  }
  
  // Handle single entry (not an array)
  const entries = Array.isArray(parsed.feed.entry) 
    ? parsed.feed.entry 
    : [parsed.feed.entry];
  
  console.log(`Processing ${entries.length} papers...`);
  
  // Extract and validate papers
  const papers = entries
    .map(extractPaperData)
    .filter(validatePaper);
  
  console.log(`✓ Successfully processed ${papers.length} valid papers`);
  
  return {
    papers: papers,
    metadata: {
      lastUpdated: new Date().toISOString(),
      totalPapers: papers.length,
      categories: CATEGORIES,
      queryDate: new Date().toISOString().split('T')[0]
    }
  };
}

/**
 * Save data to JSON file
 */
function saveToFile(data, filePath) {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write file
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, json, 'utf8');
  console.log(`✓ Saved to ${filePath}`);
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('='.repeat(60));
    console.log('arXiv Paper Fetcher');
    console.log('='.repeat(60));
    console.log(`Categories: ${CATEGORIES.join(', ')}`);
    console.log(`Max results: ${MAX_RESULTS}`);
    console.log('');
    
    // Build query URL
    const url = buildQueryUrl(CATEGORIES, MAX_RESULTS);
    
    // Fetch data
    console.log('Fetching papers from arXiv...');
    const xmlData = await fetchWithRetry(url);
    
    // Respect rate limit
    console.log(`Waiting ${RATE_LIMIT_DELAY}ms (rate limit)...`);
    await sleep(RATE_LIMIT_DELAY);
    
    // Parse XML
    console.log('Parsing XML response...');
    const parsed = await parseArxivXML(xmlData);
    
    // Transform to JSON
    console.log('Transforming data...');
    const jsonData = transformToJSON(parsed);
    
    // Save to file
    console.log('Saving to file...');
    saveToFile(jsonData, OUTPUT_FILE);
    
    console.log('');
    console.log('='.repeat(60));
    console.log('✓ Successfully completed!');
    console.log(`Total papers: ${jsonData.metadata.totalPapers}`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('');
    console.error('='.repeat(60));
    console.error('✗ Fatal Error:');
    console.error(error.message);
    console.error('='.repeat(60));
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { fetchWithRetry, parseArxivXML, transformToJSON };
