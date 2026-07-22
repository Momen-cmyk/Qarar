Router.add('splash', function () {
  document.getElementById('view').innerHTML =
    '<div class="splash">' +
      '<img class="splash-logo" src="assets/logo.svg" alt="خطوة أمان" width="200" height="55">' +
      '<p class="splash-tagline">قرارك اليوم ينقذ حياة غدًا</p>' +
      '<div class="splash-spinner"></div>' +
    '</div>';
  setTimeout(function () {
    var seen = localStorage.getItem('khotwa_seen_onboarding') === '1';
    Router.go(seen ? 'home' : 'onboarding');
  }, 1400);
});
