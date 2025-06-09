/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { type DataverseItem } from "./types";

const DataverseList = ({ items }: { items: DataverseItem[] }) => {
  console.log(items);
  return (
    <ul className="space-y-6">
      {items.map((item, index) => {
        switch (item.type) {
          case "dataset":
            return (
              <li
                key={item.global_id}
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Dataset: {item.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Authors:</span>{" "}
                  {(item.authors || []).join(", ")}
                </p>
                <p className="text-gray-600 mb-3">{item.description}</p>
                {/* <a
                  href={`dataset?persistentId=${item.global_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View dataset
                </a> */}

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
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
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
  );
};

export default DataverseList;
