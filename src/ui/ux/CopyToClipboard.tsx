import React, { useState, useCallback } from "react";

export interface CopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
  copiedDuration?: number;
  onCopy?: () => void;
}

export function CopyToClipboard({
  text,
  children,
  className = "",
  copiedDuration = 2000,
  onCopy,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), copiedDuration);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), copiedDuration);
    }
  }, [text, copiedDuration, onCopy]);

  if (children) {
    return React.createElement(
      "button",
      { type: "button", onClick: handleCopy, className },
      children
    );
  }

  return React.createElement(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: `loy-copy inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border,#e9ecef)] px-3 py-1.5 text-sm transition-colors hover:bg-[var(--color-muted,#f1f3f5)] ${className}`,
      title: "Copy to clipboard",
    },
    copied ? "Copied!" : "Copy"
  );
}
