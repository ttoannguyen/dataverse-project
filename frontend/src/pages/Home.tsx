import Slide from "@/components/Slide";
import newsData from "../../test/newsData.json";
import publicAnnouncementsData from "../../test/publicAnnouncementsData.json";
import topicData from "../../test/topicData.json";
import siteUpdateData from "../../test/siteUpdateData.json";
import HomeDataBlock from "@/components/HomeDataBlock";
import formatDate from "@/helpers/format/formatDate";
import { Clock4 } from "lucide-react";

const Home = () => {
  return (
    <div className="container mx-auto px-4 mt-10">
      <Slide />
      <div className="grid grid-cols-2 gap-12">
        <div className="mt-4">
          <h2 className="text-[20px] font-bold mt-[10px] mb-[10px]">News</h2>

          {newsData.map((data, index) => (
            <HomeDataBlock key={index} data={data} />
          ))}

          <div className="mt-4 text-[#6393d2] hover:text-black cursor-pointer transition duration-300 text-right">
            More...
          </div>
        </div>

        <div className="mt-4">
          <div className="">
            <h2 className="text-[20px] font-bold mt-[10px] mb-[10px]">
              Site Update
            </h2>

            {siteUpdateData.map((data, index) => (
              <HomeDataBlock key={index} data={data} />
            ))}

            <div className="mt-4 text-[#6393d2] hover:text-black cursor-pointer transition duration-300 text-right">
              More...
            </div>
          </div>

          <div className="">
            <h2 className="text-[20px] font-bold mt-[10px] mb-[10px]">
              Public announcements
            </h2>

            {publicAnnouncementsData.map((data, index) => (
              <HomeDataBlock key={index} data={data} />
            ))}

            <div className="mt-4 text-[#6393d2] hover:text-black cursor-pointer transition duration-300 text-right">
              More...
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[20px] font-bold mt-[10px] mb-[10px]">Topics</h2>
        <div className="grid grid-cols-4  gap-4">
          {topicData &&
            topicData.map((topic, index) => (
              <div className="relative h-[170px] overflow-hidden" key={index}>
                <img
                  src={topic.image}
                  alt=""
                  className=" h-full object-cover  transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 w-full bg-[rgba(0,0,0,0.3)] z-[2] text-white px-[10px] py-[5px] ">
                  <p className="cursor-pointer  text-[14px]  font-medium mb-2">
                    {topic.title}
                  </p>
                  <p className="text-[12px] flex">
                    <Clock4 className="mr-2" size={14} />

                    {formatDate(topic.time)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
