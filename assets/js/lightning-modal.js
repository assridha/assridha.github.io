// Lightning QR Modal Logic
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    function loadScript(url, callback) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = callback;
      script.src = url;
      document.head.appendChild(script);
    }
    
    var lightningModal = document.getElementById('lightning-modal');
    var lightningClose = document.getElementById('lightning-close');
    var lightningQR = document.getElementById('lightning-qr');
    var lightningAddress = 'ashwins@getalby.com';
    var copyBtn = document.getElementById('copy-lightning-address');
    var addressSpan = document.getElementById('lightning-address');

    function openLightningModal() {
      if (!lightningModal) return;
      lightningModal.style.display = 'block';
      if (!window.QRCode) {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js', function() {
          if (lightningQR) {
            lightningQR.innerHTML = '';
            new QRCode(lightningQR, {
              text: lightningAddress,
              width: 180,
              height: 180
            });
          }
        });
      } else if (lightningQR.innerHTML === '') {
        new QRCode(lightningQR, {
          text: lightningAddress,
          width: 180,
          height: 180
        });
      }
    }

    // Attach listeners to all triggers
    var triggers = document.querySelectorAll('#lightning-btn, .open-lightning-modal');
    triggers.forEach(function(trigger) {
      if (trigger) {
        trigger.addEventListener('click', openLightningModal);
      }
    });

    if (lightningModal && lightningClose) {
      lightningClose.addEventListener('click', function() {
        lightningModal.style.display = 'none';
      });
      window.addEventListener('click', function(event) {
        if (event.target === lightningModal) {
          lightningModal.style.display = 'none';
        }
      });
    }

    // Copy to clipboard logic
    if (copyBtn && addressSpan) {
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(addressSpan.textContent).then(function() {
          var icon = copyBtn.querySelector('i');
          var originalColor = icon.style.color;
          icon.style.color = '#28a745'; // green
          copyBtn.title = 'Copied!';
          setTimeout(function() {
            icon.style.color = originalColor;
            copyBtn.title = 'Copy to clipboard';
          }, 1200);
        });
      });
    }
  });
})(); 