import { useNavigate, NavLink, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import usePropertyStore from "./../../store/property.store";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Location from "./Location";
import Features from "./Features";

const InfoMain = () => {
  const { getPropertyInfo, info, infoLoading } = usePropertyStore();
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    getPropertyInfo(id);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  const renderImageGallery = () => {
    if (isMobile) {
      return (
        <div>
          <div>
            <IoMdArrowRoundBack
              className="size-5 text-blue-600 text-lg"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="mb-8">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className="h-[400px] rounded-xl shadow-md"
            >
              {info.images?.map((image, index) => (
                <SwiperSlide key={index} className="w-full h-[400px]">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="w-full h-[400px] object-cover hover:opacity-95 transition-opacity"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      );
    }

    // For desktop view
    if (info.images?.length <= 2) {
      return (
        <div>
          <IoMdArrowRoundBack
            className="size-6 mb-4 text-blue-600 text-lg"
            onClick={() => navigate(-1)}
          />

          <div className="grid grid-cols-2 gap-6 mb-8">
            {info.images?.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-md w-full h-[400px]"
              >
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-8">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={2}
          className="h-[400px] rounded-xl shadow-md"
        >
          {info.images?.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-[400px]">
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  if (infoLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-xl font-semibold">Loading...</div>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto p-4 lg:p-8">
      {renderImageGallery()}
      {/* Property Details */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
            {info.title}
          </h1>
          <span className="px-6 py-2 bg-green-100 text-green-800 rounded-full capitalize w-fit text-sm font-semibold shadow-sm">
            {info.status}
          </span>
        </div>

        <p className="text-2xl sm:text-3xl font-bold text-blue-600">
          ₹{info?.price?.toLocaleString()}
        </p>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          {info.description}
        </p>

        {/* Features */}
        <Features info={info} />

        {/* Location */}
        <Location info={info} />
      </div>
    </main>
  );
};

export default InfoMain;
