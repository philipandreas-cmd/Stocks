/* Equilibra planning engine.
   Pure functions, no DOM. Loaded as a browser global (window.Equilibra) and as a
   CommonJS module for tests (node engine.test.js). */
(function (root) {
  "use strict";

  /* ---------- statistics ---------- */
  function erf(x) { // Abramowitz–Stegun 7.1.26
    const s = Math.sign(x); x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const phi = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
  /** Standard normal loss function: E[(Z - z)+]. */
  const loss = (z) => phi(z) - z * (1 - Phi(z));

  function invPhi(p) { // Acklam's rational approximation
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239];
    const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
    const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
    const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
    const lo = 0.02425, hi = 1 - lo;
    let q, r;
    if (p < lo) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    if (p > hi) {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }

  const sum = (xs) => xs.reduce((s, x) => s + x, 0);
  const mean = (xs) => (xs.length ? sum(xs) / xs.length : 0);
  function stdev(xs) {
    if (xs.length < 2) return 0;
    const m = mean(xs);
    return Math.sqrt(sum(xs.map((x) => (x - m) ** 2)) / (xs.length - 1));
  }
  function quantile(sorted, p) {
    if (!sorted.length) return 0;
    const i = (sorted.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i);
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
  }
  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function randn(rand) {
    let u = 0;
    while (u === 0) u = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
  }

  /* ---------- demand forecasting: damped Holt-Winters (additive), error-correction form ---------- */
  function initState(y, m) {
    if (m > 1) {
      const l = mean(y.slice(0, m));
      const b = (mean(y.slice(m, 2 * m)) - l) / m;
      const s = y.slice(0, m).map((v) => v - l);
      return { l, b, s, start: m };
    }
    return { l: y[0], b: y.length > 1 ? y[1] - y[0] : 0, s: [0], start: 1 };
  }

  function runModel(y, m, p) {
    const st = initState(y, m);
    let { l, b } = st;
    const s = st.s.slice();
    const mm = m > 1 ? m : 1;
    const resid = [], fitted = [];
    for (let t = st.start; t < y.length; t++) {
      const si = m > 1 ? s[t % mm] : 0;
      const yhat = l + p.damp * b + si;
      const e = y[t] - yhat;
      fitted.push(yhat); resid.push(e);
      l = l + p.damp * b + p.alpha * e;
      b = p.damp * b + p.beta * e;
      if (m > 1) s[t % mm] = si + p.gamma * e;
    }
    return { l, b, s, n: y.length, resid, fitted, sse: sum(resid.map((e) => e * e)) };
  }

  function pointForecast(state, m, p, h) {
    const out = [];
    let damp = 0;
    for (let k = 1; k <= h; k++) {
      damp += Math.pow(p.damp, k);
      const si = m > 1 ? state.s[(state.n + k - 1) % m] : 0;
      out.push(state.l + damp * state.b + si);
    }
    return out;
  }

  function fitParams(y, m) {
    const alphas = [0.05, 0.1, 0.2, 0.3, 0.5, 0.7];
    const betas = [0, 0.01, 0.03, 0.08];
    const gammas = m > 1 ? [0.05, 0.1, 0.2, 0.35] : [0];
    const damps = [0.9, 0.98];
    let best = null;
    for (const alpha of alphas) for (const beta of betas) for (const gamma of gammas) for (const damp of damps) {
      const p = { alpha, beta, gamma, damp };
      const r = runModel(y, m, p);
      if (!best || r.sse < best.sse) best = { p, sse: r.sse };
    }
    return best.p;
  }

  /**
   * Forecast weekly demand.
   * Returns per-week quantiles, the horizon-total distribution (from simulated
   * sample paths, so it includes level/trend uncertainty), and holdout accuracy.
   */
  function forecast(sales, opts) {
    const o = Object.assign({ horizon: 12, season: 52, sims: 2000, seed: 7 }, opts || {});
    const y = sales.map((v) => Math.max(0, +v || 0));
    if (y.length < 4) throw new Error("Need at least 4 weeks of sales to forecast.");
    const m = o.season > 1 && y.length >= 2 * o.season ? o.season : 0;
    const p = fitParams(y, m);
    const state = runModel(y, m, p);
    const warm = Math.min(state.resid.length - 1, m > 1 ? 4 : 2);
    const resid = state.resid.slice(warm);
    const sigma = stdev(resid) || Math.max(1, mean(y) * 0.1);
    const point = pointForecast(state, m, p, o.horizon).map((v) => Math.max(0, v));

    // Simulate sample paths through the same state equations.
    const rand = rng(o.seed);
    const weekly = Array.from({ length: o.horizon }, () => []);
    const totals = [];
    for (let i = 0; i < o.sims; i++) {
      let l = state.l, b = state.b, tot = 0;
      const s = state.s.slice();
      for (let k = 0; k < o.horizon; k++) {
        const t = state.n + k;
        const si = m > 1 ? s[t % m] : 0;
        const yhat = l + p.damp * b + si;
        const e = sigma * randn(rand);
        const v = Math.max(0, yhat + e);
        weekly[k].push(v); tot += v;
        l = l + p.damp * b + p.alpha * e;
        b = p.damp * b + p.beta * e;
        if (m > 1) s[t % m] = si + p.gamma * e;
      }
      totals.push(tot);
    }
    const weeks = weekly.map((arr, k) => {
      arr.sort((a, b) => a - b);
      return { mean: point[k], p10: quantile(arr, 0.1), p50: quantile(arr, 0.5), p90: quantile(arr, 0.9) };
    });
    totals.sort((a, b) => a - b);

    // Accuracy (WAPE) of the one-week-ahead forecasts over the last 8 weeks.
    const hold = Math.min(8, state.resid.length);
    const actualRecent = y.slice(y.length - hold);
    const denom = sum(actualRecent);
    const wape = denom > 0 ? sum(state.resid.slice(-hold).map(Math.abs)) / denom : null;

    const lastH = y.slice(-o.horizon);
    return {
      weeks,
      total: { mean: mean(totals), sd: stdev(totals), p10: quantile(totals, 0.1), p50: quantile(totals, 0.5), p90: quantile(totals, 0.9) },
      lastPeriod: sum(lastH) * (o.horizon / lastH.length),
      seasonal: m > 1,
      params: p,
      sigma,
      wape,
      fitted: state.fitted,
      fittedStart: y.length - state.fitted.length
    };
  }

  /* ---------- Bayesian update ---------- */
  const CONFIDENCE_CV = { low: 0.4, medium: 0.25, high: 0.12 };
  /**
   * Normal-normal conjugate update. The planner's judgment is the prior; the
   * statistical forecast is the evidence (likelihood). Posterior precision is the
   * sum of precisions; posterior mean is the precision-weighted mean.
   */
  function bayesUpdate(prior, evidence) {
    const wp = 1 / (prior.sd * prior.sd), we = 1 / (evidence.sd * evidence.sd);
    return { mu: (prior.mu * wp + evidence.mu * we) / (wp + we), sd: Math.sqrt(1 / (wp + we)), weightOnData: we / (wp + we) };
  }
  function demandPosterior(fcTotal, judgment) {
    const evidence = { mu: fcTotal.mean, sd: Math.max(1, fcTotal.sd) };
    if (!judgment || !(judgment.units > 0)) return { prior: null, evidence, posterior: { mu: evidence.mu, sd: evidence.sd, weightOnData: 1 } };
    const prior = { mu: +judgment.units, sd: +judgment.units * (CONFIDENCE_CV[judgment.confidence] || CONFIDENCE_CV.medium) };
    return { prior, evidence, posterior: bayesUpdate(prior, evidence) };
  }

  /* ---------- inventory risk: newsvendor on the posterior ---------- */
  function stockCosts(Q, mu, sd, cu, co) {
    const z = (Q - mu) / sd;
    const short = sd * loss(z);          // E[(D − Q)+]
    const left = Q - mu + short;          // E[(Q − D)+]
    return {
      Q, z, pStockout: 1 - Phi(z), expShort: short, expLeft: left,
      under: cu * short, over: co * left, total: cu * short + co * left,
      fillRate: mu > 0 ? Math.max(0, 1 - short / mu) : 1
    };
  }
  function inventoryRisk(o) {
    const cu = Math.max(0.01, o.price - o.unitCost + (o.goodwill || 0));
    const co = Math.max(0.01, o.unitCost - o.salvage + (o.holdingPerWeek || 0) * (o.horizon || 12) / 2);
    const cr = cu / (cu + co);
    const sd = Math.max(1, o.sd);
    const Qstar = Math.max(0, o.mu + sd * invPhi(cr));
    const available = (o.onHand || 0) + (o.onOrder || 0);
    const curve = [];
    const lo = Math.max(0, o.mu - 3 * sd), hi = o.mu + 3 * sd;
    for (let i = 0; i <= 60; i++) curve.push(stockCosts(lo + (hi - lo) * i / 60, o.mu, sd, cu, co));
    return {
      cu, co, criticalRatio: cr, Qstar,
      orderQty: Math.max(0, Math.ceil(Qstar - available)),
      atOptimal: stockCosts(Qstar, o.mu, sd, cu, co),
      ifNoOrder: stockCosts(available, o.mu, sd, cu, co),
      curve
    };
  }

  /* ---------- marketing: response curves and equal-marginal allocation ---------- */
  /** Fit units = a · spend^b by log-log least squares; b is clamped to diminishing returns. */
  function fitResponse(history, fallbackB) {
    const pts = (history || []).filter((h) => h.spend > 0 && h.units > 0);
    const B = fallbackB || 0.6;
    if (!pts.length) return { a: 0, b: B, fitted: false };
    const xs = pts.map((h) => Math.log(h.spend)), ys = pts.map((h) => Math.log(h.units));
    let b = B, fitted = false;
    if (pts.length >= 4) {
      const mx = mean(xs), my = mean(ys);
      const vx = sum(xs.map((x) => (x - mx) ** 2));
      if (vx > 0.05) {
        b = Math.min(0.95, Math.max(0.15, sum(xs.map((x, i) => (x - mx) * (ys[i] - my))) / vx));
        fitted = true;
      }
    }
    const a = Math.exp(mean(ys) - b * mean(xs));
    return { a, b, fitted };
  }
  const unitsAt = (r, s) => (s > 0 ? r.a * Math.pow(s, r.b) : 0);
  const marginalAt = (r, s) => (s > 0 ? r.a * r.b * Math.pow(s, r.b - 1) : Infinity);
  /** Spend at which a channel's marginal units per dollar equals lambda. */
  const spendForMarginal = (r, lambda) => (r.a > 0 ? Math.pow((r.a * r.b) / lambda, 1 / (1 - r.b)) : 0);

  /**
   * Weekly budget that delivers `targetPaidUnits` at the lowest cost: every
   * channel is pushed to the same marginal cost per unit (lambda found by bisection).
   */
  function allocate(curves, targetPaidUnits) {
    const total = (lambda) => sum(curves.map((r) => unitsAt(r, spendForMarginal(r, lambda))));
    let lo = 1e-9, hi = 1e3;
    for (let i = 0; i < 200; i++) {
      const mid = Math.sqrt(lo * hi);
      total(mid) > targetPaidUnits ? (lo = mid) : (hi = mid);
    }
    const lambda = Math.sqrt(lo * hi);
    return { lambda, spends: curves.map((r) => spendForMarginal(r, lambda)) };
  }

  function planMarketing(o) {
    const H = o.horizon || 12;
    const margin = Math.max(0.01, o.unitMargin);
    const breakEvenRoas = o.price / margin;
    const channels = o.channels.map((c) => {
      const r = fitResponse(c.history, c.elasticity);
      return { name: c.name, curve: r, currentSpend: +c.currentSpend || 0, currentUnits: unitsAt(r, +c.currentSpend || 0) };
    });
    const curves = channels.map((c) => c.curve);
    const currentPaid = sum(channels.map((c) => c.currentUnits));
    const currentSpend = sum(channels.map((c) => c.currentSpend));
    const weeklyGap = (o.targetUnits - o.forecastUnits) / H; // forecast already includes today's spend

    // Most demand that still makes money: each channel at marginal profit = $1 per $1.
    const lambdaBE = 1 / margin;
    const maxProfitableSpends = curves.map((r) => spendForMarginal(r, lambdaBE));
    const maxProfitablePaid = sum(curves.map((r, i) => unitsAt(r, maxProfitableSpends[i])));

    const neededPaid = Math.max(0, currentPaid + weeklyGap);
    const alloc = allocate(curves, neededPaid);
    const profitable = alloc.lambda >= lambdaBE - 1e-12;

    const rows = channels.map((c, i) => {
      const s = alloc.spends[i], u = unitsAt(c.curve, s);
      const mCur = marginalAt(c.curve, c.currentSpend);
      return {
        name: c.name,
        elasticity: c.curve.b,
        fitted: c.curve.fitted,
        currentSpend: c.currentSpend,
        currentUnits: c.currentUnits,
        currentCac: c.currentUnits > 0 ? c.currentSpend / c.currentUnits : null,
        currentRoas: c.currentSpend > 0 ? (c.currentUnits * o.price) / c.currentSpend : null,
        currentMarginalRoas: c.currentSpend > 0 ? mCur * o.price : null,
        recommendedSpend: s,
        recommendedUnits: u,
        cac: u > 0 ? s / u : null,
        roas: s > 0 ? (u * o.price) / s : null,
        marginalCac: 1 / alloc.lambda,
        marginalRoas: alloc.lambda * o.price,
        maxProfitableSpend: maxProfitableSpends[i],
        curve: c.curve
      };
    });
    const weeklyBudget = sum(alloc.spends);
    const paidUnits = sum(rows.map((r) => r.recommendedUnits));
    return {
      channels: rows,
      breakEvenRoas,
      currentWeeklySpend: currentSpend,
      currentPaidUnits: currentPaid,
      weeklyGap,
      weeklyBudget,
      horizonBudget: weeklyBudget * H,
      addedUnits: (paidUnits - currentPaid) * H,
      blendedCac: paidUnits > 0 ? weeklyBudget / paidUnits : null,
      marginalCac: 1 / alloc.lambda,
      profitable,
      maxProfitableTarget: o.forecastUnits + (maxProfitablePaid - currentPaid) * H,
      maxProfitableBudget: sum(maxProfitableSpends) * H
    };
  }

  /* ---------- shipping: single modes and fast+slow splits on total landed cost ---------- */
  function planShipping(o) {
    const qty = Math.max(0, Math.round(o.qty));
    const daily = Math.max(1e-6, o.weeklyDemand / 7);
    const coverDays = (o.onHand || 0) / daily;
    const capital = (units, days) => units * o.unitCost * (o.capitalRate || 0) * days / 365;
    const bridgeBuffer = 1.15;
    const options = [];
    for (const m of o.modes) {
      const gap = Math.max(0, m.leadDays - coverDays);
      const lost = Math.min(qty, gap * daily);
      options.push({
        label: m.name, legs: [{ mode: m.name, units: qty, leadDays: m.leadDays }],
        freight: qty * m.costPerUnit + (qty > 0 ? m.fixedCost || 0 : 0),
        capital: capital(qty, m.leadDays),
        stockout: lost * o.unitMargin,
        lostUnits: lost, gapDays: gap
      });
    }
    for (const f of o.modes) for (const s of o.modes) {
      if (f.leadDays >= s.leadDays) continue;
      const bridgeDays = Math.max(0, s.leadDays - Math.max(coverDays, f.leadDays));
      const fastUnits = Math.min(qty, Math.ceil(bridgeDays * daily * bridgeBuffer));
      if (fastUnits <= 0 || fastUnits >= qty) continue;
      const slowUnits = qty - fastUnits;
      const gap = Math.max(0, f.leadDays - coverDays);
      const lost = Math.min(qty, gap * daily);
      options.push({
        label: `${s.name} + ${f.name}`,
        legs: [{ mode: s.name, units: slowUnits, leadDays: s.leadDays }, { mode: f.name, units: fastUnits, leadDays: f.leadDays }],
        freight: slowUnits * s.costPerUnit + (s.fixedCost || 0) + fastUnits * f.costPerUnit + (f.fixedCost || 0),
        capital: capital(slowUnits, s.leadDays) + capital(fastUnits, f.leadDays),
        stockout: lost * o.unitMargin,
        lostUnits: lost, gapDays: gap
      });
    }
    options.forEach((op) => {
      op.total = op.freight + op.capital + op.stockout;
      op.perUnit = qty > 0 ? op.freight / qty : 0;
    });
    options.sort((a, b) => a.total - b.total);
    return { qty, coverDays, options, best: options[0] || null };
  }

  /* ---------- full plan ---------- */
  function runPlan(state) {
    const st = state.settings;
    const H = st.horizon;
    const skus = state.skus.map((sku, i) => {
      const fc = forecast(sku.sales, { horizon: H, seed: 11 + i });
      const bayes = demandPosterior(fc.total, (st.judgment || {})[sku.id]);
      return { sku, fc, bayes };
    });

    const fcUnits = sum(skus.map((s) => s.bayes.posterior.mu));
    const w = skus.map((s) => s.bayes.posterior.mu / (fcUnits || 1));
    const avgPrice = sum(skus.map((s, i) => w[i] * s.sku.price));
    const avgMargin = sum(skus.map((s, i) => w[i] * (s.sku.price - s.sku.unitCost)));
    const targetUnits = st.targetUnits > 0 ? st.targetUnits : Math.round(fcUnits * 1.05);
    const marketing = planMarketing({
      channels: state.channels, price: avgPrice, unitMargin: avgMargin,
      forecastUnits: fcUnits, targetUnits, horizon: H
    });
    const added = marketing.profitable ? marketing.addedUnits : Math.max(0, marketing.maxProfitableTarget - fcUnits);

    const lines = skus.map((s, i) => {
      const { sku } = s;
      const extra = added * w[i];
      const mu = s.bayes.posterior.mu + extra;
      const sd = Math.sqrt(s.bayes.posterior.sd ** 2 + (0.25 * extra) ** 2);
      const inv = inventoryRisk({
        mu, sd, price: sku.price, unitCost: sku.unitCost, salvage: sku.salvage,
        holdingPerWeek: sku.holdingPerWeek, horizon: H, onHand: sku.onHand, onOrder: sku.onOrder
      });
      const ship = planShipping({
        qty: inv.orderQty, weeklyDemand: mu / H, onHand: (sku.onHand || 0) + (sku.onOrder || 0),
        unitCost: sku.unitCost, unitMargin: sku.price - sku.unitCost, capitalRate: st.capitalRate, modes: state.modes
      });
      const expSales = mu - inv.atOptimal.expShort;
      const freight = ship.best ? ship.best.freight : 0;
      const contribution = expSales * sku.price + inv.atOptimal.expLeft * sku.salvage
        - inv.Qstar * sku.unitCost - (sku.holdingPerWeek || 0) * inv.atOptimal.expLeft * H / 2 - freight;
      return { sku, fc: s.fc, bayes: s.bayes, plannedDemand: { mu, sd, extra }, inv, ship, contribution };
    });

    const totals = {
      forecastUnits: fcUnits,
      forecastP10: sum(lines.map((l) => l.fc.total.p10)),
      forecastP90: sum(lines.map((l) => l.fc.total.p90)),
      lastPeriodUnits: sum(lines.map((l) => l.fc.lastPeriod)),
      plannedUnits: sum(lines.map((l) => l.plannedDemand.mu)),
      targetUnits,
      orderUnits: sum(lines.map((l) => l.inv.orderQty)),
      orderCost: sum(lines.map((l) => l.inv.orderQty * l.sku.unitCost)),
      underCost: sum(lines.map((l) => l.inv.atOptimal.under)),
      overCost: sum(lines.map((l) => l.inv.atOptimal.over)),
      underIfNoOrder: sum(lines.map((l) => l.inv.ifNoOrder.under)),
      freight: sum(lines.map((l) => (l.ship.best ? l.ship.best.freight : 0))),
      shipTotal: sum(lines.map((l) => (l.ship.best ? l.ship.best.total : 0))),
      contribution: sum(lines.map((l) => l.contribution)) - marketing.horizonBudget,
      wape: (() => { const ws = lines.map((l) => l.fc.wape).filter((x) => x != null); return ws.length ? mean(ws) : null; })()
    };
    totals.cashNeeded = totals.orderCost + totals.freight + marketing.horizonBudget;
    totals.pStockoutMax = Math.max(...lines.map((l) => l.inv.atOptimal.pStockout));
    return { horizon: H, lines, marketing, totals, avgPrice, avgMargin };
  }

  /* ---------- sample store ---------- */
  function sampleState() {
    const rand = rng(2026);
    const weeks = 104;
    const make = (base, trend, amp, peakWeek, noise) => Array.from({ length: weeks }, (_, t) => {
      const woy = (t + 44) % 52; // history ends late October
      const season = 1 + amp * Math.cos(2 * Math.PI * (woy - peakWeek) / 52);
      return Math.max(0, Math.round((base + trend * t) * season * (1 + noise * randn(rand))));
    });
    const chHist = (a, b, center) => Array.from({ length: 16 }, () => {
      const spend = center * (0.6 + 0.8 * rand());
      return { spend: Math.round(spend), units: Math.max(1, Math.round(a * Math.pow(spend, b) * (1 + 0.08 * randn(rand)))) };
    });
    return {
      source: "sample",
      storeName: "Northwind Skin Co.",
      skus: [
        { id: "serum", name: "Hydra Serum 50ml", price: 34, unitCost: 11, salvage: 5, holdingPerWeek: 0.18, onHand: 900, onOrder: 0, sales: make(260, 1.2, 0.3, 49, 0.07) },
        { id: "cream", name: "Barrier Cream 75ml", price: 28, unitCost: 8.5, salvage: 4, holdingPerWeek: 0.15, onHand: 1400, onOrder: 0, sales: make(180, 0.4, 0.28, 2, 0.08) },
        { id: "spf", name: "SPF 50 Fluid", price: 24, unitCost: 7, salvage: 3, holdingPerWeek: 0.12, onHand: 600, onOrder: 0, sales: make(150, 0.8, 0.55, 27, 0.09) }
      ],
      channels: [
        { name: "Google Ads", currentSpend: 1200, history: chHist(2.85, 0.55, 1200) },
        { name: "Meta Ads", currentSpend: 1500, history: chHist(1.62, 0.6, 1500) },
        { name: "TikTok Ads", currentSpend: 600, history: chHist(1.97, 0.45, 600) }
      ],
      modes: [
        { name: "Sea LCL", leadDays: 38, costPerUnit: 0.42, fixedCost: 650 },
        { name: "Rail", leadDays: 24, costPerUnit: 0.88, fixedCost: 400 },
        { name: "Air", leadDays: 6, costPerUnit: 3.1, fixedCost: 150 },
        { name: "Express courier", leadDays: 3, costPerUnit: 5.6, fixedCost: 0 }
      ],
      settings: { horizon: 12, capitalRate: 0.12, targetUnits: 0, judgment: {} }
    };
  }

  /* ---------- CSV import ---------- */
  /** Parse "week,sku,units" (header required; extra columns ignored) into per-SKU weekly series. */
  function parseSalesCsv(text) {
    const rows = text.trim().split(/\r?\n/).map((r) => r.split(",").map((c) => c.trim().replace(/^"|"$/g, "")));
    if (rows.length < 2) throw new Error("The file has no data rows.");
    const head = rows[0].map((h) => h.toLowerCase());
    const iw = head.findIndex((h) => /week|date/.test(h)), is = head.findIndex((h) => /sku|product|item/.test(h)), iu = head.findIndex((h) => /units|qty|quantity|sales/.test(h));
    if (iw < 0 || iu < 0) throw new Error("Add a header row with a week (or date) column and a units column.");
    const bySku = new Map(), allWeeks = new Set();
    for (const r of rows.slice(1)) {
      if (!r[iw]) continue;
      const sku = is >= 0 ? r[is] || "All products" : "All products";
      const units = +r[iu];
      if (!Number.isFinite(units)) continue;
      if (!bySku.has(sku)) bySku.set(sku, new Map());
      const m = bySku.get(sku);
      m.set(r[iw], (m.get(r[iw]) || 0) + units);
      allWeeks.add(r[iw]);
    }
    const weeks = [...allWeeks].sort();
    return [...bySku.entries()].map(([name, m]) => ({ name, sales: weeks.map((w) => m.get(w) || 0) }));
  }

  const api = {
    erf, Phi, phi, invPhi, loss, mean, stdev, quantile, rng,
    forecast, bayesUpdate, demandPosterior, stockCosts, inventoryRisk,
    fitResponse, unitsAt, marginalAt, allocate, planMarketing, planShipping,
    runPlan, sampleState, parseSalesCsv
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Equilibra = api;
})(typeof self !== "undefined" ? self : this);
