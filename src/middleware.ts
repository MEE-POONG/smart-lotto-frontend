// middleware.js
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log(token);

  if (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/register") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', "/auth/login", "/auth/register", "/dashboard"],
};
