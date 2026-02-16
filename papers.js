/**
 * papers.js - Client-side paper feed logic
 * Loads and displays arXiv papers from data/papers.json
 */

// State
let allPapers = [];
let filteredPapers = [];
let currentSearch = '';
let currentCategory = 'all';

// DOM Elements
const papersContainer = document.getElementById('papers-container');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const resultsCount = document.getElementById('results-count');
const lastUpdated = document.getElementById('last-updated');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');

/**
 * Initialize the application
 */
async function init() {
  try {
    // Load papers from JSON
    const data = await loadPapers();
    
    if (!data || !data.papers) {
      throw new Error('Invalid data format');
    }
    
    allPapers = data.papers;
    filteredPapers = allPapers;
    
    // Update last updated time
    if (data.metadata && data.metadata.lastUpdated) {
      updateLastUpdatedTime(data.metadata.lastUpdated);
    }
    
    // Render initial papers
    renderPapers();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide loading state
    hideLoading();
    
  } catch (error) {
    console.error('Failed to load papers:', error);
    showError(error.message);
  }
}

/**
 * Load papers from JSON file
 */
async function loadPapers() {
  const response = await fetch('data/papers.json');
  
  if (!response.ok) {
    throw new Error(`Failed to load papers (HTTP ${response.status})`);
  }
  
  return await response.json();
}

/**
 * Setup event listeners for search and filter
 */
function setupEventListeners() {
  // Search input with debouncing
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = e.target.value.toLowerCase().trim();
      filterAndRender();
    }, 300);
  });
  
  // Category filter
  categoryFilter.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    filterAndRender();
  });
}

/**
 * Filter papers based on search and category
 */
function filterPapers() {
  filteredPapers = allPapers.filter(paper => {
    // Category filter
    const categoryMatch = currentCategory === 'all' || 
                         paper.categories.includes(currentCategory);
    
    if (!categoryMatch) return false;
    
    // Search filter
    if (!currentSearch) return true;
    
    const searchLower = currentSearch;
    const titleMatch = paper.title.toLowerCase().includes(searchLower);
    const authorsMatch = paper.authors.some(author => 
      author.toLowerCase().includes(searchLower)
    );
    const abstractMatch = paper.abstract.toLowerCase().includes(searchLower);
    
    return titleMatch || authorsMatch || abstractMatch;
  });
}

/**
 * Filter and render papers
 */
function filterAndRender() {
  filterPapers();
  renderPapers();
}

/**
 * Render papers to the DOM
 */
function renderPapers() {
  // Clear existing papers (keep state elements)
  const existingCards = papersContainer.querySelectorAll('.paper-card');
  existingCards.forEach(card => card.remove());
  
  // Update results count
  updateResultsCount();
  
  // Show empty state if no papers
  if (filteredPapers.length === 0) {
    showEmpty();
    return;
  }
  
  hideEmpty();
  
  // Render each paper
  filteredPapers.forEach((paper, index) => {
    const card = createPaperCard(paper, index);
    papersContainer.appendChild(card);
  });
}

/**
 * Create a paper card element
 */
function createPaperCard(paper, index) {
  const card = document.createElement('article');
  card.className = 'paper-card';
  card.setAttribute('data-paper-id', paper.id);
  
  // Limit animation delay
  if (index < 6) {
    card.style.animationDelay = `${index * 0.05}s`;
  }
  
  // Build HTML
  card.innerHTML = `
    <h3 class="paper-title">
      <a href="${escapeHtml(paper.pdfUrl)}" target="_blank" rel="noopener noreferrer">
        ${escapeHtml(paper.title)}
      </a>
    </h3>
    
    <p class="paper-authors">
      ${escapeHtml(formatAuthors(paper.authors))}
    </p>
    
    <p class="paper-date">
      ${formatDate(paper.published)}
    </p>
    
    <div class="paper-categories">
      ${paper.categories.map(cat => 
        `<span class="category-badge" data-category="${escapeHtml(cat)}">${escapeHtml(cat)}</span>`
      ).join('')}
    </div>
    
    <details class="paper-abstract">
      <summary>Abstract</summary>
      <p>${escapeHtml(paper.abstract)}</p>
    </details>
  `;
  
  return card;
}

/**
 * Format authors list
 */
function formatAuthors(authors) {
  if (authors.length === 0) return 'Unknown authors';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return authors.join(' and ');
  if (authors.length <= 5) {
    return authors.slice(0, -1).join(', ') + ', and ' + authors[authors.length - 1];
  }
  return authors.slice(0, 3).join(', ') + ', et al.';
}

/**
 * Format date string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Update last updated timestamp
 */
function updateLastUpdatedTime(timestamp) {
  const date = new Date(timestamp);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  lastUpdated.textContent = `Last updated: ${date.toLocaleDateString('en-US', options)}`;
}

/**
 * Update results count
 */
function updateResultsCount() {
  const count = filteredPapers.length;
  const total = allPapers.length;
  
  if (currentSearch || currentCategory !== 'all') {
    resultsCount.textContent = `Showing ${count} of ${total} papers`;
  } else {
    resultsCount.textContent = `${total} papers available`;
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Show/hide states
 */
function hideLoading() {
  loadingState.style.display = 'none';
}

function showError(message) {
  loadingState.style.display = 'none';
  errorState.style.display = 'block';
  document.getElementById('error-message').textContent = message;
}

function showEmpty() {
  emptyState.style.display = 'block';
}

function hideEmpty() {
  emptyState.style.display = 'none';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
