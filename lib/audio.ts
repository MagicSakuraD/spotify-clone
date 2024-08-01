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

class XYPad extends AudioNode {
  private oscNode: OscillatorNode;
  private gainNode: GainNode;

  constructor(frequency: number, gain: number) {
    super();

    this.oscNode = context.createOscillator();
    this.gainNode = context.createGain();

    this.oscNode.frequency.value = frequency;
    this.gainNode.gain.value = gain;

    // Connect the nodes
    this.oscNode.connect(this.gainNode);
    // this.gainNode.connect(context.destination);
  }

  setFrequency(value: number) {
    this.oscNode.frequency.value = value;
  }

  setGain(value: number) {
    this.gainNode.gain.value = value;
  }

  getNodes() {
    return { oscNode: this.oscNode, gainNode: this.gainNode };
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

    case "xypad": {
      const frequency = data?.frequency ?? 440;
      const gain = data?.gain ?? 0.5;
      const xyPad = new XYPad(frequency, gain);
      nodes.set(id, xyPad);
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

  if (node instanceof XYPad) {
    if (data.frequency !== undefined) {
      node.setFrequency(data.frequency);
    }
    if (data.gain !== undefined) {
      node.setGain(data.gain);
    }
  } else {
    // Ensure all properties are updated
    for (const key in data) {
      if ((node as any)[key] instanceof AudioParam) {
        ((node as any)[key] as AudioParam).value = data[key];
      } else {
        (node as any)[key] = data[key];
      }
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
