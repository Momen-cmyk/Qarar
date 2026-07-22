/**
 * quiz.js
 * Drives the multi-question quiz screen: reads the selected quiz via the
 * ?quiz= URL param, renders each question dynamically from `quizBank`,
 * scores answers, and stores points/certificates on completion.
 */

const quizBank = {
  daily: {
    title: 'تحدي اليوم',
    questions: [
      { text: 'ما التصرف الأكثر أمانًا عند الشعور بالنعاس أثناء القيادة؟', options: ['فتح النافذة فقط', 'زيادة السرعة للوصول سريعًا', 'التوقف في مكان آمن والراحة', 'تشغيل موسيقى مرتفعة'], answer: 2 },
      { text: 'استخدام الهاتف أثناء القيادة يؤدي غالبًا إلى:', options: ['زيادة التركيز', 'إبطاء رد الفعل وتشتيت الانتباه', 'تحسين تقدير المسافات', 'لا تأثير له'], answer: 1 },
      { text: 'حزام الأمان يجب استخدامه:', options: ['في الطرق السريعة فقط', 'للسائق فقط', 'في كل رحلة ولكل الركاب', 'عند سوء الطقس فقط'], answer: 2 },
      { text: 'عند اقتراب سيارة إسعاف بأضواء وصفارة يجب:', options: ['مواصلة الطريق', 'التوقف وسط الحارة', 'إفساح الطريق بأمان', 'السير خلفها بسرعة'], answer: 2 },
      { text: 'المسافة الآمنة تساعدك على:', options: ['توفير الوقود فقط', 'امتلاك وقت كافٍ للتوقف', 'منع السيارات من التجاوز', 'القيادة أسرع'], answer: 1 },
    ],
  },
  traffic1: {
    title: 'السلامة المرورية',
    questions: [
      { text: 'القيادة تحت تأثير بعض المؤثرات تزيد زمن رد الفعل بمقدار:', options: ['لا يوجد تأثير يُذكر', 'قد يتضاعف 2-3 مرات', 'يتحسن التركيز مؤقتًا', 'يعتمد فقط على وزن السائق'], answer: 1 },
      { text: 'قبل تغيير الحارة يجب:', options: ['استخدام المرآة فقط', 'إعطاء إشارة وفحص النقطة العمياء', 'زيادة السرعة مباشرة', 'استخدام آلة التنبيه'], answer: 1 },
      { text: 'في المطر ينبغي:', options: ['تقليل مسافة الأمان', 'زيادة السرعة', 'زيادة مسافة الأمان وخفض السرعة', 'إطفاء الأنوار'], answer: 2 },
      { text: 'اللون الأحمر في إشارة المرور يعني:', options: ['الاستعداد', 'المرور بحذر', 'التوقف الكامل', 'الأولوية للمشاة فقط'], answer: 2 },
      { text: 'أفضل طريقة لتجنب القيادة المشتتة هي:', options: ['إمساك الهاتف أسفل المقود', 'ضبط الهاتف على عدم الإزعاج قبل التحرك', 'الرد بسرعة', 'استخدام كلتا السماعتين'], answer: 1 },
    ],
  },
  addiction1: {
    title: 'الوعي بمخاطر الإدمان',
    questions: [
      { text: 'طلب المساعدة لعلاج الإدمان يُعد:', options: ['ضعفًا', 'خطوة شجاعة نحو التعافي', 'أمرًا بلا فائدة', 'مناسبًا للحالات المتأخرة فقط'], answer: 1 },
      { text: 'أفضل دعم لشخص يتعافى هو:', options: ['لومه باستمرار', 'الاستماع دون حكم وتشجيع العلاج', 'عزله', 'تجاهل المشكلة'], answer: 1 },
      { text: 'الانتكاسة المحتملة تعني:', options: ['استحالة التعافي', 'الحاجة لمراجعة خطة الدعم والعلاج', 'إيقاف العلاج', 'إخفاء الأمر'], answer: 1 },
      { text: 'العلاج المتخصص قد يشمل:', options: ['دعمًا نفسيًا وطبيًا واجتماعيًا', 'الإرادة وحدها دائمًا', 'العقاب', 'العزلة'], answer: 0 },
      { text: 'في حالة خطر فوري يجب:', options: ['الانتظار', 'التواصل مع الطوارئ أو جهة متخصصة', 'النشر على الإنترنت', 'القيادة للمستشفى تحت التأثير'], answer: 1 },
    ],
  },
};

// "Comprehensive" weekly challenge combines the daily driving-safety and
// traffic-rules question sets into a single longer quiz.
quizBank.weekly1 = {
  title: 'اختبار شامل: أمان الطريق',
  questions: [...quizBank.daily.questions, ...quizBank.traffic1.questions],
};

const params = new URLSearchParams(window.location.search);
const quizId = params.get('quiz') || 'daily';
const quiz = quizBank[quizId] || quizBank.daily;
const optionsList = document.getElementById('optionsList');
const nextBtn = document.getElementById('nextQuestionBtn');
let currentIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = quiz.questions[currentIndex];
  answered = false;
  document.getElementById('questionIndex').textContent = currentIndex + 1;
  document.getElementById('questionTotal').textContent = quiz.questions.length;
  document.getElementById('questionText').textContent = question.text;
  document.getElementById('quizProgressFill').style.width = `${((currentIndex + 1) / quiz.questions.length) * 100}%`;
  nextBtn.disabled = true;
  nextBtn.textContent = currentIndex === quiz.questions.length - 1 ? 'عرض النتيجة' : 'التالي';
  optionsList.innerHTML = '';

  question.options.forEach((label, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = label;
    button.addEventListener('click', () => selectAnswer(button, index));
    optionsList.appendChild(button);
  });
}

function selectAnswer(selected, selectedIndex) {
  if (answered) return;
  answered = true;
  const correctIndex = quiz.questions[currentIndex].answer;
  if (selectedIndex === correctIndex) score += 1;
  [...optionsList.children].forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add('is-correct');
    if (index === selectedIndex && index !== correctIndex) button.classList.add('is-wrong');
  });
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < quiz.questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
    return;
  }
  const earned = score * 10;
  Storage.addPoints(earned);
  Storage.set(Storage.KEYS.QUIZ_PROGRESS, {
    quizId, title: quiz.title, score, total: quiz.questions.length, earned, completedAt: new Date().toISOString(),
  });
  const passThreshold = Math.ceil(quiz.questions.length * 0.8);
  if (score >= passThreshold) {
    Storage.addCertificate({ id: quizId, title: quiz.title, earnedAt: new Date().toISOString() });
  }
  window.location.href = './quiz-result.html';
});

renderQuestion();
