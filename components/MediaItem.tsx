"use client";
import { Song } from "@/types";
import React from "react";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import usePlayer from "@/hooks/usePlayer";
import { useAtomValue } from "jotai";
import { isCollapsedAtom } from "@/lib/Atom";
interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const player = usePlayer();

  const isCollapsed = useAtomValue(isCollapsedAtom);
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
    //TODO: play song

    return player.setId(data.id);
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-muted w-full py-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill={true}
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover md:w-1/2"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div
        className={`${
          isCollapsed ? "hidden" : ""
        } flex flex-col gap-y-1 overflow-hidden`}
      >
        <p className="truncate">{data.title}</p>
        <p className="text-sm truncate text-muted-foreground">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
