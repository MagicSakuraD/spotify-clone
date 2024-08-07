import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { useAtomValue } from "jotai";
import { isCollapsedAtom } from "@/lib/Atom";
interface SidebarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const isCollapsed = useAtomValue(isCollapsedAtom);

  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-atuo items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-violet-500 transition  py-1`,
        active && `text-violet-600`
      )}
    >
      <Icon size={24} />
      <span className={`${isCollapsed ? "hidden" : ""} truncate w-full`}>
        {label}
      </span>
    </Link>
  );
};

export default SidebarItem;
