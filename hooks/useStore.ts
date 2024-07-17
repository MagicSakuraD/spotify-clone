"use client";

import uniqid from "uniqid";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import {
  updateAudioNode,
  removeAudioNode,
  connect,
  disconnect,
  createAudioNode,
} from "@/lib/audio";
import { useCallback } from "react";
import {
  OnNodesChange,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Edge,
  NodeTypes,
} from "@xyflow/react";

// 声明 initialState 的类型
type State = {
  nodes: Array<any>;
  edges: Array<Edge>;
};

export interface NodeData {
  label?: string;
  frequency?: number;
  type?: OscillatorType;
  gain?: number;
}

type Nodes = {
  id: string;
  type: string;
  data: NodeData;
  position: { x: number; y: number };
};

const initialNodes: Nodes[] = [];

const initialState: State = {
  nodes: initialNodes,
  edges: [],
};

const flowStateAtom = atomWithImmer(initialState);

export const useStore = () => {
  const [flowState, setFlowState] = useAtom(flowStateAtom);

  const createNode = (type: string) => {
    const id = uniqid("muinn_");
    let data: NodeData;
    const position = { x: 0, y: 0 };

    switch (type) {
      case "osc": {
        data = { frequency: 440, type: "sine" };
        break;
      }
      case "amp": {
        data = { gain: 0.5 };
        break;
      }
      case "dac": {
        data = { gain: 0.3 };
        break;
      }
      case "analyser": {
        data = {};
        break;
      }
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
    createAudioNode(id, type, data);
    const newNode = { id, type, data, position };
    setFlowState((draft) => {
      draft.nodes.push(newNode);
    });
  };

  const onNodesChange: OnNodesChange = (changes) => {
    setFlowState((draft) => {
      draft.nodes = applyNodeChanges(changes, draft.nodes);
    });
  };

  const removeNodes = (nodes: Nodes[]) => {
    for (const { id } of nodes) {
      removeAudioNode(id);
    }
  };

  const EdgesDelete = (edges: Edge[]) => {
    edges.forEach((edge) => {
      const { source, target } = edge;
      disconnect(source, target);
      // Update your store/state here if necessary
    });
  };

  const updateNode = (id: string, data: any) => {
    // 更新 AudioNode
    updateAudioNode(id, data);
    setFlowState((draft) => {
      const node = draft.nodes.find((node) => node.id === id);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    });
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setFlowState((draft) => {
      draft.edges = applyEdgeChanges(changes, draft.edges);
    });
  };

  const addEdge = (data: any) => {
    const id = uniqid("muinn_");
    const edge = { id, ...data };
    connect(data.source, data.target);

    setFlowState((draft) => {
      draft.edges.unshift(edge);
    });
  };

  return {
    ...flowState,
    onNodesChange,

    removeNodes,
    EdgesDelete,
    updateNode,
    createNode,
    onEdgesChange,
    addEdge,
  };
};
