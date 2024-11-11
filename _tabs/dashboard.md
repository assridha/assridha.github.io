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
    <h4 style="margin-bottom: 0;">Legend</h4>
    <table style="margin-top: 20px; margin-bottom:10px">
        <thead>
            <tr>
                <th colspan="2">Price Quantile (Trendlines)</th>
                <th colspan="2">Return Deviation (Colorscale)</th>
                <th colspan="1">Indication</th>
            </tr>
            <tr>
                <th>Level</th>
                <th>Color</th>
                <th>Level</th>
                <th>Color</th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>q = 0.025</td>
                <td><div style="width: 50px; height: 4px; background-color: green;"></div></td>
                <td>-3σ</td>
                <td><div style="width: 15px; height: 15px; border-radius: 50%; background-color: rgb(50,50,220);"></div></td>
                <td>Undervalued</td>
            </tr>
            <tr>
                <td>q = 0.5</td>
                <td><div style="width: 50px; height: 4px; background-color: gray;"></div></td>
                <td>0σ</td>
                <td><div style="width: 15px; height: 15px; border-radius: 50%; background-color: rgb(200,200,200);"></div></td>
                <td>Fair value</td>
            </tr>
            <tr>
                <td>q = 0.975</td>
                <td><div style="width: 50px; height: 4px; background-color: orange;"></div></td>
                <td>3σ</td>
                <td><div style="width: 15px; height: 15px; border-radius: 50%; background-color: rgb(220,50,50);"></div></td>
                <td>Overvalued</td>
            </tr>
        </tbody>
    </table>
</div>





#### Info
The price levels were determined used quantile regression on historical log price vs log time data. The return deviation (z-score) is based on Power Law Residual Ratio v2 (See [article](/posts/power-law-residual-ratio-v2/) for details).

The daily live price data is obtained using the `yfinance` API. 

> Disclaimer: 1) The projected prices shown in the chart above are purely suggestive. No conclusion on actual price can be derived. 2) The models applied here are subject to change. 
{: .prompt-warning }  

> Share your feedback or suggestions for enhancing this page [here](https://github.com/assridha/assridha.github.io/discussions/5).
{: .prompt-tip} 



<script type="module">
    import { initializeCharts } from '/assets/js/plrr-tradingview.js';

    let isLoading = false;

    async function fetchData(retryCount = 0, maxRetries = 3) {
  
        if (isLoading) return;
        isLoading = true;

        const timeout = 8000; // Reduced timeout
        const timestamp = new Date().getTime();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
          
            const response = await fetch(`https://python-server-e4a8c032b69c.herokuapp.com/bitcoin-data?_=${timestamp}`, {
                cache: 'no-store',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip, deflate'
                }
            });

            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const bitcoinData = await response.json();
            document.getElementById('container').innerHTML = '';
            initializeCharts(bitcoinData.price_history, bitcoinData.quantile_price);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (retryCount < maxRetries) {
                console.log(`Retrying... Attempt ${retryCount + 1} of ${maxRetries}`);
                setTimeout(() => fetchData(retryCount + 1, maxRetries), 1000 * Math.pow(2, retryCount)); 
            } else {
                document.getElementById('container').innerHTML = 'Error loading data. Please try again later.';
            }
        } finally {
            isLoading = false;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchData);
    } else {
        fetchData();
    }
</script>