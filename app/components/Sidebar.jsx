"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBoxOpen,
  FaChartBar,
  FaPlus,
  FaBoxes,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <FaBoxOpen className="text-blue-400" />
          Stock Manager
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="text-white text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          backdrop-blur-lg bg-gray-900/80
          border-r border-gray-700/50 p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}
        <div className="mb-10 pl-2">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaBoxOpen className="text-blue-400" />
            Stock Manager
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 group hover:translate-x-2"
          >
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FaChartBar className="text-blue-400 text-lg" />
            </div>
            <span className="text-gray-300 group-hover:text-white">
              Dashboard
            </span>
          </Link>

          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 group hover:translate-x-2"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <FaBoxes className="text-purple-400 text-lg" />
            </div>
            <span className="text-gray-300 group-hover:text-white">
              Products
            </span>
          </Link>

          <Link
            href="/new"
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 hover:shadow-lg transition-all duration-300 group hover:translate-x-2"
          >
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FaPlus className="text-green-400 text-lg" />
            </div>
            <span className="text-gray-300 group-hover:text-white">
              Add Product
            </span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
