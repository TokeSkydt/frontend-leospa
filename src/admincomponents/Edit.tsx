import React from "react";
import { useState } from "react";
import { deleteTreatment } from "@/data/TreatmentData";


const Edit = () => {

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="shadow bg-white p-6">
        <p>edit</p>
        <button className="mt-7 bg-red-500 hover:bg-red-800 text-white px-4 py-2 mx-6 rounded
        cursor-pointer" value="cancel">Annuller</button>
        <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded
        cursor-pointer" value="confirm" >save</button>
      </div>

      <div className="block text-gray-600">
        Din post blev slettet
      </div>

    </div>
  )
}

export default Edit