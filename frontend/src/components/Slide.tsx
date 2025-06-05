import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

const Slide = () => {
  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay, EffectFade]}
      effect={"fade"}
      spaceBetween={50}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="relative">
          <img
            className="object-cover w-full h-[400px]"
            src="https://www.w3schools.com/howto/img_nature_wide.jpg"
            alt=""
          />

          <div className="absolute top-0 right-[50%] h-full bg-black/75 text-white p-5">
            <p className="font-bold text-[24px] mb-4">
              Empowering Women Environmental Defenders’ Voices through Data
              Storytelling
            </p>
            <p className="text-justify">
              In today’s ever-changing world, where we navigate a landscape
              overflowing with information, the ability to make sense of data
              and use it for informed decision-making becomes essential. Yet for
              many Women Environmental Defenders (WED), their stories are often
              lost or told in ways that dehumanize them and in some
              circumstances vilify them. By focusing on building capacity for
              data literacy and storytelling, we can help WED to take control of
              their own narratives.
            </p>
            <Link to="/" className="text-[#3b8ed7]">
              Continue Reading
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img
            className="object-cover w-full h-[400px]"
            src="https://wowslider.com/sliders/demo-51/data1/images/car.jpg"
            alt=""
          />
          <div className="absolute top-0 right-[50%] h-full bg-black/75 text-white p-5">
            <p className="font-bold text-[24px] mb-4">
              Empowering Women Environmental Defenders’ Voices through Data
              Storytelling
            </p>
            <p className="text-justify">
              In today’s ever-changing world, where we navigate a landscape
              overflowing with information, the ability to make sense of data
              and use it for informed decision-making becomes essential. Yet for
              many Women Environmental Defenders (WED), their stories are often
              lost or told in ways that dehumanize them and in some
              circumstances vilify them. By focusing on building capacity for
              data literacy and storytelling, we can help WED to take control of
              their own narratives.
            </p>
            <Link to="/" className="text-[#3b8ed7]">
              Continue Reading
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slide;
