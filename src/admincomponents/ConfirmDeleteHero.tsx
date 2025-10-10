import React from "react";
import { useState } from "react";
import { deleteHero } from "@/data/HeroData";

type Props = {

  modal: boolean;
  close: () => void;
  id: string; // eller id: number | undefined
  refresh: () => void; // <-- ny prop
}




const ConFirmDeleteHero = ({ modal, close, id, refresh }: Props) => {
  const [deleted, setDeleted] = useState(false);

  if (!modal) return null; // 👈 brug null i stedet for false

  const deletePost = async () => {
    try {
      await deleteHero(id);
      setDeleted(true); // viser besked
      setTimeout(() => {
        refresh(); // refresh listen i dashboard
        setDeleted(false); // nulstil deleted
        close(); // luk modal
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="shadow bg-white p-6">
        <p>Er du sikker på du vil slette?</p>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={close}
          >
            Annuller
          </button>
          <button
            className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded"
            onClick={deletePost}
          >
            Delete
          </button>
        </div>
        {deleted && (
          <p className="mt-4 text-green-600 font-semibold">
            Din post blev slettet
          </p>
        )}
      </div>
    </div>
  );
};

export default ConFirmDeleteHero;