"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/admincomponents/AdminSidebar";
import { getToken } from "@/data/UserData";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Run only on the client
    if (typeof window === "undefined") return;

    const token = getToken();

    if (!token) {
      setAuthorized(false); // mark as unauthorized
      router.replace("/login"); // redirect without adding to history
      return;
    }

    // You could also verify token here with your backend if you want
    setAuthorized(true);
  }, [router]);

  if (authorized === null) {
    return <p className="text-center mt-10 text-gray-500">Checker login...</p>;
  }

  if (!authorized) return null; // prevents flicker during redirect

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 max-w-4xl m-auto p-4">{children}</main>
    </div>
  );
}
