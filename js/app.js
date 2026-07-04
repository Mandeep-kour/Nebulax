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

async function loadComponent(path, selector) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to load ' + path);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.warn(err);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('components/header.html', 'body');
  // Insert the remaining static structure after header
  const header = document.querySelector('nav.nav');
  if (header) header.insertAdjacentHTML('afterend', `
    <header class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow" id="eyebrow"></div>
          <h1 id="hero-title"></h1>
          <p id="hero-copy"></p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#launch">Start swapping</a>
            <a class="btn btn-secondary" href="#features">Explore features</a>
          </div>
          <div class="stat-row" id="stats-row"></div>
        </div>
      </div>
    </header>
    <main>
      <section class="section" id="features">
        <div class="container">
          <div class="section-title">
            <h2>Why teams choose Nebulax</h2>
            <a href="#launch">See live demo</a>
          </div>
          <div class="grid feature-grid" id="features-grid"></div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-title">
            <h2>How the experience works</h2>
          </div>
          <div class="grid workflow-grid" id="workflow-grid"></div>
        </div>
      </section>

      <section class="section" id="launch">
        <div class="container">
          <div class="section-title">
            <h2>Supported networks</h2>
          </div>
          <div class="grid network-grid" id="networks-grid"></div>
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <div class="cta-box">
            <h3>Ready to move assets with clarity?</h3>
            <p>Launch the experience and start routing liquidity across chains in seconds.</p>
            <a class="btn btn-primary" href="#">Open Nebulax</a>
          </div>
        </div>
      </section>
    </main>
  `);

  // Insert preview after hero (into the hero-grid right column)
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) {
    heroGrid.appendChild(document.createElement('div')).className = 'preview-placeholder';
    const placeholder = document.querySelector('.preview-placeholder');
    if (placeholder) placeholder.innerHTML = await (await fetch('components/preview.html')).text();
  }

  // Append footer component
  const mainEl = document.querySelector('main');
  if (mainEl) mainEl.insertAdjacentHTML('afterend', await (await fetch('components/footer.html')).text());

  render();
});
