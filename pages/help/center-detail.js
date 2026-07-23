const centers = {
  1: { name: 'مستشفى الهلال الأحمر', type: 'استقبال وإصابة الحوادث', icon: '🏥', address: '34 شارع رمسيس، بالقرب من ميدان رمسيس، وسط البلد', phone: '0225747124', hours: '24 ساعة', description: 'استقبال وإصابة الحوادث، الكسور والجروح والطوارئ.', query: 'مستشفى الهلال الأحمر رمسيس' },
  2: { name: 'مستشفى أحمد ماهر التعليمي', type: 'مستشفى تعليمي', icon: '🏥', address: 'شارع أحمد سعيد، باب الشعرية، القاهرة', phone: '0223938477', hours: '24 ساعة', description: 'استقبال الحالات العامة، الكسور، الجراحات العامة والطوارئ.', query: 'مستشفى أحمد ماهر التعليمي' },
  3: { name: 'مستشفى الدمرداش', type: 'مستشفى جامعي', icon: '🏥', address: 'العباسية، بجوار كلية طب عين شمس', phone: '0226844192', hours: '24 ساعة', description: 'من أكبر مستشفيات الطوارئ الجامعية، يخدم قطاع شرق القاهرة.', query: 'مستشفى الدمرداش العباسية' },
  4: { name: 'طوارئ القصر العيني (185)', type: 'مستشفى جامعي', icon: '🏥', address: 'القصر العيني، أمام كوبري الجامعة', phone: '0223650460', hours: '24 ساعة', description: 'استقبال الحوادث الحرجة، الجراحة، العظام، الحالات العامة.', query: 'مستشفى القصر العيني' },
  5: { name: 'مستشفى معهد ناصر', type: 'مستشفى تخصصي', icon: '🏥', address: 'كورنيش النيل، روض الفرج', phone: '0222039343', hours: '24 ساعة', description: 'من أكبر المستشفيات المتخصصة، جراحات المخ والأعصاب، الرعاية المركزة.', query: 'مستشفى معهد ناصر' },
  6: { name: 'مستشفى البنك الأهلي', type: 'مستشفى عام', icon: '🏥', address: 'العجوزة، الجيزة', phone: '0227581223', hours: '24 ساعة', description: 'مجهز لاستقبال حوادث الطرق الدائري والمحاور الرئيسية.', query: 'مستشفى البنك الأهلي العجوزة' },
  7: { name: 'مستشفى المنيرة العام', type: 'مستشفى عام', icon: '🏥', address: 'السيدة زينب، القاهرة', phone: '0223647333', hours: '24 ساعة', description: 'طوارئ عامة، جراحة، باطنة.', query: 'مستشفى المنيرة العام' },
  8: { name: 'مستشفى شبرا العام', type: 'مستشفى عام', icon: '🏥', address: 'شبرا مصر، القاهرة', phone: '0222353314', hours: '24 ساعة', description: 'إصابات، عظام، جراحة.', query: 'مستشفى شبرا العام' },
  9: { name: 'مستشفى الزيتون التخصصي', type: 'مستشفى تخصصي للأطفال', icon: '🏥', address: 'الزيتون، القاهرة', phone: '0222580170', hours: '24 ساعة', description: 'عناية مركزة، إصابات، طوارئ للأطفال.', query: 'مستشفى الزيتون التخصصي' },
  10: { name: 'مستشفى القاهرة الجديدة', type: 'مستشفى عام', icon: '🏥', address: 'التجمع، القاهرة الجديدة', phone: '0227560410', hours: '24 ساعة', description: 'إصابات، جراحة، طوارئ.', query: 'مستشفى القاهرة الجديدة التجمع' },
};

document.addEventListener('DOMContentLoaded', () => {
  const center = centers[new URLSearchParams(location.search).get('id')] || centers[1];
  document.getElementById('centerIcon').textContent = center.icon;
  document.getElementById('centerName').textContent = center.name;
  document.getElementById('centerType').textContent = center.type;
  document.getElementById('centerAddress').textContent = center.address;
  document.getElementById('centerPhone').textContent = center.phone;
  document.getElementById('centerHours').textContent = center.hours;
  document.getElementById('centerDescription').textContent = center.description;
  document.getElementById('phoneLink').href = `tel:${center.phone}`;
  document.getElementById('mainCallBtn').href = `tel:${center.phone}`;
  document.getElementById('mapsLink').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.query)}`;
  document.title = `${center.name} - خطوة أمان`;

  document.getElementById('shareCenterBtn').addEventListener('click', async () => {
    const text = `${center.name}\n${center.address}\nهاتف: ${center.phone}`;
    if (navigator.share) await navigator.share({ title: center.name, text });
    else {
      await navigator.clipboard?.writeText(text);
      document.getElementById('shareCenterBtn').textContent = 'تم نسخ البيانات ✓';
    }
  });
});
