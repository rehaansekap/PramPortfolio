"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaLightbox, isVideoUrl } from "./media-lightbox";
import { Maximize2, Video } from "lucide-react";

interface ClickableMediaProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  aspectRatioClassName?: string;
  width?: number;
  height?: number;
}

export function ClickableMedia({
  src,
  alt,
  fill = true,
  priority = false,
  sizes,
  className = "object-cover",
  containerClassName = "",
  aspectRatioClassName = "aspect-video",
  width,
  height,
}: ClickableMediaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isVid = isVideoUrl(src);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`relative ${aspectRatioClassName} cursor-zoom-in group select-none ${containerClassName}`}
        title="Klik untuk membuka layar penuh (Overlay)"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
        aria-label={`Buka media ${alt}`}
      >
        {isVid ? (
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            <video
              src={src}
              className="w-full h-full object-cover pointer-events-none"
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white">
                <Video className="w-5 h-5" />
              </div>
            </div>
          </div>
        ) : fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={className}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            priority={priority}
            className={className}
          />
        )}

        {/* Hover overlay hint */}
        <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      <MediaLightbox
        items={[{ url: src, alt, type: isVid ? "video" : "image" }]}
        currentIndex={0}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
