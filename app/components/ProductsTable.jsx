"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../Store/ProductsSlice";
import DeleteProductModal from "../components/DeleteProductModal";
import EditProductModal from "../components/EditProductModal";

export default function ProductsTable({ products, totalProducts }) {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const getStatusColor = (status) => {
    if (status === "in_stock") return "bg-green-100 text-green-800";
    if (status === "low_stock") return "bg-yellow-100 text-yellow-800";
    if (status === "out_of_stock") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <>
      {/* Mobile Cards Layout */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">${product.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500">Price</div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{product.quantity}</span>
                <span className="text-sm text-gray-500 ml-1">in stock</span>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                {product.status.replace("_", " ")}
              </span>
            </div>

            <div className="flex justify-end gap-4 mt-4 pt-3 border-t">
              <Link 
                href={`/products/${product.id}`}
                className="p-2 hover:bg-blue-50 rounded transition-colors"
              >
                <FiEye className="text-blue-500 text-lg" />
              </Link>
              <button 
                onClick={() => { setSelectedProduct(product); setShowEdit(true); }}
                className="p-2 hover:bg-orange-50 rounded transition-colors"
              >
                <FiEdit className="text-orange-500 text-lg" />
              </button>
              <button 
                onClick={() => { setSelectedProduct(product); setShowDelete(true); }}
                className="p-2 hover:bg-red-50 rounded transition-colors"
              >
                <FiTrash2 className="text-red-500 text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-hidden rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{product.quantity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                      {product.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link 
                        href={`/products/${product.id}`}
                        className="p-2 hover:bg-blue-50 rounded transition-colors"
                        title="View"
                      >
                        <FiEye className="text-blue-500" />
                      </Link>
                      <button 
                        onClick={() => { setSelectedProduct(product); setShowEdit(true); }}
                        className="p-2 hover:bg-orange-50 rounded transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="text-orange-500" />
                      </button>
                      <button 
                        onClick={() => { setSelectedProduct(product); setShowDelete(true); }}
                        className="p-2 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-3">📦</div>
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center md:text-left">
          Showing <span className="font-medium">{products.length}</span> of{" "}
          <span className="font-medium">{totalProducts}</span> products
        </p>
      </div>

      {/* DELETE MODAL */}
      {showDelete && selectedProduct && (
        <DeleteProductModal
          isOpen={showDelete}
          productName={selectedProduct.name}
          onClose={() => {
            setShowDelete(false);
            setSelectedProduct(null);
          }}
          onConfirm={() => {
            dispatch(deleteProduct(selectedProduct.id));
            setShowDelete(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* EDIT MODAL */}
      {showEdit && selectedProduct && (
        <EditProductModal
          isOpen={showEdit}
          product={selectedProduct}
          onClose={() => {
            setShowEdit(false);
            setSelectedProduct(null);
          }}
          onSave={(updatedProduct) => {
            dispatch(updateProduct(updatedProduct));
            setShowEdit(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}