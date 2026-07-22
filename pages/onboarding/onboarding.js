const slides = document.querySelectorAll('.onboarding__slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
let currentSlide = 0;

function render() {
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
  nextBtn.textContent = currentSlide === slides.length - 1 ? 'ابدأ الآن' : 'التالي';
}

function finish() {
  Storage.set('khotwa_seen_onboarding', true);
  window.location.href = '../auth/login.html';
}

nextBtn.addEventListener('click', () => {
  if (currentSlide === slides.length - 1) {
    finish();
    return;
  }
  currentSlide += 1;
  render();
});

skipBtn.addEventListener('click', finish);

render();
