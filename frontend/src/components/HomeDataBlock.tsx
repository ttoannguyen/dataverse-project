import formatDate from "@/helpers/format/formatDate";
import { Clock4 } from "lucide-react";
import { Link } from "react-router-dom";

interface ChildProps {
  data: any;
}

const HomeDataBlock: React.FC<ChildProps> = ({ data }) => {
  console.log(data);

  return (
    <div className="mt-[20px]">
      <Link to="/">
        <h3 className="font-bold text-[#6393d2] hover:text-black cursor-pointer transition duration-300 mb-2">
          {data.title}
        </h3>
      </Link>
      <p className="flex text-[12px] items-center">
        <Clock4 className="mr-2" size={14} />
        {formatDate(data.time)}
      </p>
      <p className="text-justify text-[14px] flex">
        {data?.image && (
          <img
            src={data.image}
            alt=""
            className="mt-[5px] mr-[10px] mb-[5px] border border-[#c8c8c8] p-[5px] max-w-[92px]"
          />
        )}

        {data.summary}
      </p>
    </div>
  );
};

export default HomeDataBlock;
