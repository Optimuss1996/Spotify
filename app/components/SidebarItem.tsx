import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemprops {
  icon: IconType;
  label: string;
  href?: string;
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: SidebarItemprops) {
  return (
    <Link
      href={href as string}
      className={twMerge(
        ` flex items-center gap-x-4 h-auto w-full text-md font-medium hover:bg-purple-200 dark:bg-gray-900 rounded-md cursor-pointer transition text-black dark:text-white py-1 px-2    dark:hover:bg-purple-500 `
      )}
    >
      <Icon size={30} className=" dark:text-white " />
      <p className=" truncate w-full">{label}</p>
    </Link>
  );
}
