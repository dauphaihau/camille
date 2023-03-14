import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getDetailWorkspace } from "./lib/request/notebook";
// import { getDomain } from "./services/settings";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    // console.log('dauphaihau debug: token', token)

    const isAuth = !!token
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    const isHomePage = req.nextUrl.pathname.startsWith("/")
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

    if (isHomePage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(`/${token.workspaces[0].domain}`, req.url))
      }
      // return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }


    // if (token.workspaces.length === 0) {
    //   const url = req.nextUrl.clone()
    //   url.pathname = '/workspace'
    //   return NextResponse.redirect(url)
    // }
    //
    // const workspaceSelected = token.workspaces.find((item) => item.id === token.trackingUserAccess.lastAccessWorkspaceId)
    // console.log('dauphaihau debug: workspace-selected', workspaceSelected)
    //
    // const path = `/${workspaceSelected.domain}/${token.trackingUserAccess.lastAccessNotebookId}`
    // console.log('dauphaihau debug: path', path)

    // already have workspace, also set domain
    // temporary: access default workspace 1
    // const domainWorkspace1 = token.workspaces[0].domain
    // console.log('dauphaihau debug: new-url-domain-workspace-1-req-url-', new URL(domainWorkspace1, req.url))
    // return NextResponse.redirect(new URL(`/${workspaceSelected.domain}/notebooks`, req.url))
    // return NextResponse.redirect(new URL(`/${domainWorkspace1}/notebooks`, req.url))
    // return NextResponse.redirect(new URL(`/dauphaiiii11123112/notebooks`, req.url))
    // return NextResponse.redirect(new URL('/notebooks', req.url))
    // return NextResponse.redirect(new URL(path, req.url))

    // already have workspace but not set domain
    // const url = req.nextUrl.clone()
    // url.pathname = '/notebooks'
    // return NextResponse.redirect(url)

    // req.nextUrl.pathname = `/${domainWorkspace1}/notebooks`;
    // return NextResponse.redirect(req.nextUrl)

    // const url = req.nextUrl.clone()
    // url.pathname = `/${domainWorkspace1}/notebooks`
    // return NextResponse.redirect(url)

    // case not found domain workspace -> create domain
    // const [currentDomainWorkspace] = urlCurrent.slice(1).split('/')
    // const domains = token.workspace.map(item => item.domain)
    // if (!domains.includes(currentDomainWorkspace)) {
    //   const url = req.nextUrl.clone()
    //   url.pathname = '/workspace'
    //   return NextResponse.redirect(url)
    // }

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
  // matcher: ["/login", "/register"],
  // matcher: [ "/workspace", "/login", "/register"],
  // matcher: ["/:path*", "/login", "/register"],
  // matcher: ['/', "/login", "/register"],
  matcher: ["/login", "/register"],
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


