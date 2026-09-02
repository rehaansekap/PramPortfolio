import { createClient } from "./client";

/**
 * Extracts the storage object path from a Supabase public URL.
 * Example URL:
 * https://vszqvnjuwmczcusaznut.supabase.co/storage/v1/object/public/portfolio-assets/hero/1725350999-abc.jpg
 * Returns: "hero/1725350999-abc.jpg"
 */
export function getStoragePathFromUrl(
  url: string,
  bucket = "portfolio-assets"
): string | null {
  if (!url || typeof url !== "string") return null;

  const marker = `/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;

  const rawPath = url.substring(index + marker.length).split("?")[0];
  try {
    return decodeURIComponent(rawPath);
  } catch {
    return rawPath;
  }
}

/**
 * Checks if a given URL is hosted on our Supabase Storage bucket.
 */
export function isSupabaseStorageUrl(
  url: string,
  bucket = "portfolio-assets"
): boolean {
  if (!url) return false;
  return url.includes(`/${bucket}/`);
}

/**
 * Deletes a file from Supabase Storage if it was uploaded to our bucket.
 * Silently ignores external URLs (e.g. unsplash.com) or local static files (/images/...).
 */
export async function deleteStorageFile(
  url: string,
  bucket = "portfolio-assets"
): Promise<boolean> {
  const path = getStoragePathFromUrl(url, bucket);
  if (!path) {
    return false;
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
      console.warn(`[Storage] Gagal menghapus file lama (${path}):`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`[Storage] Error saat menghapus file (${path}):`, err);
    return false;
  }
}
