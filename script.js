"use strict";

/* Use a dedicated, compact favicon instead of the full-size site logo. */
const faviconLink = document.querySelector('link[rel="icon"]') || document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.type = 'image/svg+xml';
faviconLink.href = 'assets/favicon.svg?v=1';
if (!faviconLink.parentNode) document.head.appendChild(faviconLink);

/* Preserve the existing site behaviour from the last known-good version. */
document.write('<script src="https://cdn.jsdelivr.net/gh/sebsebeats/Sebybanham@0fce12cb5e63988900e45a394fd4fe2c3396c8a7/script.js"><\/script>');

function applySnapFinanceUpdates() {
  const homeStats = document.querySelector('.stat-constellation');
  const nplqStat = homeStats?.querySelector('.node-d');
  if (nplqStat) {
    nplqStat.dataset.target = 'experience';
    nplqStat.innerHTML = '<strong>Credit Risk Analytics</strong><span>Snap Finance</span><em>Used SQL and Excel on production-scale data and presented findings to senior leadership.</em>';
  }

  const journeyTimeline = document.querySelector('[data-page="journey"] .timeline');
  const futureDirection = [...(journeyTimeline?.querySelectorAll('.timeline-card') || [])]
    .find((card) => card.textContent.includes('Future Direction'));
  if (journeyTimeline && futureDirection && !journeyTimeline.querySelector('[data-snap-journey]')) {
    const card = document.createElement('article');
    card.className = 'timeline-card reveal';
    card.dataset.snapJourney = 'true';
    card.innerHTML = '<span class="timeline-phase">Direction</span><h3>Credit Risk Analytics - Snap Finance</h3><p>Applied SQL, Excel and mathematical reasoning to a real commercial credit-risk problem, then presented the findings to senior leadership.</p><div class="tag-row"><span>SQL</span><span>Data Analysis</span><span>Credit Risk</span><span>Presentation</span></div>';
    futureDirection.insertAdjacentElement('beforebegin', card);
  }

  const codingExample = [...document.querySelectorAll('[data-page="academic"] .glass-panel')]
    .find((panel) => panel.textContent.includes('Applied Coding Example'));
  if (codingExample) {
    codingExample.innerHTML = '<h3>Applied Data & Coding</h3><p>At Snap Finance, I learnt SQL and wrote hundreds of lines of code to query a production-scale database containing millions of customer records. I analysed the extracted data in Excel and identified a potential improvement to the company\'s credit-risk models.</p><div class="tag-row"><span>SQL</span><span>Excel</span><span>Large Datasets</span><span>Credit Risk</span><span>Applied Maths</span></div>';
  }

  const experiencePage = document.querySelector('[data-page="experience"] .experience-layout');
  if (experiencePage) {
    const upcomingGroup = [...experiencePage.querySelectorAll('.experience-group')]
      .find((group) => group.textContent.includes('Upcoming Technical Experience'));
    if (upcomingGroup) {
      upcomingGroup.innerHTML = '<span class="group-label">Data & Commercial Experience</span><article class="experience-card large"><span class="status">Completed</span><h3>Snap Finance</h3><p class="card-subtitle">Strategic Analytics - Credit Risk | July 2026</p><p>Worked directly with the Strategic Analytics team on a real credit-risk analysis project. I learnt SQL and wrote hundreds of lines of code to pull data from a production-scale database containing millions of customer records, then used Excel to analyse the results.</p><p>I met with heads of teams across the business to understand how their functions connected, and presented my findings to senior leadership and the wider team. My analysis identified a potential improvement to the company\'s risk models, and the SQL code and findings are intended for continued use within the business.</p><div class="tag-row"><span>SQL</span><span>Excel</span><span>Credit Risk</span><span>Data Analysis</span><span>Executive Presentation</span><span>Commercial Impact</span></div></article>';
    }
  }

  const projectsGrid = document.querySelector('[data-page="projects"] .project-grid');
  if (projectsGrid && !projectsGrid.querySelector('[data-project="snap-finance"]')) {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.project = 'snap-finance';
    card.innerHTML = '<span class="status">Completed</span><h3>Credit Risk Analytics - Snap Finance</h3><p>Used SQL and Excel to analyse production-scale customer data, identify a potential model improvement and present the findings to senior leadership. The code and analysis are intended for continued business use.</p><div class="tag-row"><span>SQL</span><span>Excel</span><span>Risk Modelling</span><span>Business Analysis</span></div>';
    projectsGrid.prepend(card);
  }

  document.querySelectorAll('a[href="assets/Seb-Banham-CV-Website.pdf"]').forEach((link) => {
    link.href = 'assets/Seb-Banham-CV-Website.html';
    link.removeAttribute('download');
    link.target = '_blank';
  });

  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));
}

function applyBenchPressPRUpdate() {
  const benchStat = document.querySelector('.stat-constellation .node-a');
  if (benchStat) {
    benchStat.innerHTML = '<strong>150kg</strong><span>Bench Press</span><em>Bench press achieved in September 2026 at age 17.</em>';
  }

  const strengthJourney = [...document.querySelectorAll('[data-page="journey"] .timeline-card')]
    .find((card) => card.querySelector('h3')?.textContent.trim() === 'Strength Training');
  if (strengthJourney) {
    const text = strengthJourney.querySelector('p');
    if (text) text.textContent = 'Built a consistent approach to progression, leading to a 150kg bench press achieved in September 2026 at age 17.';
  }

  const benchFeature = [...document.querySelectorAll('[data-page="gym"] .gym-feature')]
    .find((feature) => feature.querySelector('h3')?.textContent.trim() === 'Bench Press');
  if (benchFeature) {
    const description = benchFeature.querySelector('p');
    const number = benchFeature.querySelector('.big-number');
    if (description) description.textContent = 'Achieved in September 2026 at age 17 after continued progression beyond a long plateau.';
    if (number) number.textContent = '150kg';
  }

  const oldGoalPoint = [...document.querySelectorAll('[data-page="gym"] .bench-point')]
    .find((point) => point.textContent.includes('2026 Goal') && point.textContent.includes('140kg'));
  if (oldGoalPoint) {
    oldGoalPoint.innerHTML = '<strong>Sep 2026</strong><span>150kg at age 17</span>';
  }

  const oldGoalCard = [...document.querySelectorAll('[data-page="gym"] .goal-card')]
    .find((card) => card.textContent.includes('140kg bench in 2026'));
  if (oldGoalCard) oldGoalCard.textContent = '150kg bench achieved in 2026';
}

document.addEventListener('DOMContentLoaded', applySnapFinanceUpdates);
document.addEventListener('DOMContentLoaded', applyBenchPressPRUpdate);
