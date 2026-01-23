"use client";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function SalesByProductChart() {
  // Build chart data from Redux products that have `sold > 0`
  const products = useSelector((state) => state.products.items || []);
  const soldProducts = products.filter((p) => Number(p.sold || 0) > 0);
  const chartData = soldProducts.map((p) => ({ product: p.name, quantity: Number(p.sold || 0) }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow text-center text-gray-500">
        No sales data to display
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales by Product</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis 
              dataKey="product" 
              fontSize={12}
            />
            <YAxis 
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '12px'
              }}
            />
            <Bar 
              dataKey="quantity" 
              fill="#baccc7"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 flex justify-between">
        <p>Products: {chartData.length}</p>
        <p>Total Sales: {chartData.reduce((sum, item) => sum + Number(item.quantity || 0), 0)} units</p>
      </div>
    </div>
  );
}