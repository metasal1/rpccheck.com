import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || ""
  if (host.startsWith("www.")) {
    const url = req.nextUrl.clone()
    url.host = host.slice(4)
    url.protocol = "https"
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.png|og.png).*)"],
}
