"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Btn from "./Btn";
import useAuthModal from "@/hooks/useAuthModal";
import { supabase } from "@/components/AuthModal";
import { useUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import { FaUserAlt } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { toast } = useToast();
  const authModal = useAuthModal();
  const router = useRouter();
  const { user } = useUser();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    //TODO: Reset any playing songs
    router.refresh();
    if (error) {
      toast({
        title: "Error logging out",
        description: error.message,
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been logged out",
      });
    }
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-cente justify-center hover:opacity-75 transition">
          <button className="rounded-full bg-white p-2">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full bg-white p-2">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gpa-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Btn onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Btn>
              <Btn onClick={() => router.push("/acount")} className="bg-white">
                <FaUserAlt />
              </Btn>
            </div>
          ) : (
            <>
              <div>
                <Btn
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={() => {
                    authModal.onOpen();
                  }}
                >
                  Sign up
                </Btn>
              </div>
              <div>
                <Btn className="bg-white px-6 py-2" onClick={authModal.onOpen}>
                  Login in
                </Btn>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
