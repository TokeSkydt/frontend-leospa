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

//delete data 

export async function deleteUser(id: number) {
  const token = getToken();

  try {
    const res = await fetch(`http://localhost:5029/user/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw new Error("Fejl ved sletning af bruger");
    }

    return true;
  } catch (err) {
    console.error("Fejl ved sletning:", err);
    return false;
  }
}

// create user
export async function createUser(name: string, email: string, password: string) {
  const token = getToken();

  try {
    const res = await fetch("http://localhost:5029/user/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Fejl ved oprettelse af bruger");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fejl ved oprettelse:", err);
    return null;
  }
}

export async function updateUser(id: number, name: string, email: string) {
  const token = getToken();
  try {
    const res = await fetch(`http://localhost:5029/user/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok) throw new Error("Fejl ved opdatering af bruger");
    return await res.json();
  } catch (err) {
    console.error("Fejl ved opdatering:", err);
    return null;
  }
}



