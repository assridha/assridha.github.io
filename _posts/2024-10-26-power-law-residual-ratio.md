---
layout: post
title: Power Law Residual Ratio v2
date: 2024-10-26 23:21 +0200
categories: ['Price']
tags: ['indicator','power-law']
math: true
image:
  path: /assets/img/Zpl.png
  alt: The power law residual ratio v2
---


## Introduction
Bitcoin's price exhibits a long-term power law relationship with time, punctuated by periodic short-term boom-bust cycles that repeat approximately every 4 years (Figure 1). These bubble cycles are primarily attributed to two factors: Bitcoin's halving events, which occur precisely every 4 years, and the global liquidity cycle, which follows a similar approximate 4-year period. With the right conditions in place, a bull market rally initiates where the price sharply deviates upward from its natural power law trend. Driven by speculation and FOMO (Fear Of Missing Out), the price reaches unsustainable levels before eventually crashing back to its power law support price. 

The long-term price trend of Bitcoin adheres to a power law, but modeling the bubble cycles that punctuate this trend remains an active area of research. Interestingly, despite being fueled by speculation, these cycles exhibit a significant degree of regularity. A comparison across cycles reveals a near exponential decay in the peak price relative to its underlying power law support, accompanied by a steady decrease in volatility over time. This raises a crucial question: given these regularities, can we predict when or at what price the blow-off top will occur during the next cycle? To address this, several authors have proposed various approaches, which can be categorized as follows:
- Developing a model based on historical price data to describe the decay in peak price. [3-7]
- Analyzing returns to identify the point at which the blow-off top occurs. [7]
- Monitoring exogenous factors (such as global liquidity) that correlate with the cycle phases. [8]

In a previous article, I introduced the Power Law Residual Ratio (PLRR) [1-2], a log returns-based indicator that leverages the volatility normalization concept from [3] to quantify the cycle phases. This article presents version 2 of this indicator, denoted by the symbol $Z_{pl}$ <sup>1</sup>, and discusses a limitation of the original version, namely the issue of past price jumps, that prompted these improvements.

![img-description](/assets/img/price_history.png){: .light }
![img-description](/assets/img/price_history_dark.png){: .dark }
_Figure 1: Bitcoin price showing a long term power law trend with periodic boom-bust cycles repeating approximately every 4 years._

> <sup>1</sup> The symbol $Z$ was chosen for the indicator due to its resemblance to z-score. See the Derivation section for more details.

## Derivation

Let $P(t)$ be the daily price of bitcoin on day $t$, where $t$ is measured with respect to the genesis block. The daily log returns $r$ is given as follows:
$$
\begin{equation}
r = \log\left(\frac{P(t)}{P(t-1)}\right)
\end{equation}
$$
The total return $R$ over a period $T$ days is given as follows:
$$
\begin{equation}
R = \log\left(\frac{P(t)}{P(t-T)}\right)
\end{equation}
$$

Let $\mu_{pl}$ represent the predicted Power Law log returns over the same period, where
$$
\begin{equation}
  \mu_{pl} =  k\log\left(1 + \frac{T}{t} \right)\,.
  \label{eq:label_name}
\end{equation}
$$

Here, $k$ is the characteristic exponent <sup>3</sup>. By subtracting the actual returns with the power law returns one obtains the residual returns $\delta$

$$
\begin{equation}
  \delta =  \log\left(\frac{P(t)}{P(t-T)}\right) - k\log\left(1 + \frac{T}{t} \right)
\end{equation}
$$

As the bitcoin price follows a power law over extended periods, the residual returns are expected to exhibit mean reversion around 0. The amplitude of the oscillations at any given time period is directly influenced by the underlying price volatility. By normalizing the residual return with respect to volatility, an indicator akin to z-score is obtained, characterized by a stable amplitude oscillations over time<sup>2</sup>. Let this indicator be denoted by $z_{pl}$. The expression for it is given as follows:

$$
\begin{equation}
  z_{pl} =  \frac{\delta}{\sigma_{vol}}  = \frac{R - \mu_{pl}}{\sigma_{vol}}
\end{equation}
$$

where,

