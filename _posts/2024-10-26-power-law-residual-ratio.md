---
layout: post
title: Introducing the Power Law Residual Ratio
date: 2024-10-26 23:21 +0200
categories: ['Price']
tags: ['source-code']
math: true
image:
  path: /assets/img/Zpl.png
  alt: The power law residual ratio
---


ADD Source Code here

## Motivation


## Derivation

Let $P(n)$ be the daily<sup>1</sup> price of bitcoin on day $n$, where $n$ is measured with respect to the genesis block (Jan 3 2009). The log returns $R(n,N)$ over a period $N$ is given as follows:
$$
\begin{equation}
R(n,N) = \log\left(\frac{P(n)}{P(n-N)}\right)
\end{equation}
$$

> <sup>1</sup> The choice of daily price is somewhat arbitrary. One is also free to choose other intervals for sampling price i.e. hour, minute etc. Furthermore, the exact definition of daily price is also a choice that is left to the reader. One is free to choose between open/close, min/max, average etc price. This is explored further in the analysis section.   

The daily log returns is given as follows
$$
\begin{equation}
r(n) = \log\left(\frac{P(n)}{P(n-1)}\right)
\end{equation}
$$

Let $\mu_{pl}(t,T)$ represent the predicted Power Law log returns over the same period The formula for power law log return for Bitcoin is given as follows:
$$
\begin{equation}
  \mu_{pl}(n,N) =  k\log\left(1 + \frac{N}{n} \right)
  \label{eq:label_name}
\end{equation}
$$

By subtracting the actual returns with the power law returns one obtains the residual returns $\delta$

$$
\begin{equation}
  \delta =  \log\left(\frac{P(n)}{P(n-N)}\right) - k\log\left(1 + \frac{N}{n} \right)
\end{equation}
$$

Since bitcoin price is shown to follow the power law over a long enough period, the resulting residual returns should be mean reverting around 0. If the underlying currency is exhibiting a constant non zero inflation, then the residual will exhibit a mean around this value. This effect can be removed by adding a constant *risk-free* return $\mu_{rf}(N)$ to the definition of $\delta$. Thus one obtains:
$$
\begin{equation}
  \delta^* =  R(n,N) - \mu_{pl}(n,N) - \mu_{rf}(N)
\end{equation}
$$

The magnitude of the deviations from the mean can vary over time due to heteroskedasticity. This effect can be normalized by dividing the the residual by the volatility over the given period. This is the definition of the Power Law Residual Ratio (PLRR), $z_{pl}$. <sup>2</sup>

$$
\begin{equation}
  z_{pl}(n,N) =  \frac{\delta^*}{\sigma_{vol}}  = \frac{R(n,N) - \mu_{pl}(n,N) - \mu_{rf}(N)}{\sigma_{vol}}
\end{equation}
$$

where,

$$
\begin{equation}
  \sigma_{vol}(n,N) =  \sqrt{\sum_{\tau=0}^{N-1} r^2(n-\tau)-R^2(n,N)}
\end{equation}
$$
> <sup>2</sup> The choice of the letter $z$ for PLRR was deliberatly made due to its similarity with the z-index. However, one should not confound PLRR with the z-index since the later is specifically defined for the case of a stationary distribution with known population statistics. 

To remove the impact of the choice of $N$ to an extent, the $z_{pl}$ can be averaged over a range of values of $N$. 
$$
\begin{equation}
    Z_{pl}(n,S)  = \frac{1}{|S|}\sum_{N\in S}z_{pl}(n,N)
\end{equation}
$$
where $S$ is a set of time periods for the averaging. This gives the Power Law Residual Ratio. 

## Analysis
The first part of the analysis will deal with $z_{pl}$ (the original definition of PLRR) and its limitation. The time period averaged $z_{pl}$, $Z_{pl}$, which is the basis of the Power Law Residual Ratio, is shown to overcome this limitation. The impact of the risk-free return is assumed to be negligible and is therefore ignored in this analysis.

### Choice of time period
The chart below shows historical $z_{pl}$ calculated with different choices of $N$. It can be seen for each case that $z_{pl}$ remains mostly bounded within the range of +/- 3, with cycle peaks occurring at +3 and the bottoms at -3. This is not arbitrary since $z_{pl}$ is the ratio of the return residual with respect to its volatility, which means a value of 3 represents a 3 sigma event. Thus, there is a very low chance (<1%) that value goes above 3. However, note that for small values of $N$ (<< 365), $z_{pl}$ can easily go above 3 at the cycle tops. This can be explained by the fact that the statistics around short time scales is more sensitive to fat tail events. 

On the other hand, a choice of $N$ that is larger than 2 years has the opposite effect of attenuating the max value of $z_{pl}$. This is because at this scale, the power law starts to dominate the return as the deviations start to mean revert. The choice of $N=365$ seems close to optimal as the oscillator is well-behaved, with each cycle peak and valley coinciding with 3 and -3 respectively. 

Apart from ensuring range normalization, another reason to choose $N\sim 365$ days or higher is to ensure that the power law plays a significant role in the indicator. For $N\ll 365$ days, the contribution of the power law to the overall return is miniscule leaving one with short term price swings that are less meaningful. This defeats the purpose of the indicator which is mainly to quantify the price deviations that is significant with respect to the overall power law price trend.

This choice also aligns with the known seasonality of bitcoin (dubbed spring, summer, autumn and winter), each of which lasts approximately 1 year. During this period, bitcoin follows a more or less consistent statistical pattern, thus making it the optimal time window for calculating volatility. 

Thus, the arguments in favor of $N\sim 365$ days as the optimal choice can be summarized as follows:
* It ensures that the oscillations of the indicator is normalized and well-behaved. A lower value leads to overshoot during cycle peaks and a higher value leads to attenuation.
* It roughly matches the duration of a cycle phase, making it ideal for estimating volatility.
* It is sufficiently long to ensure that the power law price trend plays a significant role in the total return. 

![img-description](/assets/img/zpl_90.png){: .light }
![img-description](/assets/img/zpl_90_black.png){: .dark }
_Image Caption_

![img-description](/assets/img/zpl_540.png){: .light }
![img-description](/assets/img/zpl_540_black.png){: .dark }
_Image Caption_

![img-description](/assets/img/zpl_365.png){: .light }
![img-description](/assets/img/zpl_365_black.png){: .dark }
_Image Caption_


### Issue with past price jumps
The formula for price return involves only two parameters, the price on day $n$ and day $n-N$. If there was a black swan event on day $n-N$ where there was a significant jump in the price, this would be reflected in the total return. This is a problem for $z_{pl}$ since it is applied as a day $n$ indicator, and thus should not be sensitive to events that occurred on day $n-N$. This is shown in the chart below where the impact of the 2020 March crash due to the pandemic causes a jump in the indicator in March 2021 (here $N=365$ days is applied). 

### Averaging over time to remove price jumps
A straightforward approach to solve the issue of past price jumps is to simply average $z_{pl}$ over a range of $N$ values. The averaging should also in principle dampen other spurious oscillations that result from the choice of $N$ and strengthen secular price trends resulting from momentum. 

![img-description](/assets/img/Zpl_averaging.png){: .light }
![img-description](/assets/img/Zpl_averaging_invert.png){: .dark }
_Image Caption_


## Looking Forward


## References

[1] https://x.com/Giovann35084111/status/1832129338889924960 \
[2] https://x.com/Sina_21st/status/1800713784807264431
