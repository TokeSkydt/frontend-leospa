"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import ConFirmDelete from "@/admincomponents/ConfirmDelete";
import { getTreatmentsData, treatmentsData } from "@/data/TreatmentData";
import NewTreatmentModal from "@/admincomponents/NewTreatment";

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

export default function Treatmentpage() {
  const [treatments, setTreatments] = useState<treatmentsData[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<string>("");
  const [modalType, setModalType] = useState<"new" | "delete" | null>(null);

  const refreshTreatments = async () => {
    const data = await getTreatmentsData();
    setTreatments(data);
    setSelectedTreatment(data?.[0]?._id ?? "");
  };

  useEffect(() => {
    refreshTreatments();
  }, []);

  return (
    <form className="space-y-4">
      {/* Modals */}
      <div className="z-40">
        {modalType === "delete" && (
          <ConFirmDelete
            modal={true}
            close={() => setModalType(null)}
            id={selectedTreatment}
            refresh={refreshTreatments}
          />
        )}
        {modalType === "new" && (
          <NewTreatmentModal
            modal={true}
            close={() => setModalType(null)}
            refresh={refreshTreatments}
          />
        )}
      </div>

      <label className="block text-sm font-medium">
        Treatment
        <select
          name="treatmentId"
          className="mt-1 block w-64 rounded border p-2"
          value={selectedTreatment}
          onChange={(e) => setSelectedTreatment(e.target.value)}
          disabled={!treatments.length}
        >
          {treatments.map((t) => (
            <option key={t._id} value={t._id}>
              {t.title}
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

        <Submit value="modify">Ret</Submit>

        <button
          type="button"
          className="border border-black rounded-2xl px-4 py-2 cursor-pointer bg-red-600 text-white"
          onClick={() => setModalType("delete")}
          disabled={!selectedTreatment}
        >
          Delete
        </button>
      </div>
    </form>
  );
}