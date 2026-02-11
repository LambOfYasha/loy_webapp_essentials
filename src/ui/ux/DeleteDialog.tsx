import React from "react";
import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";

export interface DeleteDialogProps extends Omit<ConfirmDialogProps, "variant" | "confirmLabel" | "title"> {
  title?: string;
  confirmLabel?: string;
  itemName?: string;
}

export function DeleteDialog({
  title = "Delete Item",
  confirmLabel = "Delete",
  itemName,
  message,
  ...props
}: DeleteDialogProps) {
  const finalMessage = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : message;

  return React.createElement(ConfirmDialog, {
    ...props,
    title,
    message: finalMessage,
    confirmLabel,
    variant: "danger",
  });
}
