"use client";
import { useState } from "react";

import NoBarometers from "./NoBarometers";
import GridLayouts from "./GridLayouts";
import AppModal from "@/components/AppModal";

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCreateDashboard = () => {
    setIsOpenModal(true);
  }

  const closeModal = ()=>{
    setIsOpenModal(false);
  }

  return (
    <main className="mx-auto max-w-7xl md:pl-5">
      <div className="flex justify-between items-center bg-dark-second rounded-lg h-20 px-6">
        <div className="font-bold">Dashboards</div>
        <div className="flex gap-3">
          <button
            onClick={() => handleCreateDashboard()}
            className="bg-green-main px-3 py-2 rounded text-dark-main hover:scale-105 duration-300">Create a dashboard</button>
        </div>
      </div>
      <div>
        {/* <GridLayouts /> */}
        <NoBarometers />
      </div>

      <AppModal isOpen={isOpenModal} closeModal={closeModal} />
    </main>
  );
}
