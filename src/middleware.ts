import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if(pathname.startsWith("/api/v1/contact")) {
  return new NextResponse(JSON.stringify({success: true}), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    }); 
}
 
return NextResponse.next(); 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/v1/:path*",
};