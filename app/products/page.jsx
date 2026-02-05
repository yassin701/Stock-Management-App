"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchProducts } from "../Store/ProductsSlice";
import Header from "../components/Header"
import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  // Show all products in the products table (including sold items)
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );



  if (status === "loading") {
    return <div className="p-6">Loading products...</div>;
  }



  return (
    <div className="p-6">
      <Header
        title="Products"
        subtitle={`Manage your inventory (${filteredProducts.length} products)`}
        actionButton={
          <Link
            href="/new"
            className="btn btn-primary"
          >
            <span>+</span> Add
          </Link>
        }
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search products..."
        />
      </Header>

      <ProductsTable
        products={filteredProducts}
        totalProducts={products.length}
      />
    </div>
  );
}