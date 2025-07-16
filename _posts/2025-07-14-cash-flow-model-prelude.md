---
layout: post
title: "The Bitcoin Flow Equation - Prelude"
date: 2025-07-14 00:00:00 +0000
categories: ['Articles']
tags: ['cash-flow-analysis','power-law']
image:
     path: /assets/img/cashflowprelude/bitcoin-cash-flow-2.jpg
     alt: Bitcoin Cash Flow Model Prelude
math: true
--- 


## Introduction
This article is a prelude to a more detailed article on the Bitcoin Flow Equation. Here I will give a short introduction to the core idea.
 
Lets say you want to model the value of a Bitcoin account over time. Let this be represented by the symbol $S$. If the account has $N$ Bitcoin and $P$ is the price of Bitcoin then
\begin{equation}
 S=PN \label{eq:1}
\end{equation}

Over time, the value of your account will change due to the combination of the price going up or down, and you buying or selling your stack. For e.g. if you started with \\$100,000 and the price of Bitcoin went up by 10%, then the value of your account is now \\$110,000. Now, if you buy an additional \\$3000 worth of Bitcoin, the value of your account is \\$113,000. Lets say this process is repeated 5 times. The total value of your account after this process can be calculated as follows

\begin{equation}
 100000 \cdot 1.1^5 +3000 \cdot (1.1^4 + 1.1^3 + 1.1^2 +1.1) = 179366 
\end{equation}

Now with the magic of calculus we can replace the above discrete process with a continuous one which is expressed by the following differential equation
\begin{equation}
 dS = dPN+\rho dt \label{eq:2} \\
\end{equation}
This is the **Bitcoin Flow Equation**. Here $dS$ is the small change in value of the account, $dP$ is the small change in price of Bitcoin, $N$ is the number of Bitcoin in the account, $\rho$ is the cashflow rate, and $dt$ is the small change in time. Thus, the equation can be interpreted as:
\begin{equation}
 \text{Small change in value} = \text{Small change in price} + \text{Cashflow rate} \cdot \text{Small change in time}
\end{equation}

The term $\rho(t)$ represents the rate of cash flow into or out of your Bitcoin holdings.
- A positive $\rho$ means you are buying Bitcoin (e.g., dollar-cost averaging).
- A negative $\rho$ means you are selling Bitcoin (e.g., for income).

To solve for $S$, one needs to plug in a model for the price and the cashflow process. 
## Modeling Price and Cash Flow
### Price Model
The power law model gives the simplest, most robust prediction of Bitcoin's long-term price trend as a function of its age $t$ (e.g., in days since genesis). A general form of the power law is:
\begin{equation}
P(t) = At^k
\end{equation}
where $A$ is a constant and $k$ is the power law exponent. Empirically, $k$ has been observed to be around 5.8 for Bitcoin, though this value can change over time.

For our continuous model, we need the differential form. Taking the derivative with respect to time gives:
\begin{equation}
dP = kAt^{k-1}dt
\end{equation}
By substituting $A = P/t^k$, we can express $dP$ in terms of $P$ and $t$:
\begin{equation}
dP = k \frac{P}{t^k} t^{k-1} dt = k\frac{P}{t}dt
\end{equation}
Plugging this into the Bitcoin Flow Equation \ref{eq:2} gives:
\begin{equation}
dS = \left(k\frac{P}{t}dt\right)N + \rho dt
\end{equation}
Since $S=PN$, the equation simplifies to what we can call the **Generalized Bitcoin Flow Equation**:
\begin{equation}
dS = k\frac{S}{t}dt + \rho dt
\end{equation}
This is a first-order linear differential equation. For the remainder of this article, we will explore how to solve it and what the solutions mean.

### Cash Flow Process

We can model $\rho(t)$ in several ways:

1.  **Fixed Cash Flow**: $\rho(t) = \rho_0$. This models a constant rate of investment or withdrawal, like a fixed monthly purchase.
2.  **Variable Cash Flow**: The cash flow rate can also be modeled as a function of time or the portfolio's value itself.
    -   **Power Law Cash Flow**: $\rho(t) = bt^l$. This could model an investment strategy that ramps up or down over time.
    -   **Time-Adjusted Cash Flow**: $\rho(t) = \frac{\alpha}{t}\frac{dS}{dt}$. This models a strategy where you reinvest a fraction of your gains, with the fraction decreasing over time.
    -   **Leveraged Cash Flow**: $\rho(t) = \gamma\frac{dS}{dt}$. This models reinvesting a fixed fraction of your portfolio's change in value, which is typical of leveraged or derivative-based strategies. A positive $\gamma$ represents leverage, while a negative $\gamma$ represents proportional withdrawals.

