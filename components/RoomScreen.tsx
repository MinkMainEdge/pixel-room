"use client";

import type { CSSProperties } from "react";
import MusicControl, { type MusicControlProps } from "./MusicControl";
import RoomCanvas from "./RoomCanvas";
import type { Navigate, RoomDetail } from "@/lib/navigation";

type Hotspot = {
  label: string;
  labelClass: string;
  ariaLabel: string;
  to: RoomDetail;
  left: string;
  top: string;
  width: string;
  height: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    label: "LETTER",
    labelClass: "hotspot-label hotspot-label--left",
    ariaLabel: "Open the letter",
    to: "LETTER",
    left: "6.7%",
    top: "35%",
    width: "10.8%",
    height: "12.5%",
  },
  {
    label: "MEMORIES",
    labelClass: "hotspot-label hotspot-label--left hotspot-label--low",
    ariaLabel: "Open memories",
    to: "MEMORIES",
    left: "18.3%",
    top: "35%",
    width: "10.8%",
    height: "12.5%",
  },
  {
    label: "SUNSET",
    labelClass: "hotspot-label",
    ariaLabel: "Look at the sunset through the window",
    to: "SUNSET",
    left: "32.5%",
    top: "10%",
    width: "35%",
    height: "35%",
  },
  {
    label: "PLAN",
    labelClass: "hotspot-label hotspot-label--right",
    ariaLabel: "Make a plan together",
    to: "PLAN",
    left: "71.7%",
    top: "31.2%",
    width: "9.2%",
    height: "16.2%",
  },
  {
    label: "MESSAGE",
    labelClass: "hotspot-label hotspot-label--right hotspot-label--low",
    ariaLabel: "Leave a message",
    to: "MESSAGE",
    left: "84.2%",
    top: "35%",
    width: "9.2%",
    height: "12.5%",
  },
];

type RoomScreenProps = MusicControlProps & {
  navigate: Navigate;
};

export default function RoomScreen({
  navigate,
  musicOn,
  selectedTrack,
  onToggleMusic,
  onSelectTrack,
}: RoomScreenProps) {
  return (
    <section className="screen" aria-label="Room">
      <div className="room-music-control">
        <MusicControl
          musicOn={musicOn}
          selectedTrack={selectedTrack}
          onToggleMusic={onToggleMusic}
          onSelectTrack={onSelectTrack}
        />
      </div>

      <div className="scene-frame">
        <div className="room-stage-wrap">
          <RoomCanvas />

          {HOTSPOTS.map((hotspot) => (
            <button
              key={hotspot.to}
              type="button"
              className={`hotspot hotspot--${hotspot.to.toLowerCase()}`}
              onClick={() => navigate(hotspot.to)}
              aria-label={hotspot.ariaLabel}
              style={
                {
                  "--hotspot-left": hotspot.left,
                  "--hotspot-top": hotspot.top,
                  "--hotspot-width": hotspot.width,
                  "--hotspot-height": hotspot.height,
                } as CSSProperties
              }
            >
              <span className={hotspot.labelClass}>{hotspot.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="hint">Tap anything on the shelves, or the window.</p>
    </section>
  );
}
