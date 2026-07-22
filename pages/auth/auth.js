/**
 * auth.js
 * Shared between login.html and signup.html — each page only has the
 * elements relevant to it, so every lookup here is guarded.
 */
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const guestBtn = document.getElementById('guestBtn');

function completeAuth(name) {
  Storage.set(Storage.KEYS.USER, { name: name, isGuest: false });
  window.location.href = '../home/home.html';
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = document.getElementById('loginIdentifier').value.trim();
    completeAuth(identifier.split('@')[0] || 'مستخدم');
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value.trim() || 'مستخدم';
    completeAuth(name);
  });
}

if (guestBtn) {
  guestBtn.addEventListener('click', () => {
    Storage.set(Storage.KEYS.USER, { name: 'زائر', isGuest: true });
    window.location.href = '../home/home.html';
  });
}
