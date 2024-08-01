import React, { memo, useRef, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/hooks/useStore";
import anime from "animejs";

interface XYpadProps {
  id: string;
  data: {
    frequency: number;
    gain: number;
  };
}

const XYpad: React.FC<XYpadProps> = ({ id, data }) => {
  const { updateNode } = useStore();
  const padRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!padRef.current || !dotRef.current) return;

    const pad = padRef.current;
    const dot = dotRef.current;

    const updatePosition = (e: MouseEvent) => {
      if (!isDragging) return;

      const rect = pad.getBoundingClientRect();
      let x = (e.clientX - rect.left) / rect.width;
      let y = (e.clientY - rect.top) / rect.height;

      x = Math.max(0, Math.min(1, x));
      y = Math.max(0, Math.min(1, y));

      anime({
        targets: dot,
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        duration: 0,
        easing: "linear",
      });

      const frequency = x * 9999 + 1;
      const gain = 1 - y; // Invert Y axis

      updateNode(id, { frequency, gain });
    };

    const startDrag = () => setIsDragging(true);
    const stopDrag = () => setIsDragging(false);

    pad.addEventListener("mousedown", startDrag);
    pad.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseup", stopDrag);

    return () => {
      pad.removeEventListener("mousedown", startDrag);
      pad.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [id, updateNode, isDragging]);

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>XYpad</CardTitle>
      </CardHeader>
      <CardContent className="nodrag flex flex-col w-36 h-36 p-1">
        <div ref={padRef} className="w-full h-full relative cursor-pointer">
          <div
            ref={dotRef}
            className="w-4 h-4 bg-violet-500 rounded-full absolute"
            style={{
              left: `${(data.frequency / 1000) * 100}%`,
              top: `${(1 - data.gain) * 100}%`,
            }}
          />
        </div>
      </CardContent>
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default memo(XYpad);
