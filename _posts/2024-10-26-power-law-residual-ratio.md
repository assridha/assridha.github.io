---
layout: post
title: Power Law Residual Ratio v2
date: 2024-10-26 23:21 +0200
categories: ['Price']
tags: ['source-code']
math: true
image:
  path: /assets/img/Zpl.png
  alt: The power law residual ratio v2
---


## Introduction
Bitcoin's price exhibits a long-term power law relationship with time, punctuated by periodic short-term boom-bust cycles that span approximately 4 years (Figure 1). These bubble cycles are primarily attributed to two factors: Bitcoin's halving events, which occur precisely every 4 years, and the global liquidity cycle, which follows a similar approximate 4-year period. With the right conditions in place, a bull market rally initiates where the price sharply deviates upward from its natural power law trend. Driven by speculation and FOMO (Fear Of Missing Out), the price reaches unsustainable levels before eventually crashing back to its fair value price (which closely tracks the cost of production). 

While the long-term price trend follows a power law, modeling the bubble cycles remains an active area of research. A key challenge lies in correctly identifying the different phases of each cycle - the bull run, blow-off top, and bear crash. Several authors have proposed different modeling approaches [3-7], with most using price-based methods except for [7] which utilizes log returns.

I previously introduced the Power Law Residual Ratio (PLRR) [1-2], a log returns-based indicator that builds upon the volatility normalization concept from [3] to quantify price bubbles and crashes. In this article, I present version 2 of this indicator, denoted by the symbol $Z_{pl}$ <sup>1</sup>, and explain the limitations of the original version that motivated these improvements.

![img-description](/assets/img/price_history.png){: .light }
![img-description](/assets/img/price_history_dark.png){: .dark }
_Figure 1: Bitcoin price showing a long term power law trend with periodic boom-bust cycles repeating approximately every 4 years._