$$
\begin{equation}
  \sigma_{vol} =  \sqrt{\sum_{\tau=0}^{T-1} r^2(t-\tau)-R^2(t,T)}
\end{equation}
$$

Furthermore, to mitigate the impact of the choice of $T$, $z_{pl}$ can be averaged over a range of values of $T$, yielding $Z_{pl}$, the Power Law Residual Ratio v2. 
$$
\begin{equation}
    Z_{pl}  = \frac{1}{|S|}\sum_{T\in S}z_{pl}(t,T)
\end{equation}
$$
Where $S$ is a set of time periods for the averaging.

> <sup>2</sup> This was the original definition of the Power Law Residual Ratio presented in [1] sans the risk-free return term.\
 <sup>3</sup> I assume $k=5.7$. 

## Analysis
The analysis is divided into two main parts. First, the optimal time period for calculating $z_{pl}$ is determined. Then, the issue of past price jumps is addressed through the application of time period averaging, resulting in the more robust $Z_{pl}$ indicator. Additionally, the choice of daily price used for calculating $Z_{pl}$ is presented in a subsequent section.

### Choice of time period
The historical $z_{pl}$ charts (Figure 2-4) demonstrate the impact of different $T$ values on the indicator. It is evident that $z_{pl}$ tends to fluctuate within the range of $\pm$ 3, with peaks at +3 and troughs at -3. This is not arbitrary, since $z_{pl}$ can be interpreted as a z-score, where a value of 3 indicates a 3 sigma event. Therefore, the likelihood of the value exceeding 3 is very low (<1% in theory). However, for smaller $T$ values (i.e., a few weeks or months), $z_{pl}$ can surpass 3 at cycle peaks (Figure 2). This can be attributed to the increased sensitivity of statistics calculated over smaller sample sizes to fat tail events. 

Conversely, a larger $T$ value (beyond 2 years) has the opposite effect, dampening the maximum value of $z_{pl}$ (Figure 3). This is because at this scale, the power law begins to dominate the return, and deviations start to mean revert. The choice of $T=365$ appears to be close to optimal, as the oscillator behaves well, with each cycle peak and valley aligning with 3 and -3, respectively (Figure 4). 

In addition to ensuring range normalization, another reason for not choosing a $T$ value much smaller than 1 year is to ensure that the power law plays a balanced role in the indicator. For $T\ll 365$ days, the contribution of the power law to the overall return is minimal, resulting in short-term price swings that are less significant. This undermines the purpose of the indicator, which is primarily to quantify price deviations that are significant in relation to the overall power law price trend.

This choice also aligns with the known seasonality of bitcoin (referred to as spring, summer, autumn, and winter), each lasting approximately 1 year. During this period, bitcoin follows a relatively consistent statistical pattern, making it the optimal time window for calculating volatility. 

Therefore, the arguments in favor of $T\sim 365$ days as the optimal choice can be summarized as follows:
* It ensures that the indicator's oscillations are normalized and well-behaved. A lower value leads to overshoot during cycle peaks, while a higher value leads to attenuation.
* It roughly matches the duration of a cycle phase, making it ideal for estimating volatility.
* It is sufficiently long to ensure that the power law price trend plays a balanced role in the total return.

![img-description](/assets/img/zpl_90.png){: .light }
![img-description](/assets/img/zpl_90_black.png){: .dark }
_Figure 2_

![img-description](/assets/img/zpl_540.png){: .light }
![img-description](/assets/img/zpl_540_black.png){: .dark }
_Figure 3_

![img-description](/assets/img/zpl_365.png){: .light }
![img-description](/assets/img/zpl_365_black.png){: .dark }
_Figure 4_


### Time period averaging
The formula for price return involves only two parameters, the price on day $t$ and day $t-T$. If there was a black swan event on day $t-T$ that caused a significant jump in the price, this would be reflected in the total return at $t$. This is a problem for $z_{pl}$ since it is applied as a day $t$ indicator, and thus should not be highly sensitive to events that occurred on day $t-T$. The issue was realized with the March 2020 price crash due to the pandemic causing a jump in the indicator in March 2021 with $T=365$ days applied (See Figure 4). 


