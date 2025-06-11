import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { debounce } from "lodash";

type Props = {
  onSearch?: (query: string) => void; // Callback tùy chọn để xử lý search
};

const Search = ({ onSearch }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (query && query.trim() !== "") {
      newSearchParams.set("q", query.trim());
    } else {
      newSearchParams.delete("q");
    }
    
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);

    
    if (onSearch) {
      onSearch(query.trim() || "");
    }
  };

  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex gap-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search dataverses, datasets, files..."
        className="flex-1 px-4 py-2 text-sm border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default Search;