"use client";

import data from "../data/products.json"; 

export default function SalesTable() {
  // Access the array inside the 'Sales' key
  const salesList = data.Sales || [];

  return (
    <div className="overflow-x-auto shadow rounded-lg border">
      <table className="w-full text-left border-collapse bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 border-b font-semibold text-gray-700">Product</th>
            <th className="p-3 border-b font-semibold text-gray-700">Category</th>
            <th className="p-3 border-b font-semibold text-gray-700">Quantity</th>
            <th className="p-3 border-b font-semibold text-gray-700">Price</th>
            <th className="p-3 border-b font-semibold text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody>
          {salesList.length > 0 ? (
            salesList.map((sale, index) => (
              <tr key={sale.id || index} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 border-b">{sale.product}</td>
                <td className="p-3 border-b text-gray-600">{sale.category}</td>
                <td className="p-3 border-b">{sale.quantity}</td>
                <td className="p-3 border-b text-green-600 font-medium">${sale.price}</td>
                <td className="p-3 border-b text-gray-500 text-sm">{sale.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No sales data found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}