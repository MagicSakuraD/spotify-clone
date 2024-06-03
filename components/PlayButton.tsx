import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <div className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 hover:scale-100">
      <FaPlay />
    </div>
  );
};

export default PlayButton;
