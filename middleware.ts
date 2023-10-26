import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { Database } from "./lib/types/database";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  if (
    session &&
    !pathname.startsWith("/auth") &&
    session.user.user_metadata.role !== "administrator"
  ) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/landing", req.url));
  }

  if (!session && pathname !== "/auth/sign-in") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  if (session && (pathname === "/auth/sign-in" || pathname === "/")) {
    return NextResponse.redirect(new URL("/inventories", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).)*",
  ],
};
