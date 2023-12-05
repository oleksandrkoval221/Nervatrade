"use client";
import { useState, useEffect } from "react";

import { useToggle } from "@/context/DashboardContext";

import NoBarometers from "./NoBarometers";
import AppModal from "@/components/AppModal";
import CreateDashboard from "./Forms/CreateDashboard";
import DashboardList from "./DashboardList";

export default function Dashboard() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // @ts-ignore
  const { userId, dashboards, setDashboards } = useToggle();

  const handleCreateDashboard = () => {
    setIsOpenModal(true);
  }
  const closeModal = () => {
    setIsOpenModal(false);
  }

  return (
    <div className="mx-auto w-full md:pl-5">
      <div className="flex justify-between items-center bg-dark-second rounded-lg h-20 px-6">
        <h1 className="font-bold">Dashboards</h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleCreateDashboard()}
            className="bg-green-main px-3 py-2 rounded text-dark-main hover:scale-105 duration-300">Create a dashboard</button>
        </div>
      </div>
      <div>
        {
          dashboards.length ?
            <DashboardList list={dashboards} setDashboards={setDashboards} />
            :
            <NoBarometers />
        }

      </div>

      <AppModal isOpen={isOpenModal} closeModal={closeModal}>
        <h2 className="text-2xl font-semibold">
          Create a dashboard
        </h2>
        <div className="flex flex-col justify-between">
          <CreateDashboard 
            user_id={userId} 
            closeModal={closeModal} 
            setDashboards={setDashboards}
            dashboards={dashboards}
            />
        </div>
      </AppModal>
    </div>
  );
}
