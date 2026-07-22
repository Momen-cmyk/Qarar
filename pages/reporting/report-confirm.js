/**
 * report-confirm.js
 * Displays the reference ID and status of the most recently
 * submitted report (the first item in the stored reports list).
 */

document.addEventListener('DOMContentLoaded', () => {
  const reports = Storage.get(Storage.KEYS.REPORTS, []);
  const latest = reports[0];

  if (latest) {
    document.getElementById('reportId').textContent = `#${latest.id}`;
    document.getElementById('reportStatus').textContent = latest.status;
  }
});
