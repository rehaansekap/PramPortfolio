import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle protected admin routes separately from next-intl
  if (pathname.startsWith("/admin")) {
    return await updateSession(request);
  }

  // Handle locale routes for public pages
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - api routes
    // - _next and _vercel system routes
    // - static files with extensions (e.g. favicon.ico, images, etc.)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
