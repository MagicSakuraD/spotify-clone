import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import React, { useRef } from "react";
import { useStore } from "@/hooks/useStore";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";

interface AudioFileProps {
  id: string;
  data: { loop: boolean; autoplay: boolean; file?: File };
}

const AudioFile: React.FC<AudioFileProps> = ({ id, data }) => {
  const { updateNode } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateNode(id, { file });
    }
  };

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>Audio File</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="mb-4">
          <label>
            <div className="flex justify-between items-center gap-6">
              <span className="mb-1">Loop</span>
              <Checkbox
                checked={data.loop}
                onCheckedChange={handleLoopChange}
              />
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label>
            <div className="flex justify-between items-center gap-6">
              <span className="mb-1">Autoplay</span>
              <Checkbox
                checked={data.autoplay}
                onCheckedChange={handleAutoplayChange}
              />
            </div>
          </label>
        </div> */}

        <div className="mb-4">
          <label>
            <div className="flex justify-between items-center gap-6">
              <span className="mb-1">File</span>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                {data.file ? data.file.name : "Select File"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </label>
        </div>
      </CardContent>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default AudioFile;
