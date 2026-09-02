"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Video } from "lucide-react";

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
  const total = items.length;
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    if (!onNavigate || total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (!onNavigate || total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Keyboard navigation: Escape to close, ArrowLeft/Right to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  const isVideo = currentItem.type === "video" || isVideoUrl(currentItem.url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media Preview Lightbox"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 sm:p-12 animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        // Close if clicking outside the media container
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* HUD Info: Top Floating Counter */}
      {total > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-white/15 backdrop-blur-md font-mono text-xs text-white/90 shadow-lg pointer-events-none z-20">
          {isVideo && <Video className="w-3.5 h-3.5 text-accent" />}
          <span className="font-semibold tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {currentItem.alt && (
            <span className="hidden sm:inline border-l border-white/20 pl-2 text-white/60 truncate max-w-[280px]">
              {currentItem.alt}
            </span>
          )}
        </div>
      )}

      {/* Main Media Wrapper: Centers content and positions controls tight to the image */}
      <div
        className="relative inline-flex items-center justify-center max-w-[88vw] sm:max-w-4xl max-h-[84vh]"
        onClick={(e) => {
          // Clicking the wrapper itself (around margins) closes
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
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

        {/* Media Frame (Image or Video) */}
        <div className="relative rounded-lg overflow-hidden border border-white/15 shadow-2xl bg-black/90 max-h-[82vh] flex items-center justify-center">
          {isVideo ? (
            <video
              key={currentItem.url}
              src={currentItem.url}
              controls
              autoPlay
              playsInline
              className="max-w-[85vw] sm:max-w-4xl max-h-[80vh] w-auto h-auto object-contain bg-black"
            >
              Browser Anda tidak mendukung pemutar video.
            </video>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.alt || "Pratinjau Media"}
              className="max-w-[85vw] sm:max-w-4xl max-h-[80vh] w-auto h-auto object-contain select-none"
            />
          )}
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
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] text-white/50 pointer-events-none text-center">
        {total > 1 ? "Gunakan panah kiri / kanan untuk berpindah • Klik di luar untuk keluar" : "Klik di luar gambar atau tekan Esc untuk keluar"}
      </div>
    </div>
  );
}
