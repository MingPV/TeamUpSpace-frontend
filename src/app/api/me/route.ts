import { NextRequest, NextResponse } from "next/server";

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://localhost:8080"; // Set your URL

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // <-- this works for HttpOnly cookies

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  // Forward request to your Go backend
  const response = await fetch(`${API_GATEWAY_URL}/api/v1/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
