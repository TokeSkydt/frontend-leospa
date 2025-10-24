import React from "react";
import { deleteUser } from "@/data/UserData";

interface Props {
  user: { id: number; name: string };
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteUser({ user, onClose, onDeleted }: Props) {
  const handleDelete = async () => {
    const success = await deleteUser(user.id);
    if (success) {
      onDeleted();
      onClose();
    } else alert("Fejl ved sletning af bruger");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Slet bruger</h2>
        <p className="text-gray-600 mb-4">
          Er du sikker på, at du vil slette{" "}
          <span className="font-medium">{user.name}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Annuller
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Slet
          </button>
        </div>
      </div>
    </div>
  );
}
