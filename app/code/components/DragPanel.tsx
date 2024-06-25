"use client";
import React, { DragEvent } from "react";

const DragPanel = () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">nodes</div>
      <div
        className="rounded-lg border-2 "
        onDragStart={(event) => onDragStart(event, "osc")}
        draggable
      >
        Osc
      </div>
      <div
        className="rounded-lg border-2 "
        onDragStart={(event) => onDragStart(event, "amp")}
        draggable
      >
        Amp
      </div>
      <div
        className="rounded-lg border-2 "
        onDragStart={(event) => onDragStart(event, "dac")}
        draggable
      >
        Dac
      </div>
    </aside>
  );
};

export default DragPanel;
