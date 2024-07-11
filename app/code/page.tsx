"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import DragPanel from "./components/DragPanel";
import { ReactFlowProvider } from "@xyflow/react";
import FlowPanel from "./components/FlowPanel";
import Header from "@/components/Header";

const CodePage = () => {
  return (
    <main className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">Audio</h1>
        </div>
      </Header>
      <ReactFlowProvider>
        <ResizablePanelGroup direction="horizontal" className="p-6">
          <ResizablePanel defaultSize={20}>
            <DragPanel />
          </ResizablePanel>
          <ResizableHandle className="h-10 border-2 my-auto rounded-lg" />
          <ResizablePanel defaultSize={80} className="rounded-md">
            <FlowPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ReactFlowProvider>
    </main>
  );
};

export default CodePage;
