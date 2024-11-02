---
layout: post
title: Introducing the Power Law Residual Ratio v2
date: 2024-10-26 23:21 +0200
categories: ['Price']
tags: ['source-code']
math: true
image:
  path: /assets/img/Zpl.png
  alt: The power law residual ratio v2
---


## Introduction
Bitcoin's price exhibits a long-term power law relationship with time, punctuated by periodic short-term boom-bust cycles that span approximately 4 years(Figure 1). These bubble cycles are primarily attributed to two factors: Bitcoin's halving events, which occur precisely every 4 years, and the global liquidity cycle, which follows a similar approximate 4-year period. With the right conditions in place, a bull market rally initiates where the price sharply deviates upward from its natural power law trend. Driven by speculation and FOMO (Fear Of Missing Out), the price reaches unsustainable levels before eventually crashing back to its fair value price (which closely tracks the cost of production). 

An intriguing question about Bitcoin's price behavior is whether we can predict the peak price of each cycle, given the underlying power law trend. Understanding this relationship could help develop indicators that describe the current phase of the cycle. Several attempts have been made at this. To serve the purpose of this article, I would classify the approaches into two categories based on whether they analyze Bitcoin's price directly (See REF) or its price returns (See REF). Here, I present an approach similar to Sina's work, but instead of using price, I develop an indicator based on log returns. I call this the Power Law Residual Ratio, denoted by the symbol $Z_{pl}$ <sup>1</sup>.

The key distinction between price-based and return-based indicators (like the one introduced here) lies in what they measure. Price-based indicators measure the deviation from an absolute power law price level, while return-based indicators measure the deviation in Bitcoin's growth rate relative to the natural power law growth rate. Return-based indicators are particularly sensitive to rapid price changes, making them useful for detecting the onset of bull market rallies or bear market crashes. This sensitivity gives return-based indicators a phase lead over price-based ones.

However, return-based indicators may not necessarily predict the peak cycle price. For instance, during the 2021 rally, the price remained elevated for an extended period. In such cases, the return-based indicator would revert to the fair value level as the higher price establishes a new support level. Therefore, combining both price and return-based indicators can provide a more comprehensive understanding of the current cycle phase. You can find a live chart implementing both approaches in the [Dashboard](/dashboard/#bitcoin-price-and-return) section, where I use a power law quantile regression model for price and the power law residual ratio for returns.

> <sup>1</sup> The symbol $Z$ was chosen for the indicator due to its resemblance to the z-index.

## Derivation

Let $P(t)$ be the daily price of bitcoin on day $t$, where $t$ is measured with respect to the genesis block (Jan 3 2009). The log returns $R(t,T)$ over a period $T$ is given as follows:
$$
\begin{equation}
R(t,T) = \log\left(\frac{P(t)}{P(t-T)}\right)
\end{equation}
$$

The daily log returns is given as follows
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

The magnitude of the deviations from the mean can vary over time due to heteroscedasticity. This effect can be normalized by dividing the residual by the volatility over the given period. Let this be represented by the symbol $z_{pl}$. <sup>2</sup><sup>3</sup>

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

> <sup>2</sup> The choice of the letter $z$ was deliberately made due to its similarity with the z-index. However, one should not confound PLRR with the z-index since the latter is specifically defined for the case of a stationary distribution with known population statistics. 
> <sup>3</sup> This was the original definition of the Power Law Residual Ratio presented in REF.

## Analysis
This analysis consists of two main parts. First, we examine $z_{pl}$ to determine the optimal time period for calculation. Then, we explore the benefits of time period averaging and how it leads to the more robust $Z_{pl}$ metric. To simplify the analysis, the risk-free return is assumed to be 0.

### Choice of time period
The chart below shows historical $z_{pl}$ calculated with different choices of $T$. It can be seen for each case that $z_{pl}$ remains mostly bounded within the range of +/- 3, with cycle peaks occurring at +3 and the bottoms at -3. This is not arbitrary since $z_{pl}$ is the ratio of the return residual with respect to its volatility, which means a value of 3 represents a 3 sigma event. Thus, there is a very low chance (<1%) that value goes above 3. However, note that for small values of $T$ (<< 365), $z_{pl}$ can easily go above 3 at the cycle tops. This can be explained by the fact that the statistics over short time scales is more sensitive to fat tail events. 

On the other hand, a choice of $T$ that is larger than 2 years has the opposite effect of attenuating the max value of $z_{pl}$. This is because at this scale, the power law starts to dominate the return as the deviations start to mean revert. The choice of $T=365$ seems close to optimal as the oscillator is well-behaved, with each cycle peak and valley coinciding with 3 and -3 respectively. 

Apart from ensuring range normalization, another reason to choose a time period that is not much smaller than 1 year is to ensure that the power law plays a significant role in the indicator. For $T\ll 365$ days, the contribution of the power law to the overall return is miniscule leaving one with short term price swings that are less meaningful. This defeats the purpose of the indicator which is mainly to quantify the price deviations that is significant with respect to the overall power law price trend.

This choice also aligns with the known seasonality of bitcoin (dubbed spring, summer, autumn and winter), each of which lasts approximately 1 year. During this period, bitcoin follows a more or less consistent statistical pattern, thus making it the optimal time window for calculating volatility. 

Thus, the arguments in favor of $T\sim 365$ days as the optimal choice can be summarized as follows:
* It ensures that the oscillations of the indicator is normalized and well-behaved. A lower value leads to overshoot during cycle peaks and a higher value leads to attenuation.
* It roughly matches the duration of a cycle phase, making it ideal for estimating volatility.
* It is sufficiently long to ensure that the power law price trend plays a significant role in the total return. 

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
The formula for price return involves only two parameters, the price on day $t$ and day $t-T$. If there was a black swan event on day $t-T$ where there was a significant jump in the price, this would be reflected in the total return. This is a problem for $z_{pl}$ since it is applied as a day $t$ indicator, and thus should not be highly sensitive to events that occurred on day $t-T$. The issue was realized with the March 2020 price crash due to the pandemic causing a jump in the indicator in March 2021 with $T=365$ days applied (See Figure 4). 


A straightforward approach to solve the issue of past price jumps is to simply average $z_{pl}$ over a range of $T$ values (See Figure 5). The averaging also helps dampen other spurious oscillations that results from the choice of $T$ and strengthen secular price trends resulting from momentum. 

![img-description](/assets/img/Zpl_averaging.png){: .light }
![img-description](/assets/img/Zpl_averaging_invert.png){: .dark }
_Figure 5_


## References
[1] [https://x.com/math_sci_tech/status/1831083600516911566](https://x.com/math_sci_tech/status/1831083600516911566)\
[2] [https://x.com/math_sci_tech/status/1836845183289131289](https://x.com/math_sci_tech/status/1836845183289131289)\
[3] [https://x.com/Sina_21st/status/1800713784807264431](https://x.com/Sina_21st/status/1800713784807264431) \
[4] [https://x.com/sminston_with/status/1813619486106558647](https://x.com/sminston_with/status/1813619486106558647)\
[5] [https://x.com/TheRealPlanC/status/1850697215553028420](https://x.com/TheRealPlanC/status/1850697215553028420)\
[6] [https://x.com/apsk32/status/1809771015439822908](https://x.com/apsk32/status/1809771015439822908) \
[7] [https://x.com/Giovann35084111/status/1832129338889924960](https://x.com/Giovann35084111/status/1832129338889924960)