"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { supabase } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const AuthModal = () => {
  const router = useRouter();

  const { onClose, isOpen } = useAuthModal();
  const { session } = useSessionContext();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        providers={["github"]}
        magicLink
        theme="dark"
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
