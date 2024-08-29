import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // public routes that don't require authentication
  const publicRoutes = ['/sign-in', '/sign-up', '/'];

  // Redirect authenticated users away from auth pages
  if (token && (publicRoutes.includes(pathname) || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access to public routes without a token
  if (!token && publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Redirect to sign-in if there's no token (except for public routes)
  if (!token) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}