"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { data } from "autoprefixer";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButton {
  songId: string | number;
}

export default function LikeButton({ songId }: LikeButton) {
  const [isLiked, setIsLiked] = useState(false);
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    async function fetchData() {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", songId)
        .single();

      if (data && !error) {
        setIsLiked(true);
      }
    }
    fetchData();
  }, []);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  async function handleClick() {
    if (!user) {
      return authModal.onOpen();
    }
    // delete or remove like music from table liked_songs
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success("Remove Songs");
      }
    }

    // insert like music to table liked_songs
    if (!isLiked) {
      const { error } = await supabaseClient.from("liked_songs").insert({
        user_id: user?.id,
        song_id: songId,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success(" liked!");
      }
    }
    router.refresh();
  }

  return (
    <div>
      <button onClick={handleClick} className=" opacity-65">
        <Icon color={isLiked ? "#7e22ce" : "white"} size={25} />
      </button>
    </div>
  );
}
