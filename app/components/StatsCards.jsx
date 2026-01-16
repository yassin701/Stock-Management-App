"use client";

import data from "@/app/data/products.json";

export default function StatsCards() {
  const products = data.products || [];
  const sales = data.Sales || [];

  // 1️⃣ Total stock (sum of quantities)
  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.quantity || 0),
    0
  );

  // 2️⃣ Total stock value
  const totalStockValue = products.reduce(
    (sum, p) => sum + Number(p.quantity || 0) * Number(p.price || 0),
    0
  );

  // 3️⃣ Products sold
  const productsSold = sales.reduce(
    (sum, s) => sum + Number(s.quantity || 0),
    0
  );

  // 4️⃣ Sales value
  const salesValue = sales.reduce(
    (sum, s) => sum + Number(s.quantity || 0) * Number(s.price || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Total Stock */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Stock</p>
        <p className="text-2xl font-bold">{totalStock}</p>
      </div>

      {/* Stock Value */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Stock Value</p>
        <p className="text-2xl font-bold">
          ${totalStockValue.toFixed(2)}
        </p>
      </div>

      {/* Products Sold */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Products Sold</p>
        <p className="text-2xl font-bold">{productsSold}</p>
      </div>

      {/* Sales Value */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Sales Value</p>
        <p className="text-2xl font-bold">
          ${salesValue.toFixed(2)}
        </p>
      </div>

    </div>
  );
}
