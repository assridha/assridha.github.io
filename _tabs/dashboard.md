---
icon: fas fa-tachometer-alt
order: 1
layout: page
---

<style>
  #panel-wrapper {
    display: none;
  }

  main[aria-label="Main Content"] {
    max-width: 100% !important;
    flex: 0 0 100% !important;
    padding: 0 1rem !important;
  }
</style>

<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">


<iframe
  id="streamlit-iframe-1"
  src="https://price-summary-81680f666113.herokuapp.com/"
  width="100%"
  style="border:none; border-radius: 10px; height: 100vh;">
</iframe>
<hr>

<iframe
  id="streamlit-iframe-2"
  src="https://sheltered-springs-88934-ff25ba4be6be.herokuapp.com/"
  width="100%"
  style="border:none; border-radius: 10px; height: 100vh;">
</iframe>


<script>
  window.addEventListener('message', (event) => {
    if (event.data && typeof event.data.height === 'number') {
      if (event.origin === "https://price-summary-81680f666113.herokuapp.com") {
        const iframe1 = document.getElementById('streamlit-iframe-1');
        iframe1.style.height = (event.data.height + 90) + 'px';
      } else if (event.origin === "https://sheltered-springs-88934-ff25ba4be6be.herokuapp.com") {
        const iframe2 = document.getElementById('streamlit-iframe-2');
        iframe2.style.height = (event.data.height + 90) + 'px';
      }
    }
  }, false);
</script>
