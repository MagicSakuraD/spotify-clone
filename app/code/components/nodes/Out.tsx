import React from "react";
import { Handle, Position } from "reactflow";
import { useAtom } from "jotai";
import { isRunningAtom } from "@/lib/Atom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OutProps {
  id: string;
  data: any;
}

const Out: React.FC<OutProps> = ({ id, data }) => {
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);

  const toggleAudio = () => {
    setIsRunning(!isRunning);
  };
  return (
    <Card className="border-violet-600 container">
      <CardHeader>
        <CardTitle>Output Node</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={toggleAudio} variant={"ghost"}>
          {isRunning ? (
            <span role="img" aria-label="mute">
              🔇
            </span>
          ) : (
            <span role="img" aria-label="unmute">
              🔈
            </span>
          )}
        </Button>
      </CardContent>
      <Handle type="target" position={Position.Left} />
    </Card>
  );
};

export default Out;
