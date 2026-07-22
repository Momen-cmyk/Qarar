document.addEventListener('DOMContentLoaded', () => {
  const settingIds = ['dailyChallengeNotif', 'emergencyNotif', 'campaignsNotif', 'anonymousReports', 'showLeaderboard'];
  const saved = Storage.get('khotwat_amaan_settings', {});
  const languageSelect = document.getElementById('languageSelect');

  languageSelect.value = saved.language || 'ar';
  settingIds.forEach((id) => {
    if (typeof saved[id] === 'boolean') document.getElementById(id).checked = saved[id];
  });

  function showToast(message) {
    document.querySelector('.settings-toast')?.remove();
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 250);
    }, 1800);
  }

  function saveSettings() {
    const settings = { language: languageSelect.value };
    settingIds.forEach((id) => { settings[id] = document.getElementById(id).checked; });
    Storage.set('khotwat_amaan_settings', settings);
    showToast('تم حفظ الإعدادات ✓');
  }

  languageSelect.addEventListener('change', saveSettings);
  settingIds.forEach((id) => document.getElementById(id).addEventListener('change', saveSettings));

  const bindModal = (openId, modalId, cancelId) => {
    const modal = document.getElementById(modalId);
    document.getElementById(openId).addEventListener('click', () => modal.classList.add('open'));
    document.getElementById(cancelId).addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.remove('open');
    });
    return modal;
  };

  bindModal('logoutBtn', 'logoutModal', 'cancelLogout');
  bindModal('deleteAccountBtn', 'deleteModal', 'cancelDelete');

  document.getElementById('confirmLogout').addEventListener('click', () => {
    Storage.clearUser();
    window.location.href = '../auth/login.html';
  });

  document.getElementById('confirmDelete').addEventListener('click', () => {
    Storage.clearAll();
    window.location.href = '../onboarding/splash.html';
  });
});
