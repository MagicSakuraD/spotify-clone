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

// Create the brain of our audio-processing graph
const context = new AudioContext();

// Create an oscillator node to generate tones
const osc = context.createOscillator();

// Create a gain node to control the volume
const amp = context.createGain();

// Pass the oscillator's output through the gain node and to our speakers
osc.connect(amp);
amp.connect(context.destination);

// Start generating those tones!
osc.start();

export type MusicNodeProps = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

export default memo(({ data }: NodeProps<MusicNodeProps>) => {
  return (
    <Card className="border-violet-600">
      <CardHeader>
        <CardTitle>
          {data.icon && <div className="icon">{data.icon}</div>}
          <div>
            <div className="title">{data.title}</div>
            {data.subline && <div className="subline">{data.subline}</div>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </CardContent>
    </Card>
  );
});
