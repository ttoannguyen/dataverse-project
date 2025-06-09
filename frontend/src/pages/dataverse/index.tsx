import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DataverseList from "./DataverseList";
import DataversePagination from "./DataversePagination";
import { getCountData, getDataverses } from "@/services/DataverseApi";
import { type DataverseItem } from "./types";
import type { CountData } from "@/types/Dataverse/dataverse";
import DataverseSideBar from "./DataverseSideBar";

const DataversePage = () => {
  const [params] = useSearchParams();

  const q = params.get("q") ?? "*";
  const sort = params.get("sort") ?? "date";
  const order = params.get("order") ?? "desc";
  const page = parseInt(params.get("page") ?? "1");
  const perPage = parseInt(params.get("per_page") ?? "10");
    const type = params.get("type") ?? undefined;

    const [items, setItems] = useState<DataverseItem[]>([]);
    const [total, setTotal] = useState(0);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const [numberCountSideBar, setNumberCountSideBar] = useState<CountData>({
      totalDataverses: 0,
      totalDatasets: 0,
      totalFiles: 0,
      rootDataverse: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);

      Promise.all([
        getDataverses({
          q,
          sort,
          order,
          page,
          perPage,
          type,
        }),
        getCountData(),
      ])
        .then(([dataRes, countRes]) => {
          setItems(dataRes.items);
          setTotal(dataRes.total);
          setNumberCountSideBar(countRes);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [q, sort, order, page, perPage, type]);

  

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
    );
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) => {
      if (checked) {
        return [...prev, type];
      } else {
        return prev.filter((t) => t !== type);
      }
    });
  };

  return (
    <div className="flex gap-4">
      <DataverseSideBar
        data={numberCountSideBar}
        selectedTypes={selectedTypes}
        onTypeChange={handleTypeChange}
      />

      <div className="flex-1">
        <DataverseList items={items} />
        <DataversePagination page={page} total={total} perPage={perPage} />
      </div>
    </div>
  );
};

export default DataversePage;
