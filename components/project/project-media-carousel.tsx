"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Video, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaLightbox, isVideoUrl } from "@/components/common/media-lightbox";

interface ProjectMediaCarouselProps {
  mediaUrls: string[];
  projectTitle: string;
  className?: string;
}

export function ProjectMediaCarousel({
  mediaUrls,
  projectTitle,
  className = "",
}: ProjectMediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const total = mediaUrls.length;

  const items = mediaUrls.map((url, i) => ({
    url,
    alt: `${projectTitle} media ${i + 1}`,
    type: isVideoUrl(url) ? ("video" as const) : ("image" as const),
  }));

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!mediaUrls || mediaUrls.length === 0) return null;

  const activeMedia = items[currentIndex];
  const isCurrentVideo = activeMedia.type === "video";

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Main Showcase Frame */}
      <div className="relative aspect-video w-full rounded-lg border border-border-subtle bg-bg-elevated overflow-hidden shadow-sm group select-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeMedia.url}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 55 : direction < 0 ? -55 : 0,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -55 : direction < 0 ? 55 : 0,
            }}
            transition={{
              x: { type: "spring", stiffness: 320, damping: 30 },
              opacity: { duration: 0.18 },
            }}
            className="w-full h-full relative"
          >
            {isCurrentVideo ? (
              <div className="w-full h-full relative bg-black flex items-center justify-center">
                <video
                  key={activeMedia.url}
                  src={activeMedia.url}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Browser Anda tidak mendukung tag video.
                </video>

                {/* Maximize Fullscreen Overlay Button */}
                <button
                  type="button"
                  onClick={() => openLightbox(currentIndex)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-md z-10 hover:scale-105"
                  title="Buka Video di Layar Penuh (Overlay)"
                  aria-label="Open video fullscreen lightbox"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => openLightbox(currentIndex)}
                className="w-full h-full relative cursor-zoom-in"
                title="Klik untuk melihat pratinjau penuh layar"
              >
                <Image
                  src={activeMedia.url}
                  alt={activeMedia.alt || projectTitle}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />

                {/* Top Right Maximize Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-white font-mono text-[11px] backdrop-blur-md shadow-md opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Perbesar</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* HUD Slide Counter Badge */}
        {total > 1 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 border border-white/15 text-white/90 font-mono text-xs backdrop-blur-md pointer-events-none z-10">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        )}

        {/* Carousel Arrow Controls (if > 1 items) */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-lg z-10 opacity-70 hover:opacity-100 group/btn hover:scale-105"
              title="Slide Sebelumnya"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-lg z-10 opacity-70 hover:opacity-100 group/btn hover:scale-105"
              title="Slide Berikutnya"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip (if multiple media) */}
      {total > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {items.map((item, idx) => {
            const isSelected = idx === currentIndex;
            const isThumbVideo = item.type === "video";
            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelect(idx)}
                className={`relative w-24 sm:w-28 aspect-video rounded overflow-hidden border transition-all duration-150 shrink-0 bg-bg-elevated ${
                  isSelected
                    ? "border-accent ring-2 ring-accent/60 scale-[1.03]"
                    : "border-border-subtle opacity-70 hover:opacity-100 hover:border-border-hover"
                }`}
                title={`Pilih media ${idx + 1}`}
                aria-label={`Thumbnail media ${idx + 1}`}
              >
                {isThumbVideo ? (
                  <div className="w-full h-full relative bg-black/50 flex items-center justify-center">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover pointer-events-none"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}

                {isThumbVideo && (
                  <div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-black/70 font-mono text-[9px] text-white flex items-center gap-0.5">
                    <Video className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Overlay */}
      <MediaLightbox
        items={items}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
