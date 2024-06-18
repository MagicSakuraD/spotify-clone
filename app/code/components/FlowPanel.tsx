import React, {
  useState,
  useRef,
  useCallback,
  DragEvent,
  useMemo,
} from "react";
import ReactFlow, { Controls, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import MusicNode from "./MusicNode";
import Osc from "./nodes/Osc";
import { title } from "process";
import uniqid from "uniqid";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { useStore } from "@/hooks/useStore";

const nodeTypes = {
  osc: Osc,
};

const FlowPanel = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge } = useStore();
  const reactFlowWrapper = useRef(null);
  // const oscNode = [{ id: "1", data: { frequency: 440, type: "sine" } }];

  // const oscNodeAtom = atomWithImmer(oscNode);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      //sitll have problem with event.dataTransfer.getData
      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
    },
    [reactFlowInstance]
  );

  return (
    <div className="h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        // onInit={setReactFlowInstance}
        // onDrop={onDrop}
        // onDragOver={onDragOver}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowPanel;