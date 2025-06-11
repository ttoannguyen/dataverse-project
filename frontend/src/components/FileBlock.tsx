import type { DatasetFile, MetadataBlocks } from "@/types/datasetInterface";
import { Check, ClipboardCopy, Download } from "lucide-react";
import React, { useState } from "react";
import fileImg from "../assets/img/muti_file_icon.png";
import DatasetFilePagination from "./pagination/datasetFilePagination";
import formatBytes from "@/helpers/format/formatSizeData";
import formatDate from "@/helpers/format/formatDate";
import { Link } from "react-router-dom";

interface ChildProps {
  metadata: MetadataBlocks | null;
  files: DatasetFile[] | null;
}

const FileBlock: React.FC<ChildProps> = ({ metadata, files }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedId, setCheckedId] = useState<number | null>(null);

  const offset = currentPage * itemsPerPage;

  let currentItems: DatasetFile[] = [];
  let pageCount: number = 0;

  if (files) {
    if (files.length > 10) {
      currentItems = files.slice(offset, offset + itemsPerPage);
      pageCount = Math.ceil(files.length / itemsPerPage);
    } else {
      currentItems = files;
      pageCount = 1;
    }
  }

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 10000);
    });
  };

  console.log(currentPage + 1 === pageCount);

  return (
    <div>
      <div className="border  border-[#ccc]">
        <div className="flex justify-between p-4 bg-[#f5f5f5] items-center border-b  border-[#ccc]">
          <input
            className="w-[20px] h-[20px] cursor-pointer pl-2"
            type="checkbox"
            name=""
            id=""
          />

          {files?.length < 11 ? (
            <span className="w-[80%]">
              1 to {files?.length} of {files?.length} Files
            </span>
          ) : (
            <>
              {currentPage + 1 === pageCount ? (
                <span className="w-[80%]">
                  {currentPage * itemsPerPage + 1} to {files?.length} of{" "}
                  {files?.length} Files
                </span>
              ) : (
                <span className="w-[80%]">
                  {currentPage * itemsPerPage + 1} to{" "}
                  {(currentPage + 1) * itemsPerPage} of {files?.length} Files
                </span>
              )}
            </>
          )}

          <button
            className="flex cursor-pointer mr-2 bg-gradient-to-b from-white to-[#e0e0e0] bg-repeat-x border border-[#ccc] px-[10px] py-[5px] hover:text-[#333] hover:bg-[#e6e6e6] hover:border-[#adadad] rounded-[5px]"
            style={{ textShadow: "0 1px 0 #fff" }}
          >
            <Download />
            Download
          </button>
        </div>

        {currentItems.length !== 0 &&
          currentItems.map((currentItem, index) => (
            <div
              className={
                checkedId === currentItem.dataFile.id
                  ? "flex background-[#ffffcc]"
                  : "flex"
              }
              key={index}
            >
              <div className="flex justify-center items-center border-r border-b  border-[#ccc] w-[5%]">
                <input
                  type="checkbox"
                  className="w-[20px] h-[20px] cursor-pointer"
                />
              </div>
              <div className="flex justify-between items-center  w-[95%] py-2 border-b border-[#ccc]">
                <div className="flex justify-between items-center ">
                  <img
                    src={fileImg}
                    alt=""
                    className="w-[62px] h-[62px] mr-4"
                  />
                  <div className="text-[14px]">
                    <Link
                      to={`/file?fileId=${currentItem.dataFile.id}`}
                      className="text-hover-underline-blue cursor-pointer"
                    >
                      {currentItem.label}
                    </Link>
                    <p className="text-[85%] color-[#707070]">
                      {currentItem.dataFile.friendlyType} -{" "}
                      {formatBytes(currentItem.dataFile.filesize)}
                    </p>
                    <p className="text-[85%] color-[#707070]">
                      Published{" "}
                      {formatDate(currentItem.dataFile.publicationDate)}
                    </p>
                    {/* <p className="text-[85%]color-[#707070]">2 Downloads</p> */}
                    <p className="text-[85%] color-[#707070] flex items-center">
                      {currentItem.dataFile.checksum.type +
                        " " +
                        currentItem.dataFile.checksum.value}
                      {copiedId === currentItem.dataFile.checksum.value ? (
                        <Check
                          size={18}
                          color="#00CC00"
                          className="transition duration-300 ml-2
"
                        />
                      ) : (
                        <ClipboardCopy
                          size={18}
                          className="cursor-pointer transition duration-300 ml-2"
                          onClick={() =>
                            handleCopy(currentItem.dataFile.checksum.value)
                          }
                        />
                      )}
                    </p>
                  </div>
                </div>
                <div className="pr-4 cursor-pointer">
                  <Download size={40} className="text-hover-blue " />
                </div>
              </div>
            </div>
          ))}
      </div>

      {files?.length > 10 && (
        <DatasetFilePagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default FileBlock;
