# Equilibra

Integrated business planning (IBP) for e-commerce startups: demand forecast,
Bayesian under/overstock cost, marketing budget to hit a demand target, and
freight-mode recommendations, each KPI with an "Explain" widget.

## Landing page + waitlist

- `site/index.html` — the landing page (published as a claude.ai artifact).
- Live demo in the hero: prior forecast + early sales signal → posterior
  demand (conjugate normal update), then newsvendor costs for the chosen
  order quantity: `P(D ≤ Q*) = (price − cost) / (price − clearance)`.
- Waitlist: on claude.ai, sign-ups go to the artifact database (`waitlist/<user>`),
  visible only to the owner in a table under the form.
- Self-hosting: run `./build.sh`, set `WAITLIST_ENDPOINT` in the page script to a
  JSON form backend (Formspree, Supabase function, your API), deploy `dist/`.

## Planner (the SaaS dashboard)

- `app/engine.js` — planning engine, pure JS, no dependencies:
  - **Demand**: damped additive Holt-Winters per SKU (52-week season when 2+ years of
    history), parameters grid-fitted; 2,000 simulated paths give weekly and horizon-total
    p10/p50/p90. Accuracy = WAPE of one-week-ahead forecasts over the last 8 weeks.
  - **Bayes**: planner judgment (prior) × statistical forecast (likelihood) →
    normal-normal posterior.
  - **Inventory risk**: newsvendor on the posterior. Cu = price − cost,
    Co = cost − clearance + storage·H/2; Q* at critical ratio Cu/(Cu+Co); expected
    lost-sales and leftover cost via the normal loss function.
  - **Marketing**: per-channel response `units = a·spend^b` (log-log fit), budget to hit
    the demand target allocated at equal marginal CAC; flags channels whose next-dollar
    ROAS is below break-even and the max profitable target.
  - **Shipping**: every mode plus fast+slow splits, ranked by freight + fees + capital in
    transit + expected lost margin before arrival.
- `app/index.html` — dashboard: Overview KPIs with Explain panels, Demand, Inventory risk,
  Marketing, Shipping, Data & settings (CSV import for weekly sales and ad results).
  Plans save per user in the artifact database (localStorage when self-hosted).
- Tests: `node app/engine.test.js`.
