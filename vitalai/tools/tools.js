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

function bindNewsletter(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    localStorage.setItem('vitalai_newsletter', email);
    form.innerHTML = '<p><strong>Thanks!</strong> We\'ll send health tips and tool updates weekly.</p>';
  });
}
