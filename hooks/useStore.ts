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

type Node = [
  {
    id: string;
    type: string;
    data: { title: string; frequency?: number; type?: string };
    position: { x: number; y: number };
  }
];

const initialNodes: Node = [
  {
    id: "1",
    type: "music",
    data: { title: "input node" },
    position: { x: 250, y: 5 },
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
      applyNodeChanges(changes, draft.nodes);
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
      applyEdgeChanges(changes, draft.edges);
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
