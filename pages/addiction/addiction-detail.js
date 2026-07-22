const addictionContent = {
  1: { icon: '⚠️', title: 'تأثير المؤثرات على ردة فعل السائق' },
  2: { icon: '🚬', title: 'التدخين وصحة الجهاز التنفسي' },
  3: { icon: '💊', title: 'الاستخدام الخاطئ للأدوية وتأثيره على التركيز' },
};

document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(location.search).get('id') || '1';
  const content = addictionContent[id] || addictionContent[1];
  document.getElementById('mediaPlaceholder').textContent = content.icon;
  document.getElementById('addictionTitle').textContent = content.title;
  document.title = `${content.title} - خطوة أمان`;
  const key = `khotwa_addiction_read_${id}`;
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, '1');
    Storage.addPoints(10);
  }
});
