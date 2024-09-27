"use client";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import Header from "@/components/Header";

// 添加八度信息的白键音符
const whiteKeys = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
];

// 添加八度信息的黑键音符
const blackKeys = [
  "C#4",
  "D#4",
  "F#4",
  "G#4",
  "A#4",
  "C#5",
  "D#5",
  "F#5",
  "G#5",
  "A#5",
];
const PianoPage = () => {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  useEffect(() => {
    // 创建合成器
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    // 启动 Tone.js
    Tone.start();

    // 清理函数
    return () => {
      if (newSynth) {
        newSynth.dispose();
      }
    };
  }, []);

  // 播放音符的函数
  const playNote = (note: string) => {
    if (synth) {
      synth.triggerAttackRelease(note, "8n");
    }
  };
  return (
    <main className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">piano</h1>
        </div>
      </Header>
      <div className="flex justify-center items-center relative mx-auto my-auto">
        <div className="piano-container w-full max-w-5xl aspect-[3/1] relative font-semibold">
          {/* white keys */}
          <div className="flex h-full gap-1">
            {whiteKeys.map((note, index) => (
              <button
                key={note + index}
                className="white-key"
                onClick={() => playNote(note)}
              >
                {note}
              </button>
            ))}
          </div>
          {/* black keys */}
          <div className="absolute top-0 left-0 flex h-3/5 w-full font-semibold text-sm">
            {blackKeys.map((note, index) => {
              const positions = [
                4.99, // C#
                11.96, // D#
                26.09, // F#
                33.53, // G#
                40.59, // A#
                54.73, // C# (second octave)
                61.85, // D# (second octave)
                76.13, // F# (second octave)
                83.21, // G# (second octave)
                90.46, // A# (second octave)
              ];

              const leftPosition = positions[index] || 0;
              return (
                <button
                  key={note + index}
                  className="black-key"
                  style={{ left: `${leftPosition}%` }}
                  onClick={() => playNote(note)}
                >
                  {note}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PianoPage;
