import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, Position } from "reactflow";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/hooks/useStore";

interface AmpProps {
  id: string;
  data: { gain: number };
}

const Amp: React.FC<AmpProps> = ({ id, data }) => {
  const { updateNode } = useStore();

  const handleGainChange = (value: number[]) => {
    updateNode(id, { gain: value[0] });
  };

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>Amp</CardTitle>
      </CardHeader>
      <CardContent>
        <label>
          <div className="flex justify-between items-center gap-6">
            <span className="mb-1">gain</span>
            <span className="text-muted-foreground">
              {data.gain.toFixed(2)}
            </span>
          </div>

          <Slider
            defaultValue={[data.gain]}
            max={1}
            step={0.01}
            onValueChange={handleGainChange}
          />
        </label>
      </CardContent>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default Amp;
