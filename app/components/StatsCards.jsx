export default function StatsCards({ products }) {
  const stats = [
    { title: "Total Products", value: products.length },
    { 
      title: "In Stock", 
      value: products.filter(p => p.status === "in_stock").length,
      color: "text-green-600" 
    },
    { 
      title: "Low Stock", 
      value: products.filter(p => p.status === "low_stock").length,
      color: "text-orange-600" 
    },
    { 
      title: "Out of Stock", 
      value: products.filter(p => p.status === "out_of_stock").length,
      color: "text-red-600" 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded border">
          <p className="text-gray-600 text-sm">{stat.title}</p>
          <p className={`text-xl font-bold ${stat.color || "text-gray-800"}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}