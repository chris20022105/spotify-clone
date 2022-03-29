import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // TOKEN WILL EXIST IF USER IS LOGGED IN
    const url = req.nextUrl.clone() 
    const token = await getToken ({req, secret: process.env.JWT_SECRET});
    const {pathname} = req.nextUrl
    
    // Allow the request if the following true
    // 1) Its a request for next-auth session & provider fetching
    // 2) The token exists

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }
    // Redirect them to login if they dont have token AND are requesting a protected route
    if(!token && pathname !== '/login') {
        url.pathname = '/login' 
        return NextResponse.redirect(url);
    }
}