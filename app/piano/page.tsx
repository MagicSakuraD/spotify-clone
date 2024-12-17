"use client";
import React, { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";
import Header from "@/components/Header";

// Define white and black keys with their corresponding keyboard keys
const whiteKeys = [
  { note: "C4", key: "z" },
  { note: "D4", key: "x" },
  { note: "E4", key: "c" },
  { note: "F4", key: "v" },
  { note: "G4", key: "b" },
  { note: "A4", key: "n" },
  { note: "B4", key: "m" },
  { note: "C5", key: "," },
  { note: "D5", key: "." },
  { note: "E5", key: "/" },
  { note: "F5", key: "q" },
  { note: "G5", key: "w" },
  { note: "A5", key: "e" },
  { note: "B5", key: "r" },
];

const blackKeys = [
  { note: "C#4", key: "s" },
  { note: "D#4", key: "d" },
  { note: "F#4", key: "g" },
  { note: "G#4", key: "h" },
  { note: "A#4", key: "j" },
  { note: "C#5", key: "t" },
  { note: "D#5", key: "y" },
  { note: "F#5", key: "u" },
  { note: "G#5", key: "i" },
  { note: "A#5", key: "o" },
];

const PianoPage = () => {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);
    Tone.start();

    return () => {
      if (newSynth) {
        newSynth.dispose();
      }
    };
  }, []);

  const playNote = useCallback(
    (note: string) => {
      if (synth) {
        synth.triggerAttackRelease(note, "8n");
      }
    },
    [synth]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const whiteKey = whiteKeys.find((k) => k.key === key);
      const blackKey = blackKeys.find((k) => k.key === key);

      if (whiteKey) {
        playNote(whiteKey.note);
        setActiveKeys((prev) => new Set(prev).add(whiteKey.note));
      } else if (blackKey) {
        playNote(blackKey.note);
        setActiveKeys((prev) => new Set(prev).add(blackKey.note));
      }
    },
    [playNote]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const whiteKey = whiteKeys.find((k) => k.key === key);
    const blackKey = blackKeys.find((k) => k.key === key);

    if (whiteKey) {
      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(whiteKey.note);
        return newSet;
      });
    } else if (blackKey) {
      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(blackKey.note);
        return newSet;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <main className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-semibold">Piano</h1>
        </div>
      </Header>
      <div className="flex justify-center items-center relative mx-auto my-auto">
        <div className="piano-container w-full max-w-5xl aspect-[3/1] relative font-semibold">
          {/* White keys */}
          <div className="flex h-full gap-1">
            {whiteKeys.map(({ note, key }, index) => (
              <button
                key={note + index}
                className={`white-key ${activeKeys.has(note) ? "active" : ""}`}
                onClick={() => playNote(note)}
                onMouseDown={() =>
                  setActiveKeys((prev) => new Set(prev).add(note))
                }
                onMouseUp={() =>
                  setActiveKeys((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(note);
                    return newSet;
                  })
                }
                onMouseLeave={() =>
                  setActiveKeys((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(note);
                    return newSet;
                  })
                }
              >
                {note}
              </button>
            ))}
          </div>
          {/* Black keys */}
          <div className="absolute top-0 left-0 flex h-3/5 w-full font-semibold text-sm">
            {blackKeys.map(({ note }, index) => {
              const positions = [
                4.99, 11.96, 26.09, 33.53, 40.59, 54.73, 61.85, 76.13, 83.21,
                90.46,
              ];

              const leftPosition = positions[index] || 0;
              return (
                <button
                  key={note + index}
                  className={`black-key ${
                    activeKeys.has(note) ? "active" : ""
                  }`}
                  style={{ left: `${leftPosition}%` }}
                  onClick={() => playNote(note)}
                  onMouseDown={() =>
                    setActiveKeys((prev) => new Set(prev).add(note))
                  }
                  onMouseUp={() =>
                    setActiveKeys((prev) => {
                      const newSet = new Set(prev);
                      newSet.delete(note);
                      return newSet;
                    })
                  }
                  onMouseLeave={() =>
                    setActiveKeys((prev) => {
                      const newSet = new Set(prev);
                      newSet.delete(note);
                      return newSet;
                    })
                  }
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
