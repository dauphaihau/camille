import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { SUFFIX_DOMAIN_SHARE_TO_WEB } from './config/const';

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else {
      const domain = req.nextUrl.pathname.split('/')[1];
      const isSharePage = domain.includes(SUFFIX_DOMAIN_SHARE_TO_WEB);

      if (!isAuth && !isSharePage) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
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
