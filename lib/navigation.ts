export type RoomDetail =
  | "LETTER"
  | "MEMORIES"
  | "SUNSET"
  | "PLAN"
  | "MESSAGE";

export type Screen = "WELCOME" | "ROOM" | RoomDetail;

export type Navigate = (to: Screen) => void;
