(function () {
  'use strict';

  var QUESTIONS_COUNT = 10;
  var questions = [];
  var currentIndex = 0;
  var score = 0;
  var answered = false;
  var category = 'all';

  var introEl = document.getElementById('quizIntro');
  var quizEl = document.getElementById('quizScreen');
  var resultEl = document.getElementById('quizResult');

  var categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      categoryBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      category = btn.getAttribute('data-category');
    });
  });

  document.getElementById('startQuizBtn').addEventListener('click', function () {
    questions = getTrafficQuizQuestions(QUESTIONS_COUNT, category);
    if (questions.length === 0) return;
    currentIndex = 0;
    score = 0;
    answered = false;
    introEl.classList.add('visually-hidden');
    quizEl.classList.remove('visually-hidden');
    resultEl.classList.add('visually-hidden');
    renderQuestion();
  });

  function renderQuestion() {
    answered = false;
    var q = questions[currentIndex];

    document.getElementById('qIndex').textContent = currentIndex + 1;
    document.getElementById('qTotal').textContent = questions.length;
    document.getElementById('qFill').style.width = ((currentIndex + 1) / questions.length * 100) + '%';
    document.getElementById('qScore').textContent = score;

    document.getElementById('signEmoji').textContent = q.sign;
    document.getElementById('signCategory').textContent = q.category;
    document.getElementById('signShape').textContent = q.shape;
    document.getElementById('signColor').textContent = q.color;
    document.getElementById('questionText').textContent = q.question;

    var container = document.getElementById('answersContainer');
    container.innerHTML = '';

    q.options.forEach(function (label, i) {
      var btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = label;
      btn.setAttribute('data-index', i);
      btn.addEventListener('click', function () { handleAnswer(i); });
      container.appendChild(btn);
    });

    document.getElementById('explanationBox').classList.add('visually-hidden');
  }

  function handleAnswer(selected) {
    if (answered) return;
    answered = true;

    var q = questions[currentIndex];
    var correct = selected === q.correct;

    if (correct) score += 1;

    var buttons = document.querySelectorAll('#answersContainer .answer-btn');
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('is-correct');
      if (i === selected && i !== q.correct) btn.classList.add('is-wrong');
    });

    document.getElementById('qScore').textContent = score;

    var expBox = document.getElementById('explanationBox');
    expBox.querySelector('.explanation-text').textContent = q.explanation;
    expBox.classList.remove('visually-hidden');

    setTimeout(function () {
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        renderQuestion();
      } else {
        showResult();
      }
    }, 3000);
  }

  function showResult() {
    quizEl.classList.add('visually-hidden');
    resultEl.classList.remove('visually-hidden');

    var total = questions.length;
    var pct = Math.round((score / total) * 100);
    var icon = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪';

    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultScore').textContent = score + ' من ' + total;
    document.getElementById('resultPct').textContent = pct + '%';
    document.getElementById('resultMsg').textContent =
      pct >= 80 ? 'ممتاز! معرفتك ممتازة بإشارات المرور 🚦'
      : pct >= 50 ? 'جيد! لكن هناك مجال للتحسين 📚'
      : 'لا بأس، استمر في التعلم وستتحسن 📖';

    var earned = Math.round((score / total) * 100);
    Storage.addPoints(earned);

    document.getElementById('pointsEarned').textContent = '+' + earned;
  }

  document.getElementById('retryBtn').addEventListener('click', function () {
    resultEl.classList.add('visually-hidden');
    introEl.classList.remove('visually-hidden');
  });

})();
