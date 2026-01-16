export default function StatsCards({ products }) {
  // Calculate counts
  const inStock = products.filter(p => p.status === "in_stock").length;
  const lowStock = products.filter(p => p.status === "low_stock").length;
  const outOfStock = products.filter(p => p.status === "out_of_stock").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      
      {/* Total Products */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm mb-1">Total Products</p>
        <p className="text-2xl font-bold">{products.length}</p>
      </div>
      
      {/* In Stock */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm mb-1">In Stock</p>
        <p className="text-2xl font-bold text-green-600">{inStock}</p>
      </div>
      
      {/* Low Stock */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm mb-1">Low Stock</p>
        <p className="text-2xl font-bold text-orange-500">{lowStock}</p>
      </div>
      
      {/* Out of Stock */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm mb-1">Out of Stock</p>
        <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
      </div>
      
    </div>
  );
}