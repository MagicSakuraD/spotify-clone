"use client";
import React, { useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

import { z } from "zod";
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

const formSchema = z.object({
  author: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  song: z.string().url(),
  image: z.string().url(),
});

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
      song: "",
      image: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // 3. Submit your form.
      //   console.log(values);
      //   setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
      //   form.reset();
      //   uploadModal.onClose();
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
                    {...field}
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
                    {...field}
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
