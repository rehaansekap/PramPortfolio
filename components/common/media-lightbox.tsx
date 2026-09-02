"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface MediaItem {
  url: string;
  alt?: string;
  type?: "image" | "video";
}

interface MediaLightboxProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (newIndex: number) => void;
}

export function isVideoUrl(url: string) {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".ogg") ||
    url.includes("video") ||
    url.includes("gtv-videos-bucket")
  );
}

export function MediaLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0);
  const total = items.length;
  const currentItem = items[currentIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (!onNavigate || total <= 1) return;
    setDirection(-1);
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (!onNavigate || total <= 1) return;
    setDirection(1);
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Lock scroll, hide 3D orb, and keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    document.body.setAttribute("data-lightbox-open", "true");
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeAttribute("data-lightbox-open");
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!mounted) return null;

  const isVideo = currentItem ? currentItem.type === "video" || isVideoUrl(currentItem.url) : false;

  return createPortal(
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Media Preview Lightbox"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 sm:p-12 select-none"
          onClick={(e) => {
            // Close if clicking outside the media container
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Main Media Wrapper with spring zoom expansion */}
          <motion.div
            key="lightbox-content"
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative flex flex-col items-center max-w-[88vw] sm:max-w-4xl max-h-[90vh]"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            {/* Position & Caption HUD Badge: Attached tightly above the image frame */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.18 }}
              className="flex items-center gap-2 mb-2.5 px-3.5 py-1 rounded-full bg-neutral-900/95 border border-white/20 backdrop-blur-md font-mono text-xs text-white/90 shadow-md self-center pointer-events-auto"
            >
              {isVideo && <Video className="w-3.5 h-3.5 text-accent" />}
              {total > 1 && (
                <span className="font-semibold tracking-wider text-accent">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              )}
              {currentItem.alt && (
                <span
                  className={`text-white/85 font-medium truncate max-w-[260px] sm:max-w-[480px] ${
                    total > 1 ? "border-l border-white/20 pl-2" : ""
                  }`}
                >
                  {currentItem.alt}
                </span>
              )}
            </motion.div>

            {/* Media Frame Container */}
            <div className="relative inline-flex items-center justify-center">
              {/* Close Button X: Positioned strictly on the top-right corner of the image/video */}
              <button
                type="button"
                onClick={onClose}
                className="absolute -top-3.5 -right-3.5 z-40 p-2 sm:p-2.5 rounded-full bg-neutral-900 border border-white/25 text-white hover:bg-white hover:text-black shadow-2xl transition-all hover:scale-110 cursor-pointer group"
                title="Tutup (Esc)"
                aria-label="Tutup pratinjau"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </button>

              {/* Previous Button: Positioned closely beside the left side of the image */}
              {total > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-neutral-900/90 hover:bg-white hover:text-black border border-white/20 text-white transition-all shadow-2xl hover:scale-105 cursor-pointer group"
                  title="Sebelumnya (Panah Kiri)"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Media Frame with directional slide & scale transition */}
              <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-2xl bg-black/90 max-h-[78vh] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentItem.url}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 36 : direction < 0 ? -36 : 0,
                      scale: 0.98,
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -36 : direction < 0 ? 36 : 0,
                      scale: 0.98,
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 320, damping: 30 },
                      opacity: { duration: 0.16 },
                      scale: { duration: 0.16 },
                    }}
                    className="flex items-center justify-center"
                  >
                    {isVideo ? (
                      <video
                        key={currentItem.url}
                        src={currentItem.url}
                        controls
                        autoPlay
                        playsInline
                        className="max-w-[85vw] sm:max-w-4xl max-h-[76vh] w-auto h-auto object-contain bg-black"
                      >
                        Browser Anda tidak mendukung pemutar video.
                      </video>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={currentItem.url}
                        src={currentItem.url}
                        alt={currentItem.alt || "Pratinjau Media"}
                        className="max-w-[85vw] sm:max-w-4xl max-h-[76vh] w-auto h-auto object-contain select-none"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button: Positioned closely beside the right side of the image */}
              {total > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-neutral-900/90 hover:bg-white hover:text-black border border-white/20 text-white transition-all shadow-2xl hover:scale-105 cursor-pointer group"
                  title="Berikutnya (Panah Kanan)"
                  aria-label="Next media"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Bottom Hint */}
            <div className="mt-2.5 text-center font-mono text-[11px] text-white/50 pointer-events-none">
              {total > 1
                ? "Gunakan panah kiri / kanan untuk berpindah • Klik di luar untuk keluar"
                : "Klik di luar gambar atau tekan Esc untuk keluar"}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
