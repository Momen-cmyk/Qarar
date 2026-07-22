var _navIcons = { home:'🏠', 'traffic-light':'🚦', shield:'🛡️', pin:'📍', emergency:'🆘', write:'✍️', user:'👤' };

var Router = {
  routes: {}, current: null,
  add: function(path, fn) { this.routes[path] = fn; },
  go: function(path) { window.location.hash = path; },
  init: function() {
    var self = this;
    window.addEventListener('hashchange', function() { self._load(window.location.hash.slice(1) || 'splash'); });
    self._load(window.location.hash.slice(1) || 'splash');
  },
  _load: function(path) {
    if (this.current === path) return;
    var fn = this.routes[path];
    if (!fn) { this._load('home'); return; }
    this.current = path;
    var noShell = ['splash', 'onboarding'];
    var app = document.getElementById('app');
    if (noShell.indexOf(path) !== -1) {
      app.innerHTML = '<div id="view"></div>';
    } else {
      app.innerHTML =
        '<div class="app-shell">' +
          '<nav class="nav-rail" id="navRail"></nav>' +
          '<div class="app-main">' +
            '<header class="top-bar" id="topBar"></header>' +
            '<div class="app-content" id="view"></div>' +
          '</div>' +
        '</div>' +
        '<nav class="tab-bar" id="tabBar"></nav>';
      this._renderShell(path);
    }
    fn();
  },
  _renderShell: function(active) {
    var items = [
      { id: 'home', label: 'الرئيسية', icon: 'home' },
      { id: 'accidents', label: 'الحوادث', icon: 'traffic-light' },
      { id: 'addiction', label: 'الإدمان', icon: 'shield' },
      { id: 'help', label: 'المساعدة', icon: 'emergency' },
      { id: 'reporting', label: 'الإبلاغ', icon: 'write' },
    ];
    function linkHTML(item) {
      var a = item.id === active;
      return '<button class="nav-item"' + (a ? ' aria-current="page"' : '') + ' data-route="' + item.id + '">' +
        '<span class="nav-icon">' + (_navIcons[item.icon]||'❓') + '</span><span>' + item.label + '</span></button>';
    }
    var r = document.getElementById('navRail');
    if (r) r.innerHTML = '<div class="rail-brand"><img src="assets/logo.svg" alt="" width="64" height="22"></div>' + items.map(linkHTML).join('');
    var t = document.getElementById('tabBar');
    if (t) t.innerHTML = items.map(linkHTML).join('');
    document.querySelectorAll('[data-route]').forEach(function(el) {
      el.addEventListener('click', function() { Router.go(this.getAttribute('data-route')); });
    });
  }
};
