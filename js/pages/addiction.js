Router.add('addiction', function () {
  var v = document.getElementById('view');
  v.innerHTML = '<div style="margin-top:var(--sp)">' + addictionContent.map(function(i) {
    return '<div class="content-card" data-id="' + i.id + '"><div class="cc-thumb">' + icon(i.icon) + '</div><div><div class="cc-title">' + i.title + '</div></div></div>';
  }).join('') + '</div>';
  App.renderTopBar('التوعية عن الإدمان', true);
  v.querySelectorAll('.content-card').forEach(function(el) {
    el.addEventListener('click', function() { Router.go('addiction-detail?id=' + this.getAttribute('data-id')); });
  });
});

Router.add('addiction-detail', function () {
  var id = new URLSearchParams(window.location.hash.split('?')[1]).get('id') || '1';
  var item = addictionContent.find(function(i) { return i.id == id; }) || addictionContent[0];
  if (!item) { Router.go('addiction'); return; }
  var v = document.getElementById('view');
  v.innerHTML =
    '<div class="detail">' +
      '<div class="detail-media">' + icon(item.icon, 48) + '</div>' +
      '<h2>' + item.title + '</h2>' +
      '<p style="line-height:1.8;margin:var(--sp) 0">' + item.body + '</p>' +
      '<p class="badge badge-success">' + icon('check') + ' تمت إضافة 10 نقاط</p>' +
    '</div>';
  App.renderTopBar(item.title, true);
  var k = 'khotwa_addiction_read_' + id;
  if (!localStorage.getItem(k)) { localStorage.setItem(k, '1'); Store.addPoints(10); }
});
