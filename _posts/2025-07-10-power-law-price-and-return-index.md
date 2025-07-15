---
layout: post
title: Power Law Price and Return Index
date: 2025-07-10 23:36 +0200
categories: ['Live Charts']
tags: ['power-law', 'price-index', 'return-index', 'live-chart']
toc: false
---


<style>
/* #panel-wrapper {
    display: none;
}

main[aria-label="Main Content"] {
    max-width: 100% !important;
    flex: 0 0 100% !important;
    padding: 0 1rem !important;
} */

.iframe-responsive-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 75%; /* 16:9 Aspect Ratio */
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



<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">

<div class="full-width-iframe-container">
    <div class="iframe-responsive-wrapper">
        <iframe
            src="https://bitcoin-price-chart-5238b01498b6.herokuapp.com/"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:none; border-radius: 10px;">
        </iframe>
    </div>
</div>


The price levels were determined used quantile regression on historical log price vs log time data. The return deviation (z-score) is based on Power Law Residual Ratio v2 (See [article](/posts/power-law-residual-ratio-v2/) for details).

The daily live price data is obtained using the `yfinance` API. 

> Please share your feedback or suggestions for enhancing this below.
{: .prompt-tip} 