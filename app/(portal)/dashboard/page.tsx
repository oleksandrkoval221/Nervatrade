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
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full h-16 flex items-center justify-between px-6 border-b border-b-gray-border">
        <h1 className="font-medium text-lg text-[#626D7C]">Dashboards</h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleCreateDashboard()}
            className="h-8 flex items-center gap-2 bg-[#4DF986] px-3 rounded-lg text-black hover:scale-105 duration-300"
          >
            <img src="/icons/plus.svg" className="w-4" alt="" />
            <span className="font-semibold text-xs">Create</span>
          </button>
        </div>
      </div>
      <div>
        {dashboards.length ? (
          <DashboardList list={dashboards} setDashboards={setDashboards} />
        ) : (
          <NoBarometers />
        )}
      </div>

      <AppModal isOpen={isOpenModal} closeModal={closeModal}>
        <h2 className="font-semibold text-[28px] leading-9 mb-3">
          Create a dashboard
        </h2>
        <p className="font-medium text-base text-[#626D7C] mb-6">
          Create a unique name for your dashboard
        </p>
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
