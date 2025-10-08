"use client";

import React, { useState } from "react";
import { postTreatment, treatmentsData, NewTreatment } from "@/data/TreatmentData";

type Props = {
  modal: boolean;
  close: () => void;
  refresh: () => void;
};

const NewTreatmentModal = ({ modal, close, refresh }: Props) => {
  if (!modal) return null; // 👈 return null, not false

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!image) {
      setMessage("Please upload an image");
      return;
    }

    setLoading(true);
    try {
      await postTreatment({ title, content, image });
      setMessage("Treatment created!");
      setTimeout(() => {
        refresh(); // refresh dashboard
        close();   // close modal
      }, 1000);
    } catch (error: any) {
      setMessage(error.message || "Failed to create treatment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="shadow bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">New Treatment</h2>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="border p-2 w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          className="border p-2 w-full mb-4"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={close}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default NewTreatmentModal;