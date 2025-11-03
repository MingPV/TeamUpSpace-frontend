import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_TOKEN || "your_default_secret";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // No token, redirect to sign-in or return 401
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // verify jwt and check is_admin
  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload) {
      // is admin, continue
      // return NextResponse.redirect(new URL("/admin-manage", req.url));
      // check path
      if (req.nextUrl.pathname.startsWith("/admin-manage")) {
        if (payload.is_admin !== true) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
      }
      return NextResponse.next();
    } else {
      // not admin, redirect to home
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    // Invalid token, redirect or return 401
    console.log("JWT Verification Error:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

// Optionally, specify paths to apply middleware
export const config = {
  // matcher: ["/profile/:path*"], // protect these routes
  matcher: [
    "/admin-manage",
    "/admin-manage/:path*",
    "/profile",
    "/request",
    "/friend-group",
  ], // protect these routes
};
