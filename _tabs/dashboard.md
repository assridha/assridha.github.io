---
icon: fas fa-tachometer-alt
order: 1
---

## Bitcoin Price and Return


<link rel="stylesheet" type="text/css" href="/assets/css/spinner.css">
<link rel="stylesheet" type="text/css" href="/assets/css/dashboard.css">

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
The price levels were determined used quantile regression on historical log price vs log time data. The return deviation (z-score) is based on Power Law Residual Ratio v2 (See [article](/posts/power-law-residual-ratio/) for details).

The daily live price data is obtained using the `yfinance` API. 

> Disclaimer: The projected prices shown in the chart above are purely suggestive. No conclusion on actual price can be derived.
{: .prompt-warning }    

> Share your feedback or suggestions for enhancing this page [here](https://github.com/assridha/assridha.github.io/discussions/5).
{: .prompt-tip} 



<script type="module">
    import { initializeCharts } from '/assets/js/plrr-tradingview.js';

    function fetchData(retryCount = 0, maxRetries = 3) {
        const timeout = 10000; // 10 seconds timeout
        const timestamp = new Date().getTime();
        
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        fetch(`https://python-server-e4a8c032b69c.herokuapp.com/bitcoin-data?_=${timestamp}`, {
            cache: 'no-store',
            signal: controller.signal
        })
        .then(response => {
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            try {
                const bitcoinData = JSON.parse(text);
                document.getElementById('container').innerHTML = '';
                initializeCharts(bitcoinData.price_history, bitcoinData.quantile_price);
            } catch (e) {
                console.error('JSON parsing error:', e);
                throw e;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            if (retryCount < maxRetries) {
                console.log(`Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
                setTimeout(() => fetchData(retryCount + 1, maxRetries), 1000 * (retryCount + 1));
            } else {
                document.getElementById('container').innerHTML = 'Error loading data. Please try again later.';
            }
        });
    };
    console.log('Script loaded');
    fetchData();
</script>