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
    const featureCards = document.querySelectorAll('#screen-landing .model-card');
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

// Initialize all animations and simulator state on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollReveals();
  initRippleButtons();
  initTypingEffect();
  initPlatformWave();
  initSimulator();
});

/* ──────────────────────────────────────────────────────────
   MODELMIND BILLING & SUBSCRIPTION SIMULATOR CORE
   ────────────────────────────────────────────────────────── */

let userPlan = 'Pro';
let queryUsage = 42;
const starterLimit = 50;

let dbSubscriptions = [
  { id: 1, userId: 101, planName: 'Pro', status: 'active', gatewaySubId: 'N/A' }
];
let dbPayments = [];
let dbUsage = [];

// Pre-populate mock usage
function initSimulator() {
  dbUsage = [];
  const categories = ['video', 'image'];
  const priorities = ['cheapest', 'quality', 'fastest', 'balanced'];
  
  for (let i = 1; i <= 42; i++) {
    const randomOffset = Math.floor(Math.random() * 15);
    const date = new Date();
    date.setDate(date.getDate() - randomOffset);
    dbUsage.push({
      id: i,
      timestamp: date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)]
    });
  }
  
  logSystem('info', 'System initialized. Authenticated user ID: 101 assigned Starter plan (42/50 free queries used).');
  logSystem('sql', 'SELECT * FROM subscriptions WHERE user_id = 101; => status: active, plan: Starter');
  updateSimulatorUI();
}

function updateSimulatorUI() {
  // Update Navbar Status
  const navBadge = document.getElementById('nav-plan-badge');
  const navCount = document.getElementById('nav-usage-count');
  
  if (navBadge) {
    navBadge.className = `plan-badge ${userPlan.toLowerCase()}`;
    navBadge.innerText = userPlan;
  }
  if (navCount) {
    if (userPlan === 'Pro') {
      navCount.innerText = 'Unlimited';
    } else {
      navCount.innerText = `${queryUsage}/50`;
    }
  }

  // Update Landing Badge
  const landingBadge = document.getElementById('landing-user-badge');
  if (landingBadge) {
    landingBadge.className = `plan-badge ${userPlan.toLowerCase()}`;
    landingBadge.innerText = userPlan;
  }

  // Update Database Tables in DOM
  const subTableBody = document.getElementById('db-subscriptions-body');
  if (subTableBody) {
    subTableBody.innerHTML = `
      <tr>
        <td>${dbSubscriptions[0].id}</td>
        <td><code>${dbSubscriptions[0].userId}</code></td>
        <td><span class="plan-badge ${dbSubscriptions[0].planName.toLowerCase()}">${dbSubscriptions[0].planName}</span></td>
        <td><strong style="color: ${dbSubscriptions[0].status === 'active' ? '#34d399' : '#f87171'}">${dbSubscriptions[0].status.toUpperCase()}</strong></td>
        <td><code>${dbSubscriptions[0].gatewaySubId}</code></td>
      </tr>
    `;
  }

  const payTableBody = document.getElementById('db-payments-body');
  const payCountBadge = document.getElementById('db-payments-count');
  if (payTableBody) {
    if (dbPayments.length === 0) {
      payTableBody.innerHTML = `<tr><td colspan="5" style="color: var(--ink-dim); text-align: center;">No payment logs in database.</td></tr>`;
      if (payCountBadge) payCountBadge.innerText = '0 Rows';
    } else {
      payTableBody.innerHTML = dbPayments.map(p => `
        <tr>
          <td>${p.id}</td>
          <td>${p.subId}</td>
          <td>₹${p.amount}</td>
          <td><strong style="color: #34d399">SUCCEEDED</strong></td>
          <td><code>${p.gatewayTxId}</code></td>
        </tr>
      `).join('');
      if (payCountBadge) payCountBadge.innerText = `${dbPayments.length} Row${dbPayments.length > 1 ? 's' : ''}`;
    }
  }

  const usageTableBody = document.getElementById('db-usage-body');
  const usageCountBadge = document.getElementById('db-usage-count');
  if (usageTableBody) {
    usageTableBody.innerHTML = dbUsage.slice(-25).reverse().map(u => `
      <tr>
        <td>${u.id}</td>
        <td style="font-size:0.75rem; color: var(--ink-dim);">${u.timestamp}</td>
        <td>${u.category === 'video' ? '🎥 Video' : '🖼️ Image'}</td>
        <td><span class="cost-tag" style="background: rgba(255,255,255,0.05); font-size:0.7rem;">${u.priority}</span></td>
      </tr>
    `).join('');
    if (usageCountBadge) usageCountBadge.innerText = `${dbUsage.length} Row${dbUsage.length > 1 ? 's' : ''}`;
  }

  // Handle premium lock switches in Docs and Results
  const docsLockBadge = document.getElementById('docs-lock-badge');
  const docsEndpointsBadge = document.getElementById('docs-endpoints-badge');
  const apiKeyBlock = document.getElementById('api-key-block');
  const apiDemo = document.getElementById('api-interactive-demo');
  const pgRunBtn = document.getElementById('pg-run-btn');

  if (userPlan === 'Pro') {
    if (docsLockBadge) {
      docsLockBadge.className = 'premium-unlocked-tag';
      docsLockBadge.innerHTML = '✓ API Unlocked';
    }
    if (docsEndpointsBadge) {
      docsEndpointsBadge.className = 'premium-unlocked-tag';
      docsEndpointsBadge.innerHTML = '✓ Endpoint Active';
    }
    if (apiKeyBlock) {
      apiKeyBlock.innerText = `Authorization: Bearer mm_live_8f3d1b${queryUsage}a4c28f9d0e2c`;
      apiKeyBlock.style.color = '#34d399';
    }
    if (apiDemo) apiDemo.style.display = 'block';
  } else {
    if (docsLockBadge) {
      docsLockBadge.className = 'premium-lock-tag';
      docsLockBadge.innerHTML = '🔒 Pro Feature';
    }
    if (docsEndpointsBadge) {
      docsEndpointsBadge.className = 'premium-lock-tag';
      docsEndpointsBadge.innerHTML = '🔒 Pro Feature';
    }
    if (apiKeyBlock) {
      apiKeyBlock.innerText = 'Authorization: Bearer YOUR_API_KEY (Disabled - Starter tier)';
      apiKeyBlock.style.color = 'var(--ink-dim)';
    }
    if (apiDemo) {
      apiDemo.style.display = 'none';
      document.getElementById('api-response-preview').style.display = 'none';
    }
  }

  // Update compare screen buttons (export reports)
  const recommendedCard = document.getElementById('recommended-card');
  if (recommendedCard) {
    let exportBtn = document.getElementById('premium-export-btn');
    if (!exportBtn) {
      exportBtn = document.createElement('button');
      exportBtn.id = 'premium-export-btn';
      exportBtn.className = 'btn btn-outline';
      exportBtn.style.marginLeft = '10px';
      exportBtn.innerHTML = '📥 Export Report (Pro)';
      recommendedCard.querySelector('div:last-child').appendChild(exportBtn);
    }
    
    if (userPlan === 'Pro') {
      exportBtn.innerHTML = '📥 Export CSV Report';
      exportBtn.className = 'btn btn-emerald';
      exportBtn.onclick = function() {
        alert('CSV Report successfully compiled and downloaded: modelmind-benchmarks.csv');
        logSystem('info', 'Developer initiated benchmark data export. CSV generated.');
      };
    } else {
      exportBtn.innerHTML = '🔒 Export Report (Pro)';
      exportBtn.className = 'btn btn-outline';
      exportBtn.onclick = function() {
        alert('This is a premium feature. Please upgrade to Pro in the simulator or pricing section.');
        showScreen('screen-pricing');
      };
    }
  }
}

