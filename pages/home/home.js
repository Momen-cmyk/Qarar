/**
 * home.js
 * Populates the dashboard with the current user's name and points
 * from local storage, and could later fetch a rotating daily fact/banner.
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = Storage.get(Storage.KEYS.USER, { name: 'زائر' });
  const points = Storage.get(Storage.KEYS.POINTS, 0);

  const userNameEl = document.getElementById('userName');
  const pointsBadgeEl = document.getElementById('pointsBadge');

  if (userNameEl) userNameEl.textContent = `أهلاً ${user.name} 👋`;
  if (pointsBadgeEl) pointsBadgeEl.textContent = `${points} نقطة`;

  const facts = [
    'القيادة لمدة 20 ساعة متواصلة تؤثر على ردة الفعل بصورة خطرة.',
    'حزام الأمان يقلل خطر الإصابات الجسيمة في الحوادث.',
    'قراءة رسالة قصيرة أثناء القيادة قد تعني قطع عشرات الأمتار دون انتباه.',
    'التوقف للراحة قرار مسؤول، وليس تأخيرًا.',
  ];
  const fact = facts[new Date().getDate() % facts.length];
  const factEl = document.getElementById('dailyFact');
  if (factEl) factEl.textContent = fact;
});
