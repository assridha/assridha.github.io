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
  #iframe-1 { height: 650px; }
  #iframe-2 { height: 650px; }

  /* Mobile height */
  @media (max-width: 768px) {
    #iframe-1 {height: 820px;}
    #iframe-2 {height: 1150px;}
  }
</style>

<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">


<iframe
  id="iframe-1"
  class="dashboard-iframe"
  src="https://price-summary-81680f666113.herokuapp.com/"
  scrolling="no">
</iframe>
<hr>

<iframe
  id="iframe-2"
  class="dashboard-iframe"
  src="https://sheltered-springs-88934-ff25ba4be6be.herokuapp.com/"
  scrolling="no">
</iframe>

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/4116_RC01/embed_loader.js"></script>
<script type="text/javascript">
trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/m/05p0rrx","geo":"","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"date=today%205-y&q=%2Fm%2F05p0rrx&hl=en-GB","guestPath":"https://trends.google.com:443/trends/embed/"});
</script>