## Solving the Equation
To solve the equation, we first rearrange it into the standard form for a linear first-order ODE:
\begin{equation}
\frac{dS}{dt} - \frac{k}{t}S = \rho(t)
\end{equation}
We can solve this using an integrating factor, $I(t) = t^{-k}$. Multiplying the equation by $I(t)$ gives:
\begin{equation}
t^{-k}\frac{dS}{dt} - kt^{-k-1}S = t^{-k}\rho(t)
\end{equation}
The left side is the derivative of $S \cdot t^{-k}$:
\begin{equation}
\frac{d}{dt}(S \cdot t^{-k}) = t^{-k}\rho(t)
\end{equation}
To find a particular solution, we integrate from a starting time $t_0$ to a future time $t$. Let's assume we start with an initial capital $S_0$ at time $t_0$, so $S(t_0) = S_0$.
\begin{equation}
\int_{t_0}^{t} \frac{d}{d\tau}(S(\tau) \cdot \tau^{-k})d\tau = \int_{t_0}^{t} \tau^{-k}\rho(\tau)d\tau
\end{equation}
\begin{equation}
S(t)t^{-k} - S_0t_0^{-k} = \int_{t_0}^{t} \tau^{-k}\rho(\tau)d\tau
\end{equation}
This yields the general solution for $S(t)$ in terms of the initial conditions:
\begin{equation}
S(t) = S_0\left(\frac{t}{t_0}\right)^k + t^k \int_{t_0}^{t} \tau^{-k}\rho(\tau)d\tau
\end{equation}
This solution beautifully separates the final value into two components:
1.  **$S_0(t/t_0)^k$**: The growth of your initial capital, $S_0$.
2.  **$t^k \int_{t_0}^{t} \tau^{-k}\rho(\tau)d\tau$**: The future value of all cash flows $\rho(\tau)$ made between $t_0$ and $t$.

### Case 1: Fixed Cash Flow
Let's solve for the simplest case, where $\rho(t) = \rho_0$ is a constant. The integral term becomes:
\begin{equation}
\int_{t_0}^{t} \tau^{-k}\rho_0 d\tau = \frac{\rho_0}{1-k}(t^{1-k} - t_0^{1-k})
\end{equation}
Substituting this back into the general solution gives:
\begin{equation}
S(t) = S_0\left(\frac{t}{t_0}\right)^k + \frac{\rho_0}{1-k}(t - t_0^{1-k}t^k)
\end{equation}
This equation tells you the value of your holdings at any time $t$, given an initial investment $S_0$ and a constant cash flow rate $\rho_0$.

### Case 2: Variable Cash Flow Strategies

#### Power Law Cash Flow
Now consider a variable cash flow, $\rho(t) = bt^l$. The integral is:
\begin{equation}
\int_{t_0}^{t} \tau^{-k}(b\tau^l)d\tau = \frac{b}{l-k+1}(t^{l-k+1} - t_0^{l-k+1})
\end{equation}
Assuming $l-k+1 \neq 0$, the solution is:
\begin{equation}
S(t) = S_0\left(\frac{t}{t_0}\right)^k + \frac{b}{l-k+1}(t^{l+1} - t_0^{l-k+1}t^k)
\end{equation}
This allows for modeling more complex strategies where your investment or withdrawal rate changes over time according to a power law.

