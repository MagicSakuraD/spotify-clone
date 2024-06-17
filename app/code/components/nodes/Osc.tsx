import React, { memo, ReactNode } from "react";
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

export type OscProps = {
  value: number;
  frequency: number;
  type: string;
};

const Osc = memo((data: OscProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscillator Node</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>Frequency</p>
        <Slider defaultValue={[33]} max={100} step={1} value={[data.value]} />
      </CardContent>
      <CardFooter>
        <p>Waveform</p>
      </CardFooter>
    </Card>
  );
});

export default Osc;
