/**
 * reports-history.js
 * Renders the list of all reports the user has submitted,
 * read from localStorage, or shows an empty state if none exist.
 */

const REPORT_TYPE_LABELS = {
  reckless_driver: 'سائق متهور',
  broken_signal: 'إشارة تالفة',
  dangerous_bump: 'مطب خطير',
  accident: 'حادث يحتاج تدخل',
  other: 'أخرى',
};

document.addEventListener('DOMContentLoaded', () => {
  const reports = Storage.get(Storage.KEYS.REPORTS, []);
  const listEl = document.getElementById('reportsList');
  const emptyEl = document.getElementById('emptyState');

  if (reports.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }

  reports.forEach((report) => {
    const card = document.createElement('div');
    card.className = 'report-history-card card';
    card.innerHTML = `
      <div>
        <div class="report-history-card__type">${REPORT_TYPE_LABELS[report.type] || 'بلاغ'}</div>
        <div class="report-history-card__date">${new Date(report.date).toLocaleDateString('ar-EG')}</div>
        ${report.description ? `<div class="report-history-card__description">${report.description}</div>` : ''}
      </div>
      <span class="badge badge-accent">${report.status}</span>
    `;
    listEl.appendChild(card);
  });
});
