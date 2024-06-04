import { Song } from "@/types";
import { createClient } from "@/utils/supabase/client";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = createClient();

  if (!song) return "";

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);
  return songData.publicUrl;
};

export default useLoadSongUrl;
