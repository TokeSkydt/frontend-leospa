"use client"

import React, { useState, useEffect } from 'react'
import NewHeroModal from '@/admincomponents/NewHeroModal';
import { getAllHeroes } from '@/data/HeroData';
import { useFormStatus } from "react-dom";
import { HeroData as ImportedHeroData } from '@/admincomponents/NewHeroModal';
import ConFirmDeleteHero from '@/admincomponents/ConfirmDeleteHero';
import EditHeroModal from '@/admincomponents/EditHero';

type HeroData = ImportedHeroData & {
  _id: string;
};


function Submit({
  value,
  children,
}: {
  value: "create" | "modify" | "delete";
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      name="intent"
      value={value}
      disabled={pending}
      className="rounded-xl border px-4 py-2"
    >
      {pending ? "Working…" : children}
    </button>
  );
}

function page() {

  const [hero, setHero] = useState<HeroData[]>([]);
  const [selectedHero, setSelectedHero] = useState<string>("");
  const [modalType, setModalType] = useState<"new" | "delete" | "modify" | null>(null);

  const refreshHero = async () => {
    const data = await getAllHeroes();
    setHero(data);
    setSelectedHero(data?.[0]?._id ?? "");
  };

  useEffect(() => {
    refreshHero();
  }, []);

  return (
    <section className="space-y-4">
      {/* Modals */}
      <div className="z-40">
        {modalType === "delete" && (
          <ConFirmDeleteHero
            modal={true}
            close={() => setModalType(null)}
            id={selectedHero}
            refresh={refreshHero}
          />
        )}
        {modalType === "new" && (
          <NewHeroModal
            modal={true}
            close={() => setModalType(null)}
            refresh={refreshHero}
          />
        )}

        {modalType === "modify" && (
          <EditHeroModal
            modal={true}
            close={() => setModalType(null)}
            id={selectedHero}
            refresh={refreshHero}
          />
        )}
      </div>

      <label className="block text-sm font-medium">
        Hero
        <select
          name="heroId"
          className="mt-1 block w-64 rounded border p-2"
          value={selectedHero}
          onChange={(e) => setSelectedHero(e.target.value)}
          disabled={!hero.length}
        >
          {hero.map((t) => (
            <option key={t._id} value={t._id}>
              {t.title1}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          className="border border-black rounded-2xl px-4 py-2 cursor-pointer bg-green-600 text-white"
          onClick={() => setModalType("new")}
        >
          Post
        </button>

        <button
          type="button"
          className="border border-black rounded-2xl px-4 py-2 cursor-pointer bg-yellow-500 text-white"
          onClick={() => setModalType("modify")}
          disabled={!selectedHero}
        >
          Ret
        </button>

        <button
          type="button"
          className="border border-black rounded-2xl px-4 py-2 cursor-pointer bg-red-600 text-white"
          onClick={() => setModalType("delete")}
          disabled={!selectedHero}
        >
          Delete
        </button>
      </div>
    </section>
  );
}


export default page