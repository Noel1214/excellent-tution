import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathName = req.nextUrl.pathname;

  if (pathName.startsWith("/addreview")) {
    let cookie = await req.cookies.get("token")?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathName.startsWith("/reviews")) {
    let cookie = await req.cookies.get("token")?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathName.startsWith("/login") || pathName.startsWith("/register")) {
    let cookie = await req.cookies.get("token")?.value;
    if (cookie) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (pathName.startsWith("/verify-otp")) {
    const cookie = req.cookies.get("token")?.value;
    if (cookie) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (pathName.startsWith("/set-new-password")) {
    let cookie = req.cookies.get("otpStatus")?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
}
