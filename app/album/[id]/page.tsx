import Information from "../components/Information";
import Tracks from "../components/Tracks";
import {
  getAlbumDeezerApi,
  getAlbumTracksDezzerApi,
} from "@/action/getAlbumDezzerApi";
import { AlbumType } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: " Album Page",
};

export default async function PlaylistPage({ params }: PageProps) {
  const { id } = await params;
  const [albumInfo, albumTracks] = await Promise.all([
    getAlbumDeezerApi(Number(id)),
    getAlbumTracksDezzerApi(Number(id)),
  ]);

  return (
    <div className=" bg-white dark:bg-slate-800/30  w-full h-full overflow-hidden overflow-y-auto ">
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information albumInfo={albumInfo as AlbumType} />
        <Tracks albumTracks={albumTracks} />
      </div>
    </div>
  );
}
