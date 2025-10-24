import React, { useState } from "react";
import { createUser } from "@/data/UserData";

interface Props {
  onClose: () => void;
  onCreated: (user: any) => void;
}

export default function CreateUser({ onClose, onCreated }: Props) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Udfyld alle felter");
      return;
    }
    const user = await createUser(form.name, form.email, form.password);
    if (user) {
      onCreated(user);
      onClose();
    } else alert("Fejl ved oprettelse af bruger");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Tilføj bruger</h2>

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
          className="w-full border rounded-lg p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Kodeord"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Opret
          </button>
        </div>
      </div>
    </div>
  );
}
