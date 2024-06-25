import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import {
  isRunning as checkIsRunning,
  toggleAudio as performToggleAudio,
} from "./audio";

export const isCollapsedAtom = atom(true);

const oscNode = [{ id: "1", data: { frequency: 440, type: "sine" } }];

export const oscNodeAtom = atomWithImmer(oscNode);
// 定义 isRunning 状态的 atom

// 定义一个 atom 来存储 isRunning 的状态
export const isRunningAtom = atom(checkIsRunning());

// 定义一个 atom 来存储 toggleAudio 的函数操作
export const toggleAudioAtom = atom(
  (get) => get(isRunningAtom),
  async (get, set) => {
    await performToggleAudio();
    set(isRunningAtom, await checkIsRunning());
  }
);
