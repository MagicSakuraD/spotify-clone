import { Song } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const supabaseClient = createClient();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fecthSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: error.message,
        });
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fecthSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
