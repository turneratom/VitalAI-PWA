function injectFaqSchema(faqs) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  });
  document.head.appendChild(script);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

function calcBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function calcBMR(weightKg, heightCm, age, sex) {
  if (sex === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

function activityMultiplier(level) {
  const map = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return map[level] || 1.2;
}

function calcTDEE(bmr, activity) {
  return bmr * activityMultiplier(activity);
}

function macroSplit(calories, goal) {
  const splits = {
    balanced: { protein: 0.3, carbs: 0.4, fat: 0.3 },
    low_carb: { protein: 0.35, carbs: 0.25, fat: 0.4 },
    high_protein: { protein: 0.4, carbs: 0.35, fat: 0.25 },
    cut: { protein: 0.4, carbs: 0.3, fat: 0.3 }
  };
  const split = splits[goal] || splits.balanced;
  return {
    proteinG: Math.round((calories * split.protein) / 4),
    carbsG: Math.round((calories * split.carbs) / 4),
    fatG: Math.round((calories * split.fat) / 9)
  };
}

function calcWaterIntake(weightKg, activity, climate) {
  let base = weightKg * 0.033;
  const activityBonus = { low: 0, moderate: 0.3, high: 0.6 };
  const climateBonus = { normal: 0, hot: 0.4 };
  base += activityBonus[activity] || 0;
  base += climateBonus[climate] || 0;
  return base;
}

function calcProtein(weightKg, goal, activity) {
  const rates = {
    maintain: { low: 1.2, moderate: 1.6, high: 1.8 },
    lose: { low: 1.6, moderate: 2.0, high: 2.2 },
    gain: { low: 1.6, moderate: 2.0, high: 2.4 }
  };
  const rate = (rates[goal] || rates.maintain)[activity] || 1.6;
  return Math.round(weightKg * rate);
}

function calcBodyFatNavy(sex, heightCm, neckCm, waistCm, hipCm) {
  if (sex === 'male') {
    return 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
  }
  return 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
}

function bodyFatCategory(pct, sex) {
  const male = [[6, 'Essential fat'], [14, 'Athletes'], [18, 'Fitness'], [25, 'Average'], [100, 'Obese']];
  const female = [[14, 'Essential fat'], [21, 'Athletes'], [25, 'Fitness'], [32, 'Average'], [100, 'Obese']];
  const table = sex === 'male' ? male : female;
  for (const [max, label] of table) {
    if (pct <= max) return label;
  }
  return 'Obese';
}

function calcIdealWeight(heightCm, sex) {
  const heightIn = heightCm / 2.54;
  const robinson = sex === 'male'
    ? 52 + 1.9 * (heightIn - 60)
    : 49 + 1.7 * (heightIn - 60);
  const devine = sex === 'male'
    ? 50 + 2.3 * (heightIn - 60)
    : 45.5 + 2.3 * (heightIn - 60);
  const miller = sex === 'male'
    ? 56.2 + 1.41 * (heightIn - 60)
    : 53.1 + 1.36 * (heightIn - 60);
  return {
    robinson: Math.round(robinson * 10) / 10,
    devine: Math.round(devine * 10) / 10,
    miller: Math.round(miller * 10) / 10
  };
}

function calcCalorieDeficit(currentKg, targetKg, weeklyLossKg) {
  const totalLossKg = currentKg - targetKg;
  if (totalLossKg <= 0) return { weeks: 0, dailyDeficit: 0, totalLossKg: 0 };
  const weeks = totalLossKg / weeklyLossKg;
  const dailyDeficit = Math.round((weeklyLossKg * 7700) / 7);
  return {
    weeks: Math.round(weeks * 10) / 10,
    dailyDeficit,
    totalLossKg: Math.round(totalLossKg * 10) / 10
  };
}

function calcOneRepMax(weight, reps) {
  return weight * (1 + reps / 30);
}

function calcHeartRateZones(age, restingHr) {
  const maxHr = 220 - age;
  const reserve = maxHr - restingHr;
  const zone = (pct) => Math.round(restingHr + reserve * pct);
  return {
    maxHr,
    z1: [zone(0.5), zone(0.6)],
    z2: [zone(0.6), zone(0.7)],
    z3: [zone(0.7), zone(0.8)],
    z4: [zone(0.8), zone(0.9)],
    z5: [zone(0.9), zone(1.0)]
  };
}

function calcSleepCycles(wakeTime) {
  const cycles = [6, 5, 4, 3].map((n) => {
    const sleepMinutes = n * 90 + 15;
    const wake = parseTime(wakeTime);
    const bed = new Date(wake.getTime() - sleepMinutes * 60000);
    return { cycles: n, bedTime: formatTime(bed), hours: Math.round((sleepMinutes / 60) * 10) / 10 };
  });
  return cycles;
}

function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m || 0, 0, 0);
  return d;
}

function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function calcStepsCalories(steps, weightKg, pace) {
  const met = { slow: 2.8, moderate: 3.5, brisk: 4.3, fast: 5.0 };
  const m = met[pace] || 3.5;
  const hours = (steps * 0.000762) / (pace === 'slow' ? 3 : pace === 'fast' ? 5 : 4);
  return Math.round(m * weightKg * hours);
}

function calcFiber(sex, age, calories) {
  const base = sex === 'male' ? 38 : 25;
  const fromCalories = Math.round(calories / 1000 * 14);
  return Math.max(base, fromCalories);
}

function calcCaffeineLimit(weightKg, sensitivity) {
  const base = Math.round(weightKg * 2.7);
  const mult = { low: 0.7, normal: 1, high: 1.3 };
  return Math.round(base * (mult[sensitivity] || 1));
}

function calcDueDate(lmpDate) {
  const lmp = new Date(lmpDate);
  const due = new Date(lmp);
  due.setDate(due.getDate() + 280);
  const today = new Date();
  const gestDays = Math.floor((today - lmp) / 86400000);
  const week = Math.floor(gestDays / 7);
  const day = gestDays % 7;
  return { due, week, day, gestDays };
}

async function bindNewsletter(formId, source) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: source || 'tools' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      localStorage.setItem('vitalai_newsletter', email);
      form.innerHTML = '<p><strong>You\'re in!</strong> First health tip arrives Tuesday.</p>';
    } catch {
      localStorage.setItem('vitalai_newsletter', email);
      form.innerHTML = '<p><strong>Thanks!</strong> You\'re subscribed locally — we\'ll sync when live.</p>';
    }
  });
}

function injectAdSlot(containerId) {
  const client = window.VITALAI_CONFIG?.adsenseClientId;
  const el = document.getElementById(containerId);
  if (!client || !el) return;
  el.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
  if (window.adsbygoogle) window.adsbygoogle.push({});
}

function loadMonetization() {
  fetch('/api/config')
    .then((r) => r.json())
    .then((cfg) => {
      window.VITALAI_CONFIG = cfg;
      if (cfg.plausibleDomain) {
        const s = document.createElement('script');
        s.defer = true;
        s.dataset.domain = cfg.plausibleDomain;
        s.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(s);
      }
    })
    .catch(() => {});
}
