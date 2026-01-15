import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 border rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}