"use client";

import content from "@/lib/content";
import type { Navigate } from "@/lib/navigation";
import { useEscapeToRoom } from "@/lib/useEscapeToRoom";
import PixelHeart from "./PixelHeart";

type LetterScreenProps = {
  navigate: Navigate;
};

export default function LetterScreen({ navigate }: LetterScreenProps) {
  useEscapeToRoom(navigate);
  const { recipientName, body, senderName } = content.letter;

  return (
    <section className="detail-screen" aria-label="Letter">
      <div className="detail-topbar">
        <p className="detail-kicker">THE LETTER</p>
        <button
          type="button"
          className="ghost-button ghost-button--compact"
          onClick={() => navigate("ROOM")}
          aria-label="Back to the room"
        >
          BACK
        </button>
      </div>

      <article className="letter-card" tabIndex={0} aria-label="A letter for you">
        <h1 className="letter-heading">Dear {recipientName},</h1>

        <div className="letter-body">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="letter-signature">
          <div>
            <p className="letter-signoff">with love,</p>
            <p className="letter-sender">{senderName}</p>
          </div>
          <PixelHeart size={20} color="var(--pink-dark)" />
        </div>
      </article>
    </section>
  );
}
