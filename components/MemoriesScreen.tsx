"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import content, { type Photo } from "@/lib/content";
import type { Navigate } from "@/lib/navigation";
import MemoryPhoto from "./MemoryPhoto";
import MemoryVideo from "./MemoryVideo";
import PixelHeart from "./PixelHeart";

type MemoriesScreenProps = {
  navigate: Navigate;
};

export default function MemoriesScreen({ navigate }: MemoriesScreenProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [lightboxFailed, setLightboxFailed] = useState(false);

  const openPhoto = (photo: Photo) => {
    setLightboxFailed(false);
    setSelectedPhoto(photo);
  };

  const closePhoto = () => setSelectedPhoto(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (selectedPhoto) {
        setSelectedPhoto(null);
        return;
      }

      navigate("ROOM");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <section className="detail-screen" aria-label="Memories">
      <div className="detail-topbar">
        <p className="detail-kicker">MEMORIES</p>
        <div className="detail-topbar-actions">
          <button
            type="button"
            className="ghost-button ghost-button--compact"
            onClick={() => navigate("ROOM")}
            aria-label="Back to the room"
          >
            BACK
          </button>
        </div>
      </div>

      <div className="memories-scroll">
        <div className="memories-grid">
          {content.photos.map((photo) => (
            <MemoryPhoto key={photo.id} photo={photo} onOpen={openPhoto} />
          ))}
        </div>

        {content.videos.length > 0 ? (
          <div className="memory-videos">
            {content.videos.map((video) => (
              <MemoryVideo key={video.id} video={video} />
            ))}
          </div>
        ) : null}
      </div>

      {selectedPhoto ? (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${selectedPhoto.caption}`}
        >
          <div className="photo-lightbox-card">
            <div className="photo-lightbox-topbar">
              <p className="detail-kicker">MEMORY</p>
              <button
                type="button"
                className="ghost-button ghost-button--compact"
                onClick={closePhoto}
                aria-label="Close photo"
              >
                CLOSE
              </button>
            </div>

            <div className="photo-lightbox-frame">
              {!selectedPhoto.src || lightboxFailed ? (
                <div
                  className="photo-lightbox-fallback"
                  role="img"
                  aria-label={
                    selectedPhoto.alt || "A memory waiting for its photo"
                  }
                >
                  <PixelHeart size={54} color="var(--pink-dark)" />
                </div>
              ) : (
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(max-width: 560px) 90vw, 520px"
                  className="photo-lightbox-image"
                  onError={() => setLightboxFailed(true)}
                />
              )}
            </div>

            <p className="photo-lightbox-caption">{selectedPhoto.caption}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
