import React, { memo, ReactNode, useState } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { oscNodeAtom } from "@/lib/Atom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { useStore } from "@/hooks/useStore";
import { Separator } from "@/components/ui/separator";

// 定义 OscProps 接口
interface OscProps {
  frequency: number;
  type: string;
}

// 定义组件的props接口
interface OscComponentProps {
  id: string;
  data: OscProps;
}

const Osc: React.FC<OscComponentProps> = ({ id, data }) => {
  const { updateNode } = useStore();

  const handleFrequencyChange = (value: number[]) => {
    updateNode(id, { frequency: value[0] });
  };

  const handleTypeChange = (value: string) => {
    updateNode(id, { type: value });
  };

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>Oscillator</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="nodrag flex flex-col space-y-10">
        <label>
          <div className="flex justify-between space-x-6 items-center mb-1">
            <p className="text-accent-foreground">frequency</p>
            <p className="text-muted-foreground  text-xs">
              {data.frequency} Hz
            </p>
          </div>

          <Slider
            defaultValue={[data.frequency]}
            max={1000}
            step={1}
            onValueChange={handleFrequencyChange}
          />
        </label>

        <label>
          <span className="mb-1">Waveform</span>
          <Select onValueChange={handleTypeChange} defaultValue={data.type}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sine">sine</SelectItem>
              <SelectItem value="triangle">triangle</SelectItem>
              <SelectItem value="sawtooth">sawtooth</SelectItem>
              <SelectItem value="square">square</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </CardContent>

      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default Osc;
