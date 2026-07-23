document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('.center-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');

      var filter = tab.getAttribute('data-tab');
      cards.forEach(function (card) {
        card.style.display = filter === 'all' || card.dataset.category === filter ? 'flex' : 'none';
      });
    });
  });
});
