import datasetApi from "@/services/DatasetApi";
import type {
  DatasetInterface,
  MetadataBlocks,
} from "@/types/datasetInterface";
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

// import "../../assets/icon/fontawesome/css/all.min.css";
// import defaultFile from "../../assets/img/muti_file_icon.png";
// import "../../global.css";

const Dataset = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const persistentId = searchParams.get("persistentId");
  const location = useLocation();
  const navigate = useNavigate();

  const [dataset, setDataset] = useState<DatasetInterface | null>(null);
  const [metadata, setMetadata] = useState<MetadataBlocks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathParts = location.pathname.split("/");
  const datasetId = pathParts[pathParts.length - 1];
  const [isOpen, setIsOpen] = useState(false);
  const [accessIsOpen, setAccessIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const getDatasetItem = async (): Promise<void> => {
      // setLoading(true);
      // if (!persistentId) return;
      // const temp: DatasetInterface | null = await datasetApi.getDataset(
      //   persistentId,
      //   setError
      // );

      // if (temp) {
      //   setDataset(temp);
      //   setMetadata(temp.data.latestVersion.metadataBlocks);
      // }
      // setLoading(false);

      await axios
        .get(
          `http://localhost:3000/api/v1/dataverseItem/getDataset?global_id=${persistentId}`
        )
        .then((res) => {
          setDataset(res.data.data);
          setMetadata(res.data.data.data.latestVersion.metadataBlocks);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setError(true);
        });
    };

    getDatasetItem();
  }, [persistentId]);

  if (metadata) {
    console.log(metadata.citation.fields[0].value);
  }

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading dataset...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // if (!dataset) {
  //   return (
  //     <div className="p-4">
  //       <h2 className="text-xl font-semibold text-red-600">
  //         Dataset not found
  //       </h2>
  //       <p>The dataset with ID "{datasetId}" does not exist.</p>
  //     </div>
  //   );
  // }

  // const { metadata, data, type } = dataset;
  // console.log(dataset);

  return (
    <div className="p-4">
      <div className="text-base pt-[28px] pb-[28px] px-0">
        <Link
          className="block text-hover-underline-blue  mt-[5px] text-[18px] mb-[10px]"
          to={"/"}
        >
          {/* {metadata.topic} */}
        </Link>
        {/* <p style={{ color: "#666666" }}>{"(" + metadata.organization + ")"}</p> */}
      </div>

      <div className="">
        <Link to={"/"} className="text-hover-underline-blue">
          CTU Dataverse
        </Link>{" "}
        {/* &gt; <span className="text-hover-underline-blue">{metadata.topic}</span> */}
      </div>

      {metadata && (
        <h1 className="text-[36px] leading-[1.1] font-bold mt-4 mb-0">
          {metadata?.citation?.fields[0]?.value}
        </h1>
      )}

      {/* <span className="label-default">{metadata.license}</span> */}
      <div className="grid grid-cols-[75%_25%] gap-4">
        <div className=" pt-4 pm-4 text-sm">
          <div className="p-4 custom-light-blue grid grid-cols-[15%_85%] ">
            <div className="w-full text-xl ">
              {/* <img src={defaultFile} alt="" /> */}
            </div>
            <div className="pl-4">
              <div>
                Hsu, Jennifer, 2025, "Being Chinese in Australia 2021 release",
                <Link
                  to={"https://doi.org/10.26193/ZPBVNW"}
                  className="text-hover-link-blue"
                >
                  {" "}
                  https://doi.org/10.26193/ZPBVNW
                </Link>
                , ADA Dataverse, V1
              </div>

              <div className="grid grid-cols-[30%_70%] ">
                <div className=" pt-4">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdown}
                      className="cursor-pointer flex items-center text-hover-underline-blue "
                    >
                      <p className="relative">
                        {" "}
                        Cite Dataset
                        <i className="fa-solid fa-sort-down absolute left-[105%]"></i>
                      </p>
                    </button>

                    {isOpen && (
                      <div className="absolute z-10 mt-2 w-44 bg-white rounded shadow-lg border border-[#ccc]">
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 underline hover:bg-gray-100 hover:no-underline "
                        >
                          {/* {metadata.format} */}
                        </a>
                        {/* <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 underline hover:bg-gray-100 hover:no-underline "
                          >
                            RIS
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 underline hover:bg-gray-100 hover:no-underline "
                          >
                            Bib TeX
                          </a> */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-left pt-4">
                  Learn about{" "}
                  <Link to={"/"} className="text-hover-link-blue">
                    Data Citation Standards
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pl-4 pr-4">
            <div className=" grid grid-cols-[15%_85%] gap-4">
              <div className="font-bold">Description</div>
              {/* <div>{metadata.description}</div> */}
            </div>

            <div className=" mt-4 grid grid-cols-[15%_85%] gap-4">
              <div className="font-bold">Subject</div>
              {/* <div>{type}</div> */}
            </div>

            <div className="mt-4 grid grid-cols-[15%_85%] gap-4">
              <div className="font-bold">Related Publication </div>
              <div>haha</div>
            </div>

            <div className="mt-4 grid grid-cols-[15%_85%] gap-4">
              <div className="font-bold">License/Data Use Agreement</div>
              {/* <div>{metadata.license}</div> */}
            </div>
          </div>
        </div>
        <div className="pt-4 pm-4">
          <div className="relative inline-block text-left w-full">
            <button
              onClick={() => setAccessIsOpen(!accessIsOpen)}
              className="cursor-pointer flex justify-center items-center w-full p-2 primary-btn"
            >
              <p className="relative h-full">
                Access Dataset
                <i className="fa-solid fa-sort-down absolute left-[105%]"></i>
              </p>
            </button>

            {accessIsOpen && (
              <div className="absolute z-10 mt-1 w-[90%] left-[10%] bg-white border border-[#ccc] rounded shadow-lg p-4">
                <p className="pl-4 text-[13px]">
                  Download Options
                  <i className="ml-2 fa-solid fa-download"></i>
                </p>

                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Download ZIP (12.2MB)
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 mb-[14px]">
            <button className="default-btn  flex justify-center items-center cursor-pointer ">
              Contact Owner
            </button>
            <button className="default-btn  bg-red-100 flex justify-center items-center cursor-pointer ">
              Share
            </button>
          </div>

          <div className="text-sm">
            <div> Dataset Metrics </div>
            <div className="p-4 border-l border-r border-b border-gray-300">
              {" "}
              13 Downloads{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dataset;
