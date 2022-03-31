import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {

    // @ts-ignore
    const token = await getToken({req});

    const url = req.nextUrl.clone();
    url.pathname = '/login';

    if(token && Object.keys(token.user).length > 0){
        return NextResponse.next();
    }else if(!Array("/api/auth", "/login", "/auth/forgot-password", "/reset").some((element) => req.url.includes(element)) && (!token || Object.keys(token.user).length === 0)){
        return NextResponse.redirect(url);
    }

    return NextResponse.next()
}