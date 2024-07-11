"use client";

import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { TbMusicCode, TbPiano } from "react-icons/tb";

import { useMemo, useState } from "react";
import Box from "@/components/Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { isCollapsedAtom } from "@/lib/Atom";
import { useAtomValue } from "jotai";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const isCollapsed = useAtomValue(isCollapsedAtom);
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname == "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: TbMusicCode,
        label: "Code",
        active: pathname === "/code",
        href: "/code",
      },
      {
        icon: TbPiano,
        label: "Piano",
        active: pathname === "/piano",
        href: "/piano",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div
        className={`hidden md:flex flex-col gap-y-2  h-full ${
          isCollapsed ? "w-[90px]" : "w-[300px]"
        } p-2`}
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto  py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
