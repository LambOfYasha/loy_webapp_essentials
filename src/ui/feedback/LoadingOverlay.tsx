import React from "react";
import { LoadingState } from "./LoadingState";

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({
  visible,
  message = "Loading...",
  className = "",
}: LoadingOverlayProps) {
  if (!visible) return null;

  return React.createElement(
    "div",
    {
      className: `loy-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`,
    },
    React.createElement(
      "div",
      {
        className:
          "rounded-xl bg-[var(--color-card,#fff)] p-8 shadow-2xl",
      },
      React.createElement(LoadingState, { message, size: "lg" })
    )
  );
}
