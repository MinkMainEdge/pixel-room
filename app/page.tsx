"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MusicPlayer from "@/components/MusicPlayer";
import WelcomeScreen from "@/components/WelcomeScreen";
import RoomScreen from "@/components/RoomScreen";
import LetterScreen from "@/components/LetterScreen";
import MemoriesScreen from "@/components/MemoriesScreen";
import MessageScreen from "@/components/MessageScreen";
import PlanScreen from "@/components/PlanScreen";
import SunsetScreen from "@/components/SunsetScreen";
import { STOP_MUSIC_EVENT } from "@/lib/audio";
import content from "@/lib/content";
import type { Screen } from "@/lib/navigation";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("WELCOME");
  const [musicOn, setMusicOn] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(
    content.music[0]?.id ?? "",
  );
  const shouldReduceMotion = useReducedMotion();

  const navigate = useCallback((to: Screen) => {
    setScreen(to);
  }, []);

  const toggleMusic = useCallback(() => {
    setMusicOn((current) => !current);
  }, []);

  const selectTrack = useCallback((trackId: string) => {
    setSelectedTrack(trackId);
  }, []);

  useEffect(() => {
    const stopMusic = () => setMusicOn(false);

    window.addEventListener(STOP_MUSIC_EVENT, stopMusic);
    return () => window.removeEventListener(STOP_MUSIC_EVENT, stopMusic);
  }, []);

  return (
    <main
      className="app-shell"
      data-music-on={musicOn ? "true" : undefined}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {screen === "WELCOME" ? (
            <WelcomeScreen navigate={navigate} />
          ) : screen === "ROOM" ? (
            <RoomScreen
              navigate={navigate}
              musicOn={musicOn}
              selectedTrack={selectedTrack}
              onToggleMusic={toggleMusic}
              onSelectTrack={selectTrack}
            />
          ) : screen === "LETTER" ? (
            <LetterScreen navigate={navigate} />
          ) : screen === "MEMORIES" ? (
            <MemoriesScreen navigate={navigate} />
          ) : screen === "SUNSET" ? (
            <SunsetScreen
              navigate={navigate}
              musicOn={musicOn}
              selectedTrack={selectedTrack}
              onToggleMusic={toggleMusic}
              onSelectTrack={selectTrack}
            />
          ) : screen === "PLAN" ? (
            <PlanScreen navigate={navigate} />
          ) : (
            <MessageScreen navigate={navigate} />
          )}
        </motion.div>
      </AnimatePresence>
      <MusicPlayer musicOn={musicOn} selectedTrack={selectedTrack} />
    </main>
  );
}
