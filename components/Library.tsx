"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useAtom } from "jotai";
import { isCollapsedAtom } from "@/lib/Atom";
interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onClick = () => {
    if (!user) {
      authModal.onOpen();
    }
    //TODO: check for subscription
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div
        className="
    flex
    items-center
    justify-between 
    px-5
    py-4"
      >
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist
            size={26}
            className="text-neutral-400 hover: cursor-pointer"
            onClick={toggleCollapse}
          />
          <span
            className={`${
              isCollapsed ? "hidden" : ""
            } text-md font-medium text-neutral-400`}
          >
            Your Library
          </span>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className={`${
            isCollapsed ? "hidden" : ""
          } text-neutral-400 cursor-pointer hover:text-white transition`}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            data={song}
            onClick={(id: string) => {
              onPlay(id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
