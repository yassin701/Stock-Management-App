"use client";

import data from "../data/products.json"; // adjust path
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesByProductChart() {
  const salesData = data.Sales || []; // <-- grab the Sales array

  // Group sales by product
  const chartData = Object.values(
    salesData.reduce((acc, sale) => {
      if (!acc[sale.product]) {
        acc[sale.product] = { product: sale.product, quantity: 0 };
      }
      acc[sale.product].quantity += sale.quantity;
      return acc;
    }, {})
  );

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        No sales data to display
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Sales by Product</h2>
      <ResponsiveContainer width="70%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#e8deff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
