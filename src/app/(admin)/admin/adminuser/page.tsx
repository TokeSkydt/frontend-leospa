"use client";

import React, { useEffect, useState } from "react";
import { getUserData, updateUser, user } from "@/data/UserData";
import CreateUser from "@/admincomponents/CreateUser";
import DeleteUser from "@/admincomponents/DeleteUser";
import EditUser from "@/admincomponents/EditUser";
import ToggleSwitch from "@/admincomponents/AdminSwitch";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData();
        setUsers(data as user[]);
      } catch {
        setError("Kunne ikke hente brugere");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Toggle admin status
  const handleToggleAdmin = async (u: user, next: boolean) => {
    try {
      // Optimistisk update i UI
      setUsers(users.map(user => user._id === u._id ? { ...user, admin: next } : user));

      // Send opdatering til backend
      await updateUser(u._id, { admin: next });
    } catch (err) {
      console.error("Fejl ved opdatering af admin:", err);
      // Rollback hvis backend fejler
      setUsers(users.map(user => user._id === u._id ? { ...user, admin: u.admin } : user));
    }
  };

  if (loading) return <p className="text-center mt-8">Indlæser brugere...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Brugeradministration</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Tilføj bruger
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* 🔹 ToggleSwitch */}
                <ToggleSwitch
                  checked={user.admin}
                  onChange={(next) => handleToggleAdmin(user, next)}
                  label="Admin"
                />

                <button
                  onClick={() => { setSelectedUser(user); setShowEdit(true); }}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Rediger
                </button>
                <button
                  onClick={() => { setSelectedUser(user); setShowDelete(true); }}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Slet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreate && <CreateUser onClose={() => setShowCreate(false)} onCreated={(u) => setUsers([...users, u as user])} />}
      {showEdit && selectedUser && <EditUser user={selectedUser} onClose={() => setShowEdit(false)} onUpdated={(updatedUser) => setUsers(users.map(u => u._id === updatedUser._id ? (updatedUser as user) : u))} />}
      {showDelete && selectedUser && <DeleteUser user={selectedUser} onClose={() => setShowDelete(false)} onDeleted={() => setUsers(users.filter(u => u._id !== selectedUser._id))} />}
    </div>
  );
}
