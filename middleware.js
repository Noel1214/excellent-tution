import { NextResponse } from "next/server";

export async function middleware(req) {
    const pathName = req.nextUrl.pathname;

    if(pathName.startsWith("/addreview")){
        let cookie = req.cookies.get("token");
        if(!cookie){
            return NextResponse.redirect(new URL("/login", req.url));
        }
    };
    
}