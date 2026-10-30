// Run: node engine.test.js
const assert = require("assert");
const E = require("./engine.js");
let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log("ok -", name); };
const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg || ""} expected ${b}, got ${a}`);

test("normal helpers", () => {
  near(E.Phi(0), 0.5, 1e-7);
  near(E.Phi(1.96), 0.975, 1e-4);
  near(E.invPhi(0.975), 1.95996, 1e-4);
  near(E.invPhi(0.01), -2.32635, 1e-4);
  near(E.loss(0), 0.398942, 1e-5);
});

test("forecast follows a linear trend", () => {
  const y = Array.from({ length: 40 }, (_, t) => 100 + 5 * t);
  const fc = E.forecast(y, { horizon: 4, season: 52 });
  near(fc.weeks[0].mean, 300, 6, "week 1");
  near(fc.weeks[3].mean, 315, 12, "week 4");
  assert.ok(!fc.seasonal);
});

test("forecast picks up seasonality with 2+ years", () => {
  const y = Array.from({ length: 104 }, (_, t) => 200 + 80 * Math.cos(2 * Math.PI * (t % 52) / 52));
  const fc = E.forecast(y, { horizon: 12, season: 52 });
  assert.ok(fc.seasonal);
  near(fc.weeks[0].mean, 280, 15, "seasonal peak");
  assert.ok(fc.wape < 0.1, "WAPE " + fc.wape);
  assert.ok(fc.total.p10 < fc.total.mean && fc.total.mean < fc.total.p90);
});

test("bayes update is precision-weighted", () => {
  const p = E.bayesUpdate({ mu: 1000, sd: 100 }, { mu: 1200, sd: 100 });
  near(p.mu, 1100, 1e-9); near(p.sd, 100 / Math.SQRT2, 1e-9); near(p.weightOnData, 0.5, 1e-9);
  const none = E.demandPosterior({ mean: 900, sd: 50 }, null);
  near(none.posterior.mu, 900, 1e-9);
});

test("newsvendor critical ratio and costs", () => {
  const r = E.inventoryRisk({ mu: 1000, sd: 200, price: 30, unitCost: 10, salvage: 5, holdingPerWeek: 0, horizon: 12, onHand: 300, onOrder: 0 });
  near(r.criticalRatio, 0.8, 1e-9);
  near(r.Qstar, 1000 + 200 * 0.841621, 0.5);
  near(r.atOptimal.pStockout, 0.2, 1e-3);
  assert.strictEqual(r.orderQty, Math.ceil(r.Qstar - 300));
  const minTotal = Math.min(...r.curve.map((c) => c.total));
  assert.ok(r.atOptimal.total <= minTotal + 1e-6, "Q* minimises expected cost");
});

test("marketing response fit recovers elasticity", () => {
  const hist = [400, 700, 1000, 1300, 1600, 2000].map((s) => ({ spend: s, units: 3 * Math.pow(s, 0.6) }));
  const r = E.fitResponse(hist);
  near(r.b, 0.6, 1e-6); near(r.a, 3, 1e-6); assert.ok(r.fitted);
});

test("allocation equalises marginal cost and hits the target", () => {
  const plan = E.planMarketing({
    channels: [
      { name: "A", currentSpend: 1000, history: [500, 800, 1000, 1400, 1800].map((s) => ({ spend: s, units: 3 * Math.pow(s, 0.6) })) },
      { name: "B", currentSpend: 1000, history: [500, 800, 1000, 1400, 1800].map((s) => ({ spend: s, units: 2 * Math.pow(s, 0.5) })) }
    ],
    price: 30, unitMargin: 20, forecastUnits: 5000, targetUnits: 5600, horizon: 12
  });
  near(plan.addedUnits, 600, 1, "added units");
  near(plan.channels[0].marginalCac, plan.channels[1].marginalCac, 1e-9);
  const ma = E.marginalAt(plan.channels[0].curve, plan.channels[0].recommendedSpend);
  const mb = E.marginalAt(plan.channels[1].curve, plan.channels[1].recommendedSpend);
  near(ma, mb, 1e-6, "equal marginal units per $");
});

test("shipping prefers a split when cover is short", () => {
  const modes = [
    { name: "Sea", leadDays: 40, costPerUnit: 0.4, fixedCost: 500 },
    { name: "Air", leadDays: 5, costPerUnit: 3, fixedCost: 100 }
  ];
  const r = E.planShipping({ qty: 5000, weeklyDemand: 700, onHand: 700, unitCost: 10, unitMargin: 20, capitalRate: 0.1, modes });
  assert.strictEqual(r.best.label, "Sea + Air");
  const lots = E.planShipping({ qty: 5000, weeklyDemand: 700, onHand: 10000, unitCost: 10, unitMargin: 20, capitalRate: 0.1, modes });
  assert.strictEqual(lots.best.label, "Sea");
});

test("full plan on the sample store", () => {
  const p = E.runPlan(E.sampleState());
  assert.strictEqual(p.lines.length, 3);
  assert.ok(p.totals.forecastUnits > 3000 && p.totals.forecastUnits < 20000, "forecast " + p.totals.forecastUnits);
  assert.ok(p.totals.orderUnits > 0);
  assert.ok(p.marketing.weeklyBudget > 0);
  const tik = p.marketing.channels.find((c) => c.name === "TikTok Ads");
  assert.ok(tik.currentMarginalRoas < p.marketing.breakEvenRoas, "TikTok is past break-even in the sample");
  console.log("   sample:", JSON.stringify({
    fc: Math.round(p.totals.forecastUnits), target: p.totals.targetUnits, order: p.totals.orderUnits,
    under: Math.round(p.totals.underCost), over: Math.round(p.totals.overCost),
    budget: Math.round(p.marketing.horizonBudget), profitable: p.marketing.profitable,
    ship: p.lines.map((l) => l.ship.best && l.ship.best.label), wape: p.totals.wape && p.totals.wape.toFixed(3)
  }));
});

test("csv import", () => {
  const rows = E.parseSalesCsv("week,sku,units\n2026-01-05,A,10\n2026-01-05,B,4\n2026-01-12,A,12\n2026-01-12,A,1");
  assert.deepStrictEqual(rows, [{ name: "A", sales: [10, 13] }, { name: "B", sales: [4, 0] }]);
});

console.log(`\n${passed} tests passed`);
