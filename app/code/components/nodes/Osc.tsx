import React, { memo, ReactNode, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
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
    <Card>
      <CardHeader>
        <CardTitle>Oscillator Node</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="nodrag">
        <div>{id}</div>
        <label>
          <span>Frequency</span>
          <Slider
            defaultValue={[data.frequency]}
            max={100}
            step={1}
            onValueChange={handleFrequencyChange}
          />
        </label>
        <label>
          <span>Waveform</span>
          <Select onValueChange={handleTypeChange} defaultValue={data.type}>
            <SelectTrigger />
            <SelectContent>
              <SelectItem value="sine">sine</SelectItem>
              <SelectItem value="triangle">triangle</SelectItem>
              <SelectItem value="sawtooth">sawtooth</SelectItem>
              <SelectItem value="square">square</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Osc;
