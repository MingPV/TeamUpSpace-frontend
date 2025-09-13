import { Profile } from "../types/profile";
import { fetchApi } from "./utils";

const API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8080"; // Set your URL

// Sign In
export async function signIn(emailOrUsername: string, password: string) {
  if (isEmail(emailOrUsername)) {
    return fetchApi("/api/v1/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email: emailOrUsername, password }),
    });
  } else {
    return fetchApi("/api/v1/auth/signin/username", {
      method: "POST",
      body: JSON.stringify({ username: emailOrUsername, password }),
    });
  }
}

//write function to check emailOrUsername is email here not call backend
export function isEmail(emailOrUsername: string): boolean {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailOrUsername);
}

// Sign Up
export async function signUp(
  email: string,
  password: string,
  username: string,
  profile: Profile
) {
  return fetchApi("/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, username, password, profile }),
  });
}

// Sign Out
export async function signOut() {
  // If your API expects authentication token (cookie or header)
  return fetchApi("/api/v1/auth/signout", {
    method: "POST",
  });
}

// Fetch user info at api/me/route.ts
export async function fetchUserInfo() {
  return fetch("/api/me");
}

// checking username unique
export async function getUserByUsername(username: string) {
  return fetchApi(`/api/v1/users/username/${username}`);
}

// checking email unique
export async function getUserByEmail(email: string) {
  return fetchApi(`/api/v1/users/email/${email}`);
}

// login with google
export async function signInWithGoogle() {
  // Redirect to backend Google OAuth endpoint
  window.location.href = `${API_GATEWAY_URL}/api/v1/auth/google/login`;
}
