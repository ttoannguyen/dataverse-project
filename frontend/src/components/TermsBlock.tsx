import type { License } from "@/types/datasetInterface";

interface ChildProps {
  license: License;
}

const TermsBlock: React.FC<ChildProps> = ({ license }) => {
  return (
    <div className="border border-[#ccc] rounded-[5px] px-[20px] py-[10px]">
      <div className=" pl-4 pr-4">
        <div className="mb-4 text-[14px] grid grid-cols-[30%_70%] gap-4">
          <div className="font-bold">License/Data Use Agreement </div>
          <div className="text-justify ">
            Our Community Norms as well as good scientific practices expect that
            proper credit is given via citation. Please use the data citation
            shown on the dataset page.
            <div className="flex mt-8">
              <img src={license.iconUri} alt="" className="mr-8" />
              <a href={license.uri} className="text-hover-underline-blue">
                {license.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsBlock;
