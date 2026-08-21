// State management
let activePriority = null;
let activeCategory = 'video'; // 'video' or 'image'

// Mock benchmark dataset
const modelsData = {
  video: [
    { name: 'Kling AI', key: 'K', cost: '₹2.40/sec', rawCost: 2.4, quality: '★★★★★', rawQuality: 4.8, speed: 'Fast', rawSpeed: 8, desc: 'Best balance of motion consistency and cost for video projects.', target: 'Video / Mobile' },
    { name: 'Runway Gen-3', key: 'R', cost: '₹12.48/sec', rawCost: 12.48, quality: '★★★★★', rawQuality: 4.9, speed: 'Moderate', rawSpeed: 6, desc: 'Cinematic fidelity with photorealistic output. Highly controllable.', target: 'Professional Video' },
    { name: 'Luma Dream Machine', key: 'L', cost: '₹6.16/sec', rawCost: 6.16, quality: '★★★★☆', rawQuality: 4.1, speed: 'Very Fast', rawSpeed: 9.5, desc: 'High-speed action sequences and camera movements.', target: 'Prototyping & Web' },
    { name: 'Pika 2.0', key: 'P', cost: '₹4.88/sec', rawCost: 4.88, quality: '★★★★☆', rawQuality: 4.0, speed: 'Fast', rawSpeed: 8.5, desc: 'Ideal for 3D animation style videos and short clips.', target: 'Social Media / Anime' }
  ],
  image: [
    { name: 'Midjourney v6', key: 'M', cost: '₹1.50/img', rawCost: 1.5, quality: '★★★★★', rawQuality: 4.9, speed: 'Moderate', rawSpeed: 6.5, desc: 'Unmatched photorealism, artistic direction, and style flexibility.', target: 'High-End Design' },
    { name: 'DALL-E 3', key: 'D', cost: '₹3.20/img', rawCost: 3.2, quality: '★★★★☆', rawQuality: 4.6, speed: 'Fast', rawSpeed: 8.5, desc: 'Incredible prompt adherence and logical consistency.', target: 'Concept Art' },
    { name: 'Flux.1 Schnell', key: 'F', cost: '₹0.20/img', rawCost: 0.2, quality: '★★★★☆', rawQuality: 4.3, speed: 'Very Fast', rawSpeed: 9.8, desc: 'Incredibly fast local/API generation with readable text.', target: 'Bulk Production' },
    { name: 'Stable Diffusion XL', key: 'S', cost: '₹0.50/img', rawCost: 0.5, quality: '★★★★☆', rawQuality: 4.2, speed: 'Fast', rawSpeed: 8.0, desc: 'High customizability with ControlNet and custom LoRAs.', target: 'Developer Apps' }
  ]
};

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPicker(category) {
  activeCategory = category;
  updateTabButtons();
  showScreen('screen-picker');
}

