import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { SUFFIX_DOMAIN_SHARE_PUBLIC } from './config/const';

const legacyPrefixes = ['/', '/pricing'];

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    const isAuth = !!token;
    const isAuthPage =
      pathname.startsWith('/login') ||
      pathname.startsWith('/register');

    const currentDomain = pathname.split('/')[1];
    const isSharePage = currentDomain.includes(SUFFIX_DOMAIN_SHARE_PUBLIC);
    if (isSharePage) {
      return NextResponse.next();
    }

    if (!isAuth && legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
      return NextResponse.next();
    }

    if (isAuth) {
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    else {
      return NextResponse.redirect(new URL('/login', req.url));
    }

  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  // matcher: ['/login','/workspace'],

  matcher: [
    /*
     * Match all paths except for:
     * - /api routes
     * - /_next (Next.js internals)
     * - /fonts (inside /public)
     * - /examples (inside /public)
     * - all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|_next/static|_next/image|favicon.ico[\\w-]+\\.\\w+).*)',
  ],
};
