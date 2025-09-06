// script.js - Base JS for static HTML version

document.addEventListener('DOMContentLoaded', function() {
  // QR Scanner Modal logic for index.html
  var qrBtn = document.getElementById('showQRBtn');
  var qrModal = document.getElementById('qrModal');
  var qrClose = document.getElementById('qrClose');
  var qrSimulate = document.getElementById('qrSimulate');

  if (qrBtn && qrModal) {
    qrBtn.addEventListener('click', function() {
      qrModal.style.display = 'flex';
    });
  }
  if (qrClose && qrModal) {
    qrClose.addEventListener('click', function() {
      qrModal.style.display = 'none';
    });
  }
  if (qrSimulate && qrModal) {
    qrSimulate.addEventListener('click', function() {
      qrModal.style.display = 'none';
      setTimeout(function() {
        window.location.href = 'menu.html?table=5';
      }, 500);
    });
  }
}); 