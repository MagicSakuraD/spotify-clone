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

const Analyser = () => {
  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>Amp</CardTitle>
      </CardHeader>
      <CardContent>let to fill</CardContent>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default Analyser;
