"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  merchant: string;
  today_sales: number;
  average_daily_sales: number;
  transactions_today: number;
  repeat_customer_rate: number;
  inactive_customers: number;
  business_health: number;
};
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/dashboard`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
        setLoading(false);
      });
  }, []);

  const money = (value: number) =>
    `₹${value.toLocaleString("en-IN")}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-black text-[#09255a]">
            Growth<span className="text-[#087ff5]">Pilot</span>
          </div>
          <p className="text-gray-500 mt-2">
            Loading your business dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-xl font-bold text-red-500">
            Unable to connect to backend
          </h2>

          <p className="text-gray-500 mt-2">
            Make sure FastAPI is running on port 8000.
          </p>

          <code className="block mt-4 text-sm bg-gray-100 p-3 rounded-lg">
            uvicorn main:app --reload
          </code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-[#102a56]">

      {/* =====================================================
          LEFT SIDEBAR
      ====================================================== */}

      <aside className="fixed left-0 top-0 z-50 h-screen w-[230px] bg-[#09255a] text-white flex flex-col">

        {/* BRAND */}
        <div className="px-8 pt-8 pb-7">

          <div className="text-[32px] font-black tracking-tight leading-none">
            pay<span className="text-[#00a9ff]">tm</span>
          </div>

          <div className="text-[24px] font-bold mt-2 leading-none">
            Growth<span className="text-[#00a9ff]">Pilot</span>
          </div>

          <p className="text-[14px] text-blue-200 mt-4 leading-5">
            AI Business Partner
            <br />
            for Merchants
          </p>

        </div>


        {/* NAVIGATION */}

        <nav className="px-4 space-y-2 flex-1">

          {/* DASHBOARD */}

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       bg-[#087ff5] text-white text-left
                       transition-all duration-200"
          >
            <span className="text-xl">▦</span>

            <span className="font-semibold">
              Dashboard
            </span>
          </button>


          {/* AI ASSISTANT */}

          <button
            onClick={() => {
              window.location.href = "/assistant";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       text-blue-100 text-left
                       hover:bg-[#117ff2] hover:text-white
                       transition-all duration-200"
          >
            <span className="text-xl">✧</span>

            <span className="font-medium">
              AI Assistant
            </span>
          </button>


          {/* OPPORTUNITIES */}

          <button
            onClick={() => {
              window.location.href = "/opportunities";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       text-blue-100 text-left
                       hover:bg-[#117ff2] hover:text-white
                       transition-all duration-200"
          >
            <span className="text-xl">✦</span>

            <span className="font-medium">
              Opportunities
            </span>
          </button>


          {/* CAMPAIGNS */}

          <button
            onClick={() => {
              window.location.href = "/simulator";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       text-blue-100 text-left
                       hover:bg-[#117ff2] hover:text-white
                       transition-all duration-200"
          >
            <span className="text-xl">▱</span>

            <span className="font-medium">
              Campaigns
            </span>
          </button>


          {/* ANALYTICS */}

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       text-blue-100 text-left
                       hover:bg-[#117ff2] hover:text-white
                       transition-all duration-200"
          >
            <span className="text-xl">▥</span>

            <span className="font-medium">
              Analytics
            </span>
          </button>


          {/* CUSTOMERS */}

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       text-blue-100 text-left
                       hover:bg-[#117ff2] hover:text-white
                       transition-all duration-200"
          >
            <span className="text-xl">♙</span>

            <span className="font-medium">
              Customers
            </span>
          </button>


          {/* SETTINGS */}

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
                       text-blue-100 text-left
                       hover:bg-[#117ff2] hover:text-white
                       transition-all duration-200"
          >
            <span className="text-xl">⚙</span>

            <span className="font-medium">
              Settings
            </span>
          </button>

        </nav>


        {/* SIDEBAR FOOTER */}

        <div className="px-6 pb-7">

          <div className="border-t border-blue-900 pt-5">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-[#087ff5] flex items-center justify-center font-bold">
                A
              </div>

              <div>
                <div className="text-sm font-semibold">
                  Amit Sharma
                </div>

                <div className="text-xs text-blue-300">
                  Merchant
                </div>
              </div>

            </div>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="ml-[230px] min-h-screen">


        {/* TOP HEADER */}

        <header className="h-[86px] bg-white border-b border-gray-200
                           flex items-center justify-between px-8">

          {/* SEARCH */}

          <div className="w-[500px]">

            <div className="h-12 bg-[#f3f7fd] rounded-xl
                            flex items-center px-5 gap-3">

              <span className="text-gray-400 text-lg">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search anything (e.g. sales, customers, campaigns...)"
                className="bg-transparent outline-none w-full
                           text-sm text-gray-600"
              />

            </div>

          </div>


          {/* USER */}

          <div className="flex items-center gap-5">

            <div className="text-gray-500 text-xl">
              ♧
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <div className="text-right">

              <div className="font-bold">
                Amit Sharma
              </div>

              <div className="text-xs text-gray-400">
                {data.merchant}
              </div>

            </div>

            <div className="w-11 h-11 rounded-full
                            bg-[#087ff5] text-white
                            flex items-center justify-center
                            font-bold text-lg">
              A
            </div>

          </div>

        </header>


        {/* =====================================================
            DASHBOARD BODY
        ====================================================== */}

        <div className="px-8 py-9">


          {/* TITLE */}

          <div className="flex items-start justify-between mb-8">

            <div>

              <div className="text-[#087ff5] text-sm font-bold tracking-wide mb-2">
                BUSINESS OVERVIEW
              </div>

              <h1 className="text-[42px] font-black tracking-tight">
                Good Morning, Amit! 👋
              </h1>

              <p className="text-gray-500 text-lg mt-2">
                Here's how your business is performing today.
              </p>

            </div>


            {/* LAST UPDATED */}

            <div className="bg-white rounded-xl border
                            shadow-sm px-5 py-4">

              <div className="text-sm text-gray-500">
                ▣ &nbsp; Last updated: Today
              </div>

            </div>

          </div>


          {/* =====================================================
              METRIC CARDS
          ====================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">


            {/* SALES */}

            <div className="bg-white rounded-2xl border
                            border-gray-200 shadow-sm p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Today's Sales
                  </p>

                  <h2 className="text-[34px] font-black mt-3">
                    {money(data.today_sales)}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl
                                bg-blue-50 flex items-center
                                justify-center text-[#087ff5]
                                text-xl font-bold">
                  ₹
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">

                <span className="bg-green-50 text-green-600
                                 px-2.5 py-1 rounded-md
                                 text-xs font-bold">
                  +12%
                </span>

                <span className="text-gray-400 text-xs">
                  vs yesterday
                </span>

              </div>

            </div>


            {/* TRANSACTIONS */}

            <div className="bg-white rounded-2xl border
                            border-gray-200 shadow-sm p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Transactions
                  </p>

                  <h2 className="text-[34px] font-black mt-3">
                    {data.transactions_today}
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl
                                bg-blue-50 flex items-center
                                justify-center text-[#087ff5]
                                text-xl">
                  ▣
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">

                <span className="bg-green-50 text-green-600
                                 px-2.5 py-1 rounded-md
                                 text-xs font-bold">
                  +8%
                </span>

                <span className="text-gray-400 text-xs">
                  vs yesterday
                </span>

              </div>

            </div>


            {/* REPEAT CUSTOMERS */}

            <div className="bg-white rounded-2xl border
                            border-gray-200 shadow-sm p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Repeat Customers
                  </p>

                  <h2 className="text-[34px] font-black mt-3">
                    {data.repeat_customer_rate}%
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl
                                bg-purple-50 flex items-center
                                justify-center text-purple-600
                                text-xl">
                  ♟
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">

                <span className="bg-green-50 text-green-600
                                 px-2.5 py-1 rounded-md
                                 text-xs font-bold">
                  +15%
                </span>

                <span className="text-gray-400 text-xs">
                  this month
                </span>

              </div>

            </div>


            {/* HEALTH */}

            <div className="bg-white rounded-2xl border
                            border-gray-200 shadow-sm p-6">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Business Health
                  </p>

                  <h2 className="text-[34px] font-black mt-3">
                    {data.business_health}
                    <span className="text-sm text-gray-400 font-normal">
                      /100
                    </span>
                  </h2>

                </div>

                <div className="w-12 h-12 rounded-xl
                                bg-orange-50 flex items-center
                                justify-center text-orange-500
                                text-xl">
                  ✦
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5">

                <span className="bg-green-50 text-green-600
                                 px-3 py-1 rounded-md
                                 text-xs font-bold">
                  Healthy
                </span>

                <span className="text-gray-400 text-xs">
                  AI assessment
                </span>

              </div>

            </div>

          </div>


          {/* =====================================================
              LOWER SECTION
          ====================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">


            {/* SALES TREND */}

            <div className="xl:col-span-2 bg-white rounded-2xl
                            border border-gray-200 shadow-sm">

              <div className="p-6 border-b border-gray-100
                              flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Sales Trend
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    Your sales performance over the last 7 days
                  </p>

                </div>

                <button className="border border-gray-200
                                   rounded-lg px-4 py-2
                                   text-sm text-gray-600">
                  Last 7 Days ▾
                </button>

              </div>


              {/* CHART */}

              <div className="p-6">

                <div className="relative h-[300px]">

                  {/* GRID */}

                  <div className="absolute inset-0 flex flex-col justify-between">

                    <div className="border-t border-gray-100" />
                    <div className="border-t border-gray-100" />
                    <div className="border-t border-gray-100" />
                    <div className="border-t border-gray-100" />
                    <div className="border-t border-gray-100" />

                  </div>


                  {/* SVG CHART */}

                  <svg
                    viewBox="0 0 800 300"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >

                    {/* AREA */}

                    <path
                      d="M20 245
                         L140 190
                         L260 220
                         L380 125
                         L500 140
                         L620 85
                         L760 105
                         L760 300
                         L20 300 Z"
                      fill="#087ff5"
                      fillOpacity="0.08"
                    />


                    {/* LINE */}

                    <path
                      d="M20 245
                         L140 190
                         L260 220
                         L380 125
                         L500 140
                         L620 85
                         L760 105"
                      fill="none"
                      stroke="#087ff5"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />


                    {/* POINTS */}

                    <circle
                      cx="20"
                      cy="245"
                      r="7"
                      fill="#087ff5"
                    />

                    <circle
                      cx="140"
                      cy="190"
                      r="7"
                      fill="#087ff5"
                    />

                    <circle
                      cx="260"
                      cy="220"
                      r="7"
                      fill="#087ff5"
                    />

                    <circle
                      cx="380"
                      cy="125"
                      r="7"
                      fill="#087ff5"
                    />

                    <circle
                      cx="500"
                      cy="140"
                      r="7"
                      fill="#087ff5"
                    />

                    <circle
                      cx="620"
                      cy="85"
                      r="7"
                      fill="#087ff5"
                    />

                    <circle
                      cx="760"
                      cy="105"
                      r="7"
                      fill="#087ff5"
                    />

                  </svg>

                </div>


                {/* DAYS */}

                <div className="flex justify-between
                                text-xs text-gray-400 mt-2 px-1">

                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>

                </div>

              </div>

            </div>


            {/* BUSINESS HEALTH */}

            <div className="bg-white rounded-2xl
                            border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Business Health
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    AI-powered assessment
                  </p>

                </div>

                <span className="bg-green-50 text-green-600
                                 px-3 py-1 rounded-lg
                                 text-xs font-bold">
                  Healthy
                </span>

              </div>


              {/* GAUGE */}

              <div className="flex justify-center py-8">

                <div className="relative w-44 h-44">

                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full -rotate-90"
                  >

                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#e8f0fb"
                      strokeWidth="18"
                    />

                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#087ff5"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray="490"
                      strokeDashoffset={
                        490 -
                        (490 * data.business_health) / 100
                      }
                    />

                  </svg>


                  <div className="absolute inset-0
                                  flex flex-col items-center
                                  justify-center">

                    <div className="text-4xl font-black">
                      {data.business_health}
                    </div>

                    <div className="text-gray-400 text-xs">
                      OUT OF 100
                    </div>

                  </div>

                </div>

              </div>


              {/* HEALTH DETAILS */}

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500 text-sm">
                    ● Sales momentum
                  </span>

                  <span className="font-semibold text-sm">
                    Strong
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500 text-sm">
                    ● Customer retention
                  </span>

                  <span className="font-semibold text-sm">
                    Good
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500 text-sm">
                    ● Growth potential
                  </span>

                  <span className="font-semibold text-sm">
                    High
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500 text-sm">
                    ● Risk level
                  </span>

                  <span className="font-semibold text-sm">
                    Low
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              AI INSIGHT
          ====================================================== */}

          <div className="mt-6 bg-white rounded-2xl border
                          border-gray-200 shadow-sm p-6">

            <div className="flex items-start gap-5">

              <div className="w-12 h-12 rounded-xl
                              bg-blue-50 flex items-center
                              justify-center text-2xl">
                ✨
              </div>

              <div className="flex-1">

                <div className="text-[#087ff5] text-xs
                                font-bold tracking-wide">
                  AI INSIGHT
                </div>

                <h3 className="text-xl font-bold mt-1">
                  Your biggest growth opportunity
                </h3>

                <p className="text-gray-500 mt-2 leading-6">

                  You have{" "}

                  <strong className="text-[#102a56]">
                    {data.inactive_customers}
                  </strong>{" "}

                  customers who haven't purchased in over
                  30 days. Re-engaging them could create a
                  significant increase in repeat purchases.

                </p>

              </div>


              <button
                onClick={() => {
                  window.location.href = "/assistant";
                }}
                className="bg-[#087ff5] text-white
                           px-6 py-3 rounded-xl
                           font-bold hover:bg-blue-600
                           transition"
              >
                Ask GrowthPilot →
              </button>

            </div>

          </div>


          {/* =====================================================
              OPPORTUNITY
          ====================================================== */}

          <div className="mt-6 bg-gradient-to-r
                          from-[#eaf4ff] to-white
                          rounded-2xl border border-blue-100
                          p-6">

            <div className="flex items-center
                            justify-between">

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl
                                bg-blue-100 flex items-center
                                justify-center text-2xl">
                  🎯
                </div>

                <div>

                  <div className="text-[#087ff5]
                                  text-xs font-bold">
                    TOP OPPORTUNITY
                  </div>

                  <h3 className="text-xl font-bold mt-1">
                    Win Back {data.inactive_customers} Customers
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Launch a targeted re-engagement campaign.
                  </p>

                </div>

              </div>


              <button
                onClick={() => {
                  window.location.href = "/simulator";
                }}
                className="bg-[#087ff5] text-white
                           px-6 py-3 rounded-xl
                           font-bold hover:bg-blue-600
                           transition"
              >
                Simulate Campaign Impact →
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}