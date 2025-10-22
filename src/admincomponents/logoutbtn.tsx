"use client";

import { logoutUser } from "@/data/UserData";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className=" text-white mt-4 text-2xl rounded hover:text-pink-400 cursor-pointer"
    >
      Log ud
    </button>
  );
}