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
      className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
    >
      <ResizablePanel defaultSize={20}>One</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CodePage;
