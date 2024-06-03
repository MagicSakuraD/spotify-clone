"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import React from "react";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  // Destructure the props object to access the data property
  const imagePath = useLoadImage(data); // Pass the data property to the useLoadImage function
  return <div>SongItem</div>;
};

export default SongItem;
