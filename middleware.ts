import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get("token")?.value || ''

  const publicPath = path === '/login'

  if(publicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(!publicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
}