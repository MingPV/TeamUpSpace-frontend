import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_TOKEN || "your_default_secret";
const secret = new TextEncoder().encode(JWT_SECRET);

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    // No token, redirect to sign-in or return 401
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    // Verify JWT
    jwtVerify(token, secret);
    // Token is valid, continue
    return NextResponse.next();
  } catch (error) {
    // Invalid token, redirect or return 401
    console.log("JWT Verification Error:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

// Optionally, specify paths to apply middleware
export const config = {
  matcher: ["/profile/:path*"], // protect these routes
};
