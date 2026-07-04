const siteData = {
  navLinks: ['Product', 'Features', 'Networks'],
  eyebrow: 'Live cross-chain liquidity',
  heroTitle: 'Trade smarter with one beautiful Web3 experience.',
  heroCopy: 'Nebulax brings real-time quotes, deep liquidity, and a polished interface together so teams can swap, explore, and move value with confidence.',
  stats: [
    { label: 'Volume', value: '$4.8B+' },
    { label: 'Routes', value: '180+' },
    { label: 'Avg. speed', value: '0.2s' }
  ],
  features: [
    { title: 'Instant routing', text: 'Smart pathfinding finds the best price across chains and liquidity pools.' },
    { title: 'Secure by design', text: 'Clear approvals, gas estimates, and transparency help users stay in control.' },
    { title: 'Designed for scale', text: 'A simple, premium interface keeps the experience smooth for every user.' }
  ],
  workflow: [
    { title: 'Choose asset', text: 'Pick your from and to tokens in one simple flow.' },
    { title: 'Review quote', text: 'Compare routes, slippage, and best execution in seconds.' },
    { title: 'Confirm trade', text: 'Secure the swap and monitor progress in real time.' }
  ],
  networks: [
    { title: 'Ethereum', text: 'Deep liquidity, broad token support, and reliable execution.' },
    { title: 'Arbitrum', text: 'Low-cost routing with fast finality for high-volume flows.' },
    { title: 'Polygon', text: 'Fast and affordable experiences for everyday users.' },
    { title: 'Base', text: 'Growing ecosystem with modern tooling and low fees.' }
  ],
  preview: {
    fromSymbol: 'ETH',
    fromName: 'Ethereum',
    toSymbol: 'USDC',
    toName: 'USD Coin',
    routeName: 'Uniswap + Curve',
    routeMeta: 'Low slippage • 0.23s execution'
  }
};

function render() {
  const navLinksEl = document.getElementById('nav-links');
  if (navLinksEl) navLinksEl.innerHTML = siteData.navLinks.map(link => `<a href="#${link.toLowerCase()}">${link}</a>`).join('');

  const eyebrowEl = document.getElementById('eyebrow');
  if (eyebrowEl) eyebrowEl.textContent = siteData.eyebrow;

  const heroTitleEl = document.getElementById('hero-title');
  if (heroTitleEl) heroTitleEl.textContent = siteData.heroTitle;

  const heroCopyEl = document.getElementById('hero-copy');
  if (heroCopyEl) heroCopyEl.textContent = siteData.heroCopy;

  const statsRow = document.getElementById('stats-row');
  if (statsRow) statsRow.innerHTML = siteData.stats.map(stat => `
      <div class="stat-card">
        <div class="label">${stat.label}</div>
        <div class="value">${stat.value}</div>
      </div>
    `).join('');

  const fromSymbol = document.getElementById('from-symbol'); if (fromSymbol) fromSymbol.textContent = siteData.preview.fromSymbol;
  const fromName = document.getElementById('from-name'); if (fromName) fromName.textContent = siteData.preview.fromName;
  const toSymbol = document.getElementById('to-symbol'); if (toSymbol) toSymbol.textContent = siteData.preview.toSymbol;
  const toName = document.getElementById('to-name'); if (toName) toName.textContent = siteData.preview.toName;
  const routeName = document.getElementById('route-name'); if (routeName) routeName.textContent = siteData.preview.routeName;
  const routeMeta = document.getElementById('route-meta'); if (routeMeta) routeMeta.textContent = siteData.preview.routeMeta;

  const featuresGrid = document.getElementById('features-grid');
  if (featuresGrid) featuresGrid.innerHTML = siteData.features.map(feature => `
      <article class="feature-card">
        <h3>${feature.title}</h3>
        <p>${feature.text}</p>
      </article>
    `).join('');

  const workflowGrid = document.getElementById('workflow-grid');
  if (workflowGrid) workflowGrid.innerHTML = siteData.workflow.map((step, index) => `
      <article class="workflow-card">
        <h3>${index + 1}. ${step.title}</h3>
        <p>${step.text}</p>
      </article>
    `).join('');

  const networksGrid = document.getElementById('networks-grid');
  if (networksGrid) networksGrid.innerHTML = siteData.networks.map(network => `
      <article class="network-card">
        <h3>${network.title}</h3>
        <p>${network.text}</p>
      </article>
    `).join('');

  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
}

const componentTemplates = {
  'components/header.html': `<nav class="nav">
  <div class="container nav-inner">
    <a href="#product" class="brand" aria-label="Nebulax home">
      <img src="assets/logo.svg" alt="Nebulax logo" class="site-logo" />
    </a>
    <div class="nav-links" id="nav-links"></div>
    <a class="btn btn-primary" href="#launch">Launch App</a>
  </div>
</nav>`,

  'components/preview.html': `<div class="preview-card">
  <div class="glass-card">
    <div class="token-row">
      <div class="token-pill">
        <div class="token-icon eth">ETH</div>
        <div>
          <div id="from-symbol">ETH</div>
          <div class="label" id="from-name">Ethereum</div>
        </div>
      </div>
      <div class="amount" id="from-amount">1.2500</div>
    </div>
  </div>
  <div class="glass-card">
    <div class="token-row">
      <div class="token-pill">
        <div class="token-icon usdc">USDC</div>
        <div>
          <div id="to-symbol">USDC</div>
          <div class="label" id="to-name">USD Coin</div>
        </div>
      </div>
      <div class="amount" id="to-amount">4100.00</div>
    </div>
  </div>
  <div class="glass-card">
    <div class="label">Best route</div>
    <div class="amount" id="route-name">Uniswap + Curve</div>
    <div class="label" id="route-meta" style="margin-top: 6px;">Low slippage • 0.23s execution</div>
  </div>
</div>`,
  'components/footer.html': `<footer>
  <div class="container">© <span id="year"></span> Nebulax. Built for fast, secure cross-chain swaps.</div>
</footer>`
};

async function loadComponent(path, selector) {
  let html = componentTemplates[path] || '';

  try {
    const res = await fetch(path);
    if (res.ok) {
      html = await res.text();
    }
  } catch (err) {
    console.warn('Fetch failed for', path, err);
  }

  const placeholder = document.querySelector(selector);
  if (placeholder) placeholder.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('components/header.html', '#header-placeholder');
  await loadComponent('components/preview.html', '#preview-placeholder');
  await loadComponent('components/footer.html', '#footer-placeholder');
  render();
});
