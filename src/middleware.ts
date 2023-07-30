import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {

  // clone cookie
  let isLogin = request.cookies.get('logged')

  // if there are no cookies, redirect to login page
  if(!isLogin) {
    if (request.nextUrl.pathname.startsWith('/chat')) {
      return NextResponse.rewrite(new URL('/auth/login', request.url))
    }
  }

}