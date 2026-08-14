import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance mode.
 *
 * Set MAINTENANCE_MODE=1 in the Vercel environment variables (and redeploy, or
 * just change the variable and use Vercel's instant redeploy) and every route
 * serves the maintenance notice instead of the site. Set it back to 0 to
 * restore. No code change, no branch.
 *
 * Two details that matter:
 *
 *   • The response carries HTTP 503 and a Retry-After header, so search engines
 *     treat it as temporary and keep the site's existing rankings. A
 *     maintenance page served as 200 tells Google the page has *become* that
 *     notice, which is how sites lose their listings during an outage.
 *
 *   • MAINTENANCE_BYPASS_TOKEN lets the client keep viewing the real site
 *     while it is down for everyone else: visit any URL with
 *     ?preview=<token> once, and a cookie keeps you through.
 */

const BYPASS_COOKIE = "maintenance-bypass";

function isEnabled(): boolean {
  const flag = process.env.MAINTENANCE_MODE?.trim().toLowerCase();
  return flag === "1" || flag === "true" || flag === "on";
}

export function middleware(request: NextRequest) {
  if (!isEnabled()) return NextResponse.next();

  const { pathname, searchParams } = request.nextUrl;
  const token = process.env.MAINTENANCE_BYPASS_TOKEN?.trim();

  // Already holding a valid bypass cookie: let the real site through.
  if (token && request.cookies.get(BYPASS_COOKIE)?.value === token) {
    return NextResponse.next();
  }

  // Granting the bypass: stamp the cookie and reload the requested page.
  if (token && searchParams.get("preview") === token) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("preview");
    const response = NextResponse.redirect(url);
    response.cookies.set(BYPASS_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  }

  // The notice itself must render, or the rewrite would loop.
  if (pathname === "/maintenance") {
    return NextResponse.next({ headers: { "Retry-After": "3600" } });
  }

  const response = NextResponse.rewrite(new URL("/maintenance", request.url), { status: 503 });
  response.headers.set("Retry-After", "3600");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  /**
   * Everything except Next's own assets and the files the maintenance page
   * itself needs — otherwise the notice would render unstyled.
   */
  matcher: ["/((?!_next/static|_next/image|images/|locale/|favicon.ico|icon.png|apple-icon.png).*)"],
};