function logSystem(type, message) {
  const body = document.getElementById('console-logs-body');
  if (!body) return;
  
  const timestamp = new Date().toTimeString().split(' ')[0];
  const logDiv = document.createElement('div');
  logDiv.className = `console-log ${type}`;
  logDiv.innerHTML = `<span style="color: var(--ink-dim); font-size:0.75rem;">[${timestamp}]</span> <strong>${type.toUpperCase()}:</strong> ${message}`;
  body.appendChild(logDiv);
  body.scrollTop = body.scrollHeight;
}

// SIMULATE USAGE INCREMENTS
function simulateQuery(count = 1) {
  if (userPlan !== 'Pro' && queryUsage >= starterLimit) {
    alert('Benchmark usage limit reached (50/50)! Redirecting to upgrade screen.');
    logSystem('error', 'Rate limiter blocked query request: Starter subscription limit (50 queries) exceeded.');
    showScreen('screen-pricing');
    return;
  }

  for (let i = 0; i < count; i++) {
    if (userPlan !== 'Pro' && queryUsage >= starterLimit) {
      logSystem('error', 'Query batch interrupted: limit reached.');
      break;
    }

    queryUsage++;
    const now = new Date();
    dbUsage.push({
      id: dbUsage.length + 1,
      timestamp: now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0],
      category: activeCategory,
      priority: activePriority || 'balanced'
    });
    
    logSystem('info', `Benchmark query execution success for model comparison category: ${activeCategory}.`);
    logSystem('sql', `INSERT INTO benchmark_usage (user_id, category, prompt) VALUES (101, '${activeCategory}', '...');`);
  }
  
  updateSimulatorUI();
}

