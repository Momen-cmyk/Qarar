Router.add('traffic-signs', function () {
  var QUESTIONS_COUNT = 10;
  var questions = [], cur = 0, score = 0, answered = false, cat = 'all';

  function intro() {
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="ts-intro">' +
        '<div style="margin-bottom:var(--sp)">' + icon('traffic-light', 56) + '</div>' +
        '<h1>إشارات المرور</h1>' +
        '<p style="color:var(--c-muted);margin-bottom:var(--sp)">اختبر معرفتك بإشارات المرور</p>' +
        '<h3 class="section-title">التصنيف:</h3>' +
        '<div class="cat-grid">' +
          trafficSignCategories.map(function(c) {
            return '<button class="cat-btn' + (c.id === 'all' ? ' active' : '') + '" data-c="' + c.id + '">' + icon(c.icon) + '<span>' + c.name + '</span></button>';
          }).join('') +
        '</div>' +
        '<button class="btn btn-primary" id="startBtn">ابدأ</button>' +
      '</div>';
    App.renderTopBar('إشارات المرور', true);
    document.querySelectorAll('.cat-btn').forEach(function(el) {
      el.onclick = function() { document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.remove('active'); }); this.classList.add('active'); cat = this.getAttribute('data-c'); };
    });
    document.getElementById('startBtn').onclick = function() {
      questions = getTrafficQuizQuestions(QUESTIONS_COUNT, cat);
      if (!questions.length) return;
      cur = 0; score = 0; answered = false; renderQ();
    };
  }

  function renderQ() {
    answered = false;
    var q = questions[cur];
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="quiz-q">' +
        '<div class="qp"><span>' + (cur+1) + '/' + questions.length + '</span><div class="progress-track"><div class="progress-fill" style="width:' + ((cur+1)/questions.length*100) + '%"></div></div><span>' + icon('star') + ' ' + score + '</span></div>' +
        '<div class="card" style="text-align:center;padding:var(--sp-xl);margin-bottom:var(--sp)">' +
          '<div style="margin-bottom:var(--sp)">' + icon(q.sign, 80) + '</div>' +
          '<div style="display:flex;gap:var(--sp-xs);justify-content:center;flex-wrap:wrap">' +
            '<span class="badge badge-primary">' + q.category + '</span>' +
            '<span class="badge badge-primary">' + q.shape + '</span>' +
            '<span class="badge badge-primary">' + q.color + '</span>' +
          '</div>' +
        '</div>' +
        '<h3 class="qt">' + q.question + '</h3>' +
        '<div class="qopts">' + q.options.map(function(o,i) { return '<button class="abtn" data-i="' + i + '">' + o + '</button>'; }).join('') + '</div>' +
        '<div id="expBox" class="ebox visually-hidden"><h4>' + icon('lightbulb') + ' الشرح:</h4><p id="expTxt"></p><p style="color:var(--c-muted);margin-top:var(--sp-sm)">التالي خلال ثوانٍ...</p></div>' +
      '</div>';
    App.renderTopBar('إشارات المرور', true);
    document.querySelectorAll('.abtn').forEach(function(btn) {
      btn.onclick = function() {
        if (answered) return;
        answered = true;
        var sel = parseInt(this.getAttribute('data-i'));
        if (sel === q.correct) score++;
        document.querySelectorAll('.abtn').forEach(function(b, i) {
          b.disabled = true;
          if (i === q.correct) b.classList.add('correct');
          if (i === sel && i !== q.correct) b.classList.add('wrong');
        });
        var eb = document.getElementById('expBox');
        eb.classList.remove('visually-hidden');
        document.getElementById('expTxt').textContent = q.explanation;
        setTimeout(function() {
          if (cur < questions.length - 1) { cur++; renderQ(); }
          else { showResult(); }
        }, 3000);
      };
    });
  }

  function showResult() {
    var total = questions.length;
    var pct = Math.round((score / total) * 100);
    var earned = pct;
    Store.addPoints(earned);
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="qr">' +
        '<div class="qr-icon">' + (pct >= 80 ? icon('celebration', 64) : pct >= 50 ? icon('thumbs-up', 64) : icon('muscle', 64)) + '</div>' +
        '<div class="qr-score">' + score + '/' + total + '</div>' +
        '<div class="qr-pct">' + pct + '%</div>' +
        '<p>' + (pct >= 80 ? 'ممتاز!' : pct >= 50 ? 'جيد! حاول مرة أخرى' : 'استمر في التعلم') + '</p>' +
        '<p class="badge badge-accent">+' + earned + ' نقطة</p>' +
        '<button class="btn btn-primary" id="retryBtn">اختبار آخر</button>' +
        '<button class="btn btn-outline" data-route="home" style="margin-top:var(--sp-sm)">الرئيسية</button>' +
      '</div>';
    App.renderTopBar('النتيجة', true);
    document.getElementById('retryBtn').onclick = intro;
    document.querySelectorAll('[data-route]').forEach(function(el) { el.onclick = function() { Router.go(this.getAttribute('data-route')); }; });
  }
  intro();
});
