import { useNavigate, useParams } from "react-router-dom";
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
import { motion } from "framer-motion";
import useMessageStore from "../../store/message.store";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAuthStore } from "../../store/auth.store";

const InfoMain = () => {
  const { user } = useAuthStore();
  const { getPropertyInfo, info, infoLoading, addWatchList, removeWatchList } =
    usePropertyStore();
  const { addFriends } = useMessageStore();
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const navigate = useNavigate();

  const handelButtonClick = (id) => {
    addFriends(id, navigate);
  };

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);

    if (isInWatchlist) {
      removeWatchList(id);
    } else {
      addWatchList(id);
    }
  };

  useEffect(() => {
    getPropertyInfo(id);

    function checkIsInWatchlist() {
      setIsInWatchlist(user?.watchlist?.includes(id));
    }

    checkIsInWatchlist();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const renderImageGallery = () => {
    if (isMobile) {
      return (
        <motion.div {...fadeIn}>
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
        </motion.div>
      );
    }

    if (info.images?.length <= 2) {
      return (
        <motion.div {...fadeIn}>
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
        </motion.div>
      );
    }

    return (
      <motion.div {...fadeIn} className="mb-8">
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
      </motion.div>
    );
  };

  if (infoLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[60vh]"
      >
        <div className="animate-pulse text-xl font-semibold">Loading...</div>
      </motion.div>
    );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-4 lg:p-8"
    >
      <IoMdArrowRoundBack
        className="size-7 mb-5 text-blue-600 text-lg"
        onClick={() => navigate(-1)}
      />
      {renderImageGallery()}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
            {info.title}
          </h1>
          <span className="px-6 py-2 bg-green-100 text-green-800 rounded-full capitalize w-fit text-sm font-semibold shadow-sm">
            {info.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            ₹{info?.price?.toLocaleString()}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleWatchlistToggle}
              className=" rounded-full px-[6px] py-[1px] hover:bg-gray-100 transition-colors border-[1px]"
              title={
                isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
              }
            >
              {isInWatchlist ? (
                <MdFavorite className="text-red-500 mt-[5px] size-6" />
              ) : (
                <MdFavoriteBorder className="text-gray-600 mt-[5px] size-6" />
              )}
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 transition-colors">
              <span
                className="text-xl max-sm:text-sm underline"
                onClick={() => handelButtonClick(info.owner)}
              >
                Contact
              </span>
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          {info.description}
        </p>

        <Features info={info} />

        <Location info={info} />
      </motion.div>
    </motion.main>
  );
};

export default InfoMain;
