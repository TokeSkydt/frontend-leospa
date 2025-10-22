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

/* export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
} */

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

//logout data 
export async function logoutUser() {
  try {
    await fetch("http://localhost:5029/login/logout", {
      method: "GET",
      credentials: "include", // hvis cookies bruges til session
    });
  } catch (err) {
    console.error("Fejl ved logout:", err);
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
}

//get user data

export async function getUserData() {
  try {
    const res = await fetch("http://localhost:5029/user/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Kunne ikke hente brugere");
    }
    const data = await res.json();
    return data; // Assuming backend returns an array of users
  } catch (err) {
    console.error("Fejl ved hent af users:", err);
    return [];
  }
}
