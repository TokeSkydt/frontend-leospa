"use client";

import React, { useEffect, useState } from "react";
import { getUserData } from "@/data/UserData";
import CreateUser from "@/admincomponents/CreateUser";
import DeleteUser from "@/admincomponents/DeleteUser";
import EditUser from "@/admincomponents/EditUser";

// Define the structure of a user object
interface User {
  id: number;
  name: string;
  email: string;
}

export default function AdminUsersPage() {
  /** -------------------------------
   *  🔹 State Management
   *  ------------------------------- */
  const [users, setUsers] = useState<User[]>([]); // Stores all users
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Controls which modal is visible
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Holds currently selected user for edit/delete
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  /** -------------------------------
   *  🔹 Fetch user data from backend
   *  ------------------------------- */
  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData();
        console.log("Fetched users:", data); // helpful for debugging key issues
        setUsers(data);
      } catch {
        setError("Kunne ikke hente brugere");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /** -------------------------------
   *  🔹 Modal Open/Close Handlers
   *  ------------------------------- */
  const handleOpenCreate = () => setShowCreate(true);

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  const handleOpenDelete = (user: User) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  /** -------------------------------
   *  🔹 Render
   *  ------------------------------- */
  if (loading) return <p className="text-center mt-8">Indlæser brugere...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* -----------------------------
          🔸 Page Header
         ----------------------------- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Brugeradministration</h1>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Tilføj bruger
        </button>
      </div>

      {/* -----------------------------
          🔸 User List
         ----------------------------- */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div
              key={user.id || user.email} // ✅ ensure unique key
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenEdit(user)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Rediger
                </button>
                <button
                  onClick={() => handleOpenDelete(user)}
                  className="text-red-600 hover:text-red-800"
                >
                  Slet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -----------------------------
          🔸 Modals
         ----------------------------- */}
      {showCreate && (
        <CreateUser
          onClose={() => setShowCreate(false)}
          onCreated={(newUser) => setUsers([...users, newUser])}
        />
      )}

      {showEdit && selectedUser && (
        <EditUser
          user={selectedUser}
          onClose={() => setShowEdit(false)}
          onUpdated={(updatedUser) =>
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
          }
        />
      )}

      {showDelete && selectedUser && (
        <DeleteUser
          user={selectedUser}
          onClose={() => setShowDelete(false)}
          onDeleted={() => setUsers(users.filter((u) => u.id !== selectedUser.id))}
        />
      )}
    </div>
  );
}
