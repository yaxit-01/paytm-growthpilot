"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "ai" | "user";
  text: string;
};

type DashboardData = {
  merchant: string;
  today_sales: number;
  average_daily_sales: number;
  transactions_today: number;
  total_customers: number;
  repeat_customer_count: number;
  repeat_customer_rate: number;
  inactive_customers: number;
  business_health: number;
  data_date: string;
};

type Opportunity = {
  title: string;
  priority: string;
  description: string;
  recommended_offer: string;
  target_customers: number;
  estimated_potential: number;
};

 const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function AssistantPage() {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [opportunity, setOpportunity] =
    useState<Opportunity | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text:
        "Hi Amit! 👋 I'm GrowthPilot, your AI business partner. I'm analyzing your store data to find the best growth opportunities.",
    },
  ]);

  const suggestions = [
    "How can I increase my sales?",
    "Find my biggest opportunity",
    "How can I get repeat customers?",
    "What should I do today?",
  ];

  // ============================================================
  // LOAD REAL BUSINESS DATA
  // ============================================================

  useEffect(() => {
    async function loadBusinessData() {
      try {
        const dashboardResponse = await fetch(
          `${API_URL}/dashboard`
        );

        if (!dashboardResponse.ok) {
          throw new Error("Dashboard request failed");
        }

        const dashboardData =
          await dashboardResponse.json();

        if (dashboardData.success === false) {
          throw new Error(
            dashboardData.error || "Dashboard error"
          );
        }

        setDashboard(dashboardData);

        const opportunityResponse = await fetch(
          `${API_URL}/opportunities`
        );

        if (opportunityResponse.ok) {
          const opportunityData =
            await opportunityResponse.json();

          if (
            opportunityData.success &&
            opportunityData.opportunities?.length
          ) {
            setOpportunity(
              opportunityData.opportunities[0]
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load business data:",
          error
        );
      }
    }

    loadBusinessData();
  }, []);

  // ============================================================
  // SEND MESSAGE TO GEMINI BACKEND
  // ============================================================

  async function sendMessage(message?: string) {
    const text = message ?? input;

    if (!text.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: text.trim(),
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.reply ||
            "AI service returned an error"
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);

      // Update business data from AI response
      if (data.business_data) {
        setDashboard(data.business_data);
      }
    } catch (error) {
      console.error("AI error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Sorry, I couldn't connect to GrowthPilot AI right now. Please make sure the backend is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number) {
    return `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;
  }

  return (
    <main className="min-h-screen bg-[#f5f9ff] text-[#10244f]">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white px-5 py-4">

        <div className="mx-auto flex max-w-[1250px] items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="text-3xl font-black">
              pay<span className="text-[#00b9f2]">tm</span>
            </div>

            <div className="h-8 w-px bg-slate-200" />

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

            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold">
                Amit Sharma
              </p>

              <p className="text-xs text-slate-400">
                {dashboard?.merchant ||
                  "Amit Fashion Store"}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1682f5] font-bold text-white">
              A
            </div>

          </div>

        </div>

      </header>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-[1250px] px-5 py-8 md:px-8">

        {/* BACK */}

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="mb-6 text-sm font-semibold text-[#087df5] hover:underline"
        >
          ← Back to Dashboard
        </button>

        {/* TITLE */}

        <div className="mb-7">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087df5] text-2xl text-white shadow-lg shadow-blue-200">
              ✨
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-[#087df5]">
                GrowthPilot AI
              </p>

              <h1 className="text-3xl font-black md:text-4xl">
                Your Business Partner
              </h1>

            </div>

          </div>

          <p className="mt-3 max-w-2xl text-slate-500">
            Ask questions about your business. GrowthPilot
            analyzes your sales and customer data and
            recommends what you should do next.
          </p>

        </div>

        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_0.8fr]">

          {/* ==================================================
              CHAT
          ================================================== */}

          <section className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* CHAT HEADER */}

            <div className="border-b border-slate-200 px-6 py-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="relative">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
                      ✦
                    </div>

                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />

                  </div>

                  <div>

                    <p className="font-bold">
                      GrowthPilot AI
                    </p>

                    <p className="text-xs text-green-600">
                      {loading
                        ? "Thinking..."
                        : "Online · Analyzing your business"}
                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  Gemini AI
                </span>

              </div>

            </div>

            {/* =================================================
                MESSAGES
            ================================================= */}

            <div className="flex-1 space-y-5 overflow-y-auto p-6">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {message.role === "ai" && (
                    <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      ✦
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] whitespace-pre-line rounded-2xl px-5 py-4 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-[#087df5] text-white"
                        : "rounded-bl-md bg-[#f2f6fb] text-slate-700"
                    }`}
                  >
                    {message.text}
                  </div>

                </div>

              ))}

              {/* LOADING */}

              {loading && (
                <div className="flex justify-start">

                  <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    ✦
                  </div>

                  <div className="rounded-2xl rounded-bl-md bg-[#f2f6fb] px-5 py-4 text-sm text-slate-500">
                    <span className="animate-pulse">
                      GrowthPilot is analyzing your data...
                    </span>
                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                SUGGESTIONS
            ================================================= */}

            <div className="border-t border-slate-100 px-5 pt-4">

              <p className="mb-3 text-xs font-semibold text-slate-400">
                TRY ASKING
              </p>

              <div className="flex flex-wrap gap-2">

                {suggestions.map((suggestion) => (

                  <button
                    key={suggestion}
                    onClick={() =>
                      sendMessage(suggestion)
                    }
                    disabled={loading}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {suggestion}
                  </button>

                ))}

              </div>

            </div>

            {/* =================================================
                INPUT
            ================================================= */}

            <div className="p-5">

              <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-400">

                <input
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }

                  }}
                  disabled={loading}
                  placeholder="Ask GrowthPilot anything..."
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400 disabled:opacity-50"
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={
                    loading ||
                    !input.trim()
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087df5] text-lg font-bold text-white hover:bg-[#066bd3] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ↑
                </button>

              </div>

              <p className="mt-2 text-center text-[10px] text-slate-400">
                GrowthPilot uses your business data and
                Gemini AI to generate recommendations.
              </p>

            </div>

          </section>

          {/* ==================================================
              RIGHT PANEL
          ================================================== */}

          <div className="space-y-5">

            {/* =================================================
                BUSINESS SNAPSHOT
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-bold">
                Business Snapshot
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Live data from your GrowthPilot backend
              </p>

              <div className="mt-5 space-y-4">

                <Snapshot
                  icon="₹"
                  label="Today's Sales"
                  value={
                    dashboard
                      ? formatCurrency(
                          dashboard.today_sales
                        )
                      : "Loading..."
                  }
                />

                <Snapshot
                  icon="↗"
                  label="Daily Average"
                  value={
                    dashboard
                      ? formatCurrency(
                          dashboard.average_daily_sales
                        )
                      : "Loading..."
                  }
                />

                <Snapshot
                  icon="▣"
                  label="Transactions"
                  value={
                    dashboard
                      ? dashboard.transactions_today.toLocaleString(
                          "en-IN"
                        )
                      : "Loading..."
                  }
                />

                <Snapshot
                  icon="♙"
                  label="Repeat Customers"
                  value={
                    dashboard
                      ? `${dashboard.repeat_customer_rate}%`
                      : "Loading..."
                  }
                />

              </div>

            </section>

            {/* =================================================
                OPPORTUNITY
            ================================================= */}

            <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  🎯
                </div>

                <div>

                  <p className="text-xs font-bold text-blue-600">
                    TOP OPPORTUNITY
                  </p>

                  <h2 className="font-bold">
                    {opportunity?.title ||
                      "Finding opportunity..."}
                  </h2>

                </div>

              </div>

              {opportunity ? (
                <>
                  <p className="mt-4 text-sm leading-6 text-slate-600">

                    <strong className="text-[#10244f]">
                      {opportunity.target_customers.toLocaleString(
                        "en-IN"
                      )}{" "}
                      customers
                    </strong>{" "}
                    could be targeted with a
                    personalized growth campaign.

                  </p>

                  <div className="mt-4 rounded-xl bg-white p-4">

                    <p className="text-xs text-slate-400">
                      RECOMMENDED ACTION
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {opportunity.recommended_offer}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Estimated potential:{" "}
                      {formatCurrency(
                        opportunity.estimated_potential
                      )}
                    </p>

                  </div>

                </>
              ) : (
                <div className="mt-4 rounded-xl bg-white p-4">

                  <p className="text-sm text-slate-500">
                    Loading your biggest growth
                    opportunity...
                  </p>

                </div>
              )}

              <button
                onClick={() => {
                  window.location.href =
                    "/simulator";
                }}
                className="mt-4 w-full rounded-xl bg-[#087df5] py-3 text-sm font-bold text-white hover:bg-[#066bd3]"
              >
                Simulate Impact →
              </button>

            </section>

            {/* =================================================
                HOW IT WORKS
            ================================================= */}

            <section className="rounded-2xl bg-[#061d4d] p-6 text-white">

              <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                How GrowthPilot Works
              </p>

              <div className="mt-5 space-y-4">

                <WorkStep
                  number="01"
                  title="Understand"
                  text="Analyzes your business data"
                />

                <WorkStep
                  number="02"
                  title="Diagnose"
                  text="Finds growth opportunities"
                />

                <WorkStep
                  number="03"
                  title="Recommend"
                  text="Suggests the next best action"
                />

                <WorkStep
                  number="04"
                  title="Simulate"
                  text="Predicts campaign impact"
                />

                <WorkStep
                  number="05"
                  title="Act"
                  text="Helps you execute"
                />

              </div>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}


/* ============================================================
   SNAPSHOT COMPONENT
============================================================ */

function Snapshot({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-sm font-bold">
          {value}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   WORKFLOW COMPONENT
============================================================ */

function WorkStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-xs font-bold text-blue-300">
        {number}
      </div>

      <div>

        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="text-xs text-blue-200/60">
          {text}
        </p>

      </div>

    </div>
  );
}