/**
 * splash.js
 * Briefly shows the brand mark, then routes: returning users (who have
 * completed onboarding before) go straight to home; everyone else sees
 * onboarding first.
 */
var SPLASH_DURATION_MS = 1400;

window.addEventListener('load', function () {
  setTimeout(function () {
    var hasSeenOnboarding = Storage.get('khotwa_seen_onboarding', false);
    window.location.href = hasSeenOnboarding ? '../home/home.html' : './onboarding.html';
  }, SPLASH_DURATION_MS);
});
