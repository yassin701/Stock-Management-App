// components/SalesDashboard.jsx
"use client";

import SalesByProductChart from "./SalesByProductChart";
import AiSalesInsight from "./AiSalesInsight";

export default function SalesDashboard() {
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Sales analytics with AI insights
        </p>
      </div>

      {/* SIDE BY SIDE layout - changed from vertical */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart - Left side */}
        <div className="lg:w-1/2">
          <SalesByProductChart />
        </div>
        
        {/* AI Insights - Right side */}
        <div className="lg:w-1/2">
          <AiSalesInsight />
        </div>
      </div>
    </div>
  );
}