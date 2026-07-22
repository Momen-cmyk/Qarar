/**
 * storage.js
 * Lightweight wrapper around localStorage to centralize how the app
 * reads/writes user state: points, badges, reports, quiz progress.
 *
 * This is boilerplate / mock persistence for the front-end prototype.
 * Replace with real API calls when a backend is connected.
 */

const Storage = {
  KEYS: {
    USER: 'khotwa_user',
    POINTS: 'khotwa_points',
    REPORTS: 'khotwa_reports',
    QUIZ_PROGRESS: 'khotwa_quiz_progress',
    CERTIFICATES: 'khotwa_certificates',
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error('Storage read error:', err);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Storage write error:', err);
    }
  },

  addPoints(amount) {
    const current = this.get(this.KEYS.POINTS, 0);
    this.set(this.KEYS.POINTS, current + amount);
    return current + amount;
  },

  addReport(report) {
    const reports = this.get(this.KEYS.REPORTS, []);
    reports.unshift({ ...report, id: Date.now(), status: 'قيد المراجعة' });
    this.set(this.KEYS.REPORTS, reports);
    return reports;
  },

  clearUser() {
    localStorage.removeItem(this.KEYS.USER);
  },

  clearAll() {
    localStorage.clear();
  },

  addCertificate(certificate) {
    const certificates = this.get(this.KEYS.CERTIFICATES, []);
    if (!certificates.some((item) => item.id === certificate.id)) {
      certificates.unshift(certificate);
      this.set(this.KEYS.CERTIFICATES, certificates);
    }
    return certificates;
  },
};
