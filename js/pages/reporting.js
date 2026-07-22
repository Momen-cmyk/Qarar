Router.add('reporting', function () {
  var loc = null;
  var types = [
    { label: 'سائق متهور', icon: 'car' }, { label: 'إشارة تالفة', icon: 'traffic-light' },
    { label: 'مطب خطير', icon: 'warning' }, { label: 'حادث', icon: 'emergency' }, { label: 'أخرى', icon: 'pin' },
  ];
  var v = document.getElementById('view');
  v.innerHTML =
    '<form id="rf">' +
      '<label class="field-lbl">نوع البلاغ</label>' +
      '<div class="rgrid">' + types.map(function(t, i) {
        return '<label class="rtype' + (i === 0 ? ' checked' : '') + '"><input type="radio" name="rt" value="' + t.label + '"' + (i === 0 ? ' checked' : '') + '>' + icon(t.icon) + '<span>' + t.label + '</span></label>';
      }).join('') + '</div>' +
      '<div class="field"><label>الوصف</label><textarea id="desc" rows="3" placeholder="صف المشكلة..."></textarea></div>' +
      '<button class="btn btn-outline" type="button" id="locBtn" style="margin-bottom:var(--sp)">' + icon('pin') + ' تحديد الموقع</button>' +
      '<div class="upload-box" id="upBox">' + icon('camera') + '<span>إضافة صورة</span><input type="file" accept="image/*" id="upInput"></div>' +
      '<label class="cb-row"><input type="checkbox" id="anon"><span>إرسال مجهول</span></label>' +
      '<button class="btn btn-primary" type="submit" style="margin-top:var(--sp)">إرسال البلاغ</button>' +
    '</form>';
  App.renderTopBar('الإبلاغ عن مخاطر', true);

  document.getElementById('locBtn').onclick = function () {
    if (navigator.geolocation) {
      this.innerHTML = icon('pin') + ' جاري التحديد...';
      navigator.geolocation.getCurrentPosition(function (p) {
        loc = { lat: p.coords.latitude, lng: p.coords.longitude };
        document.getElementById('locBtn').innerHTML = icon('check') + ' تم التحديد';
      }, function () { document.getElementById('locBtn').innerHTML = icon('warning') + ' فشل التحديد'; });
    } else { this.innerHTML = icon('warning') + ' غير مدعوم'; }
  };
  document.getElementById('upInput').onchange = function (e) {
    if (e.target.files[0]) document.querySelector('#upBox span').textContent = e.target.files[0].name;
  };
  document.getElementById('rf').onsubmit = function (e) {
    e.preventDefault();
    var rt = document.querySelector('input[name="rt"]:checked');
    Store.addReport({ type: rt ? rt.value : 'أخرى', description: document.getElementById('desc').value.trim(), location: loc, date: new Date().toISOString() });
    Router.go('report-confirm');
  };
});

Router.add('report-confirm', function () {
  var reps = Store.get(Store.KEYS.REPORTS, []);
  var ref = reps.length ? '#' + (1000 + reps.length) : '—';
  var v = document.getElementById('view');
  v.innerHTML =
    '<div style="text-align:center;padding:var(--sp-xl) 0">' +
      icon('check', 48) + '<h1 style="margin:var(--sp) 0">تم استلام بلاغك</h1>' +
      '<div class="ref-num">' + ref + '</div>' +
      '<p style="color:var(--c-muted);margin:var(--sp) 0">سيتم مراجعة البلاغ من قبل الفريق المختص.</p>' +
      '<button class="btn btn-primary" data-route="report-history">عرض البلاغات السابقة</button>' +
      '<button class="btn btn-outline" data-route="home" style="margin-top:var(--sp-sm)">العودة للرئيسية</button>' +
    '</div>';
  App.renderTopBar('تأكيد البلاغ', true);
  document.querySelectorAll('[data-route]').forEach(function (el) { el.onclick = function () { Router.go(this.getAttribute('data-route')); }; });
});

Router.add('report-history', function () {
  var reps = Store.get(Store.KEYS.REPORTS, []);
  var v = document.getElementById('view');
  if (!reps.length) {
    v.innerHTML = '<div class="empty-s">' + icon('empty-mail', 48) + '<p>لا توجد بلاغات</p><button class="btn btn-primary" data-route="reporting" style="margin-top:var(--sp)">بلاغ جديد</button></div>';
  } else {
    v.innerHTML = '<div style="margin-top:var(--sp)">' + reps.slice().reverse().map(function (r) {
      return '<div class="rh-card"><div><strong>' + (r.type || 'بلاغ') + '</strong><br><small>' + new Date(r.date).toLocaleDateString('ar-EG') + '</small></div><span class="badge badge-accent">قيد المراجعة</span></div>';
    }).join('') + '</div>';
  }
  App.renderTopBar('بلاغاتي', true);
  document.querySelectorAll('[data-route]').forEach(function (el) { el.onclick = function () { Router.go(this.getAttribute('data-route')); }; });
});
