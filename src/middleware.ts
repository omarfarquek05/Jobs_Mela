import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

try {
    const isPublicPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register"; 

    //if there is no token & the page is not public, redirect to login page
    const token = request.cookies.get("token")?.value;
     if(!token  && !isPublicPage ) {
       return NextResponse.redirect(new URL("/login", request.nextUrl ));

     }     

    //if there is no token & the page is not public, redirect to login page
    if(token  && isPublicPage ) {
      return NextResponse.redirect(new URL("/", request.nextUrl ));

    }    

       return NextResponse.next();

    } catch (error: any) {
        return NextResponse.error();
    } 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', "/login", "/register"],
};