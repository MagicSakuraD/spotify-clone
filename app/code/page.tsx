"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DragPanel from "./components/DragPanel";
import { ReactFlowProvider } from "reactflow";
import FlowPanel from "./components/FlowPanel";

const CodePage = () => {
  return (
    <ReactFlowProvider>
      <ResizablePanelGroup
        direction="horizontal"
        className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
      >
        <ResizablePanel defaultSize={20}>
          <DragPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <FlowPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ReactFlowProvider>
  );
};

export default CodePage;
