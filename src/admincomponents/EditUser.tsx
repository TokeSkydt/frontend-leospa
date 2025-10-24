import React, { useState } from "react";
import { updateUser } from "@/data/UserData";

interface Props {
  user: { id: number; name: string; email: string };
  onClose: () => void;
  onUpdated: (user: any) => void;
}

export default function EditUser({ user, onClose, onUpdated }: Props) {
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const handleUpdate = async () => {
    const updated = await updateUser(user.id, form.name, form.email);
    if (updated) {
      onUpdated(updated);
      onClose();
    } else alert("Fejl ved opdatering af bruger");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Rediger bruger</h2>

        <input
          type="text"
          placeholder="Navn"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Annuller
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Gem
          </button>
        </div>
      </div>
    </div>
  );
}
