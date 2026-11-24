"use client";

import content from "@/lib/content";

export type MusicControlProps = {
  musicOn: boolean;
  selectedTrack: string;
  onToggleMusic: () => void;
  onSelectTrack: (trackId: string) => void;
};

export default function MusicControl({
  musicOn,
  selectedTrack,
  onToggleMusic,
  onSelectTrack,
}: MusicControlProps) {
  return (
    <div className="music-control" role="group" aria-label="Music controls">
      <button
        type="button"
        className="music-control__toggle"
        aria-pressed={musicOn}
        aria-label={musicOn ? "Turn music off" : "Turn music on"}
        onClick={onToggleMusic}
      >
        {musicOn ? "MUSIC: ON" : "MUSIC: OFF"}
      </button>

      <div className="music-control__tracks" role="group" aria-label="Choose a song">
        {content.music.map((track) => {
          const selected = track.id === selectedTrack;

          return (
            <button
              key={track.id}
              type="button"
              className="music-chip"
              aria-pressed={selected}
              aria-label={`Choose ${track.title}`}
              onClick={() => onSelectTrack(track.id)}
            >
              {track.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
