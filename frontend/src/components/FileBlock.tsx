import type { DatasetFile, MetadataBlocks } from "@/types/datasetInterface";
import { Download } from "lucide-react";
import React from "react";

interface ChildProps {
  metadata: MetadataBlocks | null;
  files: DatasetFile[] | null;
}

const FileBlock: React.FC<ChildProps> = ({ metadata, files }) => {
  return (
    <div>
      <div className="border-b border-[#ccc]">Files</div>
      <div className="border  border-[#ccc]">
        <div className="flex justify-between">
          <input className="w-[10px] h-[10px]" type="checkbox" name="" id="" />
          <span className="w-[80%]">1 to 10 of 20 Files</span>
          <button className="flex">
            <Download />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileBlock;
