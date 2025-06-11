import type {
  DatasetInterface,
  MetadataBlocks,
} from "@/types/datasetInterface";
import React from "react";

interface ChildProps {
  metadata: MetadataBlocks | null;
  dataset: DatasetInterface | null;
}
const MetadataBlock: React.FC<ChildProps> = ({ metadata, dataset }) => {
  console.log(metadata);

  return (
    <div className="border border-[#ccc] rounded-[5px] px-[20px] py-[10px]">
      <div className=" pl-4 pr-4">
        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Persistent Identifier </div>
          <div className="text-justify ">
            {dataset?.data.latestVersion.datasetPersistentId}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Publication Date </div>
          <div className="text-justify ">{dataset?.data.publicationDate}</div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Title </div>
          <div className="text-justify ">
            {metadata?.citation.fields[0].value}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Author </div>
          <div className="text-justify ">
            {metadata?.citation.fields[1].value[0].authorName.value +
              " (" +
              metadata?.citation.fields[1].value[0].authorAffiliation.value +
              ")"}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Description</div>
          <div className="text-justify ">
            {metadata?.citation.fields[3].value[0].dsDescriptionValue.value}
          </div>
        </div>

        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">Subject</div>
          <div>{metadata && metadata.citation.fields[4].value.join("; ")}</div>
        </div>
      </div>
    </div>
  );
};

export default MetadataBlock;
