import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { error } from "console";
import { toast } from "./ui/use-toast";
import { set } from "zod";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const supabaseClient = createClient();

  const authModal = useAuthModal();

  const { user } = useUser();

  const [isLiked, setIsLiked] = React.useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, user?.id, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast({
          title: "Error",
          description: "An error occurred while unliking the song",
        });
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert([{ user_id: user.id, song_id: songId }]);

      if (error) {
        toast({
          title: "Error",
          description: "An error occurred while liking the song",
        });
      } else {
        setIsLiked(true);
        toast({
          title: "Liked",
          description: "Song has been liked",
        });
      }
    }
    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#9333ea" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
