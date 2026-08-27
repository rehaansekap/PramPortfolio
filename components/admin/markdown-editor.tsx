"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  localeBadge?: "ID" | "EN";
}

export function MarkdownEditor({
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  localeBadge,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="font-mono text-xs font-semibold text-text-primary flex items-center gap-2">
          {label}
          {localeBadge && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-bg-base border border-border-subtle text-text-muted">
              {localeBadge}
            </span>
          )}
        </label>

        {/* Tab Selector */}
        <div className="inline-flex rounded border border-border-subtle p-0.5 bg-bg-base text-xs font-mono">
          <button
            type="button"
            onClick={() => setTab("edit")}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              tab === "edit"
                ? "bg-text-primary text-bg-base font-semibold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-2.5 py-0.5 rounded transition-colors ${
              tab === "preview"
                ? "bg-text-primary text-bg-base font-semibold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {tab === "edit" ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary resize-y leading-relaxed"
        />
      ) : (
        <div
          className={`w-full p-3 border border-border-subtle rounded bg-bg-elevated/40 text-text-primary font-sans text-sm prose dark:prose-invert max-w-none overflow-y-auto leading-relaxed`}
          style={{ minHeight: `${rows * 24}px` }}
        >
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <span className="text-text-muted font-mono text-xs italic">
              Tidak ada konten markdown untuk ditampilkan.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
