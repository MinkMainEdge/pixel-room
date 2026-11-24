"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/content";
import PixelHeart from "./PixelHeart";

type MemoryPhotoProps = {
  photo: Photo;
  onOpen: (photo: Photo) => void;
};

export default function MemoryPhoto({ photo, onOpen }: MemoryPhotoProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !photo.src || failed;

  return (
    <figure className="polaroid">
      <button
        type="button"
        className="polaroid-photo polaroid-photo--button"
        onClick={() => onOpen(photo)}
        aria-label={`Open photo larger: ${photo.caption}`}
      >
        {showFallback ? (
          <span
            className="polaroid-fallback"
            role="img"
            aria-label={photo.alt || "A memory waiting for its photo"}
          >
            <PixelHeart size={34} color="var(--pink-dark)" />
          </span>
        ) : (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            unoptimized
            loading="lazy"
            sizes="(max-width: 520px) 40vw, 200px"
            className="polaroid-image"
            onError={() => setFailed(true)}
          />
        )}
      </button>
      <figcaption className="polaroid-caption">{photo.caption}</figcaption>
    </figure>
  );
}
