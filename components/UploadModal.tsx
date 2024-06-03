"use client";
import React, { useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Btn from "@/components/Btn";
import { toast } from "./ui/use-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { supabase } from "./AuthModal";
import { title } from "process";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  author: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  song: z.instanceof(File, { message: "Invalid song file" }),
  image: z.instanceof(File, { message: "Invalid image file" }),
});

const UploadModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      song: undefined,
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const imageFile = values.image;
      const songFile = values.song;
      if (!imageFile || !songFile || !user) {
        throw new Error("Missing fields");
        return;
      }

      const uniqueID = uniqid();
      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: "songs Something went wrong",
        });
      }
      // Upload image
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: "image Something went wrong",
        });
      }

      const { error: supabaseError } = await supabase.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (supabaseError) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: "supabaseError Something went wrong",
        });
      }

      router.refresh();
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Song uploaded",
      });

      form.reset();
      uploadModal.onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onChange = (open: boolean) => {
    if (!open) {
      form.reset();
      uploadModal.onClose();
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Song title"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Song author"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="song"
            render={({ field }) => (
              <FormItem>
                <FormLabel>select a song file</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder=""
                    onChange={(e) =>
                      field.onChange(e.target.files && e.target.files[0])
                    }
                    disabled={isLoading}
                    accept=".mp3"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select an image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder=""
                    onChange={(e) =>
                      field.onChange(e.target.files && e.target.files[0])
                    }
                    disabled={isLoading}
                    accept="image/*"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Btn type="submit">Submit</Btn>
        </form>
      </Form>
    </Modal>
  );
};

export default UploadModal;
