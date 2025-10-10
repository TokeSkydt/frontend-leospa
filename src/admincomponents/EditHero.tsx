"use client";

import React, { useState, useEffect } from "react";
import { hero, getHeroById, updateHero } from "@/data/HeroData";

type Props = {
  modal: boolean;
  close: () => void;
  id: string;
  refresh: () => void;
};

const EditHeroModal = ({ modal, close, id, refresh }: Props) => {
  const [form, setForm] = useState<hero | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Hent eksisterende data når modal åbnes
  useEffect(() => {
    if (modal && id) {
      getHeroById(id).then((data) => data && setForm(data));
    }
  }, [modal, id]);

  if (!modal || !form) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
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
      await updateHero(id, form);
      setMessage("✅ Hero updated successfully!");
      setTimeout(() => {
        refresh();
        close();
      }, 1500);
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Hero</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title1"
            value={form.title1}
            onChange={handleChange}
            placeholder="Title 1"
            className="border p-2 w-full rounded"
          />
          <input
            name="title2"
            value={form.title2}
            onChange={handleChange}
            placeholder="Title 2"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="border p-2 w-full rounded"
          />
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="YouTube link"
            className="border p-2 w-full rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="show"
              checked={form.show}
              onChange={handleChange}
            />
            <span>Show on homepage</span>
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default EditHeroModal;
