/**
 * help.js
 * Filters the centers list by category (hospitals, addiction centers,
 * psychological support) based on the selected tab.
 *
 * NOTE: Filtering here is a simple show/hide demo against static cards.
 * In a real build, this would filter map markers and re-query a backend
 * or geolocation API based on category + user location.
 */

const helpTabs = document.querySelectorAll('.tab');
const centerCards = document.querySelectorAll('.center-card');

helpTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    helpTabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');

    const filter = tab.getAttribute('data-tab');
    centerCards.forEach((card) => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? 'flex' : 'none';
    });
  });
});
