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
        className="rounded-lg h-full w-full overflow-hidden overflow-y-auto"
      >
        <ResizablePanel defaultSize={30}>
          <DragPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70} className="mr-2">
          <FlowPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </ReactFlowProvider>
  );
};

export default CodePage;
