import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {verify} from './services/jwt_sign_verify';

const secret = process.env.TOKEN_KEY
export async function middleware(req: NextRequest, res: NextResponse) {
  
  try {
    if (!req.headers.get("Authorization")) {
      throw new Error("No token")
    }
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    
    const ok = await verify(token, secret)
    
    return  NextResponse.next()

  } catch (error) {
    req.nextUrl.pathname = '/login'

  return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: ["/api/ticket"],
};
