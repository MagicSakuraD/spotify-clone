"use client";

import React, { useState } from "react";
import Modal from "./Modal";
// import { createClient } from "@supabase/supabase-js";
// import { createClient } from "@/utils/supabase/client";
import { supabase } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

// const supabase = createClient();

const AuthModal = () => {
  const router = useRouter();

  const { onClose, isOpen } = useAuthModal();
  const [isChanged, setIsChanged] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      // 使用 supabase.auth.getUser() 获取用户信息

      const { data: user, error } = await supabase.auth.getUser();
      console.log("user", user);
      setIsChanged(true);
      if (error) {
        console.error("获取用户信息出错:", error);
      } else if (user) {
        // 用户已登录，进行路由跳转和模态框关闭
        router.refresh();
        onClose();
      }
    };

    checkUser();
  }, [router, onClose, isChanged]);

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
