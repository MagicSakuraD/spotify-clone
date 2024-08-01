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

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const getPosition = (frequency: number, gain: number) => {
    const x = clamp((frequency - 20) / 7980, 0, 1);
    const y = 1 - clamp(gain, 0, 1);
    return { x, y };
  };

  useEffect(() => {
    if (!padRef.current || !dotRef.current) return;

    const pad = padRef.current;
    const dot = dotRef.current;

    const updatePosition = (e: MouseEvent) => {
      if (!isDragging) return;

      const rect = pad.getBoundingClientRect();
      let x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      let y = clamp((e.clientY - rect.top) / rect.height, 0, 1);

      anime({
        targets: dot,
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        duration: 0,
        easing: "linear",
      });

      const frequency = 20 + x * 7980; // 20-8000 Hz
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

  useEffect(() => {
    if (dotRef.current) {
      const { x, y } = getPosition(data.frequency, data.gain);
      anime({
        targets: dotRef.current,
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        duration: 0,
        easing: "linear",
      });
    }
  }, [data.frequency, data.gain]);

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>XYpad</CardTitle>
      </CardHeader>
      <CardContent className="nodrag flex flex-col w-36 h-36 p-2">
        <div ref={padRef} className="w-full h-full relative cursor-pointer">
          <div
            ref={dotRef}
            className="w-3 h-3 bg-violet-500 rounded-full absolute"
          />
        </div>
      </CardContent>
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default memo(XYpad);
