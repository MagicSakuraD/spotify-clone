"use client";
import { NodeData } from "@/hooks/useStore";

const context = new AudioContext();
context.suspend(); // 初始时挂起 AudioContext
const nodes = new Map();

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

    case "dac": {
      const node = context.createGain();
      node.gain.value = data.gain;
      node.connect(context.destination);
      nodes.set(id, node);
      break;
    }
  }
}

export function updateAudioNode(id: string, data: any): void {
  const node = nodes.get(id);
  console.log(node);

  if (!node) {
    console.error(`Node with id ${id} not found.`);
    return;
  }

  // 确保所有属性都更新
  for (const key in data) {
    console.log(data);
    if (node[key] instanceof AudioParam) {
      (node[key] as AudioParam).value = data[key];
    } else {
      node[key] = data[key];
    }
  }
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

  try {
    source.connect(target);
    console.log(`Connected node ${sourceId} to node ${targetId}.`);
  } catch (error) {
    console.error(
      `Failed to connect node ${sourceId} to node ${targetId}:`,
      error
    );
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
