"use client";

import content from "@/lib/content";
import type { Navigate } from "@/lib/navigation";
import { useEscapeToRoom } from "@/lib/useEscapeToRoom";
import MusicControl, { type MusicControlProps } from "./MusicControl";
import SunsetCanvas from "./SunsetCanvas";

type SunsetScreenProps = MusicControlProps & {
  navigate: Navigate;
};

export default function SunsetScreen({
  navigate,
  musicOn,
  selectedTrack,
  onToggleMusic,
  onSelectTrack,
}: SunsetScreenProps) {
  useEscapeToRoom(navigate);

  return (
    <section className="detail-screen" aria-label="Sunset">
      <div className="detail-topbar detail-topbar--with-music">
        <p className="detail-kicker">THE SUNSET</p>
        <div className="detail-topbar-actions">
          <button
            type="button"
            className="ghost-button ghost-button--compact"
            onClick={() => navigate("ROOM")}
            aria-label="Back to the room"
          >
            BACK
          </button>
          <MusicControl
            musicOn={musicOn}
            selectedTrack={selectedTrack}
            onToggleMusic={onToggleMusic}
            onSelectTrack={onSelectTrack}
          />
        </div>
      </div>

      <div className="sunset-scroll">
        <div className="scene-frame">
          <div className="room-stage-wrap">
            <SunsetCanvas />
          </div>
        </div>

        <p className="sunset-caption">{content.benchMessage}</p>
      </div>
    </section>
  );
}
