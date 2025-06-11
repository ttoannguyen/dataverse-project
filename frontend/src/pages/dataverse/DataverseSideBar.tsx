import type { CountData } from "@/types/Dataverse/dataverse";

type Props = {
  data: CountData;
  selectedTypes: string[];
  onTypeChange: (type: string, checked: boolean) => void;
};

const DataverseSideBar = ({ data, selectedTypes, onTypeChange }: Props) => {
  const check = (type: string) => selectedTypes.includes(type);

  return (
    <div className="flex flex-col text-sm p-2 gap-2">
      <label className="flex items-center gap-2 ">
        <input
          type="checkbox"
          checked={check("dataverse")}
          onChange={(e) => onTypeChange("dataverse", e.target.checked)}
        />
        <p>Dataverses: {data.totalDataverses}</p>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={check("dataset")}
          onChange={(e) => onTypeChange("dataset", e.target.checked)}
        />
        Datasets: {data.totalDatasets}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={check("file")}
          onChange={(e) => onTypeChange("file", e.target.checked)}
        />
        Files: {data.totalFiles}
      </label>
    </div>
  );
};

export default DataverseSideBar;
