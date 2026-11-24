import content from "@/lib/content";

export type PlanFields = {
  days: string;
  dates: string;
  timeOfDay: string;
  kindOfDate: string;
  note: string;
  notYet: boolean;
};

export type MessageFields = {
  message: string;
};

type Submission =
  | { type: "plan"; fields: PlanFields }
  | { type: "message"; fields: MessageFields };

type FlatPayload = Record<string, string>;

export type SendResult =
  | { status: "sent" }
  | { status: "fallback"; mailto: string }
  | { status: "error"; mailto: string };

const NOT_ANSWERED = "(not answered)";

const FIELD_LABELS: Record<string, string> = {
  type: "Type",
  days: "Days",
  dates: "Dates",
  timeOfDay: "Time of day",
  kindOfDate: "Kind of date",
  notYet: "Not yet",
  note: "Note",
  message: "Message",
  sentAt: "Sent at",
};

function answer(value: string) {
  return value.trim() || NOT_ANSWERED;
}

export function formatPhilippineTime(date = new Date()) {
  const formatted = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  return `${formatted} PHT`;
}

function buildPayload(submission: Submission, gotcha: string): FlatPayload {
  const sentAt = formatPhilippineTime();

  if (submission.type === "plan") {
    const { fields } = submission;

    return {
      _subject: "💌 A reply from her: Plan",
      type: "Plan",
      days: fields.notYet ? NOT_ANSWERED : answer(fields.days),
      dates: fields.notYet ? NOT_ANSWERED : answer(fields.dates),
      timeOfDay: fields.notYet ? NOT_ANSWERED : answer(fields.timeOfDay),
      kindOfDate: fields.notYet ? NOT_ANSWERED : answer(fields.kindOfDate),
      notYet: fields.notYet ? "Yes" : "No",
      note: fields.notYet ? NOT_ANSWERED : answer(fields.note),
      sentAt,
      _gotcha: gotcha,
    };
  }

  return {
    _subject: "💌 A message from her",
    type: "Message",
    message: answer(submission.fields.message),
    sentAt,
    _gotcha: gotcha,
  };
}

function buildMailtoBody(payload: FlatPayload) {
  return Object.entries(payload)
    .filter(([key]) => key !== "_subject" && key !== "_gotcha")
    .map(([key, value]) => `${FIELD_LABELS[key] ?? key}: ${value}`)
    .join("\n");
}

function mailtoForPayload(payload: FlatPayload) {
  return `mailto:${content.senderEmail}?subject=${encodeURIComponent(
    payload._subject,
  )}&body=${encodeURIComponent(buildMailtoBody(payload))}`;
}

export function buildMailtoHref(submission: Submission, gotcha = "") {
  return mailtoForPayload(buildPayload(submission, gotcha));
}

async function submit(
  submission: Submission,
  gotcha: string,
): Promise<SendResult> {
  const payload = buildPayload(submission, gotcha);
  const mailto = mailtoForPayload(payload);
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim();

  if (!endpoint) {
    return { status: "fallback", mailto };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status < 200 || response.status >= 300) {
      return { status: "error", mailto };
    }

    return { status: "sent" };
  } catch {
    return { status: "error", mailto };
  }
}

export function submitPlan(fields: PlanFields, gotcha = "") {
  return submit({ type: "plan", fields }, gotcha);
}

export function submitMessage(fields: MessageFields, gotcha = "") {
  return submit({ type: "message", fields }, gotcha);
}
