/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import SidebarFilter from "../components/dataverse/SideBar";
import DatasetList from "../components/dataverse/DatasetList";
import SearchBar from "../components/dataverse/SearchBarFilter";
import { filterDatasets } from "../lib/filterDatasets";
import dataverseApi from "../services/DataverseApi";
import type {
  Dataset,
  Filters,
  DataverseCounts,
  FilterOptions,
} from "../types/dataset";

export default function DataversePage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filtered, setFiltered] = useState<Dataset[]>([]);
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    country: "",
    language: "",
    format: "",
    organization: "",
    topic: "",
    license: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    datasets: [],
    countries: [],
    languages: [],
    formats: [],
    organizations: [],
    topics: [],
    licenses: [],
  });
  const [counts, setCounts] = useState<DataverseCounts>({
    totalDataverses: 0,
    totalDatasets: 0,
    totalFiles: 0,
    rootDataverse: { dataverses: 0, datasets: 0, files: 0 },
  });
  const datasetsPerPage = 5;

  const debouncedFilter = useCallback(
    debounce((datasets: Dataset[], filters: Filters) => {
      const filteredData = filterDatasets(datasets, filters);
      setFiltered(filteredData);
      setCurrentPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const init = await dataverseApi.init();
        console.log(init);
        const countsResponse = await dataverseApi.getCounts();
        setCounts(countsResponse);

        const datasetsResponse = await dataverseApi.getDatasets();
        const fetchedDatasets: Dataset[] = Array.isArray(datasetsResponse)
          ? datasetsResponse
          : [];

        setDatasets(fetchedDatasets);
        setFiltered(fetchedDatasets);

        const countries = [
          ...new Set(
            fetchedDatasets
              .map((ds) => ds.metadata?.country)
              .filter((c): c is string => Boolean(c))
          ),
        ];
        const languages = [
          ...new Set(
            fetchedDatasets
              .map((ds) => ds.metadata?.language)
              .filter((l): l is string => Boolean(l))
          ),
        ];
        const formats = [
          ...new Set(
            fetchedDatasets
              .map((ds) => ds.metadata?.format)
              .filter((f): f is string => Boolean(f))
          ),
        ];
        const organizations = [
          ...new Set(
            fetchedDatasets
              .map((ds) => ds.metadata?.organization)
              .filter((o): o is string => Boolean(o))
          ),
        ];
        const topics = [
          ...new Set(
            fetchedDatasets
              .map((ds) => ds.metadata?.topic)
              .filter((t): t is string => Boolean(t))
          ),
        ];
        const licenses = [
          ...new Set(
            fetchedDatasets
              .map((ds) => ds.metadata?.license)
              .filter((l): l is string => Boolean(l))
          ),
        ];

        setFilterOptions({
          datasets: fetchedDatasets,
          countries,
          languages,
          formats,
          organizations,
          topics,
          licenses,
        });

        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Không thể tải dữ liệu");
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (datasets.length > 0) {
      debouncedFilter(datasets, filters);
    }
  }, [filters, datasets, debouncedFilter]);

  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = filtered.slice(
    indexOfFirstDataset,
    indexOfLastDataset
  );
  const totalPages = Math.ceil(filtered.length / datasetsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading datasets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Dataverse Explorer
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Total Counts
              </h4>
              <p className="text-sm text-gray-700">
                Dataverses:{" "}
                <span className="font-bold">{counts.totalDataverses}</span>
              </p>
              <p className="text-sm text-gray-700">
                Datasets:{" "}
                <span className="font-bold">{counts.totalDatasets}</span>
              </p>
              <p className="text-sm text-gray-700">
                Files: <span className="font-bold">{counts.totalFiles}</span>
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Root Dataverse
              </h4>
              <p className="text-sm text-gray-700">
                Dataverses:{" "}
                <span className="font-bold">
                  {counts.rootDataverse.dataverses}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Datasets:{" "}
                <span className="font-bold">
                  {counts.rootDataverse.datasets}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Files:{" "}
                <span className="font-bold">{counts.rootDataverse.files}</span>
              </p>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <SearchBar
            className="w-full sm:w-80"
            keyword={filters.keyword}
            setFilters={setFilters}
          />
          <button
            onClick={() =>
              setFilters({
                keyword: "",
                country: "",
                language: "",
                format: "",
                organization: "",
                topic: "",
                license: "",
              })
            }
            className="w-full sm:w-auto px-6 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors duration-300"
          >
            Clear Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50">
          <aside className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 md:col-span-1">
            <SidebarFilter
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />
          </aside>
          <section className="md:col-span-3">
            <DatasetList datasets={currentDatasets} />
            {filtered.length > datasetsPerPage && (
              <div className="flex justify-center mt-6 space-x-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-indigo-900 text-white rounded-md disabled:bg-gray-400 hover:bg-indigo-800 transition-colors duration-300"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-indigo-900 text-white rounded-md disabled:bg-gray-400 hover:bg-indigo-800 transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
