"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiTrash2, FiEdit } from "react-icons/fi";

import { deleteProduct, updateProduct } from "@/app/Store/ProductsSlice";
import DeleteProductModal from "@/app/components/DeleteProductModal";
import EditProductModal from "@/app/components/EditProductModal";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const product = useSelector((state) =>
    state.products.items.find((p) => String(p.id) === String(id))
  );

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft />
            <span>Back</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEdit(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Product Name & Status */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                {product.status.replace("_", " ")}
              </span>
              <span className="text-sm text-gray-500">
                ID: {product.id}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product.category}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-500">Price</span>
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-500">Quantity</span>
              <span className="font-medium">{product.quantity}</span>
            </div>

            <div className="pt-3">
              <h3 className="text-gray-500 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t text-sm text-gray-500">
            Created: {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-"}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDelete && (
        <DeleteProductModal
          isOpen={showDelete}
          productName={product.name}
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            dispatch(deleteProduct(product.id));
            setShowDelete(false);
            router.push("/products");
          }}
        />
      )}

      {/*Edit Modal */}
      {showEdit && (
        <EditProductModal
        isOpen={showEdit}
        product = {product}
        onClose={() => setShowEdit(false)}
        onSave={(updated) => {
       dispatch(updateProduct(updated));
       setShowEdit(false)
        }}
        />
      )}
    </>
  );
}