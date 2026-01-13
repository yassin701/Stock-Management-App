import Link from "next/link";
import { 
  FaBoxOpen, 
  FaChartBar, 
  FaPlus, 
  FaBoxes 
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 backdrop-blur-lg bg-gray-900/80 border-r border-gray-700/50 p-6">
      <div className="mb-10 pl-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FaBoxOpen className="text-blue-400" />
          Stock Manager
        </h1>
      </div>

      <nav className="space-y-3">
        <Link 
          href="/" 
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 group hover:translate-x-2"
        >
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FaChartBar className="text-blue-400 text-lg" />
          </div>
          <span className="text-gray-300 group-hover:text-white">Dashboard</span>
        </Link>
        
        <Link 
          href="/products" 
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 group hover:translate-x-2"
        >
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <FaBoxes className="text-purple-400 text-lg" />
          </div>
          <span className="text-gray-300 group-hover:text-white">Products</span>
        </Link>
        
        <Link 
          href="/new" 
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 group hover:translate-x-2"
        >
          <div className="p-2 bg-green-500/20 rounded-lg">
            <FaPlus className="text-green-400 text-lg" />
          </div>
          <span className="text-gray-300 group-hover:text-white">Add Product</span>
        </Link>
      </nav>
    </aside>
  );
}