// CHECKOUT ACTIONS
function openCheckoutModal() {
  if (userPlan === 'Pro') {
    alert('You are already subscribed to the Pro plan!');
    return;
  }
  document.getElementById('checkout-modal').classList.add('active');
  logSystem('info', 'Stripe checkout session initiated for user: developer@modelmind.ai');
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.remove('active');
}

function selectStarterPlan() {
  if (userPlan === 'Starter') {
    alert('You are already on the Starter plan.');
  } else {
    // Downgrade back to starter
    userPlan = 'Starter';
    dbSubscriptions[0].planName = 'Starter';
    dbSubscriptions[0].status = 'active';
    dbSubscriptions[0].gatewaySubId = 'N/A';
    logSystem('info', 'User requested subscription change back to Starter (Free).');
    logSystem('sql', 'UPDATE subscriptions SET plan_id=1, status="active", gateway_subscription_id=NULL WHERE user_id=101;');
    updateSimulatorUI();
    alert('Plan reverted back to Starter.');
  }
}

// PAYMENT gateway PROCESSOR
function processSimulatedPayment(event) {
  event.preventDefault();
  closeCheckoutModal();
  
  logSystem('success', 'Credit Card verified. Stripe payment request authorized.');
  logSystem('info', 'Firing payment Webhook callback event checkout.session.completed [Event ID: evt_stripe_10293]...');
  
  // Simulate Webhook delay
  setTimeout(() => {
    logSystem('success', 'Webhook signature verified using signature: whsec_modelmind_sec...');
    logSystem('info', 'Django view stripe_webhook(request) received payload successfully.');
    
    // Update plan database
    userPlan = 'Pro';
    dbSubscriptions[0].planName = 'Pro';
    dbSubscriptions[0].status = 'active';
    dbSubscriptions[0].gatewaySubId = 'sub_stripe_8471bd902';
    
    const txId = 'pi_stripe_tx_' + Math.floor(Math.random() * 1000000);
    dbPayments.push({
      id: dbPayments.length + 1,
      subId: 1,
      amount: 799,
      status: 'succeeded',
      gatewayTxId: txId
    });

    logSystem('sql', `UPDATE subscriptions SET plan_id=2, status='active', gateway_subscription_id='sub_stripe_8471bd902' WHERE user_id=101;`);
    logSystem('sql', `INSERT INTO payments (user_id, subscription_id, amount_cents, status, gateway_payment_intent_id) VALUES (101, 1, 79900, 'succeeded', '${txId}');`);
    logSystem('success', 'Subscription activated. Premium access granted to API endpoints, webhook routes, and report exports.');
    
    updateSimulatorUI();
    alert('Payment Successful! ModelMind Pro tier active. Premium features unlocked.');
  }, 1000);
}

// SIMULATE PAYMENT FAILURE / CANCELATION
function triggerFailedPaymentWebhook() {
  logSystem('info', 'Simulating renewal failed event invoice.payment_failed from gateway...');
  setTimeout(() => {
    dbSubscriptions[0].status = 'past_due';
    logSystem('error', 'Django webhook: Payment renewal failed. Setting subscription status to past_due.');
    logSystem('sql', 'UPDATE subscriptions SET status="past_due" WHERE user_id=101;');
    
    // Restrict access
    userPlan = 'Starter (Locked)';
    updateSimulatorUI();
    alert('Billing alert: Subscription payment failed. Premium features have been locked (past_due status).');
  }, 500);
}

function triggerSubscriptionCancel() {
  logSystem('info', 'Simulating subscription deletion request from gateway webhook...');
  setTimeout(() => {
    userPlan = 'Starter';
    dbSubscriptions[0].planName = 'Starter';
    dbSubscriptions[0].status = 'active';
    dbSubscriptions[0].gatewaySubId = 'N/A';
    
    logSystem('info', 'Django webhook: Subscription canceled. Reverting user access to Starter Free tier.');
    logSystem('sql', 'UPDATE subscriptions SET plan_id=1, status="active", gateway_subscription_id=NULL WHERE user_id=101;');
    updateSimulatorUI();
    alert('Subscription successfully terminated. Access downgraded to Starter.');
  }, 500);
}

function resetSimulator() {
  userPlan = 'Starter';
  queryUsage = 42;
  dbSubscriptions = [
    { id: 1, userId: 101, planName: 'Starter', status: 'active', gatewaySubId: 'N/A' }
  ];
  dbPayments = [];
  initSimulator();
  alert('Simulator reset successfully.');
}

