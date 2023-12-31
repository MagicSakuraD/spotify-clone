"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Btn from "./Btn";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const handleLogout = () => {};

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
          <>
            <div>
              <Btn
                className="bg-transparent text-neutral-300 font-medium"
                onClick={() => {}}
              >
                Sign up
              </Btn>
            </div>
            <div>
              <Btn className="bg-white px-6 py-2" onClick={() => {}}>
                Login in
              </Btn>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
