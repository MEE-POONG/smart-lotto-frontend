// middleware.js
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/register") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', "/auth/login", "/auth/register", "/dashboard/:path*"],
};
