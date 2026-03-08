import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define the Inngest route as public
const isPublicRoute = createRouteMatcher([
  '/api/inngest(.*)', // The (.*) is crucial to match all Inngest sub-paths
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. ONLY protect if it's NOT a public route
  if (!isPublicRoute(request)) {
    await auth.protect(); 
  }
  // If it IS a public route, Clerk does nothing and the request 
  // continues to your API handler.
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};