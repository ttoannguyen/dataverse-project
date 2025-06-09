import { type DataverseItem } from "./types";

const DataverseList = ({ items }: { items: DataverseItem[] }) => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.global_id} className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p>{item.description}</p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            View
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DataverseList;
