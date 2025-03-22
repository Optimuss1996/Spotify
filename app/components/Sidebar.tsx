"use client";

import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Playlist } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import Logo from "./Logo";
import { useUser } from "@/hooks/useUser";
import LoginNotice from "./LoginNotice";
import useIsOpenSidebar from "@/hooks/useIsOpenSidebar";
import { AiOutlineClose } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  children: React.ReactNode;
  playlists: Playlist[];
}

export default function Sidebar({ children, playlists }: SidebarProps) {
  const { activeId } = usePlayer();
  const { user } = useUser();
  const isOpenSidebar = useIsOpenSidebar();

  return (
    <div
      className={twMerge(
        `flex mx-auto h-screen max-w-[1536px] `,
        activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div
        className={`flex flex-col gap-y-2 bg-white dark:bg-slate-950 z-40 fixed top-0 left-0 h-full w-[240px]  lg:w-[280px] p-2 shadow-lg transition-transform duration-500 ease-in-out
          ${
            isOpenSidebar.isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative `}
      >
        <Box>
          <div className=" flex justify-between md:justify-center items-center my-3 px-3">
            <div className=" ">
              <button
                onClick={isOpenSidebar.toggleSidebar}
                className="md:hidden  bg-purple-700 text-white p-1 rounded-full"
              >
                <AiOutlineClose size={15} />
              </button>
            </div>
            <div className=" flex justify-center items-center w-36 h-10 md:mt-4">
              <Logo />
            </div>
          </div>
          <div className=" flex flex-col gap-y-4 px-4 py-5">
            <SidebarItem key="Home" label="Home" icon={HiHome} href="/" />
            <div className="flex items-center gap-x-3 h-auto w-full text-md font-medium hover:bg-purple-200 dark:bg-gray-900 rounded-md cursor-pointer transition text-black dark:text-white py-1 px-2 dark:hover:bg-purple-500  ">
              <ThemeToggle />
              <p>Dark mood</p>
            </div>
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          {!user ? <LoginNotice /> : <Library playlists={playlists} />}
        </Box>
      </div>

      <main className=" flex-1 h-full overflow-y-auto p-1 ">{children}</main>
    </div>
  );
}
