/**
 * content-detail.js
 * Handles like/share/save interactions on the content detail screen.
 * Reads ?id= and ?type= from the URL to know which content to show
 * (mocked here with static placeholder content).
 */

document.addEventListener('DOMContentLoaded', () => {
  const contentItems = {
    1: { title: 'ثانية واحدة غيّرت كل شيء', icon: '▶️', body: 'قصة حقيقية لشاب نجا من حادث مروري خطير بعد لحظة تشتت انتباه واحدة. تعلّم منها أن الهاتف يمكنه الانتظار، أما الطريق فلا ينتظر.' },
    2: { title: 'السرعة لا تغفر الأخطاء', icon: '🎬', body: 'كلما زادت السرعة قل الوقت المتاح لاتخاذ القرار، وزادت مسافة التوقف وشدة الاصطدام. الوصول متأخرًا أفضل من عدم الوصول.' },
    3: { title: 'قصة من الواقع', icon: '📖', body: 'قرار بسيط بربط حزام الأمان أنقذ أسرة كاملة. إجراءات السلامة الصغيرة تصنع فارقًا كبيرًا وقت الخطر.' },
  };
  const id = new URLSearchParams(location.search).get('id') || '1';
  const item = contentItems[id] || contentItems[1];
  const likeBtn = document.getElementById('likeBtn');
  const likeCount = document.getElementById('likeCount');
  const shareBtn = document.getElementById('shareBtn');
  const shareStoryBtn = document.getElementById('shareStoryBtn');
  const saveBtn = document.getElementById('saveBtn');
  document.getElementById('contentTitle').textContent = item.title;
  document.getElementById('contentBody').textContent = item.body;
  document.getElementById('mediaPlaceholder').textContent = item.icon;
  document.title = `${item.title} - خطوة أمان`;

  const likeKey = `khotwa_content_liked_${id}`;
  const saveKey = `khotwa_content_saved_${id}`;
  let liked = localStorage.getItem(likeKey) === '1';
  if (liked) likeBtn.classList.add('is-active');
  if (localStorage.getItem(saveKey) === '1') saveBtn.textContent = '✅ محفوظ';

  likeBtn?.addEventListener('click', () => {
    liked = !liked;
    localStorage.setItem(likeKey, liked ? '1' : '0');
    likeBtn.classList.toggle('is-active', liked);
    const current = parseInt(likeCount.textContent, 10);
    likeCount.textContent = liked ? current + 1 : current - 1;
  });

  shareBtn?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: document.getElementById('contentTitle').textContent, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      shareBtn.textContent = '✅ تم نسخ الرابط';
    }
  });

  saveBtn?.addEventListener('click', () => {
    const saved = localStorage.getItem(saveKey) === '1';
    localStorage.setItem(saveKey, saved ? '0' : '1');
    saveBtn.textContent = saved ? '🔖 حفظ' : '✅ محفوظ';
  });

  shareStoryBtn?.addEventListener('click', () => {
    const story = prompt('اكتب قصتك أو تجربتك باختصار. ستُحفظ للمراجعة دون نشر مباشر:');
    if (!story?.trim()) return;
    const stories = Storage.get('khotwa_submitted_stories', []);
    stories.unshift({ text: story.trim(), date: new Date().toISOString(), status: 'قيد المراجعة' });
    Storage.set('khotwa_submitted_stories', stories);
    shareStoryBtn.textContent = 'تم إرسال قصتك للمراجعة ✓';
  });
});
