"use client";

import AddToPlaylist from "@/app/liked/components/AddToPlaylist";
import LikeButton from "@/app/liked/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { likedTracks, SongDezzer, Tracks } from "@/types";
import { formatDuration } from "@/utilities/commonFunction";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaMusic } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";

interface LikedContentProps {
  songs: Tracks[];
}

export default function LikedContent({ songs }: LikedContentProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (songs.length === 0) {
    return (
      <div className="flex justify-center items-center px-3 py-2  text-black dark:text-white md:text-xl mt-16 md:mt-36  ">
        you have nothing liked songs !!
      </div>
    );
  }
  return (
    <section className="mt-20 mb-72 w-full px-3 md:px-6 ">
      <main className=" w-11/12 mx-auto flex justify-between items-center px-5  border-b-2 border-b-gray-300 dark:border-b-gray-500 pb-3">
        <div className=" flex-1 flex justify-start items-center gap-x-8 lg:gap-x-48 text-lg text-gray-700 dark:text-gray-400">
          <p>Track</p>
        </div>
        <div className=" flex justify-end items-center  gap-x-8 lg:gap-x-12">
          <MdOutlineWatchLater
            size={25}
            className=" text-black dark:text-white opacity-70"
          />
        </div>
      </main>
      <main className=" w-11/12 mx-auto flex flex-col gap-y-3    py-2 dark:border-b-gray-500 ">
        {songs.map((song) => (
          <div
            onClick={() => onPlay(song.song_id)}
            key={song.song_id}
            className="w-full  flex justify-between items-center gap-x-3 px-3 py-3 cursor-pointer hover:bg-purple-200 dark:hover:bg-slate-800 transition  rounded-md"
          >
            <div className=" basis-2/3 flex justify-start items-center gap-x-4 md:gap-x-8  text-lg text-black dark:text-white">
              <FaMusic size={20} className="text-purple-600 rounded-md" />
              <p className=" md:text-sm text-xs font-semibold truncate">
                {song.song_title}
              </p>
            </div>

            <div className="basis-1/3 flex justify-end items-center gap-x-2 md:gap-x-5 lg:gap-x-8">
              <div className=" flex items-center justify-end gap-x-6">
                <AddToPlaylist track={song} />
                <LikeButton track={song} />
              </div>
              <p className="w-11 text-center text-sm md:text-base">
                {formatDuration(song.duration)}
              </p>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}

// this for play music
{
  /* <MediaItem
  onClick={(id: string) => {
    onPlay(id);
  }}
  data={song} */
}
