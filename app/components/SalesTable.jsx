"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function SalesTable() {
  // Use products from Redux and filter sold > 0
  const products = useSelector((state) => state.products.items || []);
  const salesList = products.filter((p) => Number(p.sold || 0) > 0);
  const [filterCategory, setFilterCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(salesList.map(sale => sale.category))];

  // Filter sales
  const filteredSales = filterCategory === "all" 
    ? salesList 
    : salesList.filter(sale => sale.category === filterCategory);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900">Sales History</h2>
          
          {/* Category Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Summary */}
        <p className="text-gray-600">
          Showing {filteredSales.length} sales
          {filterCategory !== "all" && ` in ${filterCategory}`}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{sale.name}</td>
                <td className="p-3">{sale.category}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {sale.sold}
                  </span>
                </td>
                <td className="p-3 font-medium text-green-600">
                  ${sale.price}
                </td>
                <td className="p-3 text-gray-500">{sale.createdAt ? new Date(sale.createdAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredSales.map((sale, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{sale.name}</h3>
                <p className="text-sm text-gray-500">{sale.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">${sale.price}</div>
                <div className="text-sm text-gray-500">{sale.createdAt ? new Date(sale.createdAt).toLocaleDateString() : '-'}</div>
              </div>
            </div>
            <div className="mt-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Quantity: {sale.sold}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSales.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No sales found</p>
          {filterCategory !== "all" && (
            <button
              onClick={() => setFilterCategory("all")}
              className="mt-2 text-blue-600 hover:underline"
            >
              Show all categories
            </button>
          )}
        </div>
      )}
    </div>
  );
}