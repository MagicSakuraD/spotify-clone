"use client";
import { NodeData } from "@/hooks/useStore";

const context = new AudioContext();
const nodes = new Map();

context.suspend();
// const osc = context.createOscillator();
// osc.frequency.value = 220;
// osc.type = "square";
// osc.start();

// const amp = context.createGain();
// amp.gain.value = 0.5;

// const out = context.destination;

// nodes.set("1", osc);
// nodes.set("2", amp);
// nodes.set("3", out);

export function createAudioNode(id: string, type: string, data: any) {
  switch (type) {
    case "osc": {
      const node = context.createOscillator();
      node.frequency.value = data.frequency;
      node.type = data.type;
      node.start();

      nodes.set(id, node);
      break;
    }

    case "amp": {
      const node = context.createGain();
      node.gain.value = data.gain;

      nodes.set(id, node);
      break;
    }
  }
}

export function updateAudioNode(id: string, data: NodeData): void {
  const node = nodes.get(id);

  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      (node[key] as AudioParam).value = val as number;
    } else {
      node[key] = val;
    }
  }
  console.log(data.frequency, data.gain);
}

export function removeAudioNode(id: string) {
  const node = nodes.get(id);

  node.disconnect();
  node.stop?.();

  nodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source && target) {
    source.connect(target);
  }
}

// Step 1: Define the disconnect function (assuming it's added to the audio.ts file or wherever your audio logic is contained)
export function disconnect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source && target) {
    source.disconnect(target);
  }
}

export function isRunning() {
  return context.state === "running";
}

export function toggleAudio() {
  return isRunning() ? context.suspend() : context.resume();
}
