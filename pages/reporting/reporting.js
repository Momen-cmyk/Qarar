/**
 * reporting.js
 * Handles the report submission form: auto-location placeholder,
 * photo upload preview filename, and form submission into local storage.
 */

const reportForm = document.getElementById('reportForm');
const autoLocationBtn = document.getElementById('autoLocationBtn');
const photoInput = document.getElementById('photoInput');
let selectedLocation = null;

autoLocationBtn?.addEventListener('click', () => {
  if (navigator.geolocation) {
    autoLocationBtn.textContent = '📍 جاري تحديد الموقع...';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        selectedLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        autoLocationBtn.textContent = '✅ تم تحديد الموقع';
      },
      () => {
        autoLocationBtn.textContent = '⚠️ لم نتمكن من تحديد الموقع، حدده يدويًا';
      }
    );
  } else {
    autoLocationBtn.textContent = '⚠️ تحديد الموقع غير مدعوم';
  }
});

photoInput?.addEventListener('change', (e) => {
  const fileName = e.target.files[0]?.name;
  if (fileName) {
    photoInput.closest('.upload-box').querySelector('span:nth-child(2)').textContent = fileName;
  }
});

reportForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const reportType = reportForm.querySelector('input[name="reportType"]:checked')?.value;
  const description = document.getElementById('description').value;
  const anonymous = document.getElementById('anonymousCheck').checked;

  const settings = Storage.get('khotwat_amaan_settings', {});
  Storage.addReport({
    type: reportType,
    description: description.trim(),
    anonymous: anonymous || settings.anonymousReports === true,
    location: selectedLocation,
    photoName: photoInput.files[0]?.name || null,
    date: new Date().toISOString(),
  });

  window.location.href = './report-confirm.html';
});
