---
layout: post
title: PLRR metric
categories: ['Price']
tags: ['source-code']
date: 2024-10-22 16:40 +0000
---

## Power Law Residual

<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">

<div id="container" style="background-color:#222">
    <div id="cover-spin"></div>
</div>  
    
<script type="module">
    import { initializeCharts } from '/assets/js/plrr-tradingview.js';

    async function fetchData() {
    const bitcoinResponse = await fetch('https://python-server-e4a8c032b69c.herokuapp.com/bitcoin-price');
    const quantileResponse = await fetch('https://python-server-e4a8c032b69c.herokuapp.com/quantile-price');
        
    const bitcoinData = await bitcoinResponse.json();
    const quantileData = await quantileResponse.json();
        
    return { bitcoinData, quantileData }; 
    }

    fetchData()
    .then(data => {
        document.getElementById('cover-spin').remove(); 
        initializeCharts(data.bitcoinData,data.quantileData); 
    });
</script>

## Introduction

## Derivation

## Analysis

## Discussion

## Source Code

## References






