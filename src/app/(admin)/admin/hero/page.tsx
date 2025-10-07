"use client"

import React, { useState } from 'react'

interface Hero {
  title1: string;
  title2: string;
  content: string;
  link: string;
  show: boolean;
}

function page() {
  const [form, setForm] = useState<Hero>({
    title1: "",
    title2: "",
    content: "",
    link: "",
    show: false,
  })

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
      setForm({ title1: "", title2: "", content: "", link: "", show: false });
    } catch (err: any) {
      setMessage("❌" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Hero</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title1"
          placeholder="Title 1"
          value={form.title1}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="title2"
          placeholder="Title 2"
          value={form.title2}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="border p-2 w-full rounded"
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Hero"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}


export default page