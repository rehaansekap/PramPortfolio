"use client";

interface BilingualInputProps {
  label: string;
  valueId: string;
  valueEn: string;
  onChangeId: (val: string) => void;
  onChangeEn: (val: string) => void;
  placeholderId?: string;
  placeholderEn?: string;
  isTextarea?: boolean;
  rows?: number;
}

export function BilingualInput({
  label,
  valueId,
  valueEn,
  onChangeId,
  onChangeEn,
  placeholderId,
  placeholderEn,
  isTextarea = false,
  rows = 3,
}: BilingualInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider">
        {label}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Indonesian Column */}
        <div className="flex flex-col gap-1.5 p-3 rounded border border-border-subtle bg-bg-base">
          <div className="flex items-center justify-between font-mono text-[10px] text-text-muted">
            <span className="font-semibold text-text-primary">INDONESIAN (ID)</span>
            <span className="px-1 py-0.2 rounded bg-bg-elevated border border-border-subtle">
              DEFAULT
            </span>
          </div>

          {isTextarea ? (
            <textarea
              rows={rows}
              value={valueId}
              onChange={(e) => onChangeId(e.target.value)}
              placeholder={placeholderId}
              className="w-full p-2 text-sm bg-transparent border-none focus:outline-none text-text-primary resize-y font-sans"
            />
          ) : (
            <input
              type="text"
              value={valueId}
              onChange={(e) => onChangeId(e.target.value)}
              placeholder={placeholderId}
              className="w-full p-2 text-sm bg-transparent border-none focus:outline-none text-text-primary font-sans"
            />
          )}
        </div>

        {/* English Column */}
        <div className="flex flex-col gap-1.5 p-3 rounded border border-border-subtle bg-bg-base">
          <div className="flex items-center justify-between font-mono text-[10px] text-text-muted">
            <span className="font-semibold text-text-primary">ENGLISH (EN)</span>
            <span className="px-1 py-0.2 rounded bg-bg-elevated border border-border-subtle">
              SECONDARY
            </span>
          </div>

          {isTextarea ? (
            <textarea
              rows={rows}
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              className="w-full p-2 text-sm bg-transparent border-none focus:outline-none text-text-primary resize-y font-sans"
            />
          ) : (
            <input
              type="text"
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              className="w-full p-2 text-sm bg-transparent border-none focus:outline-none text-text-primary font-sans"
            />
          )}
        </div>
      </div>
    </div>
  );
}