// docs API TESTING MOCK
function testSimulatedAPIRequest() {
  const respEl = document.getElementById('api-response-preview');
  respEl.style.display = 'block';
  respEl.innerText = 'Connecting to https://api.modelmind.ai/v1/benchmarks...';
  
  setTimeout(() => {
    // Increment query count for API call
    queryUsage++;
    const now = new Date();
    dbUsage.push({
      id: dbUsage.length + 1,
      timestamp: now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0],
      category: 'video',
      priority: 'REST API'
    });
    
    logSystem('info', 'REST API request received on endpoint /v1/benchmarks?category=video using bearer auth.');
    logSystem('sql', 'INSERT INTO benchmark_usage (user_id, category, prompt) VALUES (101, "video", "REST API Request");');
    updateSimulatorUI();
    
    const mockResponse = {
      status: "success",
      category: "video",
      timestamp: now.toISOString(),
      models: [
        { name: "Kling AI", score: 4.8, latency: "8s", costPerSec: "₹2.40" },
        { name: "Runway Gen-3", score: 4.9, latency: "6s", costPerSec: "₹12.48" },
        { name: "Luma Dream Machine", score: 4.1, latency: "9.5s", costPerSec: "₹6.16" }
      ]
    };
    respEl.innerText = JSON.stringify(mockResponse, null, 2);
  }, 800);
}

// MOCK PLAYGROUND IMPLEMENTATION
function runPlayground() {
  const prompt = document.getElementById('playground-prompt').value.trim();
  if (!prompt) {
    alert('Please write a prompt in the text box before generating!');
    return;
  }
  
  if (userPlan !== 'Pro' && queryUsage >= starterLimit) {
    alert('Benchmark usage limit reached (50/50)! Upgrade to Pro in the Sandbox or Pricing screens to use the playground.');
    logSystem('error', 'Playground generation blocked. Usage limit exceeded.');
    showScreen('screen-pricing');
    return;
  }

  // Run generation
  const resultsDiv = document.getElementById('pg-results');
  resultsDiv.innerHTML = `
    <div style="text-align: center; width: 100%; color: var(--accent); padding: 2rem;">
      <div class="logo-dot" style="margin: 0 auto 10px; animation: pulse 1s infinite alternate;"></div>
      Querying model providers side-by-side...
    </div>
  `;

  // Increment query
  queryUsage++;
  const now = new Date();
  const category = document.getElementById('pg-category').value;
  dbUsage.push({
    id: dbUsage.length + 1,
    timestamp: now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0],
    category: category,
    priority: 'Playground Run'
  });
  
  logSystem('info', `Playground query executed successfully. Prompt: "${prompt.slice(0, 25)}..."`);
  logSystem('sql', `INSERT INTO benchmark_usage (user_id, category, prompt) VALUES (101, '${category}', '${prompt.replace(/'/g, "''")}');`);
  updateSimulatorUI();

  setTimeout(() => {
    const dataset = modelsData[category];
    resultsDiv.innerHTML = dataset.map(m => `
      <div style="background: var(--panel); border: 1px solid var(--panel-line); border-radius: 1rem; padding: 1.2rem; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #fff;">${m.name}</strong>
          <span style="font-size: 0.75rem; color: var(--accent); font-weight: bold;">${m.speed}</span>
        </div>
        <div style="width: 100%; height: 110px; background: rgba(0,0,0,0.2); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: var(--ink-dim); text-align: center; border: 1px dashed var(--panel-line);">
          [Simulated Output for: "${prompt.substring(0, 15)}..."]
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--ink-dim);">
          <span>Cost: <strong style="color:var(--emerald);">${m.cost}</strong></span>
          <span>Quality: ${m.quality}</span>
        </div>
      </div>
    `).join('');
  }, 1000);
}

// Hook picker continue button to count queries
const originalGoToResults = goToResults;
goToResults = function() {
  if (userPlan !== 'Pro' && queryUsage >= starterLimit) {
    alert('Benchmark usage limit reached (50/50)! Redirecting to upgrade screen.');
    logSystem('error', 'Comparison blocked: usage limit reached.');
    showScreen('screen-pricing');
    return;
  }
  
  // Track query
  queryUsage++;
  const now = new Date();
  dbUsage.push({
    id: dbUsage.length + 1,
    timestamp: now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0],
    category: activeCategory,
    priority: activePriority
  });
  logSystem('info', `Comparison query executed. Priority: ${activePriority}`);
  logSystem('sql', `INSERT INTO benchmark_usage (user_id, category, prompt) VALUES (101, '${activeCategory}', 'Comparison priority: ${activePriority}');`);
  updateSimulatorUI();
  
  originalGoToResults();
};

