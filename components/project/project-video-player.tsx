"use client";

import { useState } from "react";
import { Video, Maximize2 } from "lucide-react";
import { MediaLightbox } from "@/components/common/media-lightbox";

interface ProjectVideoPlayerProps {
  videoUrl: string;
  posterUrl?: string | null;
  title: string;
  locale: string;
}

export function ProjectVideoPlayer({
  videoUrl,
  posterUrl,
  title,
  locale,
}: ProjectVideoPlayerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-accent text-bg-base font-mono text-[10px] font-bold uppercase tracking-wider">
            <Video className="w-3 h-3" />
            <span>VIDEO DEMO</span>
          </span>
          <span className="font-mono text-xs text-text-muted">
            {locale === "en" ? "Interactive Demo Preview" : "Pratinjau Video Interaktif"}
          </span>
        </div>

        {/* Maximize Button to enlarge video */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-border-subtle bg-bg-elevated hover:bg-bg-base font-mono text-xs text-text-primary hover:border-border-hover transition-colors shadow-xs group"
          title="Perbesar Video (Overlay Layar Penuh)"
        >
          <Maximize2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
          <span>{locale === "en" ? "Enlarge Video" : "Perbesar Video"}</span>
        </button>
      </div>

      {/* Main Playable Video Player */}
      <div className="relative aspect-video w-full rounded border border-border-subtle bg-bg-base overflow-hidden shadow-sm group">
        <video
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          poster={posterUrl || undefined}
          className="w-full h-full object-cover"
        >
          Browser Anda tidak mendukung pemutar video.
        </video>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <MediaLightbox
        items={[{ url: videoUrl, alt: `${title} Video Demo`, type: "video" }]}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
