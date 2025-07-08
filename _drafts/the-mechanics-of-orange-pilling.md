---
layout: post
title: The Mechanics of Orange-Pilling
date: 2025-02-10 10:09 +0100
---


## Introduction

## The SIR model for spread of disease

The Susceptible-Infected-Recovered (SIR) model, first proposed by Kermack and McKendrick in 1927, provides a fundamental mathematical framework for understanding epidemic propagation through populations. This compartmental model divides a population into three distinct states:

- **Susceptible (S):** Individuals vulnerable to infection
- **Infected (I):** Actively contagious individuals
- **Recovered (R):** Those with immunity (through recovery or vaccination)

The model dynamics are governed by two key parameters:
- β (transmission rate): Probability of disease transmission per contact
- γ (recovery rate): Reciprocal of average infectious period (1/γ = recovery time)

The system evolves according to coupled nonlinear differential equations:

$$
\frac{dS}{dt} = -\beta \frac{SI}{N}
$$

$$
\frac{dI}{dt} = \beta \frac{SI}{N} - \gamma I
$$

$$
\frac{dR}{dt} = \gamma I
$$

Where \( N = S + I + R \)represents the constant total population. The critical epidemic threshold is determined by the basic reproduction number R₀ = β/γ. When R₀ > 1, an epidemic emerges as each infected individual transmits to more than one susceptible host.

Key assumptions include:
1. Homogeneous mixing population
2. Constant parameters during outbreak
3. No vital dynamics (births/deaths/migration)
4. Permanent acquired immunity

The SIR model demonstrates phase-space trajectories where initial exponential growth transitions to logistic-like saturation, a pattern remarkably similar to technology adoption curves. This mathematical structure has been successfully adapted to model information spread in social networks and adoption of innovations - a conceptual bridge we will later exploit when analyzing Bitcoin's network dynamics.

### Network Dynamics Perspective

When analyzing information spread through a network lens, we transition from population-level averages to individual agent interactions. Each equation takes on localized meaning based on network connections:

**1. Susceptible Agents (S):**
$$
\frac{dS_i}{dt} = -\beta S_i \sum_{j\in\mathcal{N}(i)} I_j
$$
- Represents node `i`'s infection risk through its neighborhood 𝒩(i)
- Transmission becomes **connection-dependent** - agents with more infected neighbors (higher degree) face greater risk
- Captures the *local exposure* effect where peripheral nodes remain protected until infection reaches their cluster

**2. Infected Agents (I):**
$$
\frac{dI_i}{dt} = \beta S_i \sum_{j\in\mathcal{N}(i)} I_j - \gamma I_i
$$
- First term: Outgoing infection pressure to neighbors
- Second term: Individual recovery process
- Models both *network-driven spreading* and *internal state transition*

**3. Recovered Agents (R):**
$$
\frac{dR_i}{dt} = \gamma I_i
$$
- Node-specific immunity acquisition
- Network structure becomes irrelevant once recovered

**Key Network Factors:**
- **Connection topology:** 
  - Scale-free networks exhibit explosive early spread through hubs
  - Clustered networks show delayed but persistent local outbreaks
- **Temporal dynamics:** 
  - Intermittent connections alter transmission chains
  - Bursty interaction patterns accelerate spreading
- **Heterogeneous susceptibility:** 
  - Nodes vary in personal β values (social engagement levels)
  - Super-spreaders emerge from high-degree + high-β combinations

This network adaptation explains why Bitcoin adoption often follows power-law patterns - early penetration through well-connected economic hubs (exchanges, payment processors) followed by slower propagation through less-connected peripheral nodes (individual users).

**Node-State Definitions:**
- \( S_i \): Probability that node *i* (individual agent) is susceptible to infection/information
- \( I_i \): Probability that node *i* is actively infected/spreading
- \( R_i \): Probability that node *i* has recovered and become immune

