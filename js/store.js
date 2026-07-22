const Store = {
  KEYS: {
    USER: 'khotwa_user',
    POINTS: 'khotwa_points',
    REPORTS: 'khotwa_reports',
    QUIZ_PROGRESS: 'khotwa_quiz_progress',
    CERTIFICATES: 'khotwa_certificates',
  },

  get(key, fallback) {
    if (fallback === undefined) fallback = null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error('Store read error:', err);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('Store write error:', err);
    }
  },

  getUser() {
    return this.get(this.KEYS.USER, {});
  },

  setUser(data) {
    const current = this.get(this.KEYS.USER, {});
    this.set(this.KEYS.USER, { ...current, ...data });
  },

  getPoints() {
    return this.get(this.KEYS.POINTS, 0);
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

  getReports() {
    return this.get(this.KEYS.REPORTS, []);
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
