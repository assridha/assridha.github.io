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

  .dashboard-iframe {
    width: 100%;
    border: none;
    border-radius: 10px;
    overflow: hidden;
  }

  /* Desktop height */
  #iframe-1 { height: 580px; }
  #iframe-2 { height: 650px; }
  #iframe-3 { height: 400px; }

  /* Mobile height */
  @media (max-width: 768px) {
    #iframe-1 {height: 740px;}
    #iframe-2 {height: 1150px;}
    #iframe-3 { height: 400px; }
  }

  .trends-container {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">


<div style="position: relative;">
  <div class="cover-spin"></div>
  <iframe
    id="iframe-1"
    class="dashboard-iframe"
    src="https://price-summary-81680f666113.herokuapp.com/"
    scrolling="no"
    onload="this.previousElementSibling.style.display='none';">
  </iframe>
</div>
<hr>

<div style="position: relative;">
  <div class="cover-spin"></div>
  <iframe
    id="iframe-2"
    class="dashboard-iframe"
    src="https://sheltered-springs-88934-ff25ba4be6be.herokuapp.com/"
    scrolling="no"
    onload="this.previousElementSibling.style.display='none';">
  </iframe>
</div>
