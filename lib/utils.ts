import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined, locale: string = "id") {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 1) return parts[0]; // just year
  const [year, month] = parts;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    year: "numeric",
    month: "short",
  });
}
