var App = {};
document.addEventListener('DOMContentLoaded', function () {
  App.renderTopBar = function(title, back) {
    var el = document.getElementById('topBar');
    if (!el) return;
    var html = '';
    html += back ? '<button class="tb-back" id="tbBack">⬅️</button>' : '<span></span>';
    html += '<span class="tb-title">' + (title || '') + '</span>';
    html += '<div class="tb-actions">';
    html += '<button class="tb-theme" id="tbTheme">☀️</button>';
    html += '</div>';
    el.innerHTML = html;
    var b = document.getElementById('tbBack');
    if (b) b.addEventListener('click', function() { window.history.back(); });
    var t = document.getElementById('tbTheme');
    if (t) t.addEventListener('click', function() {
      KhotwaTheme.toggle();
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      this.textContent = isDark ? '🌙' : '☀️';
    });
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      var t2 = document.getElementById('tbTheme');
      if (t2) t2.textContent = '🌙';
    }
  };
  Router.init();
});
