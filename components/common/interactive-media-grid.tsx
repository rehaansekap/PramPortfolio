"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaLightbox, isVideoUrl } from "./media-lightbox";
import { Maximize2, Video } from "lucide-react";

interface InteractiveMediaGridProps {
  mediaUrls: string[];
  altPrefix?: string;
  gridColsClassName?: string;
  aspectRatioClassName?: string;
}

export function InteractiveMediaGrid({
  mediaUrls,
  altPrefix = "Dokumentasi",
  gridColsClassName = "grid-cols-2 sm:grid-cols-3",
  aspectRatioClassName = "aspect-video",
}: InteractiveMediaGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!mediaUrls || mediaUrls.length === 0) return null;

  const items = mediaUrls.map((url, i) => ({
    url,
    alt: `${altPrefix} ${i + 1}`,
    type: isVideoUrl(url) ? ("video" as const) : ("image" as const),
  }));

  const handleOpen = (index: number) => {
    setActiveIdx(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className={`grid ${gridColsClassName} gap-2.5`}>
        {mediaUrls.map((url, idx) => {
          const isVid = isVideoUrl(url);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleOpen(idx)}
              className={`relative ${aspectRatioClassName} rounded overflow-hidden border border-border-subtle hover:border-border-hover transition-all duration-200 group/media bg-bg-elevated block cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-accent`}
              title="Klik untuk melihat pratinjau penuh"
              aria-label={`Lihat media ${idx + 1}`}
            >
              {isVid ? (
                <div className="w-full h-full relative flex items-center justify-center bg-black/40">
                  <video
                    src={url}
                    className="w-full h-full object-cover pointer-events-none"
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/media:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
                      <Video className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={url}
                  alt={`${altPrefix} media ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 240px"
                  className="object-cover group-hover/media:scale-105 transition-transform duration-300"
                />
              )}

              {/* Hover Overlay with Maximize Icon */}
              <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover/media:opacity-100">
                <div className="p-1.5 rounded-full bg-black/70 border border-white/20 text-white shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <MediaLightbox
        items={items}
        currentIndex={activeIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setActiveIdx(newIndex)}
      />
    </>
  );
}
