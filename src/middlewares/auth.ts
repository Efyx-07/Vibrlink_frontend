import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

  console.log('Middleware called');
  
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  if (isLoggedIn && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};