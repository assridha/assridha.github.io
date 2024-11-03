---
icon: fas fa-tachometer-alt
order: 1
---

## Bitcoin Price and Return

#### Stats
<button type="button" class="btn btn-sm" id="refreshDataButton" style="background-color: transparent; color: gray; padding: 0;">
     <i class="fas fa-sync-alt"></i> Refresh
</button>
<table>
    <tr>
        <th></th>
        <th colspan="3">Price change</th>
        <th>Volatility</th>
    </tr>
    <tr>
        <th></th>
        <th>1d</th>
        <th>30d</th>
        <th>1yr</th>
        <th>30d</th>
    </tr>
    <tr>
        <td>Actual</td>
        <td id="change1d" style="padding: 0px 2px;"></td>
        <td id="change30d" style="padding: 0px 2px;"></td>
        <td id="change1yr" style="padding: 0px 2px;"></td>
        <td id="vol30d" style="padding: 0px 2px;"></td>
    </tr>
    <tr>
        <td>Power law</td>
        <td id="change1d_PL" style="padding: 0px 2px;"></td>
        <td id="change30d_PL" style="padding: 0px 2px;"></td>
        <td id="change1yr_PL" style="padding: 0px 2px;"></td>
        <td id="vol30d_PL" style="padding: 0px 2px;"></td>
    </tr>
</table>





<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">

#### Chart

<div id="container" style="background-color:#222; margin-bottom:20px">
    <div id="cover-spin"></div>
</div>  
<div>
    <table style="margin-top: 20px; margin-bottom:10px">
        <thead>
            <tr>
                <th colspan="2">Price Quantile (Trendlines)</th>
                <th colspan="2">Return Deviation (Colorscale)</th>
            </tr>
            <tr>
                <th>Label</th>
                <th>Color</th>
                <th>Label</th>
                <th>Color</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>q = 0.025</td>
                <td><div style="width: 50px; height: 4px; background-color: green;"></div></td>
                <td>-3σ</td>
                <td><div style="width: 15px; height: 15px; border-radius: 50%; background-color: rgb(50,50,220);"></div></td>
            </tr>
            <tr>
                <td>q = 0.5</td>
                <td><div style="width: 50px; height: 4px; background-color: gray;"></div></td>
                <td>0σ</td>
                <td><div style="width: 15px; height: 15px; border-radius: 50%; background-color: rgb(200,200,200);"></div></td>
            </tr>
            <tr>
                <td>q = 0.975</td>
                <td><div style="width: 50px; height: 4px; background-color: orange;"></div></td>
                <td>3σ</td>
                <td><div style="width: 15px; height: 15px; border-radius: 50%; background-color: rgb(220,50,50);"></div></td>
            </tr>
        </tbody>
    </table>
</div>





#### Info
The price levels were determined used quantile regression on historical log price vs log time data. The return deviation (z-score) is based on Power Law Residual Ratio v2<sup>TM</sup> (See [article](/posts/power-law-residual-ratio/) for details).

The daily live price data is obtained using the `yfinance` API.

> Disclaimer: The projected prices shown in the chart above are purely suggestive. No conclusion on actual price can be derived.
{: .prompt-warning }    

> Share your feedback or suggestions for enhancing this page [here](https://github.com/assridha/assridha.github.io/discussions/5).
{: .prompt-tip} 

#### Links
[1] [https://x.com/TheRealPlanC/status/1847534302306742523](https://x.com/TheRealPlanC/status/1847534302306742523) \
[2] [G. Santostasi, The Bitcoin Power Law Theory](https://giovannisantostasi.medium.com/the-bitcoin-power-law-theory-962dfaf99ee9)





<script type="module">
    import { initializeCharts } from '/assets/js/plrr-tradingview.js';

    async function fetchData() {
    const bitcoinResponse = await fetch('https://python-server-e4a8c032b69c.herokuapp.com/bitcoin-data');
    const bitcoinData = await bitcoinResponse.json();
        
    return bitcoinData; 
    }

    fetchData()
    .then(data => {
        document.getElementById('cover-spin').remove(); 
        initializeCharts(data.price_history,data.quantile_price); 
        getStats(data.stats)
    });

    function getStats(statsData) {

    const change1dElement = document.getElementById('change1d');
    change1dElement.textContent = `${statsData.change1d.toFixed(2)}%`;
    change1dElement.style.color = statsData.change1d > 0 ? 'green' : 'red';
    if (statsData.change1d > 0) {
        change1dElement.innerHTML += ' <span style="color: green;">&#x25B2;</span>';
    } else {
        change1dElement.innerHTML += ' <span style="color: red;">&#x25BC;</span>';
    }
    const change30dElement = document.getElementById('change30d');
    change30dElement.textContent = `${statsData.change30d.toFixed(2)}%`;
    change30dElement.style.color = statsData.change30d > 0 ? 'green' : 'red';
    if (statsData.change30d > 0) {
        change30dElement.innerHTML += ' <span style="color: green;">&#x25B2;</span>';
    } else {
        change30dElement.innerHTML += ' <span style="color: red;">&#x25BC;</span>';
    }
    const change1yrElement = document.getElementById('change1yr');
    change1yrElement.textContent = `${statsData.change1yr.toFixed(2)}%`;
    change1yrElement.style.color = statsData.change1yr > 0 ? 'green' : 'red';
    if (statsData.change1yr > 0) {
        change1yrElement.innerHTML += ' <span style="color: green;">&#x25B2;</span>';
    } else {
        change1yrElement.innerHTML += ' <span style="color: red;">&#x25BC;</span>';
    }

    const change1dPLElement = document.getElementById('change1d_PL');
    change1dPLElement.textContent = `${statsData.change1d_PL.toFixed(2)}%`;
    const change30dPLElement = document.getElementById('change30d_PL');
    change30dPLElement.textContent = `${statsData.change30d_PL.toFixed(2)}%`;
    const change1yrPLElement = document.getElementById('change1yr_PL');
    change1yrPLElement.textContent = `${statsData.change1yr_PL.toFixed(2)}%`;

    const changeVol30dElement = document.getElementById('vol30d');
    changeVol30dElement.textContent = `${statsData.volatility30d.toFixed(2)}%`;
    const changeVol30dPLElement = document.getElementById('vol30d_PL');
    changeVol30dPLElement.textContent = `${statsData.volatility30d_PL.toFixed(2)}%`;


        
    }
    
    document.getElementById('refreshDataButton').addEventListener('click', () => {

        fetchData()
    .then(data => {
        console.log('server response OK')
        document.getElementById('container').innerHTML = '';
        initializeCharts(data.price_history,data.quantile_price); 
        getStats(data.stats)
    });
    }


    );


</script>