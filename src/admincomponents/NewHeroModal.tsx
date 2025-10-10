"use client";

import React, { useState } from "react";

type Props = {
  modal: boolean;
  close: () => void;
  refresh: () => void;
};

export interface HeroData {
  title1: string;
  title2: string;
  content: string;
  link: string;
  show: boolean;
}

const NewHeroModal = ({ modal, close, refresh }: Props) => {
  if (!modal) return null; // Hide modal if not active

  const [form, setForm] = useState<HeroData>({
    title1: "",
    title2: "",
    content: "",
    link: "",
    show: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5029/hero/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create hero");

      setMessage("✅ Hero created successfully!");
      await refresh(); // 👈 Refresh hero list
      close(); // 👈 Close modal
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Create New Hero</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title1"
            placeholder="Title 1"
            value={form.title1}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="title2"
            placeholder="Title 2"
            value={form.title2}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="link"
            placeholder="YouTube Link"
            value={form.link}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="show"
              checked={form.show}
              onChange={handleChange}
            />
            <span>Show Hero on Homepage</span>
          </label>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Hero"}
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default NewHeroModal;
