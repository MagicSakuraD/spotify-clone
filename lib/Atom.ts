import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export const isCollapsedAtom = atom(false);

const oscNode = [{ id: "1", data: { frequency: 440, type: "sine" } }];

export const oscNodeAtom = atomWithImmer(oscNode);
