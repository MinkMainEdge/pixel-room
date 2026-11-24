export const STOP_MUSIC_EVENT = "room:stop-music";

export function stopBackgroundMusic() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STOP_MUSIC_EVENT));
  }
}
