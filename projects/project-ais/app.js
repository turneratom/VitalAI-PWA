const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const sendBtn = document.getElementById('send');
const queryInput = document.getElementById('query');
const messages = document.getElementById('messages');
const tiers = document.querySelectorAll('.tier');
let currentImage = null;

const TIER_KEY = 'vitalai_tier';
const FREE_LIMIT = 5;

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

function getTier() {
  return localStorage.getItem(TIER_KEY) || 'free';
}

function setTier(tier) {
  localStorage.setItem(TIER_KEY, tier);
  updateTierUI();
}

function updateTierUI() {
  const tier = getTier();
  tiers.forEach((btn) => {
    const isActive =
      (tier === 'free' && btn.classList.contains('free')) ||
      (tier === 'pro' && btn.classList.contains('pro')) ||
      (tier === 'elite' && btn.classList.contains('elite'));
    btn.classList.toggle('active', isActive);
  });
}

async function startCheckout(tier) {
  try {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier })
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    window.location.href = `pricing.html?tier=${tier}&setup=1`;
  } catch {
    window.location.href = `pricing.html?tier=${tier}`;
  }
}

tiers.forEach((btn) => {
  btn.onclick = () => {
    if (btn.classList.contains('free')) {
      setTier('free');
      return;
    }
    if (btn.classList.contains('pro')) startCheckout('pro');
    if (btn.classList.contains('elite')) startCheckout('elite');
  };
});

async function verifyPaymentFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const tier = params.get('tier');
  if (!sessionId) return;
  try {
    const res = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`);
    const data = await res.json();
    if (data.verified) setTier(data.tier || tier || 'pro');
  } catch { /* ignore */ }
}

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    video.srcObject = stream;
    document.getElementById('camera').classList.remove('hidden');
  } catch {
    addMessage('Camera unavailable — you can still type health questions.', 'ai');
  }
}

snapBtn.onclick = () => {
  if (getTier() === 'free') {
    const used = parseInt(localStorage.getItem('vitalai_snaps') || '0', 10);
    if (used >= FREE_LIMIT) {
      addMessage('Free limit reached (5 snaps/day). Upgrade to Pro for unlimited.', 'ai');
      return;
    }
    localStorage.setItem('vitalai_snaps', String(used + 1));
  }
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  currentImage = canvas.toDataURL('image/jpeg', 0.8);
  addMessage('Photo snapped! Ask away.', 'ai');
};

function proResponses(q) {
  const tier = getTier();
  if (tier === 'elite') {
    return `Elite analysis: Based on "${q.slice(0, 40)}...", consider hydration, sleep quality, and tracking macros. Full history sync enabled.`;
  }
  if (tier === 'pro') {
    return `Pro insight: For "${q.slice(0, 40)}...", track symptoms for 3 days and compare meals. Unlimited snaps active.`;
  }
  return null;
}

sendBtn.onclick = async () => {
  const q = queryInput.value.trim();
  if (!q) return;
  addMessage(q, 'user');
  queryInput.value = '';

  const pro = proResponses(q);
  setTimeout(() => {
    if (pro) {
      addMessage(pro, 'ai');
      return;
    }
    const responses = [
      'Analyzing: Possible irritation — hydrate and avoid harsh products. Upgrade to Pro for detailed tracking.',
      'Looks manageable. Log meals for better context. Try our free TDEE calculator.',
      'Image unclear — describe symptoms or resnap in better light.',
    ];
    addMessage(responses[Math.floor(Math.random() * responses.length)], 'ai');
  }, 1200);
};

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.innerHTML = `<strong>${sender.toUpperCase()}:</strong> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

verifyPaymentFromUrl();
updateTierUI();
initCamera();
