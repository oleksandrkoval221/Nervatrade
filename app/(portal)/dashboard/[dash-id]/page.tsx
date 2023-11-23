'use client';
import { useState } from "react"
import Link from "next/link";
import GridLayouts from "../GridLayouts";
import AppModal from "@/components/AppModal";
import BarometerList from "../BarometerList";

export default function Edit() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  }

  return (
    <div className="mx-auto max-w-7xl md:pl-5">
      <div className="flex justify-between items-center bg-dark-second rounded-lg h-20 px-6">
        <h1 className="font-bold"><Link className="underline" href={'/dashboard'}>Dashboard</Link> / Edit</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsOpenModal(true)}
            className="bg-blue-500 px-3 py-2 rounded hover:scale-105 duration-300">
            + Add a barometer
          </button>
          <button
            onClick={() => { }}
            className="bg-gray-100 text-black px-3 py-2 rounded hover:scale-105 duration-300">
            Edit
          </button>
          <button
            onClick={() => { }}
            className="bg-green-main text-black px-3 py-2 rounded hover:scale-105 duration-300">
            Save
          </button>
        </div>
      </div>

      <div className="py-2">
        <GridLayouts />
      </div>

      <AppModal isOpen={isOpenModal} closeModal={closeModal}>
        <div className="flex gap-10 justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Barometers
          </h2>
          <div className="relative mr-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-12 pr-4 text-white text-sm border border-gray-700 rounded-md outline-none bg-transparent focus:border-green-100"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <BarometerList />
        </div>
      </AppModal>
    </div>
  )
}