import type { Filters } from "../../types/dataset";

interface SearchBarProps {
  className?: string;
  keyword: string;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  keyword,
  setFilters,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, keyword: e.target.value }));
  };

  return (
    <div className={`relative ${className || ""}`}>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="Search datasets by keyword..."
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