function selectPriority(card) {
  document.querySelectorAll('.priority-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  activePriority = card.dataset.key;
  
  // Animate selection weight bars
  const weights = card.dataset.weights.split(',');
  card.querySelectorAll('.weights-bar-group .bar span').forEach((s, i) => {
    requestAnimationFrame(() => { s.style.width = weights[i] + '%'; });
  });

  document.getElementById('continue-btn').disabled = false;
}

function updateTabButtons() {
  if (activeCategory === 'video') {
    document.getElementById('tab-video').classList.add('active');
    document.getElementById('tab-image').classList.remove('active');
  } else {
    document.getElementById('tab-video').classList.remove('active');
    document.getElementById('tab-image').classList.add('active');
  }
}

function switchCategory(category) {
  activeCategory = category;
  updateTabButtons();
  renderResults();
}

function goToResults() {
  if (!activePriority) return;
  document.getElementById('priority-label').innerText = activePriority.charAt(0).toUpperCase() + activePriority.slice(1);
  renderResults();
  showScreen('screen-results');
}

function renderResults() {
  const dataset = modelsData[activeCategory];
  let sorted = [...dataset];
  
  if (activePriority === 'cheapest') {
    sorted.sort((a, b) => a.rawCost - b.rawCost);
  } else if (activePriority === 'quality') {
    sorted.sort((a, b) => b.rawQuality - a.rawQuality);
  } else if (activePriority === 'fastest') {
    sorted.sort((a, b) => b.rawSpeed - a.rawSpeed);
  } else {
    // Balanced
    sorted.sort((a, b) => {
      const scoreA = (a.rawQuality * 2) + a.rawSpeed - (a.rawCost * 0.2);
      const scoreB = (b.rawQuality * 2) + b.rawSpeed - (b.rawCost * 0.2);
      return scoreB - scoreA;
    });
  }

  // Recommended is the top element
  const recommended = sorted[0];
  document.getElementById('rec-name').innerText = recommended.name;
  document.getElementById('rec-desc').innerText = recommended.desc;
  document.getElementById('rec-cost').innerText = recommended.cost;
  document.getElementById('rec-target').innerText = recommended.target;

  // Populate table
  const tbody = document.getElementById('results-table-body');
  tbody.innerHTML = '';
  
  sorted.forEach(model => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="model-badge">${model.key}</span>
        <span class="model-name">${model.name}</span>
      </td>
      <td><span class="cost-tag">${model.cost}</span></td>
      <td><span class="score-badge">${model.quality}</span></td>
      <td><span style="font-weight: 500;">${model.speed}</span></td>
      <td>
        <a href="#" class="btn btn-outline" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="showModelDrawer('${model.name}', '${model.cost}', '${model.quality}', '${model.speed}')">Details</a>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Detail Drawer Actions
function showModelDrawer(name, cost, quality, speed) {
  document.getElementById('drawer-title').innerText = name;
  document.getElementById('detail-cost').innerText = cost;
  document.getElementById('detail-quality').innerText = quality + ' (High)';
  document.getElementById('detail-speed').innerText = speed;
  
  // Update drawer preview image dynamically
  const previewImg = document.getElementById('drawer-preview-img');
  if (activeCategory === 'video') {
    previewImg.src = 'video_preview.png';
    previewImg.alt = 'AI Video Generation Sample';
  } else {
    previewImg.src = 'image_preview.png';
    previewImg.alt = 'AI Image Generation Sample';
  }
  
  document.getElementById('detail-drawer').classList.add('active');
}

function openDetails(isRecommended) {
  if (isRecommended) {
    const name = document.getElementById('rec-name').innerText;
    const cost = document.getElementById('rec-cost').innerText;
    const quality = "★★★★★";
    const speed = "Fast / Optimal";
    showModelDrawer(name, cost, quality, speed);
  }
}

function closeDrawer(event) {
  if (!event || event.target.id === 'detail-drawer' || event.target.classList.contains('drawer-close')) {
    document.getElementById('detail-drawer').classList.remove('active');
  }
}

// Theme Switcher Logic
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Apply theme preference on load
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
}

// ─── ANIMATION ENGINE ───────────────────────────────────

// 1. Floating Particle System
function createParticles() {
  const container = document.createElement('div');
  container.classList.add('particles');
  document.body.appendChild(container);

  const PARTICLE_COUNT = 25;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    container.appendChild(p);
  }
}

// 2. Scroll-triggered Reveal Observer
function initScrollReveals() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// 3. Button Ripple Effect
function initRippleButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// 4. Hero Typing Effect
function initTypingEffect() {
  const subhead = document.querySelector('#screen-landing .subhead');
  if (!subhead) return;

  const fullText = subhead.textContent;
  subhead.textContent = '';
  subhead.classList.add('typing-cursor');

  let i = 0;
  const speed = 22; // ms per character

  function type() {
    if (i < fullText.length) {
      subhead.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor after typing finishes
      setTimeout(() => subhead.classList.remove('typing-cursor'), 1200);
    }
  }

  // Small delay before typing starts
  setTimeout(type, 600);
}

// 5. Stagger priority cards on screen enter
const originalShowScreen = showScreen;
showScreen = function(screenId) {
  originalShowScreen(screenId);

  // Stagger priority cards when picker screen is shown
  if (screenId === 'screen-picker') {
    const cards = document.querySelectorAll('.priority-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(25px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + i * 90);
    });
  }

  // Stagger feature cards on landing
  if (screenId === 'screen-landing') {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(25px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 + i * 120);
    });
  }
};

// 6. Animated number counter for stat values
function animateValue(el, start, end, duration, suffix) {
  const range = end - start;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + range * eased;
    el.textContent = current.toFixed(2) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// 7. Platform tags wave animation on landing
function initPlatformWave() {
  const tags = document.querySelectorAll('.platform-tag');
  tags.forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    setTimeout(() => {
      tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, 800 + i * 80);
  });
}

// Initialize all animations on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollReveals();
  initRippleButtons();
  initTypingEffect();
  initPlatformWave();
});
