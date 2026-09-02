"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badgeText?: string;
  maxWidthClassName?: string;
  children: React.ReactNode;
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  badgeText = "RECORD // ENTRY",
  maxWidthClassName = "max-w-3xl",
  children,
}: AdminModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Darkened Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className={`relative w-full ${maxWidthClassName} rounded border border-border-hover bg-bg-base shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10`}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-border-subtle bg-bg-elevated flex items-center justify-between shrink-0 font-mono">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded bg-text-primary text-bg-base flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-text-primary truncate">
                      {title}
                    </h3>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-bg-base border border-border-subtle text-[9px] font-semibold text-text-muted tracking-wider uppercase">
                      {badgeText}
                    </span>
                  </div>
                  {subtitle && (
                    <p className="text-[11px] text-text-secondary truncate mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded border border-border-subtle hover:border-border-hover bg-bg-base text-text-muted hover:text-text-primary transition-colors focus:outline-none shrink-0"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Custom Scroll */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
