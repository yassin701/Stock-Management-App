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
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg border flex justify-between items-center">
            
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">{product.category}</div>
            </div>

            <div className="text-center">
              <div className="font-bold">${product.price.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Price</div>
            </div>

            <div className="text-center">
              <div className="font-bold">{product.quantity}</div>
              <div className="text-sm text-gray-500">Stock</div>
            </div>

            <div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(product.status)}`}>
                {product.status.replace("_", " ")}
              </span>
            </div>

            <div className="flex gap-3">
              <Link href={`/products/${product.id}`}>
                <FiEye className="text-blue-500" />
              </Link>
              <button onClick={() => { setSelectedProduct(product); setShowEdit(true); }}>
                <FiEdit className="text-orange-500" />
              </button>
              <button onClick={() => { setSelectedProduct(product); setShowDelete(true); }}>
                <FiTrash2 className="text-red-500" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Showing {products.length} of {totalProducts} products
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
