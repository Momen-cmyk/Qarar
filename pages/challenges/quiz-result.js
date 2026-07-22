/**
 * quiz-result.js
 * Populates the result screen with current point total and
 * handles the "share result" action.
 */

document.addEventListener('DOMContentLoaded', () => {
  const result = Storage.get(Storage.KEYS.QUIZ_PROGRESS, { score: 0, total: 5, earned: 0, title: 'الاختبار التوعوي' });
  const points = Storage.get(Storage.KEYS.POINTS, 0);
  const pointsEl = document.getElementById('pointsEarned');
  document.getElementById('scoreText').textContent = `${result.score} من ${result.total} إجابات صحيحة`;
  if (pointsEl) pointsEl.textContent = `+${result.earned}`;
  const passThreshold = Math.ceil(result.total * 0.8);
  document.querySelector('#certificateBox p').textContent =
    result.score >= passThreshold ? `لإتمامك اختبار "${result.title}" بنجاح` : `أعد المحاولة واحصل على ${passThreshold} إجابات صحيحة على الأقل لفتح الشهادة`;
  if (result.score < passThreshold) document.getElementById('certificateBox').classList.add('is-locked');

  document.getElementById('shareResultBtn')?.addEventListener('click', () => {
    const text = `حصلت على ${result.score}/${result.total} ووصلت إلى ${points} نقطة في خطوة أمان 🎉`;
    if (navigator.share) {
      navigator.share({ title: 'نتيجتي في خطوة أمان', text });
    } else {
      navigator.clipboard?.writeText(text);
      const button = document.getElementById('shareResultBtn');
      button.textContent = 'تم نسخ النتيجة ✓';
    }
  });
});
