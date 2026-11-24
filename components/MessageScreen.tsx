"use client";

import { useState } from "react";
import content from "@/lib/content";
import type { Navigate } from "@/lib/navigation";
import { submitMessage } from "@/lib/send";
import { useEscapeToRoom } from "@/lib/useEscapeToRoom";

const MAX_LENGTH = 600;

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

type MessageScreenProps = {
  navigate: Navigate;
};

export default function MessageScreen({ navigate }: MessageScreenProps) {
  useEscapeToRoom(navigate);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState("");

  const reset = () => {
    setMessage("");
    setStatus("idle");
    setMailto("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending" || message.trim().length === 0) return;

    const gotcha = String(
      new FormData(event.currentTarget).get("_gotcha") ?? "",
    );

    setStatus("sending");
    const result = await submitMessage({ message }, gotcha);

    if (result.status === "sent") {
      setStatus("sent");
      return;
    }

    setMailto(result.mailto);

    if (result.status === "fallback") {
      setStatus("fallback");
      window.location.assign(result.mailto);
      return;
    }

    setStatus("error");
  };

  return (
    <section className="detail-screen" aria-label="Message">
      <div className="detail-topbar">
        <p className="detail-kicker">MESSAGE</p>
        <button
          type="button"
          className="ghost-button ghost-button--compact"
          onClick={() => navigate("ROOM")}
          aria-label="Back to the room"
        >
          BACK
        </button>
      </div>

      <div className="form-scroll">
        {status === "sent" ? (
          <div className="form-card form-card--receipt">
            <p className="form-kicker">MESSAGE</p>
            <h1 className="form-title">Sent. Thank you for telling me.</h1>
            <p className="form-copy">
              Your words are out in the world now. Nothing was saved in this
              room.
            </p>
            <button
              type="button"
              className="form-submit"
              onClick={reset}
              aria-label="Write another"
            >
              WRITE ANOTHER
            </button>
          </div>
        ) : (
          <form className="form-card" onSubmit={handleSubmit}>
            <p className="form-kicker">A MESSAGE</p>
            <h1 className="form-title">Say the thing you need to say.</h1>
            <p className="form-copy">
              No account, no inbox, no history. Just words sent once.
            </p>

            {status === "error" ? (
              <div className="form-section" role="alert">
                <p
                  className="form-copy"
                  style={{ color: "var(--pink-dark)" }}
                >
                  Couldn&apos;t send. Please try again.
                </p>
                <a className="form-link" href={mailto}>
                  OPEN YOUR EMAIL APP
                </a>
              </div>
            ) : null}

            {status === "fallback" ? (
              <div className="form-section" role="alert">
                <p
                  className="form-copy"
                  style={{ color: "var(--pink-dark)" }}
                >
                  Your email app should open with this message. You can also
                  open it again below.
                </p>
                <a className="form-link" href={mailto}>
                  OPEN YOUR EMAIL APP
                </a>
              </div>
            ) : null}

            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <div className="form-section">
              <label className="form-legend" htmlFor="message-body">
                YOUR MESSAGE
              </label>
              <textarea
                id="message-body"
                className="form-input form-textarea form-textarea--message"
                maxLength={MAX_LENGTH}
                rows={8}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="write it here..."
              />
              <p className="form-count">
                {message.length} / {MAX_LENGTH}
              </p>
            </div>

            <div className="form-send">
              <p className="form-address">
                This will be sent to {content.letter.senderName}.
              </p>
              <button
                type="submit"
                className="form-submit"
                disabled={status === "sending" || message.trim().length === 0}
              >
                {status === "sending" ? "SENDING..." : "SEND"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
