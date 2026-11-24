"use client";

import { useState } from "react";
import content from "@/lib/content";
import type { Navigate } from "@/lib/navigation";
import { submitPlan, type PlanFields } from "@/lib/send";
import { useEscapeToRoom } from "@/lib/useEscapeToRoom";

const DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Night"];
const KIND_OPTIONS = ["Coffee", "Walk", "Movie", "Dinner", "Something quiet"];

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

type ChoiceChipsProps = {
  legend: string;
  options: string[];
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

function ChoiceChips({
  legend,
  options,
  value,
  disabled,
  onChange,
}: ChoiceChipsProps) {
  return (
    <fieldset className="form-section">
      <legend className="form-legend">{legend}</legend>
      <div className="chip-row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="chip"
            aria-pressed={value === option}
            disabled={disabled}
            onClick={() => onChange(value === option ? "" : option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

type MultiChipsProps = {
  legend: string;
  options: string[];
  values: string[];
  disabled: boolean;
  onChange: (values: string[]) => void;
};

function toggleOption(values: string[], option: string) {
  return values.includes(option)
    ? values.filter((value) => value !== option)
    : [...values, option];
}

function MultiChips({
  legend,
  options,
  values,
  disabled,
  onChange,
}: MultiChipsProps) {
  return (
    <fieldset className="form-section">
      <legend className="form-legend">{legend}</legend>
      <div className="chip-row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="chip"
            aria-pressed={values.includes(option)}
            disabled={disabled}
            onClick={() => onChange(toggleOption(values, option))}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

type PlanScreenProps = {
  navigate: Navigate;
};

export default function PlanScreen({ navigate }: PlanScreenProps) {
  useEscapeToRoom(navigate);

  const [days, setDays] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [kindOfDate, setKindOfDate] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [notYet, setNotYet] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState("");

  const reset = () => {
    setDays([]);
    setDates([]);
    setTimeOfDay("");
    setKindOfDate([]);
    setNote("");
    setNotYet(false);
    setStatus("idle");
    setMailto("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const gotcha = String(
      new FormData(event.currentTarget).get("_gotcha") ?? "",
    );
    const fields: PlanFields = {
      days: days.join(", "),
      dates: dates.filter(Boolean).join(", "),
      timeOfDay,
      kindOfDate: kindOfDate.join(", "),
      note,
      notYet,
    };

    setStatus("sending");
    const result = await submitPlan(fields, gotcha);

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
    <section className="detail-screen" aria-label="Plan">
      <div className="detail-topbar">
        <p className="detail-kicker">PLAN</p>
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
            <p className="form-kicker">PLAN</p>
            <h1 className="form-title">
              {notYet
                ? "That's okay. Take all the time you need."
                : "Sent. I'll keep it close."}
            </h1>
            <p className="form-copy">
              {notYet
                ? "You do not owe anyone a date. The thought is enough."
                : "Whenever you are ready, we can make a little space for it."}
            </p>
            <button type="button" className="form-submit" onClick={reset}>
              MAKE ANOTHER PLAN
            </button>
          </div>
        ) : (
          <form className="form-card" onSubmit={handleSubmit}>
            <p className="form-kicker">A LITTLE PLAN</p>
            <h1 className="form-title">Want to spend some time together?</h1>
            <p className="form-copy">
              Pick anything that sounds nice. Every field is optional.
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
                  Your email app should open with this plan. You can also open
                  it again below.
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

            <fieldset className="form-fields" disabled={notYet}>
              <MultiChips
                legend="WHICH DAYS?"
                options={DAY_OPTIONS}
                values={days}
                disabled={notYet}
                onChange={setDays}
              />

              <div className="form-section">
                <p className="form-legend">WHICH DATES?</p>
                {dates.map((date, index) => (
                  <div className="form-date-row" key={index}>
                    <label className="form-date-label">
                      DATE {index + 1}
                      <input
                        className="form-input form-input--date"
                        type="date"
                        value={date}
                        disabled={notYet}
                        onChange={(event) =>
                          setDates((current) =>
                            current.map((value, dateIndex) =>
                              dateIndex === index ? event.target.value : value,
                            ),
                          )
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="chip chip--small"
                      disabled={notYet}
                      onClick={() =>
                        setDates((current) =>
                          current.filter((_, dateIndex) => dateIndex !== index),
                        )
                      }
                    >
                      REMOVE
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="form-text-button"
                  disabled={notYet}
                  onClick={() => setDates((current) => [...current, ""])}
                >
                  {dates.length === 0 ? "+ ADD A DATE" : "+ ADD ANOTHER DATE"}
                </button>
              </div>

              <ChoiceChips
                legend="WHAT TIME?"
                options={TIME_OPTIONS}
                value={timeOfDay}
                disabled={notYet}
                onChange={setTimeOfDay}
              />

              <MultiChips
                legend="WHAT KIND OF DATE?"
                options={KIND_OPTIONS}
                values={kindOfDate}
                disabled={notYet}
                onChange={setKindOfDate}
              />

              <div className="form-section">
                <label className="form-legend" htmlFor="plan-note">
                  ANYTHING ELSE?
                </label>
                <textarea
                  id="plan-note"
                  className="form-input form-textarea"
                  maxLength={240}
                  rows={3}
                  value={note}
                  disabled={notYet}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="optional"
                />
              </div>
            </fieldset>

            <div className="form-not-yet">
              <button
                type="button"
                className="chip chip--wide"
                aria-pressed={notYet}
                onClick={() => setNotYet((current) => !current)}
              >
                {notYet ? "NOT YET - THAT'S OKAY" : "NOT YET"}
              </button>
              <p className="form-hint">
                {notYet
                  ? "The details are resting. Just the thought will be sent."
                  : "This skips the details and sends the thought alone."}
              </p>
            </div>

            <div className="form-send">
              <p className="form-address">
                This will be sent to {content.letter.senderName}.
              </p>
              <button
                type="submit"
                className="form-submit"
                disabled={status === "sending"}
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
