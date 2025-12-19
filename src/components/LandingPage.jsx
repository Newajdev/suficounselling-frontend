// import image from "../assets/background.png"

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Autoplay } from "swiper/modules";


const StaticLanding = () => {

  const navLink = [
    {
      pathname: "/",
      title: "Home",
    },
    {
      pathname: "/about",
      title: "About",
    },
    {
      pathname: "/gallery",
      title: "Gallery",
    },
  ];
  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-screen h-screen overflow-auto"
    >
      <div className="max-w-10/12 mx-auto ">
        {/* Navbar */}
        <div className="py-3 flex items-center justify-between">
          <img
            className="w-24"
            src="/Logo.png"
            alt="DIRI Sufi Counsilling Center Logo"
          />
          <div>
            <ul className="flex gap-x-12 text-xl text-[#1F3B45]">
              {navLink.map((link, idx) => (
                <li key={idx} className={`${link.pathname === ""}`}>{link.title}</li>
              ))}
            </ul>
          </div>
          <button className="bg-[#1F3B45] text-white px-8 text-2xl py-2 rounded-2xl">
            Contact us
          </button>
        </div>
        {/* Navbar */}
        {/* Hero Section */}
        <div className="flex justify-between items-center px-32 py-32">
          <div className="w-[80%] ">
            <h1 className="text-8xl font-black text-[#224047]">
              DIRI Sufi Counselling Center
            </h1>
            <p className="text-5xl font-medium ml-2 mt-6 text-[#315e68e2]">
              (Wellspring of Life)
            </p>
          </div>
          <div className="w-[500px]">
            <Swiper
              effect={"flip"}
              grabCursor={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[EffectFlip, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="/Patron.png" />
                <div className="-mt-2 text-[#1F3B45]">
                  <p className="text-center text-xl font-bold">The Patron</p>
                  <h3 className="text-center  text-2xl font-bold">
                    Syed Emdadul Hoque Maizbhandari (M.)
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <img src="/Suppervisor.png" />
                <div className="-mt-2 text-[#1F3B45]">
                  <p className="text-center text-xl font-bold">
                    The Suppervisor
                  </p>
                  <h3 className="text-center  text-2xl font-bold">
                    Syed Irfanul Hoque Maizbhandari
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        {/* Hero Section */}
      </div>
    </div>
  );
};

export default StaticLanding;
