import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // 301 redirect www → non-www to fix canonical conflicts
  if (host.startsWith('www.')) {
    const nonWwwHost = host.slice(4)
    const nonWwwUrl = request.url.replace(`://${host}`, `://${nonWwwHost}`)
    return NextResponse.redirect(nonWwwUrl, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
