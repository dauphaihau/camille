import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
// import { getDomain } from "./services/settings";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    console.log('dauphaihau debug: token at middleware', token)

    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    const urlCurrent = req.nextUrl.pathname

    if (isAuthPage) {
      if (isAuth) {
        const [customDomain] = urlCurrent.slice(1).split('/')
        if (customDomain !== token.domain) {
          const replacedCustomDomain = urlCurrent.replace(customDomain, token.domain as string)
          return NextResponse.redirect(new URL(replacedCustomDomain, req.url))
        }
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
        console.log('dauphaihau debug: from', from)
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    const [domainWorkspace] = urlCurrent.slice(1).split('/')
    if (`/${domainWorkspace}/settings` === urlCurrent) {
      return NextResponse.redirect(new URL(urlCurrent + '/workspace', req.url))
    }


    if (token.workspace.length === 0) {
      // if (token.iat === 1677329923) {
      // console.log('dauphaihau debug: req-url', req.url)
      // return NextResponse.redirect(new URL('/workspace', req.url))
    } else {
      const [customDomain] = urlCurrent.slice(1).split('/')
      const domainCurrent = token.workspace[0].domain
      if (customDomain !== domainCurrent) {
        const replacedCustomDomain = urlCurrent.replace(customDomain, domainCurrent as string)
        return NextResponse.redirect(new URL(replacedCustomDomain, req.url))
      }
    }

    // if (token?.domain) {
    //   const [customDomain] = urlCurrent.slice(1).split('/')
    //   if (customDomain !== token.domain) {
    //     const replacedCustomDomain = urlCurrent.replace(customDomain, token.domain as string)
    //     return NextResponse.redirect(new URL(replacedCustomDomain, req.url))
    //   }
    // }

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

  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. /workspace (inside /workspace)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|fonts|examples|workspace|[\\w-]+\\.\\w+).*)",
  ],
}


