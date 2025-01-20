import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathName = req.nextUrl.pathname;

  if (pathName.startsWith("/addreview")) {
    let cookie = req.cookies.get("token");
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathName.startsWith("/reviews")) {
    let cookie = req.cookies.get("token");
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathName.startsWith("/login") || pathName.startsWith("/register")) {
    let cookie = req.cookies.get("token");
    if (cookie) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
}
