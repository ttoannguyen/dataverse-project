/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { type DataverseItem } from "./types";

const DataverseList = ({
  items,
  loading,
}: {
  items: DataverseItem[];
  loading?: boolean;
}) => {
  return (
    <div className="relative">
      {/* Overlay loading nếu đang tải */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <div className="text-gray-600 text-sm animate-pulse">
            Đang tải dữ liệu...
          </div>
        </div>
      )}

      <ul
        className={`space-y-1 transition-opacity duration-300 ${
          loading ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {items.map((item, index) => {
          switch (item.type) {
            case "dataset":
              return (
                <li
                  key={item.global_id}
                  className="p-4 bg-white border shadow-xs"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Dataset: {item.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Authors:</span>{" "}
                    {(item.authors || []).join(", ")}
                  </p>
                  <p className="text-gray-600 mb-3">{item.description}</p>

                  <Link
                    to={`/dataset?persistentId=${encodeURIComponent(
                      item.global_id
                    )}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View dataset
                  </Link>
                </li>
              );

            case "file":
              return (
                <li
                  key={item.file_id}
                  className="p-4 bg-white border shadow-xs"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    File: {item.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Type:</span> {item.file_type}
                  </p>
                  <p className="text-gray-600 mb-3">
                    <span className="font-medium">Size:</span>{" "}
                    {item.size_in_bytes?.toLocaleString()} bytes
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Download file
                  </a>
                </li>
              );

            default:
              return (
                <li
                  key={`unknown-${index}`}
                  className="border rounded-lg p-4 shadow-sm bg-red-50 text-red-700"
                >
                  <p>Unknown type: {(item as any).type ?? "N/A"}</p>
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
};

export default DataverseList;
