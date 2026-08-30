"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  triggerOnHover?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const CHARS = "01ABCDEFXYZ#*@%&<>[]{}/_~";

export function ScrambleText({
  text,
  className = "",
  scrambleOnMount = false,
  triggerOnHover = true,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, 28);
  }, [text, isScrambling]);

  useEffect(() => {
    setDisplayText(text);
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleOnMount, startScramble]);

  return (
    <Component
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={`inline-block ${className}`}
      data-text={text}
    >
      {displayText}
    </Component>
  );
}
