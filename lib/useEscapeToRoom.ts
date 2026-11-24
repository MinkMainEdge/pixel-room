"use client";

import { useEffect } from "react";
import type { Navigate } from "@/lib/navigation";

export function useEscapeToRoom(navigate: Navigate) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("ROOM");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
}
