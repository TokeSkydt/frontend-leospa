"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/data/UserData";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser(username, password);
      router.push("/admin"); // gå til admin dashboard
    } catch (err: any) {
      setError(err.message || "Login fejlede");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          className="border p-2 w-full mb-2 rounded"
          type="text"
          placeholder="Brugernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Kodeord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
        >
          Log ind
        </button>
      </form>
    </div>
  );
}
