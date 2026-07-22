/**
 * shell.js
 * Injects the top bar, desktop nav rail, and mobile tab bar from one
 * source of truth, driven by data-* attributes on <body>:
 *   data-page="home"            which nav item is active (or omit for none)
 *   data-title="..."            top bar title
 *   data-back="true"            show a back button (uses goBack())
 *   data-settings="true"        show a settings-gear action (profile only)
 *
 * This removes the class of bug found in the previous build where a page
 * would silently miss a shared script include or use a stale nav markup
 * copy — there is now exactly one place this markup is defined.
 */
(function () {
  var NAV_ITEMS = [
    { id: 'home', label: 'الرئيسية', icon: '🏠', href: '../home/home.html' },
    { id: 'accidents', label: 'الحوادث', icon: '🚦', href: '../accidents/accidents-home.html' },
    { id: 'addiction', label: 'الإدمان', icon: '🛡️', href: '../addiction/addiction-home.html' },
    { id: 'help', label: 'المساعدة', icon: '📍', href: '../help/help-map.html' },
    { id: 'account', label: 'حسابي', icon: '👤', href: '../account/profile.html' },
  ];
  var HOME_PATH = '../home/home.html';

  window.goBack = function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = HOME_PATH;
    }
  };

  function navLinksHTML(itemClass, iconClass) {
    var activePage = document.body.getAttribute('data-page');
    return NAV_ITEMS.map(function (item) {
      var current = item.id === activePage;
      return '<a class="' + itemClass + '" href="' + item.href + '"' +
        (current ? ' aria-current="page"' : '') + '>' +
        '<span class="' + iconClass + '">' + item.icon + '</span>' +
        '<span>' + item.label + '</span></a>';
    }).join('');
  }

  function renderNav() {
    var railEl = document.getElementById('navRail');
    var tabEl = document.getElementById('tabBar');
    if (railEl) {
      railEl.className = 'nav-rail';
      railEl.innerHTML = '<span class="nav-rail__brand">🚦</span>' + navLinksHTML('nav-rail__item', 'nav-rail__icon');
    }
    if (tabEl) {
      tabEl.className = 'tab-bar';
      tabEl.innerHTML = navLinksHTML('tab-bar__item', 'tab-bar__icon');
    }
  }

  function renderTopBar() {
    var topEl = document.getElementById('topBar');
    if (!topEl) return;
    topEl.className = 'top-bar';
    var title = document.body.getAttribute('data-title') || '';
    var showBack = document.body.getAttribute('data-back') === 'true';
    var showSettings = document.body.getAttribute('data-settings') === 'true';

    var html = '';
    html += showBack ? '<button class="top-bar__back" onclick="goBack()" aria-label="رجوع">→</button>' : '<span></span>';
    html += '<span class="top-bar__title">' + title + '</span>';
    html += '<div class="top-bar__actions">';
    if (showSettings) html += '<a class="settings-link" href="./settings.html" aria-label="الإعدادات">⚙️</a>';
    html += '<button class="theme-toggle" onclick="KhotwaTheme.toggle()" aria-label="تبديل الوضع الليلي"></button>';
    html += '</div>';
    topEl.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderNav();
    renderTopBar();
  });
})();
