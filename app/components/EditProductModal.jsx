"use client";

import { useEffect, useState } from "react";

export default function EditProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}) {
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Product name"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Category"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Price"
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Quantity"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