A straightforward approach to solve the issue of past price jumps is to simply average $z_{pl}$ over a range of $T$ values (Figure 5). The averaging also helps dampen other spurious oscillations that results from the choice of $T$ and strengthen secular price trends resulting from momentum. 

![img-description](/assets/img/Zpl_averaging.png){: .light }
![img-description](/assets/img/Zpl_averaging_invert.png){: .dark }
_Figure 5_

### Choice of Daily Price
When calculating daily price, several sampling methods are available for consideration. The most common approach involves using the closing price, which offers both the latest price point and uniform sampling across days. However, an unorthodox approach was chosen for the definition of $Z_{pl}$ - the midpoint between the daily high and low prices.

While this seems like an arbitrary choice it helped preserve the indicator's sensitivity by mitigating the damping of the cycle peaks/valleys that occurs to an extent with averaging.  

### Discussion 

#### Price vs Return based indicators

Price-based and return-based cycle indicators offer complementary insights into Bitcoin's market dynamics. Price-based indicators [3-6] quantify how far the current price deviates from the theoretical power law trend line, essentially measuring absolute valuation. In contrast, return-based indicators (like $Z_{pl}$) track how Bitcoin's growth rate differs from its expected power law growth trajectory, capturing the momentum of price movements. This focus on rate-of-change makes return-based indicators especially adept at identifying the beginning stages of major market moves, whether bullish or bearish, often before price-based indicators signal significant deviations.

However, return-based indicators have limitations in predicting the absolute cycle peaks. During the 2021 bull market, for example, Bitcoin maintained elevated prices for several months. As the market established new support levels at these higher prices, $Z_{pl}$ (See cover image) naturally mean-reverted despite prices remaining well above the power law trend, even reaching a new ATH. This highlights why using both types of indicators in tandem provides the most complete picture of market conditions. For real-time analysis incorporating both approaches, visit the [Dashboard](/dashboard/#bitcoin-price-and-return) section, which features a power law quantile regression model tracking absolute price levels alongside the residual ratio monitoring market dynamics.

#### Comparing v1 and v2 indicator: 2023-2024 price cycle

The approval of US spot Bitcoin ETFs catalyzed a significant price rally from late 2023 into early 2024, driving Bitcoin from approximately <span>$</span>40,000 to a new all-time high of <span>$</span>73,000. Following this surge, price action has consolidated within the <span>$</span>60,000-70,000 range for several months. This period provides an interesting case study for comparing the v1 and v2 versions of the PLRR indicator, which was initially explored in [1].

The v1 indicator ($z_{pl}$) has remained elevated around 1 during this consolidation (See Figure 4), suggesting persistent deviation from power law returns. In contrast, the v2 indicator ($Z_{pl}$) presents a different interpretation by mean reverting. As of September 2024, the $Z_{pl}$ score approaching 0 indicates that returns are normalizing and aligning with the expected power law behavior.

This interpretation is corroborated by the median quantile price shown in the [Dashboard](/dashboard/#bitcoin-price-and-return). While price was notably elevated at the start of 2024, it has since retraced to the median support line, validating the mean reversion signal from $Z_{pl}$ and demonstrating the indicator's improved accuracy in capturing market dynamics.

## References
[1] [https://x.com/math_sci_tech/status/1831083600516911566](https://x.com/math_sci_tech/status/1831083600516911566)\
[2] [https://x.com/math_sci_tech/status/1836845183289131289](https://x.com/math_sci_tech/status/1836845183289131289)\
[3] [https://x.com/Sina_21st/status/1800713784807264431](https://x.com/Sina_21st/status/1800713784807264431) \
[4] [https://x.com/sminston_with/status/1813619486106558647](https://x.com/sminston_with/status/1813619486106558647)\
[5] [https://x.com/TheRealPlanC/status/1850697215553028420](https://x.com/TheRealPlanC/status/1850697215553028420)\
[6] [https://x.com/apsk32/status/1809771015439822908](https://x.com/apsk32/status/1809771015439822908) \
[7] [https://x.com/Giovann35084111/status/1832129338889924960](https://x.com/Giovann35084111/status/1832129338889924960)\
[8] [The Bitcoin Price and Global Liquidity: Insights and Implications](https://bitposeidon.com/f/the-bitcoin-price-and-global-liquidity-insights-and-implications)