**Network-Specific Interpretation:**
1. Subscript *i* indicates these are **node-specific states** (vs population aggregates)
2. States represent probabilities to handle continuous dynamics in discrete networks
3. Neighborhood operator \( \mathcal{N}(i) \) defines each node's social graph:
   - Sum \( \sum_{j\in\mathcal{N}(i)} \) aggregates influence from direct connections
   - Network adjacency matrix implicitly contained in neighborhood relations

The probabilities reflect uncertainty in complex systems where even highly connected nodes might resist infection (firewall nodes) while isolated nodes might spontaneously adopt (external media influence).

## The Influence Network

Building on the network dynamics framework, we introduce a simplified binary-state model specifically tailored for analyzing Bitcoin adoption. The Influence Network consists of:

**Network Structure:**
- Fixed population of N agents
- Regular topology: Each node maintains exactly k connections
- Connections persist through simulation (static graph)

**Agent States:**
- **Ambivalent (A):** Neutral/undecided about Bitcoin (state 0)
- **Orange-Pilled (O):** Bitcoin advocate (state 1)

**Dynamics Rules:**
1. Synchronous updates at discrete time steps
2. Conversion is irreversible: A → O
3. Local interaction: 
   - At each step, all O agents simultaneously attempt to convert their A neighbors
   - Conversion succeeds with probability 1 if ≥1 O neighbor exists
4. No regression: O agents remain permanently in their state

**Mathematical Formulation:**
For each agent i at time t+1:
$$
O_i(t+1) = \begin{cases}
1 & \text{if } O_i(t) = 1 \text{ or } \exists j \in \mathcal{N}(i) \text{ s.t. } O_j(t) = 1 \\
0 & \text{otherwise}
\end{cases}
$$

**Key Differentiators from SIR:**
1. Binary states rather than three compartments
2. Deterministic conversion (vs probabilistic β in SIR)
3. No recovery mechanism (permanent state change)
4. Explicit focus on network structure over disease parameters

**Adoption Dynamics:**
- Initial condition requires ≥1 O agent (seed)
- Spread progresses as connected clusters get activated
- Terminal state: Full conversion when network is connected
- Critical factors:
  - Initial seed placement (central vs peripheral)
  - Network diameter (maximum path length)
  - Presence of network bottlenecks

This model captures Bitcoin's social adoption dynamics where:
- Early adopters act as persistent infection sources
- Network structure determines adoption velocity
- Complete conversion requires graph connectivity
- Choke points (exchange regulations, mining centralization) manifest as network bottlenecks

**Power Law Emergence:**
For an infinite regular network with degree k, the adoption front propagates as:
$$
O(t) \propto t^d \quad\text{where}\quad d = \frac{\ln(k/2 + 1)}{\ln(2)}
$$
This scaling arises because:

1. **Front Propagation:** The orange-pilled region grows radially from initial seeds. Each time step allows information to propagate one network hop

2. **Branching Factor:** At each step, every frontier node can activate $(k-1)$ new nodes (minus 1 for the connection back to the previous activator). This creates an effective branching ratio $b = k-1$

3. **Dimensional Analogy:** The growth follows pattern similar to fractal dimension growth in percolation theory. The activated region's volume (number of O agents) scales with time as:
   $$
   O(t) \sim t^{d_f}
   $$
   Where the fractal dimension $d_f$ depends on network connectivity

4. **Mean-Field Solution:** Solving the recurrence relation for neighbors-at-distance-t:
   $$
   n(t) = k(k-1)^{t-1} \implies O(t) \sim \sum_{\tau=0}^t n(\tau) \approx (k-1)^t
   $$
   But this exponential growth is tempered in regular networks by:
   - Overlap prevention (no duplicate activation)
   - Conservation of connection budget
   Leading to polynomial scaling with exponent $d = \log_{k-1}(k)$

**Key Insight:** The characteristic exponent emerges from the relationship:
$$
d = \frac{\ln[\xi(k)]}{\ln(2)}
$$
Where $\xi(k)$ is the correlation length scaling with network connectivity. For k-regular infinite networks, this produces power law growth with exponent directly tied to the number of connections per node.
