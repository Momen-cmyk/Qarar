Router.add('accidents', function () {
  var tab = 'videos';
  var labels = { videos: 'فيديوهات', stories: 'قصص', tips: 'نصائح', stats: 'إحصائيات' };
  function render() {
    var items = accidentsContent[tab] || [];
    var v = document.getElementById('view');
    v.innerHTML =
      '<div class="tabs">' + Object.keys(labels).map(function(t) {
        return '<button class="tab' + (t === tab ? ' active' : '') + '" data-t="' + t + '">' + labels[t] + '</button>';
      }).join('') + '</div><div id="tabContent"></div>';
    document.querySelectorAll('.tab').forEach(function(el) {
      el.addEventListener('click', function() { tab = this.getAttribute('data-t'); render(); });
    });
    var tc = document.getElementById('tabContent');
    if (tab === 'stats') {
      tc.innerHTML = '<div class="grid-2" style="margin-top:var(--sp)">' + accidentsContent.stats.map(function(s) {
        return '<div class="card" style="text-align:center;padding:var(--sp)"><div class="stat-num">' + s.value + '</div><div class="stat-lbl">' + s.label + '</div></div>';
      }).join('') + '</div>';
    } else if (tab === 'tips') {
      tc.innerHTML = '<div style="margin-top:var(--sp)">' + items.map(function(i) {
        return '<details class="card" style="margin-bottom:var(--sp-sm)"><summary style="font-weight:700">' + icon(i.icon) + ' ' + i.title + '</summary><p style="margin-top:var(--sp-sm);color:var(--c-muted)">' + i.body + '</p></details>';
      }).join('') + '</div>';
    } else {
      tc.innerHTML = '<div style="margin-top:var(--sp)">' + items.map(function(i) {
        return '<div class="content-card" data-id="' + i.id + '"><div class="cc-thumb">' + icon(i.icon) + '</div><div><div class="cc-title">' + i.title + '</div></div></div>';
      }).join('') + '</div>';
      tc.querySelectorAll('.content-card').forEach(function(el) {
        el.addEventListener('click', function() { Router.go('accident-detail?id=' + this.getAttribute('data-id')); });
      });
    }
    App.renderTopBar('التوعية عن الحوادث', true);
  }
  render();
});

Router.add('accident-detail', function () {
  var id = new URLSearchParams(window.location.hash.split('?')[1]).get('id') || '1';
  var all = [].concat(accidentsContent.videos, accidentsContent.stories, accidentsContent.tips);
  var item = all.find(function(i) { return i.id == id; }) || all[0];
  if (!item) { Router.go('accidents'); return; }
  var v = document.getElementById('view');
  v.innerHTML =
    '<div class="detail">' +
      '<div class="detail-media">' + icon(item.icon, 48) + '</div>' +
      '<h2>' + item.title + '</h2>' +
      '<p style="line-height:1.8;margin:var(--sp) 0">' + item.body + '</p>' +
      '<div class="detail-actions">' +
        '<button class="btn-text">' + icon('heart') + ' إعجاب</button>' +
        '<button class="btn-text">' + icon('bookmark') + ' حفظ</button>' +
        '<button class="btn-text">' + icon('share') + ' مشاركة</button>' +
      '</div>' +
    '</div>';
  App.renderTopBar(item.title, true);
});