> <sup>1</sup> The symbol $Z$ was chosen for the indicator due to its resemblance to the z-score metric, as shown in the [Derivation](#derivation) section.

## Derivation

Let $P(t)$ be the daily price of bitcoin on day $t$, where $t$ is measured with respect to the genesis block (Jan 3 2009). The log returns $R(t,T)$ on day $t$ over a period $T$ days is given as follows:
$$
\begin{equation}
R(t,T) = \log\left(\frac{P(t)}{P(t-T)}\right)
\end{equation}
$$

The daily log returns is given as follows:
$$
\begin{equation}
r(t) = \log\left(\frac{P(t)}{P(t-1)}\right)
\end{equation}
$$

Let $\mu_{pl}(t,T)$ represent the predicted Power Law log returns over the same period The formula for power law log return for Bitcoin is given as follows:
$$
\begin{equation}
  \mu_{pl}(t,T) =  k\log\left(1 + \frac{T}{t} \right)
  \label{eq:label_name}
\end{equation}
$$

By subtracting the actual returns with the power law returns one obtains the residual returns $\delta$

$$
\begin{equation}
  \delta =  \log\left(\frac{P(t)}{P(t-T)}\right) - k\log\left(1 + \frac{T}{t} \right)
\end{equation}
$$

Since bitcoin price is shown to follow the power law over a long enough period, the resulting residual returns should be mean reverting around 0. If the underlying currency is exhibiting a constant non-zero inflation, then the residual will exhibit a mean around this value. This effect can be removed by adding a constant *risk-free* return $\mu_{rf}(T)$ to the definition of $\delta$. Thus, one obtains:
$$
\begin{equation}
  \delta^* =  R(t,T) - \mu_{pl}(t,T) - \mu_{rf}(T)
\end{equation}
$$

The magnitude of the deviations from the mean can vary over time due to heteroscedasticity. This effect can be normalized by dividing the residual by the volatility over the given period. Let this be represented by the symbol $z_{pl}$. <sup>2</sup>

$$
\begin{equation}
  z_{pl}(t,T) =  \frac{\delta^*}{\sigma_{vol}}  = \frac{R(t,T) - \mu_{pl}(t,T) - \mu_{rf}(T)}{\sigma_{vol}}
\end{equation}
$$

where,

$$
\begin{equation}
  \sigma_{vol}(t,T) =  \sqrt{\sum_{\tau=0}^{T-1} r^2(t-\tau)-R^2(t,T)}
\end{equation}
$$

To remove the impact of the choice of $T$ to an extent, the $z_{pl}$ can be averaged over a range of values of $T$, yielding $Z_{pl}$, the Power Law Residual Ratio. 
$$
\begin{equation}
    Z_{pl}(t,S)  = \frac{1}{|S|}\sum_{T\in S}z_{pl}(t,T)
\end{equation}
$$
Where $S$ is a set of time periods for the averaging.

> <sup>2</sup> This was the original definition of the Power Law Residual Ratio presented in [1].

## Analysis
This analysis consists of two main parts. First, we examine $z_{pl}$ to determine the optimal time period for calculation. Then, we explore the benefits of time period averaging and how it leads to the more robust $Z_{pl}$ metric. To simplify the analysis, the risk-free return is assumed to be 0.

### Choice of time period
The charts below (Figure 2-4) shows historical $z_{pl}$ calculated with different choices of $T$. It can be seen for each case that $z_{pl}$ remains mostly bounded within the range of +/- 3, with cycle peaks occurring at +3 and the bottoms at -3. This is not arbitrary since $z_{pl}$ is the ratio of the return residual with respect to its volatility, which means a value of 3 represents a 3 sigma event. Thus, there is a very low chance (<1% in theory) that value goes above 3. However, note that for small values of $T$ (<< 365), $z_{pl}$ can go well above 3 at the cycle tops (Figure 2). This can be explained by the fact that the statistics calculated over small sample sizes are more sensitive to fat tail events. 

On the other hand, a choice of $T$ that is larger than 2 years has the opposite effect of attenuating the max value of $z_{pl}$ (Figure 3). This is because at this scale, the power law starts to dominate the return as the deviations start to mean revert. The choice of $T=365$ seems close to optimal as the oscillator is well-behaved, with each cycle peak and valley coinciding with 3 and -3 respectively (Figure 4). 

Apart from ensuring range normalization, another reason to choose a time period that is not much smaller than 1 year is to ensure that the power law plays a balanced role in the indicator. For $T\ll 365$ days, the contribution of the power law to the overall return is miniscule leaving one with short term price swings that are less meaningful. This defeats the purpose of the indicator which is mainly to quantify the price deviations that is significant with respect to the overall power law price trend.

This choice also aligns with the known seasonality of bitcoin (dubbed spring, summer, autumn and winter), each of which lasts approximately 1 year. During this period, bitcoin follows a more or less consistent statistical pattern, thus making it the optimal time window for calculating volatility. 

Thus, the arguments in favor of $T\sim 365$ days as the optimal choice can be summarized as follows:
* It ensures that the oscillations of the indicator is normalized and well-behaved. A lower value leads to overshoot during cycle peaks and a higher value leads to attenuation.
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
When calculating daily price, there are several sampling methods to consider. The most common approach is to use the closing price, which provides both the latest price point and uniform sampling across days. However, for the definition of $Z_{pl}$, I opted for a different approach - using the midpoint between the daily high and low prices.

While this choice breaks from the uniform sampling convention (since the midpoint price can occur at any time during the day), it offers important benefits. The midpoint better captures the full price range experienced during the day, and for longer time periods (much greater than one day), the non-uniform sampling has minimal impact. Most importantly, this definition helps preserve the indicator's sensitivity near cycle tops by reducing the damping effects that can occur with averaging.

### Discussion 

#### Price vs Return based indicators

Price-based and return-based cycle indicators offer complementary insights into Bitcoin's market dynamics. Price-based indicators quantify how far the current price deviates from the theoretical power law trend line, essentially measuring absolute valuation. In contrast, return-based indicators (like $Z_{pl}$) track how Bitcoin's growth rate differs from its expected power law growth trajectory, capturing the momentum of price movements. This focus on rate-of-change makes return-based indicators especially adept at identifying the beginning stages of major market moves, whether bullish or bearish, often before price-based indicators signal significant deviations.

However, return-based indicators have limitations in predicting cycle peaks. During the 2021 bull market, for example, Bitcoin maintained elevated prices for several months. As the market established new support levels at these higher prices, $Z_{pl}$ (See cover image) naturally mean-reverted despite prices remaining well above the power law trend. This highlights why using both types of indicators in tandem provides the most complete picture of market conditions. For real-time analysis incorporating both approaches, visit the [Dashboard](/dashboard/#bitcoin-price-and-return) section, which features a power law quantile regression model tracking absolute price levels alongside the power law residual ratio monitoring market dynamics.

#### Comparing v1 and v2 indicator: 2023-2024 price cycle

The approval of spot Bitcoin ETFs in the US catalyzed a significant price rally from late 2023 into early 2024, driving Bitcoin from approximately `$35,000` to a new all-time high of `$72,000`. Following this surge, price action has consolidated within the `$60,000`-`$70,000` range for several months. This period provides an interesting case study for comparing the v1 and v2 versions of the PLRR indicator, which I initially explored in my original post [1].

The v1 indicator has remained elevated around 1 during this consolidation (See Figure 4), suggesting persistent deviation from power law returns. In contrast, the v2 indicator ($Z_{pl}$) presents a different interpretation by mean reverting. As of September 2024, the $Z_{pl}$ score approaching 0 indicates that returns are normalizing and aligning with the expected power law behavior.

This interpretation is corroborated by the median quantile price shown in the [Dashboard](/dashboard/#bitcoin-price-and-return). While price was notably elevated at the start of 2024, it has since retraced to the median support line, validating the mean reversion signal from $Z_{pl}$ and demonstrating the indicator's improved accuracy in capturing market dynamics.

## References
[1] [https://x.com/math_sci_tech/status/1831083600516911566](https://x.com/math_sci_tech/status/1831083600516911566)\
[2] [https://x.com/math_sci_tech/status/1836845183289131289](https://x.com/math_sci_tech/status/1836845183289131289)\
[3] [https://x.com/Sina_21st/status/1800713784807264431](https://x.com/Sina_21st/status/1800713784807264431) \
[4] [https://x.com/sminston_with/status/1813619486106558647](https://x.com/sminston_with/status/1813619486106558647)\
[5] [https://x.com/TheRealPlanC/status/1850697215553028420](https://x.com/TheRealPlanC/status/1850697215553028420)\
[6] [https://x.com/apsk32/status/1809771015439822908](https://x.com/apsk32/status/1809771015439822908) \
[7] [https://x.com/Giovann35084111/status/1832129338889924960](https://x.com/Giovann35084111/status/1832129338889924960)