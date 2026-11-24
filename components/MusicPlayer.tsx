"use client";

import { useEffect } from "react";

import content from "@/lib/content";

type MusicPlayerProps = {
  musicOn: boolean;
  selectedTrack: string;
};

export default function MusicPlayer({
  musicOn,
  selectedTrack,
}: MusicPlayerProps) {
  const selectedId = content.music.some((track) => track.id === selectedTrack)
    ? selectedTrack
    : content.music[0]?.id;

  const src = selectedId
    ? `https://www.youtube-nocookie.com/embed/${selectedId}?autoplay=1&playsinline=1&loop=1&playlist=${selectedId}`
    : null;

  useEffect(() => {
    if (musicOn && src) {
      console.log("music iframe src:", src);
    }
  }, [musicOn, src]);

  if (!musicOn || !src) return null;

  return (
    <div className="music-player">
      <div className="music-frame">
        <iframe
          key={selectedId}
          src={src}
          allow="autoplay; encrypted-media"
          title="Background music"
        />
      </div>
    </div>
  );
}
