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

class XYPad {
  private oscNode: OscillatorNode;
  private gainNode: GainNode;

  constructor(frequency: number, gain: number) {
    this.oscNode = context.createOscillator();
    this.gainNode = context.createGain();

    this.oscNode.frequency.value = frequency;
    this.gainNode.gain.value = gain;

    // Connect the nodes
    this.oscNode.connect(this.gainNode);
    this.oscNode.start();
  }

  setFrequency(value: number) {
    this.oscNode.frequency.value = value;
  }

  setGain(value: number) {
    this.gainNode.gain.value = value;
  }

  connect(destination: AudioNode) {
    this.gainNode.connect(destination);
  }

  disconnect() {
    this.gainNode.disconnect();
  }

  getOutputNode() {
    return this.gainNode;
  }
}

// 将文件加载逻辑抽取为一个单独的函数
function loadAudioFile(
  node: AudioBufferSourceNode,
  file: File,
  loop: boolean = true,
  autoplay: boolean = true
) {
  const reader = new FileReader();

  reader.onload = function () {
    const arrayBuffer = reader.result as ArrayBuffer;

    context.decodeAudioData(
      arrayBuffer,
      (audioBuffer) => {
        node.buffer = audioBuffer;
        node.loop = loop;

        console.log(
          `Audio file "${
            file.name
          }" loaded successfully. Duration: ${audioBuffer.duration.toFixed(
            2
          )} seconds.`
        );

        if (autoplay) {
          console.log(`next execute node.start()`);
          node.start();
          console.log(`Audio file "${file.name}" started playing (autoplay).`);
        }
      },
      (error) => {
        console.error(
          `Error decoding audio data for file "${file.name}":`,
          error
        );
      }
    );
  };

  reader.onerror = function () {
    console.error(`Error reading audio file "${file.name}"`);
  };

  reader.readAsArrayBuffer(file);
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
      nodes.set(id, xyPad as any);
      break;
    }

    case "audiofile": {
      const node = context.createBufferSource();
      nodes.set(id, node); // 设置节点，即使没有文件

      if (data?.file) {
        loadAudioFile(node, data.file, data?.loop, data?.autoplay);
      }
      // 如果没有文件，我们仍然创建节点，但不加载任何音频数据
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

  if (node instanceof AudioBufferSourceNode) {
    console.log("Updating audio file node", data);
    if (data.file) {
      // 如果节点已经在播放，我们需要停止它并创建一个新的节点
      loadAudioFile(node, data.file, data.loop, data.autoplay);
    }
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
    let sourceNode: AudioNode;

    // Determine the correct source node
    if (source instanceof XYPad) {
      sourceNode = source.getOutputNode();
    } else if (source instanceof AudioNode) {
      sourceNode = source;
    } else {
      console.error(`Source node ${sourceId} is not a valid audio node.`);
      return;
    }

    // Connect the source node to the target
    // We don't need to check if the target is XYPad because XYPad is only a source
    if (target instanceof AudioNode) {
      sourceNode.connect(target);
      console.log(`Connected node ${sourceId} to node ${targetId}.`);
    } else {
      console.error(`Target node ${targetId} is not a valid audio node.`);
    }
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
    if (source instanceof XYPad) {
      source.disconnect();
    } else {
      source.disconnect(
        target instanceof XYPad ? target.getOutputNode() : target
      );
    }
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
