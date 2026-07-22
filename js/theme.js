/**
 * theme.js
 * Global dark/light mode. Applied before paint (called from an early
 * inline script in <head>, see shell.js init) to avoid a flash of the
 * wrong theme, and persisted with a single app-wide key so a toggle on
 * any screen carries over to every other screen.
 */
(function () {
  var KEY = 'khotwa-theme';

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* ignore */ }
  }
  function preferredTheme() {
    var stored = getStored();
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  window.KhotwaTheme = {
    init: function () { apply(preferredTheme()); },
    toggle: function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      setStored(next);
    },
  };

  window.KhotwaTheme.init();
})();
