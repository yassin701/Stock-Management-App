"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Store/ProductsSlice";

export default function StatsCards() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items) || [];

  useEffect(() => {
    if (!products || products.length === 0) dispatch(fetchProducts());
  }, [dispatch]);

  const allProducts = products;

  const totalStock = products.reduce((sum, p) => sum + Number(p.quantity || 0), 0);
  const totalStockValue = products.reduce(
    (sum, p) => sum + Number(p.quantity || 0) * Number(p.price || 0),
    0
  );

  // Compute sold totals from products[].sold
  const productsSold = allProducts.reduce((sum, p) => sum + Number(p.sold || 0), 0);
  const salesValue = allProducts.reduce(
    (sum, p) => sum + Number(p.sold || 0) * Number(p.price || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Total Stock</p>
        <p className="text-2xl font-bold">{totalStock}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Stock Value</p>
        <p className="text-2xl font-bold">${totalStockValue.toFixed(2)}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Products Sold</p>
        <p className="text-2xl font-bold">{productsSold}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p className="text-sm text-gray-500">Sales Value</p>
        <p className="text-2xl font-bold">${salesValue.toFixed(2)}</p>
      </div>
    </div>
  );
}
