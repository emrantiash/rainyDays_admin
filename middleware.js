import { NextRequest, NextResponse } from 'next/server';
import cookiesNames from './app/utils/constant/Constant';

export function middleware(request = NextRequest) {

    const cookie = request.cookies.has(cookiesNames.AUTH_X_MIT_DELIVER_20)
    if (request.nextUrl.pathname == "/login" && cookie)
        return NextResponse.redirect(new URL("/", request.url))



}

export const config = {
    matcher: '/:path*',
}