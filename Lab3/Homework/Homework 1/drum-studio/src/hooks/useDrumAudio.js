
import { useCallback, useEffect, useRef } from "react";
import { DRUM_PADS } from "../data/drumPads";

export function useDrumAudio() {
  const audioMapRef = useRef(new Map());

  useEffect(() => {
    const audioMap = new Map();

    DRUM_PADS.forEach((pad) => {
      const audio = new Audio(pad.sound);
      audio.preload = "auto";

      audioMap.set(pad.id, audio);
    });

    audioMapRef.current = audioMap;

    return () => {
      audioMap.forEach((audio) => {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      });

      audioMapRef.current = new Map();
    };
  }, []);

  const playSound = useCallback((padId) => {
    const audio = audioMapRef.current.get(padId);

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.error(`Failed to play ${padId}:`, error);
    });
  }, []);

  return { playSound };
}
