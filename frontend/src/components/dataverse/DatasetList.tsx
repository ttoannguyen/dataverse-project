import type { Dataset } from "../../types/dataset";

interface DatasetListProps {
  datasets: Dataset[];
}

const DatasetList: React.FC<DatasetListProps> = ({ datasets }) => {
  if (datasets.length === 0) {
    return <p className="text-center text-gray-600">No datasets found.</p>;
  }

  return (
    <div className="space-y-4">
      {datasets.map((dataset) => (
        <div
          key={dataset.global_id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {dataset.name}
          </h3>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            {dataset.metadata?.country && (
              <p>Country: {dataset.metadata.country}</p>
            )}
            {dataset.metadata?.language && (
              <p>Language: {dataset.metadata.language}</p>
            )}
            {dataset.metadata?.format && (
              <p>Format: {dataset.metadata.format}</p>
            )}
            {dataset.metadata?.organization && (
              <p>Organization: {dataset.metadata.organization}</p>
            )}
            {dataset.metadata?.topic && <p>Topic: {dataset.metadata.topic}</p>}
            {dataset.metadata?.license && (
              <p>License: {dataset.metadata.license}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatasetList;
