import {
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Edge,
} from "reactflow";
import uniqid from "uniqid";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

// 声明 initialState 的类型
type State = {
  nodes: Array<any>;
  edges: Array<Edge>;
};

type Node = {
  id: string;
  type: string;
  data: { label: string; frequency?: number; type?: string; gain?: number };
  position: { x: number; y: number };
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "osc",
    data: { label: "input node", frequency: 440, type: "sine" },
    position: { x: 250, y: 5 },
  },
  {
    id: "2",
    type: "out",
    data: { label: "output node" },
    position: { x: 250, y: 300 },
  },
  {
    id: "3",
    type: "amp",
    data: { label: "amplifier node", gain: 0.5 },
    position: { x: 50, y: 150 },
  },
];

const initialState: State = {
  nodes: initialNodes,
  edges: [],
};

const flowStateAtom = atomWithImmer(initialState);

export const useStore = () => {
  const [flowState, setFlowState] = useAtom(flowStateAtom);

  const onNodesChange = (changes: NodeChange[]) => {
    setFlowState((draft) => {
      draft.nodes = applyNodeChanges(changes, draft.nodes);
    });
  };

  const updateNode = (id: string, data: any) => {
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

    setFlowState((draft) => {
      draft.edges.unshift(edge);
    });
  };

  return { ...flowState, onNodesChange, updateNode, onEdgesChange, addEdge };
};
