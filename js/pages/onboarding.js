Router.add('onboarding', function () {
  var slides = [
    { icon: 'wave', title: 'أهلًا بك في خطوة أمان', desc: 'منصتك التوعوية للسلامة المرورية وبناء مجتمع واعٍ وأكثر أمانًا على الطريق.' },
    { icon: 'traffic-light', title: 'تعلم واختبر معرفتك', desc: 'محتوى توعوي عن الحوادث والإدمان، واختبارات تفاعلية لإشارات المرور والسلامة.' },
    { icon: 'trophy', title: 'اكسب النقاط والشارات', desc: 'شارك في التحديات، اربح النقاط، وافتح الشهادات والشارات التقديرية.' },
    { icon: 'pin', title: 'بلّغ وساعد', desc: 'ساهم في سلامة مجتمعك بالإبلاغ عن المخاطر المرورية ومساعدة الآخرين.' },
  ];
  var cur = 0;
  function render() {
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="onboarding">' +
        '<button class="btn-text skip-btn" id="skipBtn">تخطي</button>' +
        '<div class="ob-slides">' +
          slides.map(function(s, i) {
            return '<div class="ob-slide' + (i === cur ? ' active' : '') + '">' +
              '<div class="ob-icon">' + icon(s.icon, 48) + '</div>' +
              '<h2>' + s.title + '</h2>' +
              '<p>' + s.desc + '</p></div>';
          }).join('') +
        '</div>' +
        '<div class="ob-dots">' +
          slides.map(function(_, i) { return '<span class="dot' + (i === cur ? ' active' : '') + '"></span>'; }).join('') +
        '</div>' +
        '<button class="btn btn-primary next-btn" id="nextBtn">' + (cur < slides.length - 1 ? 'التالي' : 'ابدأ') + '</button>' +
      '</div>';
    document.getElementById('skipBtn').onclick = function() { localStorage.setItem('khotwa_seen_onboarding', '1'); Router.go('home'); };
    document.getElementById('nextBtn').onclick = function() {
      if (cur < slides.length - 1) { cur++; render(); }
      else { localStorage.setItem('khotwa_seen_onboarding', '1'); if (!Store.getUser().name) Store.setUser({ name: 'زائر' }); Router.go('home'); }
    };
  }
  render();
});
