// src/data/userdata.ts

export async function loginUser(username: string, password: string) {
  const res = await fetch("http://localhost:5029/login/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: username, password }),
  });

  if (!res.ok) {
    throw new Error("Forkert brugernavn eller kodeord");
  }

  const data = await res.json();

  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", data.token);
  }

  return data;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}
