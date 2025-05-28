import {
  FaDatabase,
  FaFileAlt,
  FaGavel,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import type { Filters, FilterOptions } from "../../types/dataset";

interface SidebarFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filterOptions: FilterOptions;
}

const SidebarFilter = ({
  filters,
  setFilters,
  filterOptions,
}: SidebarFilterProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const searchResults = [
    {
      name: "Datasets",
      count: filterOptions?.datasets?.length || 0,
      icon: <FaDatabase />,
    },
    { name: "Library", count: 1366, icon: <FaFileAlt /> },
    { name: "Laws", count: 175, icon: <FaGavel /> },
    { name: "Profiles", count: 4, icon: <FaUser /> },
    { name: "Maps", count: 6, icon: <FaMapMarkerAlt /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-gray-800 text-lg mb-3">
          Search Results
        </h2>
        <ul className="space-y-3">
          {searchResults.map((result) => (
            <li key={result.name} className="flex items-center text-gray-700">
              <span className="mr-2 text-indigo-600">{result.icon}</span>
              <button
                onClick={() => handleCategoryChange(result.name)}
                className={`${
                  filters.category === result.name
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700"
                } hover:text-indigo-500 transition-colors duration-200`}
              >
                {result.name} ({result.count})
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        {[
          {
            label: "Country",
            name: "country",
            options: filterOptions.countries,
          },
          {
            label: "Language",
            name: "language",
            options: filterOptions.languages,
          },
          { label: "Format", name: "format", options: filterOptions.formats },
          {
            label: "Organization",
            name: "organization",
            options: filterOptions.organizations,
          },
          { label: "Topic", name: "topic", options: filterOptions.topics },
          {
            label: "License",
            name: "license",
            options: filterOptions.licenses,
          },
        ].map(({ label, name, options }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <select
              name={name}
              value={filters[name as keyof Filters]}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              {(options || []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;
