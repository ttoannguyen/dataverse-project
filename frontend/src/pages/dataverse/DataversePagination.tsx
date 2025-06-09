import { useSearchParams } from "react-router-dom";

const DataversePagination = ({
  page,
  total,
  perPage,
}: {
  page: number;
  total: number;
  perPage: number;
}) => {
  const [, setParams] = useSearchParams();

  const totalPages = Math.ceil(total / perPage);

  const goTo = (newPage: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage.toString());
      return next;
    });
  };

  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => goTo(i + 1)}
          className={`px-3 py-1 rounded ${
            page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default DataversePagination;
