---
icon: fas fa-tachometer-alt
order: 1
---

## Bitcoin Price and Return Bounds


<div>
    <table style="margin-top: 20px; margin-bottom:10px">
        <thead>
            <tr>
                <th>Data Label</th>
                <th>Line Color</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>2.5 Quantile fit</td>
                <td><div style="width: 100px; height: 2px; background-color: green;"></div></td>
            </tr>
            <tr>
                <td>50 Quantile fit</td>
                <td><div style="width: 100px; height: 2px; background-color: gray;"></div></td>
            </tr>
            <tr>
                <td>97.5 Quantile fit</td>
                <td><div style="width: 100px; height: 2px; background-color: orange;"></div></td>
            </tr>
            <tr>
                <td>PLRR scale [-3 to 3]</td>
                <td><img src="/assets/img/scalePLRR.png" style="width: 100px;" alt="PLRR"></td>
            </tr>
        </tbody>
    </table>
</div>

<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">

<div id="container" style="background-color:#222; margin-bottom:20px">
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



The daily live price data is obtained using the `yfinance` API.

The price levels are based on quantile regression using historical log price vs log time data (similar to the model of [PlanC](https://x.com/TheRealPlanC/status/1847534302306742523)). The return levels is based on the PLRR™ indicator. For info on how PLRR is calculated see [article](/posts/power-law-residual-ratio/).

> Disclaimer: The projected prices shown in the chart above are purely suggestive. No conclusion on actual price can be derived. #NFA #DYOR
{: .prompt-warning }    

