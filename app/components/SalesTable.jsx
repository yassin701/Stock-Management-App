"use client";

import products from "../data/products.json"; // adjust path

export default function SalesTable() {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="p-2 border">Product</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Quantity</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Date</th>
        </tr>
      </thead>
      <tbody>
        {products.map((sale) => (
          <tr key={sale.id} className="border-t">
            <td className="p-2">{sale.product}</td>
            <td className="p-2">{sale.category}</td>
            <td className="p-2">{sale.quantity}</td>
            <td className="p-2">${sale.price}</td>
            <td className="p-2">{sale.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
