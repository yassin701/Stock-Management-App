"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
