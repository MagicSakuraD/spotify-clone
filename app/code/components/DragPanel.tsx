"use client";
import React, { DragEvent } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const DragPanel = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = ["Osc", "Amp", "Dac", "Analyser", "XYpad", "AudioFile"];

  return (
    <aside className="flex flex-col gap-3 m-3">
      {nodeTypes.map((nodeType) => (
        <Card
          key={nodeType}
          className="text-center shadow-violet-500/40 p-3 hover:bg-violet-600"
          onDragStart={(event) => onDragStart(event, nodeType.toLowerCase())}
          draggable
        >
          {nodeType}
        </Card>
      ))}
    </aside>
  );
};

export default DragPanel;
