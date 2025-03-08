import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Playlist;
  onClick: (id: string) => void;
}
export default function MediaItem({ data, onClick }: MediaItemProps) {
  const imageUrl = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className=" flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/050 w-full p-2 rounded-md  hover:bg-purple-200"
    >
      <div className=" relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        {" "}
        <Image
          src={imageUrl || "../../../public/Default-icon-music.png"}
          fill
          alt="Music"
          className=" object-cover"
        />
      </div>
      <div className=" flex flex-col gap-y-1 overflow-hidden">
        <p className="text-black truncate font-bold">{data.title}</p>
        <p className=" text-neutral-900 text-sm truncate ">
          {data.description}
        </p>
      </div>
    </div>
  );
}
