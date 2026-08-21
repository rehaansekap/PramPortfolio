interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  number,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 sm:mb-12 ${className}`}>
      <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-widest text-text-muted uppercase mb-2">
        <span className="text-text-primary font-semibold">{number}</span>
        <span className="text-border-hover">—</span>
        <span>SECTION</span>
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-12 h-[2px] bg-accent" />
    </div>
  );
}
