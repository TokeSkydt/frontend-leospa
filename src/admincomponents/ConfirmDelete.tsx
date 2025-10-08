import React from "react";
import { useState } from "react";
import { deleteTreatment } from "@/data/TreatmentData";

type Props = {

  modal: boolean;
  close: () => void;
  id: string; // eller id: number | undefined
  refresh: () => void; // <-- ny prop
}




const ConFirmDelete = ({ modal, close, id, refresh }: Props) => {

  console.log(id);

  if (!modal) return false;

  const [deleted, setDeleted] = useState<boolean>(false);


  const isDeleted = () => {

    console.log('jeg sletter');
    setDeleted(true);
    setTimeout(() => {
      refresh();//kalder vores refreh funktion i dashboard
    }, 2000)
  }



  const deletePost = async () => {

    try {

      await deleteTreatment(id);
      isDeleted(); // Callback for UI-opdatering

    } catch (error) {
      console.log(error)
    }
  }



  if (!modal) return false;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="shadow bg-white p-6">
        <p>ConFirmDelete</p>
        <button className="mt-7 bg-red-500 hover:bg-red-800 text-white px-4 py-2 mx-6 rounded
        cursor-pointer" value="cancel" onClick={close}>Annuller</button>
        <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded
        cursor-pointer" value="confirm" onClick={deletePost} >Delete</button>
      </div>

      <div className={deleted ? "block text-gray-600" : "hidden"} role="status">
        Din post blev slettet
      </div>

    </div>
  )
}

export default ConFirmDelete