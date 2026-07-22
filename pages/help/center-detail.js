const centers = {
  1: { name: 'مستشفى الأمل العام', type: 'مستشفى عام', icon: '🏥', address: 'شارع الجمهورية، المنطقة الوسطى', phone: '19999', hours: 'يعمل على مدار 24 ساعة، طوال أيام الأسبوع', description: 'خدمات طوارئ متكاملة ودعم للحالات الناتجة عن حوادث الطرق.', query: 'مستشفى الأمل العام' },
  2: { name: 'مركز التعافي لعلاج الإدمان', type: 'علاج وتأهيل', icon: '🛡️', address: 'شارع النصر، المنطقة الشرقية', phone: '16023', hours: 'يوميًا من 9 صباحًا إلى 9 مساءً', description: 'برامج علاج وتأهيل ودعم نفسي بسرية وبإشراف متخصصين.', query: 'مركز علاج إدمان' },
  3: { name: 'مركز الدعم النفسي والاجتماعي', type: 'دعم نفسي', icon: '💬', address: 'شارع التحرير، المنطقة الغربية', phone: '16328', hours: 'يوميًا من 9 صباحًا إلى 5 مساءً', description: 'استشارات نفسية وأسرية ودعم أولي في بيئة آمنة وغير حُكمية.', query: 'مركز دعم نفسي' },
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
