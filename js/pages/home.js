Router.add('home', function () {
  var user = Store.getUser();
  var points = Store.getPoints();
  var reportCount = Store.get(Store.KEYS.REPORTS, []).length;
  var facts = [
    'القيادة لمدة 20 ساعة متواصلة تؤثر على ردة الفعل بصورة خطرة.',
    'حزام الأمان يقلل خطر الإصابات الجسيمة في الحوادث بنسبة 45%.',
    'قراءة رسالة قصيرة أثناء القيادة تعادل قطع عشرات الأمتار دون انتباه.',
    'التوقف للراحة قرار مسؤول، وليس تأخيرًا.',
  ];
  var fact = facts[new Date().getDate() % facts.length];
  var v = document.getElementById('view');
  v.innerHTML =
    '<div class="greeting"><strong>أهلاً ' + (user.name || 'زائر') + '</strong><span class="badge badge-primary">' + points + ' نقطة</span></div>' +
    '<div class="stats-row">' +
      '<div class="stat-box"><div class="stat-num">' + points + '</div><div class="stat-lbl">النقاط</div></div>' +
      '<div class="stat-box"><div class="stat-num">' + reportCount + '</div><div class="stat-lbl">بلاغاتك</div></div>' +
    '</div>' +
    '<div class="quick-grid">' +
      '<button class="qcard" data-route="accidents"><div class="qcard-icon">' + icon('traffic-light', 32) + '</div><span>الحوادث</span></button>' +
      '<button class="qcard" data-route="addiction"><div class="qcard-icon">' + icon('shield', 32) + '</div><span>الإدمان</span></button>' +
      '<button class="qcard" data-route="reporting"><div class="qcard-icon">' + icon('pin', 32) + '</div><span>الإبلاغ</span></button>' +
      '<button class="qcard" data-route="traffic-signs"><div class="qcard-icon">' + icon('traffic-light', 32) + '</div><span>الإشارات</span></button>' +
    '</div>' +
    '<div class="cta-row">' +
      '<button class="btn btn-accent cta-btn" data-route="challenges">' + icon('trophy') + ' التحديات</button>' +
      '<button class="btn btn-primary cta-btn" data-route="help">' + icon('pin') + ' المساعدة</button>' +
    '</div>' +
    '<div class="fact-box">' + icon('lightbulb') + ' ' + fact + '</div>';
  App.renderTopBar('خطوة أمان');
  document.querySelectorAll('[data-route]').forEach(function(el) {
    el.addEventListener('click', function() { Router.go(this.getAttribute('data-route')); });
  });
});
