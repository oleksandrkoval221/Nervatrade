'use client';
import { useEffect, useState } from "react"
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

import { useToggle } from "@/context/DashboardContext";
import AppModal from "@/components/AppModal";
import GridLayouts from "../GridLayouts";
import BarometerList from "../BarometerList";
import NoBarometers from "../NoBarometers";

export default function Edit({ params: { slug } }: { params: { slug: any[] } }) {
  const { data: session } = useSession();
  // @ts-ignore
  const { getDashboardName } = useToggle();
  const dashId = slug.length && slug[0];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  }

  const [btnFlag, setBtnFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editedWidgets, setEditedWidgets] = useState<any[]>([]);
  const [layout, setlayout] = useState<any[]>([]);

  // handle Save Dashboard
  const handleSaveDash = () => {
    const { user }: any = session;
    axios.post('/api/dashboard/layout/save', {
      layout,
      user_id: user?._id,
      dash_id: dashId
    }).then((res) => {
      if (res.status === 200) {
        toast("Layout has been saved.", { type: 'success' });
      }
    }).catch((err) => {
      toast(err?.response?.data, { type: 'error' });
    })
    setEditFlag(false);
  }

  const getDashLayout = () => {
    const { user }: any = session;
    axios.get(`/api/dashboard/layout/get?user_id=${user?._id}&dash_id=${dashId}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          const { layout } = res.data;
          setlayout(layout);
          setBtnFlag(true);
        }
      }).catch(err => {
        toast(err?.response?.data, { type: 'error' });
      })
  }

  // handle edit dash action
  const handleEditDash = () => {
    setEditFlag(true);
  }

  /**
   * handle click when add or remove on barometer modal
   * @param {array} w 
   */
  const addWidget = (w: any[]) => {
    setEditedWidgets(w)
  }

  // apply widget from barometers
  const applyWidgets = () => {
    const newLayout: any[] = [];
    editedWidgets.map((val, i) => {
      const result = layout.find(ly => ly.i === val);
      if (!result) {
        newLayout.push({ i: val, x: 0, y: 0, w: 6, h: 6 })
      } else {
        newLayout.push(result);
      }
    })

    setlayout(newLayout);
    setEditFlag(true);
    setBtnFlag(true);
    closeModal();
  }

  useEffect(() => {
    if (!session) return;
    getDashLayout();
  }, [session])

  return (
    <div className="mx-auto max-w-7xl md:pl-5">
      <div className="flex justify-between items-center bg-dark-second rounded-lg h-20 px-6">
        <h1 className="font-bold"><Link className="underline" href={'/dashboard'}>Dashboard</Link> / {getDashboardName(dashId) ?? ""}</h1>
        {
          slug.length && slug[1] &&
          <div className="flex gap-3">
            <button
              onClick={() => setIsOpenModal(true)}
              className="bg-blue-500 px-3 py-2 rounded hover:scale-105 duration-300">
              + Add a barometer
            </button>
            {
              btnFlag &&
              <>
                <button
                  onClick={() => handleEditDash()}
                  className="bg-gray-100 text-black px-3 py-2 rounded hover:scale-105 duration-300">
                  Edit
                </button>
                <button
                  onClick={() => handleSaveDash()}
                  className="bg-green-main text-black px-3 py-2 rounded hover:scale-105 duration-300">
                  Save
                </button>
              </>
            }
          </div>
        }
      </div>

      <div className="py-2 -mx-2">
        {
          layout.length>0 ?
            <GridLayouts layout={layout} setlayout={setlayout} editFlag={editFlag} />
            :
            <NoBarometers />
        }
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
          <BarometerList addWidget={addWidget} layout={layout} />
        </div>
        <div className="flex justify-center w-full gap-4">
          <button onClick={() => applyWidgets()} className="bg-blue-500 px-5 py-2 rounded hover:scale-105 duration-300">Sure</button>
          <button onClick={() => closeModal()} className="bg-gray-100 text-black px-3 py-2 rounded hover:scale-105 duration-300">Cancel</button>
        </div>
      </AppModal>
    </div>
  )
}