"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../Store/ProductsSlice";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    status: "in_stock",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numbers
    const product = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    // Dispatch to Redux (asyncThunk will send POST)
    await dispatch(addProduct(product));

    // Reset form
    setFormData({ name: "", category: "", price: "", quantity: "", status: "in_stock" });

    // Redirect to products page
    router.push("/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded">
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
}
