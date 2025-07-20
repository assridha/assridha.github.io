---
# the default layout is 'page'
icon: fas fa-heart
order: 6
---

## Support via Lightning ⚡️

If you find the content on this website useful, please consider supporting me through Bitcoin Lightning. Your contributions help me dedicate more time to research and building new tools.

<div style="display: flex; flex-direction: column; align-items: center; margin-top: 2rem; text-align: center;">
  <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); display: inline-block;">
    <div id="qrcode"></div>
  </div>
  <div style="margin-top: 1rem; font-family: monospace; background-color: #f5f5f5; padding: 0.5rem 1rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.75rem;">
    <span id="ln-address">ashwins@getalby.com</span>
    <button id="copy-ln-address" title="Copy to clipboard" style="background:none; border:none; cursor:pointer; padding:0;">
      <i class="fa-regular fa-copy" style="font-size:1.1rem; color:#555;"></i>
    </button>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script type="text/javascript">
  new QRCode(document.getElementById("qrcode"), {
    text: "lightning:ashwins@getalby.com",
    width: 220,
    height: 220,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  const copyBtn = document.getElementById('copy-ln-address');
  const addressSpan = document.getElementById('ln-address');
  if (copyBtn && addressSpan) {
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(addressSpan.textContent).then(function() {
          const icon = copyBtn.querySelector('i');
          const originalTitle = copyBtn.title;
          const originalIconColor = icon.style.color;
          
          icon.style.color = '#28a745';
          copyBtn.title = 'Copied!';

          setTimeout(function() {
            icon.style.color = originalIconColor;
            copyBtn.title = originalTitle;
          }, 1500);
        });
      });
    }
</script> 