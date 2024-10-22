---
layout: page
title: Dashboard
icon: fas fa-tachometer-alt
order: 1
---

## Power Law Residual

<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">

<div id="container" style="background-color:#222">
    <div id="cover-spin"></div>
</div>  
    
<script type="module">
    import { initializeCharts } from '/assets/js/plrr-tradingview.js'; // Importing initializeCharts

    async function fetchData() {
    const bitcoinResponse = await fetch('https://python-server-e4a8c032b69c.herokuapp.com/bitcoin-price');
    const quantileResponse = await fetch('https://python-server-e4a8c032b69c.herokuapp.com/quantile-price');
        
    const bitcoinData = await bitcoinResponse.json();
    const quantileData = await quantileResponse.json();
        
    // Combine or process the data as needed
    return { bitcoinData, quantileData }; // Adjust this return as necessary
    }

    fetchData()
    .then(data => {
        document.getElementById('cover-spin').remove(); // Remove the spinner after data is loaded
        initializeCharts(data.bitcoinData,data.quantileData); // Pass the combined data to initializeCharts
    });
</script>