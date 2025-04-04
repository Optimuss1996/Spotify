"use client";

import { useGetSongDeezerById } from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

export default function Player() {
  const { activeId } = usePlayer();
  // const { song } = useGetSongDeezerById(activeId);
  const { song } = useGetSongDeezerById(activeId);
  console.log("🚨track by id :", song);
  if (!song || !activeId) {
    return null;
  }

  return (
    <div className=" w-full h-[80px] px-6 py-3 fixed bottom-0 border-t  border-gray-400 border-opacity-75 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
      <PlayerContent key={song.song_id} song={song} />
    </div>
  );
}
