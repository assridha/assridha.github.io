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

.iframe-responsive-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 55%; /* 16:9 Aspect Ratio */
}

.full-width-iframe-container {
    margin-left: -1rem;
    margin-right: -1rem;
}

@media (max-width: 768px) {
    .iframe-responsive-wrapper {
        padding-top: 450px;
    }
}
</style>


## Bitcoin Power Law Quantile and Z-Index 


<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">

<div class="full-width-iframe-container">
    <div class="iframe-responsive-wrapper">
        <iframe
            src="https://price-summary-81680f666113.herokuapp.com/"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:none; border-radius: 10px;">
        </iframe>
    </div>
</div>
