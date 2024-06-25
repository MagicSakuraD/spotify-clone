import { twMerge } from "tailwind-merge";
import { Card } from "./ui/card";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}
const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <Card className={twMerge(`rounded-lg h-fit w-full`, className)}>
      {children}
    </Card>
  );
};

export default Box;
