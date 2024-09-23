"use client";
import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import Header from "@/components/Header";

const whiteKeys = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "C",
];

const blackKeys = ["C#", "D#", "F#", "G#", "A#", "C#", "D#", "F#", "G#", "A#"];

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
      synth.triggerAttackRelease(note + "4", "8n");
    }
  };
  return (
    <main className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      {/* <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">placeholder</h1>
        </div>
      </Header> */}
      <div className="flex justify-center items-center relative mt-10">
        <div className="piano-container w-full max-w-5xl aspect-[3/1] relative">
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
          <div className="absolute top-0 left-0 flex h-3/5 w-full">
            {blackKeys.map((note, index) => {
              const positions = [
                4.46, // C#
                11.13, // D#
                24.46, // F#
                31.13, // G#
                37.8, // A#
                51.13, // C# (second octave)
                57.8, // D# (second octave)
                71.13, // F# (second octave)
                77.8, // G# (second octave)
                84.46, // A# (second octave)
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
