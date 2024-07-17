"use client";

import { NodeData } from "@/hooks/useStore";

export let context: AudioContext;
const nodes = new Map<string, AudioNode>();

function initializeContext() {
  if (!context) {
    context = new AudioContext();
    context.suspend(); // 初始时挂起 AudioContext
  }
}

export function createAudioNode(id: string, type: string, data?: NodeData) {
  initializeContext();
  if (!context) return;

  switch (type) {
    case "osc": {
      const node = context.createOscillator();
      node.frequency.value = data?.frequency ?? 440;
      node.type = data?.type ?? "sine";
      node.start();

      nodes.set(id, node);
      break;
    }

    case "amp": {
      const node = context.createGain();
      node.gain.value = data?.gain ?? 0.5;

      nodes.set(id, node);
      break;
    }

    case "dac": {
      const node = context.createGain();
      node.gain.value = data?.gain ?? 0.5;
      node.connect(context.destination);
      nodes.set(id, node);
      break;
    }
    case "analyser": {
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 2048;
      nodes.set(id, analyserNode);
      break;
    }
  }
}

export function updateAudioNode(id: string, data: any): void {
  const node = nodes.get(id);

  if (!node) {
    console.error(`Node with id ${id} not found.`);
    return;
  }

  // 确保所有属性都更新
  for (const key in data) {
    if ((node as any)[key] instanceof AudioParam) {
      ((node as any)[key] as AudioParam).value = data[key];
    } else {
      (node as any)[key] = data[key];
    }
  }
}

export function removeAudioNode(id: string) {
  const node = nodes.get(id);

  if (!node) return; // Early return if node is undefined or null

  node.disconnect();

  // Check if the node is an instance of a type that has the `stop` method
  if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
    node.stop();
  }

  nodes.delete(id);
}

export function connect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  // Check if either source or target is undefined
  if (!source || !target) {
    console.error(
      `Either source node ${sourceId} or target node ${targetId} does not exist.`
    );
    return;
  }

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

export function disconnect(sourceId: string, targetId: string) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (source && target) {
    source.disconnect(target);
  }
}

export function isRunning() {
  if (!context) return false;
  return context.state === "running";
}

export function toggleAudio() {
  if (!context) return;
  return isRunning() ? context.suspend() : context.resume();
}

export { nodes };
