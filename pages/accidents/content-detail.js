/**
 * content-detail.js
 * Handles like/share/save interactions on the content detail screen.
 * Reads ?id= and ?type= from the URL to know which content to show
 * (mocked here with static placeholder content).
 */

document.addEventListener('DOMContentLoaded', () => {
  var params = new URLSearchParams(location.search);
  var type = params.get('type') || 'video';
  var id = params.get('id') || '1';

  var videos = {
    1: { title: 'ثانية واحدة غيّرت كل شيء', body: 'قصة حقيقية لشاب نجا من حادث مروري خطير بعد لحظة تشتت انتباه واحدة. تعلّم منها أن الهاتف يمكنه الانتظار، أما الطريق فلا ينتظر.' },
    2: { title: 'السرعة لا تغفر الأخطاء', body: 'كلما زادت السرعة قل الوقت المتاح لاتخاذ القرار، وزادت مسافة التوقف وشدة الاصطدام. الوصول متأخرًا أفضل من عدم الوصول.' },
  };
  var stories = {
    1: { title: '"نجوت لكنني تغيرت للأبد"', body: 'القصه \n\nكان شاب في منتصف العشرينات يقود سيارته عائدًا إلى المنزل بعد يوم عمل طويل. أثناء القيادة سمع صوت إشعار من هاتفه، فمد يده ليلقي نظرة سريعة على الشاشة. لم تستغرق اللحظة أكثر من ثانيتين، لكنها كانت كافية لأن تنحرف السيارة عن مسارها. \nعندما رفع رأسه وجد سيارة أمامه توقفت بسبب ازدحام مفاجئ. ضغط على الفرامل بكل قوته، لكن الوقت كان قد تأخر. اصطدمت سيارته بقوة، وانقلبت عدة مرات قبل أن تستقر على جانب الطريق. \nنُقل إلى المستشفى بإصابات وكسور متعددة، لكنه نجا بأعجوبة. وبعد فترة العلاج قال إن أكثر ما يؤلمه ليس الإصابات، بل إدراكه أن رسالة واحدة كان يمكن أن تنتظر، بينما الطريق لا يمنح فرصة ثانية. \nمنذ ذلك اليوم، أصبح يضع هاتفه على وضع عدم الإزعاج أثناء القيادة، ويكرر دائمًا: "الهاتف يمكنه الانتظار، أما الطريق فلا ينتظر." \nهذه الرسالة تعكس حقيقة تؤكدها إحصاءات السلامة المرورية: مجرد تشتيت الانتباه لثوانٍ أثناء القيادة قد يؤدي إلى حادث خطير.' },
  };

  var item = type === 'story' ? (stories[id] || stories[1]) : (videos[id] || videos[1]);

  var likeBtn = document.getElementById('likeBtn');
  var likeCount = document.getElementById('likeCount');
  var shareBtn = document.getElementById('shareBtn');
  var shareStoryBtn = document.getElementById('shareStoryBtn');
  var saveBtn = document.getElementById('saveBtn');
  document.getElementById('contentTitle').textContent = item.title;
  document.getElementById('contentBody').innerHTML = item.body.replace(/\n/g, '<br>');
  document.title = item.title + ' - خطوة أمان';

  var video = document.getElementById('mediaVideo');
  if (video) {
    if (type === 'story') {
      video.style.display = 'none';
    } else {
      video.innerHTML = '<source src="../../' + id + '.mp4" type="video/mp4">';
      video.load();
    }
  }

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
