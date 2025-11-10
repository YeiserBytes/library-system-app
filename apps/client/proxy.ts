import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  

  if (!token) {
    const loginUrl = new URL("/signin", req.url);
    loginUrl.searchParams.set("signup", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/books/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
