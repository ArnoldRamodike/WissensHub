// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   '/admin(.*)',
//   '/forum(.*)',
// ])

// export default clerkMiddleware({
//   authorizedParties: ["/api/webhook"]
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };



import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/api/webhook', '/'];

export default clerkMiddleware((req) => {

  if (publicRoutes.includes(req.path)) {
    return NextResponse.next(); // Allow access to public routes without authentication
  }

  return NextResponse.next();
});

export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico).*)' };
