 "use client"
import { products } from "../data/products";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "in_stock": return "bg-green-100 text-green-800";
      case "low_stock": return "bg-orange-100 text-orange-800";
      case "out_of_stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    return status.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your inventory ({filteredProducts.length} products)
          </p>
        </div>
        
        <div className="flex gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Add Product Button */}
          <Link
            href="/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-gray-800">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">In Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {products.filter(p => p.status === "in_stock").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Low Stock</p>
          <p className="text-2xl font-bold text-orange-600">
            {products.filter(p => p.status === "low_stock").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.status === "out_of_stock").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Product</th>
                <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                <th className="text-left p-4 font-semibold text-gray-700">Price</th>
                <th className="text-left p-4 font-semibold text-gray-700">Quantity</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Name with potential for image */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Product image placeholder */}
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">📦</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: #{product.id}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <span className="font-semibold text-gray-800">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.quantity}</span>
                      {product.quantity <= 5 && (
                        <span className="text-xs text-orange-600">⚠️ Low</span>
                      )}
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}
                    >
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      {/* View */}
                      <Link 
                        href={`/products/${product.id}`}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="View Details"
                      >
                        <FiEye className="text-blue-500 group-hover:text-blue-700" />
                      </Link>
                      
                      {/* Edit */}
                      <button
                        className="p-2 hover:bg-orange-50 rounded-lg transition-colors group"
                        title="Edit Product"
                      >
                        <FiEdit className="text-orange-500 group-hover:text-orange-700" />
                      </button>
                      
                      {/* Delete */}
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Delete Product"
                      >
                        <FiTrash2 className="text-red-500 group-hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? `No products matching "${searchTerm}"`
              : "Add your first product to get started"}
          </p>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          ) : (
            <Link
              href="/products/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FiPlus />
              Add First Product
            </Link>
          )}
        </div>
      )}
    </div>
  );
}