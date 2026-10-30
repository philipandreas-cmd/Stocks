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
