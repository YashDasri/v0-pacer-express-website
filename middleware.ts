import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Only protect the /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Use credentials from env if provided, otherwise default to 'admin' in development.
  const ADMIN_USER = process.env.ADMIN_USER || (process.env.NODE_ENV === "development" ? "admin" : "");
  const ADMIN_PASS = process.env.ADMIN_PASS || (process.env.NODE_ENV === "development" ? "admin" : "");

  // If no credentials available (production without env vars), block access.
  if (!ADMIN_USER || !ADMIN_PASS) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  try {
    const encoded = auth.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();
    const [user, pass] = decoded.split(":");
    if (user === ADMIN_USER && pass === ADMIN_PASS) return NextResponse.next();
  } catch (e) {
    // fallthrough to unauthorized
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
