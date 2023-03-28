import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      // return null
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url))
      // let from = req.nextUrl.pathname;
      // if (req.nextUrl.search) {
      //   from += req.nextUrl.search;
      // }
      //
      // return NextResponse.redirect(
      //   new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      // );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  // matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
  // matcher: ["/login", "/register"],
  // matcher: [ "/workspace", "/login", "/register"],
  // matcher: ["/:path*", "/login", "/register"],
  // matcher: ['/', "/login", "/register"],
  matcher: ["/register"],
  // matcher: ["/login", "/register"],
  // matcher: ['/', "/:path", "/login", "/register"],

  // matcher: [
  //   /*
  //    * Match all paths except for:
  //    * 1. /api routes
  //    * 2. /_next (Next.js internals)
  //    * 3. /fonts (inside /public)
  //    * 4. /examples (inside /public)
  //    * 5. /workspace (inside /workspace)
  //    * 6. all root files inside /public (e.g. /favicon.ico)
  //    */
  //   // "/((?!api|_next|fonts|examples|workspace|[\\w-]+\\.\\w+).*)",
  // ],
}


