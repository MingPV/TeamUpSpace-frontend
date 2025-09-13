const API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8080"; // Set your URL

// Generic fetch wrapper
export async function fetchApi(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_GATEWAY_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  });
  //   if (!response.ok) throw new Error(await response.text());
  return response.json();
}
