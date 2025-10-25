"use client";

import React, { useState } from "react";
import { updateUser } from "@/data/UserData";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Props {
  user: User;
  onClose: () => void;
  onUpdated: (updatedUser: User) => void;
}

export default function EditUser({ user, onClose, onUpdated }: Props) {
  const [form, setForm] = useState<User>(user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updated = await updateUser(form._id, form);
      onUpdated(updated); // Tell parent that user was updated
      setMessage("✅ Bruger opdateret!");
      setTimeout(() => onClose(), 1000);
    } catch (err: any) {
      setMessage("❌ Kunne ikke opdatere bruger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-blue-600 mb-3">
          Rediger bruger
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Navn</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Annuller
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Gemmer..." : "Gem ændringer"}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
