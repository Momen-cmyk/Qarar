var quizBanks = {
  daily: { title: 'التحدي اليومي', icon: 'target', questions: [
    { q: 'ما هو أول شيء تفعله قبل القيادة؟', opts: ['ربط حزام الأمان', 'تشغيل المحرك', 'ضبط المقعد', 'تشغيل المكيف'], c: 0 },
    { q: 'السرعة القصوى داخل المدينة عادة:', opts: ['40 كم/س', '60 كم/س', '80 كم/س', '100 كم/س'], c: 1 },
    { q: 'ماذا تفعل عند اقتراب سيارة إسعاف؟', opts: ['تتوقف فورًا', 'تفسح الطريق', 'تسرع', 'تستخدم المنبه'], c: 1 },
    { q: 'مسافة الأمان الآمنة:', opts: ['ثانية', 'ثانيتان', '3 ثوانٍ', '5 ثوانٍ'], c: 2 },
    { q: 'أفضل وضع لليدين على المقود:', opts: ['يد واحدة', '10 و 2', '9 و 3', 'أسفل المقود'], c: 2 },
  ]},
  traffic: { title: 'السلامة المرورية', icon: 'traffic-light', questions: [
    { q: 'ماذا تعني الإشارة الحمراء؟', opts: ['قف', 'بطئ', 'انطلق', 'استعد'], c: 0 },
    { q: 'متى يجب استخدام إشارة الانعطاف؟', opts: ['قبل المنعطف', 'أثناءه', 'بعده', 'لا حاجة'], c: 0 },
    { q: 'القيادة تحت تأثير الكحول:', opts: ['مسموح بقليل', 'ممنوع', 'مسموح', 'حسب الحالة'], c: 1 },
    { q: 'حزام الأمان يقلل الوفاة بنسبة:', opts: ['25%', '45%', '60%', '80%'], c: 1 },
    { q: 'عند انزلاق السيارة:', opts: ['اضغط فرامل بقوة', 'انعطف عكس الانزلاق', 'زد السرعة', 'أطفئ المحرك'], c: 1 },
    { q: 'أفضل وقت للقيادة:', opts: ['الليل', 'النهار', 'الفجر', 'حسب الطقس'], c: 1 },
    { q: 'عند اقتراب مطب:', opts: ['تسرع', 'تخفض السرعة', 'تتفاداه', 'فرامل فجأة'], c: 1 },
    { q: 'الأطفال دون أي عمر ممنوعون بالأمام؟', opts: ['10', '12', '14', '16'], c: 1 },
    { q: 'الإرهاق أثناء القيادة يعادل:', opts: ['كحول خفيف', 'كحول متوسط', 'لا شيء', 'يزيد التركيز'], c: 1 },
    { q: 'أهم قاعدة للقيادة الدفاعية:', opts: ['توقع أخطاء الآخرين', 'السرعة', 'الثقة', 'المنافسة'], c: 0 },
  ]},
  addiction: { title: 'التوعية عن الإدمان', icon: 'shield', questions: [
    { q: 'الإدمان هو:', opts: ['مرض مزمن', 'ضعف إرادة', 'عادة', 'اختيار'], c: 0 },
    { q: 'أكثر المواد إدمانًا:', opts: ['الكحول', 'النيكوتين', 'الماريجوانا', 'الكافيين'], c: 1 },
    { q: 'الإدمان يؤثر على:', opts: ['الدماغ فقط', 'الدماغ والجسم', 'الجسم فقط', 'لا يؤثر'], c: 1 },
    { q: 'علاج الإدمان متاح في:', opts: ['مستشفيات فقط', 'مراكز متخصصة', 'صيدليات', 'المنزل'], c: 1 },
    { q: 'المخدرات تؤثر على القيادة:', opts: ['تزيد التركيز', 'تقلل التركيز', 'لا تؤثر', 'تحسن الرؤية'], c: 1 },
    { q: 'أول خطوة للتعافي:', opts: ['الدواء', 'الاعتراف بالمشكلة', 'الرياضة', 'السفر'], c: 1 },
    { q: 'الانتكاس يعني:', opts: ['شفاء', 'عودة للاستخدام', 'توقف العلاج', 'تقدم'], c: 1 },
    { q: 'الدعم الأسري:', opts: ['غير مهم', 'مهم جدًا', 'اختياري', 'ممنوع'], c: 1 },
    { q: 'مدة العلاج:', opts: ['شهر', 'تختلف', 'سنة', 'أسبوع'], c: 1 },
    { q: 'الوقاية تبدأ بـ:', opts: ['التوعية', 'العقاب', 'الإهمال', 'الخوف'], c: 0 },
  ]},
};

