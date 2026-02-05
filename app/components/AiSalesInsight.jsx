"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

export default function AiSalesInsight() {
  const [text, setText] = useState("Analyzing sales with AI...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // compute sold products from Redux store so analysis updates with changes
  const products = useSelector((state) => state.products.items || []);
  const soldProducts = products.filter((p) => Number(p.sold || 0) > 0);

  useEffect(() => {
    // wait for data to be available
    if (soldProducts.length === 0) return;

    // Send only sold products for AI analysis
    setLoading(true);
    setError(null);

    fetch("/api/gemini-sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sales: soldProducts }),
    })
      .then(async (res) => {
        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = result?.text || result?.error || "Server Error";
          throw new Error(msg);
        }
        setText(result.text || "No analysis available");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message || "AI Analysis currently unavailable. Please try again.");
        setText("AI analysis unavailable.");
      })
      .finally(() => setLoading(false));
  }, [soldProducts.length]);

  return (
    <div className="card h-full flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-primary-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            {loading && <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-75"></div>}
          </div>
          <h3 className="font-semibold text-gray-800 tracking-tight">
            AI Sales Analyst
          </h3>
        </div>
        <span className={`badge ${loading ? 'badge-warning' : 'badge-success'} shadow-sm`}>
          {loading ? 'Processing' : 'Live Insight'}
        </span>
      </div>

      {/* Body */}
      <div className="card-body flex-1 overflow-hidden flex flex-col bg-slate-50/50">
        <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="relative mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-primary-100 border-t-primary-600 animate-spin"></div>
              </div>
              <p className="text-gray-500 text-sm font-medium">Analyzing sales data...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex flex-col gap-2">
                  <p>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="self-start text-xs font-semibold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors"
                  >
                    Retry Connection
                  </button>
                </div>
              )}

              <div className="prose prose-sm prose-slate max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => <p className="text-gray-600 leading-relaxed mb-3" {...props} />,
                    strong: ({ node, ...props }) => <span className="font-semibold text-gray-900" {...props} />,
                    li: ({ node, ...props }) => <li className="text-gray-600 my-1" {...props} />,
                    ul: ({ node, ...props }) => <ul className="my-2 pl-4 list-disc marker:text-primary-500" {...props} />
                  }}
                >
                  {text}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>Based on {soldProducts.length} transactions</span>
          <span className="flex items-center gap-1">
            SalesOS Intelligent Engine
          </span>
        </div>
      </div>
    </div>
  );
}