function getLocation() {
    const locInput = document.getElementById('locationInput');
    const geoBtn = document.getElementById('geoBtn');
    
    if (navigator.geolocation) {
        geoBtn.innerText = "⏳ جاري جلب إحداثيات الـ GPS...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lng = position.coords.longitude.toFixed(4);
                locInput.value = `${lat}, ${lng}`;
                geoBtn.innerText = "✅ تم تحديد الموقع بنجاح (GPS)";
            },
            () => {
                locInput.value = "القاهرة الجديدة";
                geoBtn.innerText = "📍 تحديد موقعي تلقائياً (GPS)";
            }
        );
    } else {
        locInput.value = "القاهرة الجديدة";
    }
}

const channel = new BroadcastChannel('qarar_reports_channel');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('liveReportForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const fileInput = document.getElementById('cameraInput');
            
            submitBtn.innerText = "⏳ جاري إرسال البلاغ للغرفة...";
            submitBtn.disabled = true;

            const processAndSend = (imageData = null) => {
                const reportData = {
                    type: document.getElementById('reportType').value,
                    location: document.getElementById('locationInput').value || "غير محدد",
                    details: document.getElementById('reportDetails').value || "لا توجد تفاصيل إضافية",
                    time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                    date: new Date().toISOString().split('T')[0],
                    status: "جديد 🔴",
                    image: imageData
                };

                let currentReports = JSON.parse(localStorage.getItem('qarar_reports') || '[]');
                currentReports.unshift(reportData);
                localStorage.setItem('qarar_reports', JSON.stringify(currentReports));

                // إرسال الإشارة المباشرة للوحة التحكم (تحدث الجدول فوراً)
                channel.postMessage(reportData);

                setTimeout(() => {
                    alert("🚨 تم إرسال البلاغ بنجاح! وظهر فوراً في لوحة تحكم الطوارئ.");
                    submitBtn.disabled = false;
                    submitBtn.innerText = "🚨 إرسال البلاغ فوراً";
                    form.reset();
                }, 300);
            };

            // قراءة الصورة لو اتصورت
            if (fileInput && fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    processAndSend(e.target.result);
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                processAndSend(null);
            }
        });
    }
});
