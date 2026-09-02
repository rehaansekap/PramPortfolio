"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Video, Maximize2 } from "lucide-react";

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        // Close if clicking outside the media container
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md font-mono text-xs text-white/90 shadow-lg pointer-events-auto">
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

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-white/20 border border-white/10 backdrop-blur-md font-mono text-xs text-white/90 hover:text-white transition-all shadow-lg pointer-events-auto group"
          title="Tutup (Esc)"
          aria-label="Close lightbox"
        >
          <span className="text-[10px] text-white/50 group-hover:text-white/80 transition-colors">ESC</span>
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Navigation Buttons (if > 1 items) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/30 text-white transition-all shadow-2xl z-20 group"
            title="Sebelumnya (Panah Kiri)"
            aria-label="Previous media"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/30 text-white transition-all shadow-2xl z-20 group"
            title="Berikutnya (Panah Kanan)"
            aria-label="Next media"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Media Centerpiece */}
      <div
        className="relative max-w-5xl max-h-[82vh] w-full h-full flex items-center justify-center"
        onClick={(e) => {
          // Allow clicking outside the actual media to dismiss
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {isVideo ? (
          <div className="relative max-w-full max-h-[82vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
            <video
              key={currentItem.url}
              src={currentItem.url}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            >
              Browser Anda tidak mendukung pemutar video ini.
            </video>
          </div>
        ) : (
          <div className="relative max-w-full max-h-[82vh] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.alt || "Pratinjau Media"}
              className="max-w-[92vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg border border-white/10 shadow-2xl pointer-events-auto"
            />
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] text-white/50 pointer-events-none text-center">
        {total > 1 ? "Gunakan panah kiri / kanan untuk berpindah • Klik di luar untuk keluar" : "Klik di luar gambar atau tekan Esc untuk keluar"}
      </div>
    </div>
  );
}
