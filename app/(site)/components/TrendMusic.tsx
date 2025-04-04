"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { type Tracks } from "@/types";
import { IoMdPlay } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
interface SongsProps {
  songs: Tracks[];
}

export default function TrendMusic({ songs }: SongsProps) {
  return (
    <div className="w-full  my-8 md:mb-10">
      <p className=" font-bold text-start text-lg md:text-xl px-4 mb-8">
        Trending Musics
      </p>
      <Swiper
        slidesPerView={2} // Show 3 on small screens
        spaceBetween={5}
        loop={true}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          450: { slidesPerView: 2, spaceBetween: 5 }, // Small devices (phones)
          640: { slidesPerView: 3, spaceBetween: 5 }, // Big Device (phones)
          768: { slidesPerView: 3, spaceBetween: 5 }, // Small screens
          1024: { slidesPerView: 4, spaceBetween: 10 }, // Large screens
          1280: { slidesPerView: 5, spaceBetween: 10 }, // Extra large screens
        }}
        className="w-full"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.song_id}>
            <div className="flex flex-col gap-y-2 items-start justify-center ">
              <div className="w-40 md:w-36 xl:w-48 2xl:w-56 h-auto  flex justify-center items-center transition-all duration-300 ease-in-out  cursor-pointer shadow-[0px_4px_14px_1px_rgba(17,_12,_46,_0.15)] relative hover:opacity-60  group-hover:scale-105">
                <img
                  src={song.artist.picture_medium}
                  alt={song.song_title}
                  className="w-full h-full rounded-lg "
                />
                <div className="flex justify-start items-center gap-x-1 absolute bottom-2 right-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <IoMdPlay
                    className="text-black bg-purple-800 p-2 rounded-full"
                    size={40}
                  />
                  <CiHeart
                    className="text-black bg-purple-800 p-2 rounded-full"
                    size={40}
                  />
                </div>
              </div>
              <div className="pl-1 flex flex-col gap-y-1 text-start cursor-pointer">
                <span className="text-base  truncate">
                  {song.song_titleShort}
                </span>
                <span className="text-sm  opacity-65 truncate">
                  {song.artist.name}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
