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
    const colors = {
      in_stock: "bg-green-100 text-green-800",
      low_stock: "bg-orange-100 text-orange-800",
      out_of_stock: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <div className="bg-white rounded border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">ID #{product.id}</div>
                </td>

                <td className="p-3">{product.category}</td>
                <td className="p-3 font-semibold">
                  ${product.price.toFixed(2)}
                </td>
                <td className="p-3">{product.quantity}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status.replace("_", " ")}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  <Link href={`/products/${product.id}`}>
                    <FiEye className="text-blue-500 cursor-pointer" />
                  </Link>

                  <FiEdit
                    className="text-orange-500 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEdit(true);
                    }}
                  />

                  <FiTrash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDelete(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products found
          </div>
        ) : (
          <div className="p-3 bg-gray-50 border-t text-sm text-gray-600">
            Showing {products.length} of {totalProducts} products
          </div>
        )}
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
