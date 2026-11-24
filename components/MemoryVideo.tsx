"use client";

import Image from "next/image";
import { useState } from "react";
import { stopBackgroundMusic } from "@/lib/audio";
import type { Video } from "@/lib/content";
import PixelHeart from "./PixelHeart";

type MemoryVideoProps = {
  video: Video;
};

export default function MemoryVideo({ video }: MemoryVideoProps) {
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const openYoutube = () => {
    stopBackgroundMusic();
    setYoutubeOpen(true);
  };

  return (
    <figure className="polaroid memory-video-card">
      <div className="memory-video-frame">
        {video.youtubeId ? (
          youtubeOpen ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
              title={video.caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="memory-video-cover"
              onClick={openYoutube}
              aria-label={`Play video: ${video.caption}`}
            >
              {video.poster && !posterFailed ? (
                <Image
                  src={video.poster}
                  alt=""
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 520px) 90vw, 420px"
                  className="memory-video-cover-image"
                  onError={() => setPosterFailed(true)}
                />
              ) : (
                <span className="memory-video-cover-fallback">
                  <PixelHeart size={34} color="var(--pink-dark)" />
                </span>
              )}
              <span className="memory-video-play-badge">TAP TO PLAY</span>
            </button>
          )
        ) : video.src && !failed ? (
          <video
            className="memory-video-media"
            controls
            playsInline
            preload="metadata"
            autoPlay={false}
            poster={video.poster || undefined}
            onPlay={stopBackgroundMusic}
            onError={() => setFailed(true)}
          >
            <source src={video.src} />
          </video>
        ) : (
          <div
            className="memory-video-fallback"
            role="img"
            aria-label="Video unavailable"
          >
            <PixelHeart size={34} color="var(--pink-dark)" />
          </div>
        )}
      </div>

      <figcaption className="polaroid-caption">{video.caption}</figcaption>
    </figure>
  );
}
