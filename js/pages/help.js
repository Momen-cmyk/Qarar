Router.add('help', function () {
  var filter = 'all';
  var cats = [
    { id: 'all', label: 'الكل' }, { id: 'hospital', label: 'مستشفيات' },
    { id: 'addiction', label: 'علاج إدمان' }, { id: 'support', label: 'دعم نفسي' },
  ];
  function render() {
    var v = document.getElementById('view');
    v.innerHTML =
      '<a class="emergency" href="tel:123">' + icon('emergency') + ' اتصال بالطوارئ</a>' +
      '<div class="tabs">' + cats.map(function(c) {
        return '<button class="tab' + (c.id === filter ? ' active' : '') + '" data-f="' + c.id + '">' + c.label + '</button>';
      }).join('') + '</div><div id="clist"></div>' +
      '<button class="btn btn-outline" data-route="support-corner" style="margin-top:var(--sp)">' + icon('chat') + ' ركن الدعم السري</button>';
    document.querySelectorAll('.tab').forEach(function(el) {
      el.addEventListener('click', function() { filter = this.getAttribute('data-f'); render(); });
    });
    var cl = document.getElementById('clist');
    var items = Object.keys(centersData).filter(function(k) { return filter === 'all' || centersData[k].category === filter; });
    cl.innerHTML = items.map(function(k) {
      var c = centersData[k];
      return '<div class="ccard" data-id="' + k + '"><div class="ccard-icon">' + icon(c.icon) + '</div><div><div class="ccard-title">' + c.name + '</div><div class="ccard-type">' + c.type + '</div></div></div>';
    }).join('');
    cl.querySelectorAll('.ccard').forEach(function(el) { el.onclick = function() { Router.go('center-detail?id=' + this.getAttribute('data-id')); }; });
    document.querySelectorAll('[data-route]').forEach(function(el) { el.onclick = function() { Router.go(this.getAttribute('data-route')); }; });
    App.renderTopBar('المساعدة', true);
  }
  render();
});

Router.add('center-detail', function () {
  var id = new URLSearchParams(window.location.hash.split('?')[1]).get('id') || '1';
  var c = centersData[id] || centersData[1];
  var v = document.getElementById('view');
  v.innerHTML =
    '<div class="dheader"><div class="dheader-icon">' + icon(c.icon) + '</div><div><h2>' + c.name + '</h2><span class="badge badge-primary">' + c.type + '</span></div></div>' +
    '<div class="dactions">' +
      '<a class="btn btn-primary" href="tel:' + c.phone + '">' + icon('phone') + ' اتصال</a>' +
      '<a class="btn btn-outline" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.name) + '" target="_blank">' + icon('map') + ' اتجاهات</a>' +
    '</div>' +
    '<div class="card"><div class="irow"><span>العنوان</span><span>' + c.address + '</span></div><div class="irow"><span>الهاتف</span><span dir="ltr">' + c.phone + '</span></div><div class="irow"><span>ساعات العمل</span><span>' + c.hours + '</span></div></div>' +
    '<p style="margin-top:var(--sp)">' + c.description + '</p>';
  App.renderTopBar(c.name, true);
});

Router.add('support-corner', function () {
  var v = document.getElementById('view');
  v.innerHTML =
    '<h2>' + icon('lock') + ' ركن الدعم السري</h2>' +
    '<p style="color:var(--c-muted);margin-bottom:var(--sp)">رسائلك تبقى خاصة ولن تُشارك مع أي جهة دون موافقتك.</p>' +
    '<div class="field"><label>رسالتك</label><textarea id="msg" rows="4" placeholder="اكتب ما يدور في بالك بسرية تامة..."></textarea></div>' +
    '<button class="btn btn-primary" id="sendBtn">إرسال</button>' +
    '<div id="confirmMsg" class="visually-hidden" style="margin-top:var(--sp);text-align:center;color:var(--c-green)">' + icon('check') + ' تم إرسال رسالتك بسرية.</div>';
  App.renderTopBar('ركن الدعم السري', true);
  document.getElementById('sendBtn').onclick = function () {
    var m = document.getElementById('msg').value.trim();
    if (!m) return;
    var msgs = JSON.parse(localStorage.getItem('khotwa_support_messages') || '[]');
    msgs.push({ text: m, date: new Date().toISOString() });
    localStorage.setItem('khotwa_support_messages', JSON.stringify(msgs));
    document.getElementById('confirmMsg').classList.remove('visually-hidden');
    document.getElementById('msg').value = '';
    Store.addPoints(20);
  };
});
