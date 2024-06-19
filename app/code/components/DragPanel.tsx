"use client";
import React, { DragEvent } from "react";

export default () => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="rounded-lg border-2 border-neutral-500"
        onDragStart={(event) => onDragStart(event, "osc")}
        draggable
      >
        Input Node
      </div>
      <div
        className="rounded-lg border-2 border-neutral-500"
        onDragStart={(event) => onDragStart(event, "amp")}
        draggable
      >
        Default Node
      </div>
      <div
        className="rounded-lg border-2 border-neutral-500"
        onDragStart={(event) => onDragStart(event, "amp")}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};
