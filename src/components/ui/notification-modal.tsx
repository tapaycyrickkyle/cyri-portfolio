"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";

export type NotificationTone = "success" | "error" | "warning" | "info";

type NotificationModalProps = {
  open: boolean;
  tone: NotificationTone;
  title: string;
  message: ReactNode;
  children?: ReactNode;
  onClose: () => void;
  closeLabel?: string;
  confirmLabel?: string;
  confirmPending?: boolean;
  confirmDisabled?: boolean;
  onConfirm?: () => void;
};

const toneConfig = {
  success: {
    eyebrow: "Success",
    icon: CheckCircle2,
    iconClassName:
      "border-emerald-700 bg-emerald-100 text-emerald-950 dark:border-emerald-300/70 dark:bg-emerald-950/70 dark:text-emerald-50",
  },
  error: {
    eyebrow: "Error",
    icon: AlertCircle,
    iconClassName:
      "border-red-700 bg-red-100 text-red-950 dark:border-red-300/70 dark:bg-red-950/70 dark:text-red-50",
  },
  warning: {
    eyebrow: "Confirmation",
    icon: TriangleAlert,
    iconClassName:
      "border-amber-700 bg-amber-100 text-amber-950 dark:border-amber-300/70 dark:bg-amber-950/70 dark:text-amber-50",
  },
  info: {
    eyebrow: "Notice",
    icon: Info,
    iconClassName: "border-outline-strong bg-surface-soft text-foreground",
  },
} as const;

export function NotificationModal({
  children,
  closeLabel = "Close",
  confirmDisabled = false,
  confirmLabel = "Confirm",
  confirmPending = false,
  message,
  onClose,
  onConfirm,
  open,
  title,
  tone,
}: NotificationModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const descriptionId = useId();
  const config = toneConfig[tone];
  const Icon = config.icon;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-[#0c0f12]/65 px-4 py-6 backdrop-blur-sm sm:px-6"
      role={tone === "error" ? "alertdialog" : "dialog"}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className="dialog-panel relative flex max-h-[min(86vh,42rem)] w-full max-w-lg flex-col overflow-y-auto border border-outline bg-surface text-foreground shadow-[var(--shadow-panel)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-4 border-b border-outline px-5 py-5 sm:px-6">
          <span className={`flex size-10 shrink-0 items-center justify-center border ${config.iconClassName}`}>
            <Icon className="size-5" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1 pr-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
              {config.eyebrow}
            </p>
            <h2 id={titleId} className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
              {title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex size-9 items-center justify-center border border-transparent text-muted transition-colors hover:border-outline-strong hover:bg-surface-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <p id={descriptionId} className="text-sm leading-7 text-muted sm:text-base">
            {message}
          </p>
          {children ? <div className="mt-5">{children}</div> : null}
        </div>

        <div className="mt-auto flex flex-col-reverse gap-2 border-t border-outline px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center justify-center border border-outline-strong px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {onConfirm ? "Cancel" : closeLabel}
          </button>
          {onConfirm ? (
            <button
              type="button"
              disabled={confirmDisabled || confirmPending}
              onClick={onConfirm}
              className="private-primary-action inline-flex min-h-10 items-center justify-center border border-foreground bg-foreground px-4 text-sm font-medium text-background transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-55"
            >
              {confirmPending ? "Working…" : confirmLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function DismissibleNotification({
  message,
  title,
  tone,
}: {
  message: ReactNode;
  title: string;
  tone: NotificationTone;
}) {
  const [open, setOpen] = useState(true);

  return (
    <NotificationModal
      open={open}
      tone={tone}
      title={title}
      message={message}
      onClose={() => setOpen(false)}
    />
  );
}
