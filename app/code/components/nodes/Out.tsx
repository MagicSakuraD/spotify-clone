import React from "react";
import { Handle, Position } from "reactflow";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { isRunningAtom, toggleAudioAtom } from "@/lib/Atom";
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
  const isRunning = useAtomValue(isRunningAtom);
  const toggleAudio = useSetAtom(toggleAudioAtom);

  return (
    <Card className="border-violet-600 ">
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
