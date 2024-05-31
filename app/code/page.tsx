import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const CodePage = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="container mx-auto py-4"
    >
      <ResizablePanel defaultSize={20}>One</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CodePage;
