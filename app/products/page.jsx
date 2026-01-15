"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Store/ProductsSlice";
import Header from "../components/Header"
import StatsCards from "../components/StatsCards";
import ProductsTable from "../components/ProductsTable";
import SearchBar from "../components/SearchBar";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



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
          <a 
            href="/products/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </a>
        }
      >
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search products..." 
        />
      </Header>

      <StatsCards products={products} />

      <ProductsTable 
        products={filteredProducts} 
        totalProducts={products.length} 
      />
    </div>
  );
}