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
    <div className="bg-white p-6 rounded-xl shadow h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-3 h-3 rounded-full ${loading ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
        <h3 className="font-bold text-lg text-gray-800">
          AI Sales Insight
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${loading ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
          {loading ? 'Analyzing...' : 'Live'}
        </span>
      </div>

      <hr className="mb-4 border-gray-200" />

      <div className="h-64 md:h-72 overflow-y-auto p-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-sm">Generating insights...</p>
            <p className="text-gray-500 text-xs mt-2">This may take a moment</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-3 text-sm text-red-600">
                {error}
                <div>
                  <button
                    onClick={() => {
                      setLoading(true);
                      setError(null);
                      setText("Analyzing sales with AI...");
                      // trigger effect by re-running fetch: call the same fetch logic
                      fetch("/api/gemini-sales", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ sales: soldProducts }),
                      })
                        .then(async (res) => {
                          const result = await res.json().catch(() => ({}));
                          if (!res.ok) throw new Error(result?.text || result?.error || "Server Error");
                          setText(result.text || "No analysis available");
                        })
                        .catch((err) => {
                          console.error("Fetch error:", err);
                          setError(err.message || "AI Analysis currently unavailable. Please try again.");
                          setText("AI analysis unavailable.");
                        })
                        .finally(() => setLoading(false));
                    }}
                    className="ml-2 underline text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <div className="prose prose-sm max-w-none text-gray-700">
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 border-t pt-3">
        <p>AI analysis based on {soldProducts.length} sales records</p>
        <p className="mt-1">Updated in real-time as new data arrives</p>
      </div>
    </div>
  );
}