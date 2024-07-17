import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";

import React, { useEffect, useRef } from "react";

import { useAtom } from "jotai";
import { audioDataAtom } from "@/lib/Atom";

import { context, nodes } from "@/lib/audio";

interface AnalyserProps {
  id: string;
  data: { gain: number };
}

const Analyser: React.FC<AnalyserProps> = ({ id, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioData, setAudioData] = useAtom(audioDataAtom);

  useEffect(() => {
    if (!context) return;

    const analyserNode = nodes.get(id);
    if (!(analyserNode instanceof AnalyserNode)) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateAudioData = () => {
      analyserNode.getByteTimeDomainData(dataArray);
      setAudioData(new Uint8Array(dataArray));
      requestAnimationFrame(updateAudioData);
    };

    updateAudioData();
  }, [id, setAudioData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(0, 0, 0, 0)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          if (audioData) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(124 58 237)";
            ctx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / audioData.length;
            let x = 0;

            for (let i = 0; i < audioData.length; i++) {
              const v = audioData[i] / 128.0;
              const y = (v * canvas.height) / 2;

              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }

              x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
          }

          requestAnimationFrame(draw);
        };

        draw();
      }
    }
  }, [audioData]);

  return (
    <Card className="border-violet-600 shadow-lg shadow-violet-500/50">
      <CardHeader>
        <CardTitle>Analyser</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} width={300} height={150} className="mt-4" />
      </CardContent>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export default Analyser;
