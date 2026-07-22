/**
 * account.js
 * Populates the profile screen with the current user's name and points.
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = Storage.get(Storage.KEYS.USER, { name: 'مستخدم' });
  const points = Storage.get(Storage.KEYS.POINTS, 0);

  const nameEl = document.getElementById('profileName');
  const totalPointsEl = document.getElementById('totalPoints');
  const levels = [
    { name: 'مبتدئ واعٍ', min: 0, next: 100 },
    { name: 'واعي', min: 100, next: 300 },
    { name: 'سفير أمان', min: 300, next: 600 },
    { name: 'بطل أمان', min: 600, next: null },
  ];
  const level = [...levels].reverse().find((item) => points >= item.min);

  if (nameEl) nameEl.textContent = user.name;
  if (totalPointsEl) totalPointsEl.textContent = points;
  document.getElementById('profileLevel').textContent = level.name;
  const progress = level.next ? ((points - level.min) / (level.next - level.min)) * 100 : 100;
  document.getElementById('levelProgress').style.width = `${Math.min(100, progress)}%`;
  document.getElementById('nextLevelText').textContent = level.next
    ? `${level.next - points} نقطة للمستوى التالي`
    : 'وصلت إلى أعلى مستوى — استمر في صناعة الأثر';

  const certificates = Storage.get(Storage.KEYS.CERTIFICATES, []);
  const certsList = document.getElementById('certsList');
  certsList.innerHTML = certificates.length
    ? certificates.map((certificate) => `<div class="cert-row card"><span>شهادة: ${certificate.title}</span><small>${new Date(certificate.earnedAt).toLocaleDateString('ar-EG')}</small></div>`).join('')
    : '<div class="card empty-certs">أكمل اختبارًا بنجاح لتظهر شهادتك هنا.</div>';

  const modal = document.getElementById('editProfileModal');
  document.getElementById('editProfileBtn')?.addEventListener('click', () => {
    document.getElementById('editName').value = user.name || '';
    document.getElementById('editIdentifier').value = user.identifier || '';
    modal.classList.add('open');
  });
  document.getElementById('cancelEditProfile').addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('open'); });
  document.getElementById('editProfileForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const updated = {
      ...user,
      name: document.getElementById('editName').value.trim(),
      identifier: document.getElementById('editIdentifier').value.trim(),
    };
    Storage.set(Storage.KEYS.USER, updated);
    nameEl.textContent = updated.name;
    modal.classList.remove('open');
  });
});
