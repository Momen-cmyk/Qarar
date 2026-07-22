document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('supportForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById('supportMessage').value.trim();
    const messages = Storage.get('khotwa_support_messages', []);
    messages.unshift({ message, date: new Date().toISOString(), status: 'تم الاستلام' });
    Storage.set('khotwa_support_messages', messages);
    Storage.addPoints(20);
    event.target.reset();
    document.getElementById('supportFeedback').textContent = 'تم استلام رسالتك بسرية. إذا كان هناك خطر فوري، اتصل بالطوارئ.';
  });
});
