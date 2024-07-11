"use client";
import React, {
  useState,
  useRef,
  useCallback,
  DragEvent,
  useMemo,
} from "react";

import { ReactFlow, ReactFlowInstance, Controls } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Osc from "./nodes/Osc";

import { atomWithImmer } from "jotai-immer";
import { useStore } from "@/hooks/useStore";
import Dac from "./nodes/Dac";
import Amp from "./nodes/Amp";
import { colorModeAtom } from "@/lib/Atom";
import { useAtomValue } from "jotai";

const nodeTypes = {
  osc: Osc,
  dac: Dac,
  amp: Amp,
};

const FlowPanel = () => {
  const colorMode = useAtomValue(colorModeAtom);

  const {
    nodes,
    edges,
    onNodesChange,
    removeNodes,
    EdgesDelete,
    onEdgesChange,
    createNode,
    addEdge,
  } = useStore();
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
      createNode(type);
      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
    },
    [reactFlowInstance, createNode]
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
        onNodesDelete={(nodes) => removeNodes(nodes as any)}
        onEdgesDelete={(edges) => EdgesDelete(edges as any)}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        colorMode={colorMode}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowPanel;