#### Time-Adjusted Cash Flow
This strategy is particularly useful for modeling withdrawals. The cash flow rate is set to be a fraction of the portfolio's value, adjusted by time: $\rho(t) = \frac{\alpha S}{t}$. Here, $\alpha$ is a constant, which would be negative for withdrawals. Let's substitute this into the Generalized BFE:
\begin{equation}
dS = k\frac{S}{t}dt + \left(\frac{\alpha S}{t}\right)dt
\end{equation}
We can combine the terms on the right-hand side:
\begin{equation}
dS = (k+\alpha)\frac{S}{t}dt
\end{equation}
This is a separable differential equation.
\begin{equation}
\frac{dS}{S} = (k+\alpha)\frac{dt}{t}
\end{equation}
Integrating both sides and using the initial condition $S(t_0)=S_0$ yields a simple power law, but with a modified exponent:
\begin{equation}
S(t) = S_0\left(\frac{t}{t_0}\right)^{k+\alpha}
\end{equation}
The key advantage of this withdrawal strategy becomes clear when we look at the amount of Bitcoin, $N(t) = S(t)/P(t)$. Since $P(t) = P_0(t/t_0)^k$, we get:
\begin{equation}
N(t) = \frac{S_0\left(\frac{t}{t_0}\right)^{k+\alpha}}{P_0\left(\frac{t}{t_0}\right)^k} = \frac{S_0}{P_0}\left(\frac{t}{t_0}\right)^{\alpha} = N_0\left(\frac{t}{t_0}\right)^{\alpha}
\end{equation}
This means the amount of Bitcoin in the portfolio follows a simple, predictable power law. Compared to a fixed cash flow withdrawal (which leads to selling a disproportionately large amount of Bitcoin early on), this method provides a more determinate and smoother rate of selling over time.

#### Leveraged/Rebalanced Cashflow
In this model, the cash flow is proportional to the change in the portfolio's value: $\rho(t) = \gamma\frac{dS}{dt}$. The parameter $\gamma$ determines the strategy:

-   **Leverage ($\gamma > 0$)**: A positive $\gamma$ represents the Loan-to-Value (LTV) ratio. You borrow against your portfolio's appreciation to generate cash flow, effectively amplifying your investment.
-   **Rebalancing ($\gamma < 0$)**: A negative $\gamma$ represents a rebalancing ratio. You sell a fraction of your portfolio's appreciation to take profits as cash, reducing your exposure.

Substituting the cash flow rate into the BFE gives:
\begin{equation}
dS = k\frac{S}{t}dt + \left(\gamma\frac{dS}{dt}\right)dt
\end{equation}
\begin{equation}
dS(1-\gamma) = k\frac{S}{t}dt
\end{equation}
\begin{equation}
\frac{dS}{S} = \frac{k}{1-\gamma}\frac{dt}{t}
\end{equation}
Integrating this equation shows that this strategy effectively modifies the power law exponent. Solving for $S(t)$ and using the initial condition $S(t_0) = S_0$ yields:
\begin{equation}
S(t) = S_0\left(\frac{t}{t_0}\right)^{\frac{k}{1-\gamma}}
\end{equation}
This powerful result shows that a positive leverage fraction ($\gamma > 0$) increases the power law exponent, amplifying returns. Conversely, a negative $\gamma$ (rebalancing) reduces the exponent. Note that the model breaks down if $\gamma \ge 1$, as this would imply infinite growth.

**Debt and Cash Balance**

We can also calculate the accumulated debt or cash from this strategy.

-   **Debt Calculation ($\gamma > 0$)**: The rate of taking on debt is $dD/dt = \rho(t) = \gamma(dS/dt)$. Integrating this from $t_0$ to $t$ (assuming debt is zero at $t_0$) gives the total debt:
    \begin{equation}
    D(t) = \gamma(S(t) - S_0)
    \end{equation}

-   **Cash Balance Calculation ($\gamma < 0$)**: The cash generated from rebalancing accumulates over time. The rate of cash generation is $dC_b/dt = -\rho(t) = -\gamma(dS/dt)$. Integrating this (assuming cash balance is zero at $t_0$) gives the total cash withdrawn:
    \begin{equation}
    C_b(t) = -\gamma(S(t) - S_0)
    \end{equation}

## Use Cases of the Bitcoin Flow Equation

The BFE is a powerful tool for strategic planning.
-   **Income Generation**: If you want to draw a fixed income (e.g., $\rho_0 < 0$), you can model how your total investment value $S(t)$ will evolve and determine if your strategy is sustainable.
-   **Accumulation Targets**: You can calculate the required fixed investment rate $\rho_0$ to reach a specific portfolio value $S_{target}$ by a future time $t_{target}$.
-   **Leverage Strategies**: Leverage can be modeled by treating the loan as a large initial positive cash flow, and the interest and principal payments as a negative $\rho(t)$. The BFE can help analyze the risks and potential returns of such a strategy.
-   **Comparing Strategies**: The model allows for a direct comparison of different investment strategies (e.g., lump sum vs. DCA vs. variable DCA) under the power law price assumption.

This prelude provides the basic framework. Future articles will delve deeper into specific examples, historical backtesting, and the implications of this model for long-term financial planning with Bitcoin. 