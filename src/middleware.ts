import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const theme = req.cookies.get("theme")?.value || "system";
  const response = NextResponse.next();
  if (!req.cookies.has("theme")) {
    response.cookies.set("theme", theme);
  }
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Exclude static files and Next.js internals
    "/", // Include the root path
    "/(api|trpc)(.*)", // Include API and tRPC routes
  ],
};
