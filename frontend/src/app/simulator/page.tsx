"use client";

import { useState } from "react";

export default function SimulatorPage() {
  const [discount, setDiscount] = useState(100);
  const [minOrder, setMinOrder] = useState(999);
  const [simulated, setSimulated] = useState(false);

  const customers = 438;

  // Demo simulation numbers
  const currentRevenue = 42000;

  const uplift =
    discount === 50 ? 8 :
    discount === 100 ? 16 :
    discount === 150 ? 21 : 25;

  const expectedRevenue = Math.round(
    currentRevenue * (1 + uplift / 100)
  );

  const incrementalRevenue = expectedRevenue - currentRevenue;

  const campaignCost = Math.round(customers * (discount * 0.04));

  const netImpact = incrementalRevenue - campaignCost;

  const roi = Math.round(
    (netImpact / Math.max(campaignCost, 1)) * 100
  );

  return (
    <main className="min-h-screen bg-[#f5f9ff] text-[#10244f]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="text-3xl font-black">
              pay<span className="text-[#00b9f2]">tm</span>
            </div>

            <div className="h-7 w-px bg-slate-200" />

            <div>
              <p className="font-bold">
                Growth<span className="text-[#087df5]">Pilot</span>
              </p>

              <p className="text-xs text-slate-400">
                AI Business Partner
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-full bg-[#1682f5] flex items-center justify-center font-bold text-white">
              A
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold">
                Amit Sharma
              </p>

              <p className="text-xs text-slate-400">
                Merchant
              </p>
            </div>

          </div>

        </div>
      </header>


      {/* CONTENT */}
      <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">

        {/* BACK */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 text-sm font-semibold text-[#087df5] hover:underline"
        >
          ← Back to Dashboard
        </button>


        {/* TITLE */}
        <div className="mb-8">

          <div className="mb-3 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              🚀
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wide text-[#087df5]">
                GrowthPilot AI
              </p>

              <h1 className="text-3xl font-black md:text-4xl">
                Campaign Impact Simulator
              </h1>

            </div>

          </div>

          <p className="max-w-2xl text-slate-500">
            See the estimated impact of a campaign before you launch it.
            GrowthPilot uses your business data to predict potential outcomes.
          </p>

        </div>


        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">


          {/* LEFT — CAMPAIGN SETTINGS */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

              <p className="text-xs font-bold uppercase tracking-wide text-[#087df5]">
                Campaign
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Win Back Inactive Customers
              </h2>

            </div>


            {/* TARGET */}
            <div className="rounded-xl bg-[#f5f9ff] p-4">

              <p className="text-xs text-slate-400">
                TARGET CUSTOMERS
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-3xl font-black">
                  {customers}
                </span>

                <span className="mb-1 text-sm text-slate-500">
                  inactive customers
                </span>

              </div>

              <p className="mt-2 text-xs text-slate-400">
                No purchase in the last 30+ days
              </p>

            </div>


            {/* OFFER */}
            <div className="mt-6">

              <label className="text-sm font-bold">
                Discount Offer
              </label>

              <div className="mt-3 grid grid-cols-3 gap-3">

                {[50, 100, 150].map((amount) => (

                  <button
                    key={amount}
                    onClick={() => {
                      setDiscount(amount);
                      setSimulated(false);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                      discount === amount
                        ? "border-[#087df5] bg-blue-50 text-[#087df5]"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    ₹{amount} OFF
                  </button>

                ))}

              </div>

            </div>


            {/* MIN ORDER */}
            <div className="mt-6">

              <label className="text-sm font-bold">
                Minimum Order Value
              </label>

              <div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4">

                <span className="text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => {
                    setMinOrder(Number(e.target.value));
                    setSimulated(false);
                  }}
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />

              </div>

            </div>


            {/* AUDIENCE */}
            <div className="mt-6">

              <label className="text-sm font-bold">
                Customer Audience
              </label>

              <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="text-xl">
                    👥
                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Inactive Customers
                    </p>

                    <p className="text-xs text-slate-500">
                      438 customers · 30+ days inactive
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* SIMULATE */}
            <button
              onClick={() => setSimulated(true)}
              className="mt-7 w-full rounded-xl bg-[#087df5] py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-[#066bd3]"
            >
              ✨ Simulate Campaign Impact
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Simulation uses estimated demo data
            </p>

          </section>


          {/* RIGHT — RESULTS */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-[#087df5]">
                  AI Prediction
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Expected Business Impact
                </h2>

              </div>

              {simulated && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                  Simulation Ready
                </span>
              )}

            </div>


            {/* REVENUE COMPARISON */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-slate-50 p-5">

                <p className="text-xs text-slate-400">
                  CURRENT REVENUE
                </p>

                <p className="mt-2 text-3xl font-black">
                  ₹{currentRevenue.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Estimated daily revenue
                </p>

              </div>


              <div className="rounded-2xl bg-blue-50 p-5">

                <p className="text-xs text-[#087df5]">
                  EXPECTED REVENUE
                </p>

                <p className="mt-2 text-3xl font-black text-[#087df5]">
                  ₹{expectedRevenue.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  +{uplift}% estimated uplift
                </p>

              </div>

            </div>


            {/* ARROW */}
            <div className="my-5 flex items-center justify-center">

              <div className="h-px flex-1 bg-slate-200" />

              <div className="mx-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#087df5]">
                ↓
              </div>

              <div className="h-px flex-1 bg-slate-200" />

            </div>


            {/* IMPACT */}
            <div className="rounded-2xl bg-gradient-to-br from-[#061d4d] to-[#0b347e] p-6 text-white">

              <p className="text-sm text-blue-200">
                INCREMENTAL REVENUE
              </p>

              <p className="mt-1 text-4xl font-black">
                +₹{incrementalRevenue.toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-xs text-blue-200">
                Estimated additional revenue from this campaign
              </p>

            </div>


            {/* METRICS */}
            <div className="mt-5 grid grid-cols-2 gap-4">

              <ResultMetric
                label="Campaign Cost"
                value={`₹${campaignCost.toLocaleString("en-IN")}`}
              />

              <ResultMetric
                label="Net Impact"
                value={`₹${netImpact.toLocaleString("en-IN")}`}
              />

              <ResultMetric
                label="Expected Uplift"
                value={`+${uplift}%`}
              />

              <ResultMetric
                label="Estimated ROI"
                value={`${roi}%`}
              />

            </div>


            {/* AI EXPLANATION */}
            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

              <div className="flex gap-3">

                <div className="text-xl">
                  ✦
                </div>

                <div>

                  <p className="text-sm font-bold text-[#10244f]">
                    Why GrowthPilot recommends this
                  </p>

                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">

                    <li>
                      ✓ {customers} customers have been inactive for 30+ days
                    </li>

                    <li>
                      ✓ Your repeat customer rate is {64}%
                    </li>

                    <li>
                      ✓ ₹{minOrder} minimum order protects your average order value
                    </li>

                    <li>
                      ✓ A targeted offer can re-engage high-value customers
                    </li>

                  </ul>

                </div>

              </div>

            </div>


            {/* LAUNCH */}
            <button
              disabled={!simulated}
              onClick={() => {
                alert(
                  "Demo campaign approved! In the hackathon prototype, this represents launching the campaign."
                );
              }}
              className={`mt-6 w-full rounded-xl py-4 text-sm font-bold transition ${
                simulated
                  ? "bg-[#087df5] text-white shadow-lg shadow-blue-200 hover:bg-[#066bd3]"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              {simulated
                ? "🚀 Approve & Launch Campaign"
                : "Simulate First →"}
            </button>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              Prototype only — no real campaign will be sent
            </p>

          </section>

        </div>


        {/* PROCESS */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

          <p className="text-xs font-bold uppercase tracking-wide text-[#087df5]">
            GrowthPilot Workflow
          </p>

          <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-5">

            <ProcessStep
              number="01"
              title="Observe"
              text="Analyze business data"
            />

            <ProcessStep
              number="02"
              title="Diagnose"
              text="Find growth opportunity"
            />

            <ProcessStep
              number="03"
              title="Recommend"
              text="Suggest personalized action"
            />

            <ProcessStep
              number="04"
              title="Simulate"
              text="Predict expected impact"
              active
            />

            <ProcessStep
              number="05"
              title="Execute"
              text="Launch and track"
            />

          </div>

        </section>


        {/* FOOTER */}
        <footer className="mt-8 border-t border-slate-200 py-5 text-center text-xs text-slate-400">

          GrowthPilot AI · Built for India&apos;s Merchants 🇮🇳 · Hackathon 2026

        </footer>

      </div>

    </main>
  );
}


/* RESULT METRIC */

function ResultMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black">
        {value}
      </p>

    </div>
  );
}


/* PROCESS */

function ProcessStep({
  number,
  title,
  text,
  active = false,
}: {
  number: string;
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        active
          ? "bg-blue-50 ring-1 ring-blue-200"
          : "bg-slate-50"
      }`}
    >

      <p className="text-xs font-bold text-[#087df5]">
        {number}
      </p>

      <p className="mt-2 text-sm font-bold">
        {title}
      </p>

      <p className="mt-1 text-xs leading-4 text-slate-400">
        {text}
      </p>

    </div>
  );
}