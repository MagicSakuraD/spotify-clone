import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useAtomValue, useSetAtom } from "jotai";

import { isRunningAtom, toggleAudioAtom } from "@/lib/Atom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/hooks/useStore";
import { TbHeadphones } from "react-icons/tb";
import { TbHeadphonesOff } from "react-icons/tb";

interface DacProps {
  id: string;
  data: { gain: number };
}

const Dac: React.FC<DacProps> = ({ id, data }) => {
  const { updateNode } = useStore();

  const handleGainChange = (value: number[]) => {
    updateNode(id, { gain: value[0] });
  };
  const isRunning = useAtomValue(isRunningAtom);
  const toggleAudio = useSetAtom(toggleAudioAtom);

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>dac</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Button onClick={toggleAudio} variant={"ghost"}>
          {isRunning ? (
            <span role="img" aria-label="mute">
              <TbHeadphones />
            </span>
          ) : (
            <span role="img" aria-label="unmute">
              <TbHeadphonesOff />
            </span>
          )}
        </Button>
        <div className="flex justify-center items-center gap-6">
          <p className="mb-1">master gain</p>
          <p className="text-muted-foreground">{data.gain.toFixed(2)}</p>
        </div>
        <Slider
          defaultValue={[data.gain]}
          max={1}
          step={0.01}
          onValueChange={handleGainChange}
        />
      </CardContent>
      <Handle type="target" position={Position.Left} />
    </Card>
  );
};

export default Dac;
