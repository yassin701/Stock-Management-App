"use client";

import data from "../data/products.json";

export default function SalesTable() {
  const salesList = data.Sales || [];

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Qty
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {salesList.length > 0 ? (
              salesList.map((sale, index) => (
                <tr
                  key={sale.id || index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {sale.product}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {sale.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {sale.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ${sale.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {sale.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No sales data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {salesList.length > 0 ? (
          salesList.map((sale, index) => (
            <div
              key={sale.id || index}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {sale.product}
                </h3>
                <span className="text-sm font-medium text-green-600">
                  ${sale.price}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                Category: {sale.category}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Qty: {sale.quantity}
                </span>
                <span className="text-xs text-gray-500">{sale.date}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
            No sales data found.
          </div>
        )}
      </div>
    </div>
  );
}
