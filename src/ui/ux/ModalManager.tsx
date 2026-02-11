import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";

export interface ModalConfig {
  id: string;
  content: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  onClose?: () => void;
}

export interface ModalContextValue {
  openModal: (config: Omit<ModalConfig, "id"> & { id?: string }) => string;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  activeModals: ModalConfig[];
}

const ModalContext = createContext<ModalContextValue | null>(null);

let modalCounter = 0;

const SIZE_STYLES: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[90vw] max-h-[90vh]",
};

function ModalItem({
  modal,
  onClose,
}: {
  modal: ModalConfig;
  onClose: (id: string) => void;
}) {
  const handleClose = useCallback(() => {
    modal.onClose?.();
    onClose(modal.id);
  }, [modal, onClose]);

  useEffect(() => {
    if (modal.closable === false) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [modal.closable, handleClose]);

  return React.createElement(
    "div",
    {
      className:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
      onClick: modal.closable !== false ? handleClose : undefined,
    },
    React.createElement(
      "div",
      {
        className: `w-full animate-[scale-in_200ms_ease-out] rounded-xl border border-[var(--color-border,#e9ecef)] bg-[var(--color-card,#fff)] shadow-2xl ${SIZE_STYLES[modal.size || "md"]}`,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      },
      (modal.title || modal.closable !== false) &&
        React.createElement(
          "div",
          {
            className:
              "flex items-center justify-between border-b border-[var(--color-border,#e9ecef)] px-6 py-4",
          },
          modal.title
            ? React.createElement(
                "h2",
                {
                  className:
                    "text-lg font-semibold text-[var(--color-foreground,#212529)]",
                },
                modal.title
              )
            : React.createElement("div"),
          modal.closable !== false &&
            React.createElement(
              "button",
              {
                type: "button",
                onClick: handleClose,
                className:
                  "text-xl text-[var(--color-muted-foreground,#868e96)] transition-colors hover:text-[var(--color-foreground,#212529)]",
                "aria-label": "Close modal",
              },
              "\u00D7"
            )
        ),
      React.createElement("div", { className: "p-6" }, modal.content)
    )
  );
}

export interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalConfig[]>([]);

  const openModal = useCallback(
    (config: Omit<ModalConfig, "id"> & { id?: string }): string => {
      const id = config.id || `modal-${++modalCounter}`;
      const modal: ModalConfig = { ...config, id, closable: config.closable ?? true };
      setModals((prev) => [...prev.filter((m) => m.id !== id), modal]);
      return id;
    },
    []
  );

  const closeModal = useCallback((id?: string) => {
    setModals((prev) => {
      if (id) return prev.filter((m) => m.id !== id);
      return prev.slice(0, -1); // Close last modal
    });
  }, []);

  const closeAllModals = useCallback(() => setModals([]), []);

  const value = useMemo<ModalContextValue>(
    () => ({ openModal, closeModal, closeAllModals, activeModals: modals }),
    [openModal, closeModal, closeAllModals, modals]
  );

  return React.createElement(
    ModalContext.Provider,
    { value },
    children,
    modals.map((modal) =>
      React.createElement(ModalItem, {
        key: modal.id,
        modal,
        onClose: (id) => {
          closeModal(id);
        },
      })
    )
  );
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
