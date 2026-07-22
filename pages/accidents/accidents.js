/**
 * accidents.js
 * Controls tab switching for any screen using .tabs / .tab-panel
 * (also reused by addiction-home.html to avoid duplicating this logic).
 */
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetPanel = tab.getAttribute('data-tab');
    tabs.forEach((t) => t.classList.remove('is-active'));
    panels.forEach((p) => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelector(`.tab-panel[data-panel="${targetPanel}"]`)?.classList.add('is-active');
  });
});
