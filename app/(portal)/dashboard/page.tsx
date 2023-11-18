"use client";
import { useState } from "react";

import NoBarometers from "./NoBarometers";
import GridLayouts from "./GridLayouts";
import AppModal from "@/components/AppModal";
import CreateDashboard from "./Forms/CreateDashboard";

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCreateDashboard = () => {
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }

  return (
    <main className="mx-auto max-w-7xl md:pl-5">
      <div className="flex justify-between items-center bg-dark-second rounded-lg h-20 px-6">
        <h1 className="font-bold">Dashboards</h1>
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

      <AppModal isOpen={isOpenModal} closeModal={closeModal}>
        <h2 className="text-2xl font-semibold">
          Create a dashboard
        </h2>
        <div className="flex flex-col justify-between">
          <CreateDashboard />
        </div>
      </AppModal>
    </main>
  );
}