Router.add('challenges', function () {
  var v = document.getElementById('view');
  v.innerHTML = '<div class="ql-header">' + icon('trophy', 40) + '<h2>التحديات</h2></div>' +
    Object.keys(quizBanks).map(function(k) {
      var q = quizBanks[k];
      return '<div class="quiz-card" data-q="' + k + '"><div class="qci">' + icon(q.icon) + '</div><div class="qcd"><div class="qct">' + q.title + '</div><div class="qcm">' + q.questions.length + ' أسئلة</div></div>' + icon('arrow-left') + '</div>';
    }).join('');
  App.renderTopBar('التحديات', true);
  v.querySelectorAll('.quiz-card').forEach(function(el) { el.onclick = function() { Router.go('quiz?q=' + this.getAttribute('data-q')); }; });
});

Router.add('quiz', function () {
  var id = new URLSearchParams(window.location.hash.split('?')[1]).get('q') || 'daily';
  var bank = quizBanks[id] || quizBanks.daily;
  var questions = bank.questions.slice().sort(function() { return Math.random() - 0.5; });
  var cur = 0, score = 0, answered = false;

  function renderQ() {
    var q = questions[cur];
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="quiz-q">' +
        '<div class="qp"><span>' + (cur+1) + '/' + questions.length + '</span><div class="progress-track"><div class="progress-fill" style="width:' + ((cur+1)/questions.length*100) + '%"></div></div><span>' + icon('star') + ' ' + score + '</span></div>' +
        '<h3 class="qt">' + q.q + '</h3>' +
        '<div class="qopts">' + q.opts.map(function(o,i) { return '<button class="abtn" data-i="' + i + '">' + o + '</button>'; }).join('') + '</div>' +
        '<div id="expBox" class="ebox visually-hidden"></div>' +
      '</div>';
    answered = false;
    App.renderTopBar(bank.title, true);
    document.querySelectorAll('.abtn').forEach(function(btn) {
      btn.onclick = function() {
        if (answered) return;
        answered = true;
        var sel = parseInt(this.getAttribute('data-i'));
        if (sel === q.c) score++;
        document.querySelectorAll('.abtn').forEach(function(b, i) {
          b.disabled = true;
          if (i === q.c) b.classList.add('correct');
          if (i === sel && i !== q.c) b.classList.add('wrong');
        });
        var eb = document.getElementById('expBox');
        eb.classList.remove('visually-hidden');
        eb.innerHTML = (sel === q.c ? icon('check') + ' إجابة صحيحة' : icon('warning') + ' الإجابة: ' + q.opts[q.c]);
        setTimeout(function() {
          if (cur < questions.length - 1) { cur++; renderQ(); }
          else { showResult(); }
        }, 2000);
      };
    });
  }

  function showResult() {
    var total = questions.length;
    var pct = Math.round((score / total) * 100);
    var passed = pct >= 80;
    var earned = Math.round((score / total) * 100);
    Store.addPoints(earned);
    if (passed) {
      var certs = Store.get(Store.KEYS.CERTIFICATES, []);
      if (!certs.some(function(c) { return c.title === bank.title; })) {
        certs.push({ title: bank.title, earnedAt: new Date().toISOString() });
        Store.set(Store.KEYS.CERTIFICATES, certs);
      }
    }
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="qr">' +
        '<div class="qr-icon">' + (passed ? icon('celebration', 64) : icon('thumbs-up', 64)) + '</div>' +
        '<div class="qr-score">' + score + '/' + total + '</div>' +
        '<div class="qr-pct">' + pct + '%</div>' +
        (passed ? '<div class="cert"><div>' + icon('medal', 48) + '</div><h3>شهادة إتمام</h3><p>"' + bank.title + '"</p></div>' : '') +
        '<p class="badge badge-accent" style="font-size:var(--fs-lg)">+' + earned + ' نقطة</p>' +
        '<button class="btn btn-primary" data-route="challenges">عودة</button>' +
        '<button class="btn btn-outline" data-route="home" style="margin-top:var(--sp-sm)">الرئيسية</button>' +
      '</div>';
    App.renderTopBar('النتيجة', true);
    document.querySelectorAll('[data-route]').forEach(function(el) { el.onclick = function() { Router.go(this.getAttribute('data-route')); }; });
  }
  renderQ();
});
