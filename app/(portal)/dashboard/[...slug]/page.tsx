"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

import { useToggle } from "@/context/DashboardContext";
import AppModal from "@/components/AppModal";
import GridLayouts from "../GridLayouts";
import BarometerList from "../BarometerList";
import NoBarometers from "../NoBarometers";

export default function Edit({
  params: { slug },
}: {
  params: { slug: any[] };
}) {
  const { data: session } = useSession();
  // @ts-ignore
  const { getDashboardName } = useToggle();
  const dashId = slug.length && slug[0];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const [btnFlag, setBtnFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editedWidgets, setEditedWidgets] = useState<any[]>([]);
  const [layout, setlayout] = useState<any[]>([]);

  // handle Save Dashboard
  const handleSaveDash = () => {
    const { user }: any = session;
    axios
      .post("/api/dashboard/layout/save", {
        layout,
        user_id: user?._id,
        dash_id: dashId,
      })
      .then((res) => {
        if (res.status === 200) {
          toast("Layout has been saved.", { type: "success" });
        }
      })
      .catch((err) => {
        toast(err?.response?.data, { type: "error" });
      });
    setEditFlag(false);
  };

  const getDashLayout = () => {
    const { user }: any = session;
    axios
      .get(`/api/dashboard/layout/get?user_id=${user?._id}&dash_id=${dashId}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          const { layout } = res.data;
          setlayout(layout);
          setBtnFlag(true);
        }
      })
      .catch((err) => {
        toast(err?.response?.data, { type: "error" });
      });
  };

  // handle edit dash action
  const handleEditDash = () => {
    setEditFlag(true);
  };

  // handle cancel editable dash action
  const handleCancelDash = () => {
    setEditFlag(false);
  };

  /**
   * handle click when add or remove on barometer modal
   * @param {array} w
   */
  const addWidget = (w: any[]) => {
    setEditedWidgets(w);
  };

  // apply widget from barometers
  const applyWidgets = () => {
    const newLayout: any[] = [];
    editedWidgets.map((val, i) => {
      const result = layout.find((ly) => ly.i === val);
      if (!result) {
        newLayout.push({ i: val, x: 0, y: 0, w: 1, h: 1 });
      } else {
        newLayout.push(result);
      }
    });

    setlayout(newLayout);
    setEditFlag(true);
    setBtnFlag(true);
    closeModal();
  };

  useEffect(() => {
    if (!session) return;
    getDashLayout();
  }, [session]);

  return (
    <div className="w-full mx-auto">
      <div className="w-full h-16 flex items-center justify-between px-6 border-b border-b-gray-border">
        <h1 className="flex items-center gap-2 font-medium text-lg text-[#626D7C]">
          <Link href={"/dashboard"}>Dashboards</Link>
          <img src="/icons/arrow-right-gray.svg" />
          <span className="text-[#FFF]">{getDashboardName(dashId) ?? ""}</span>
        </h1>
        {slug.length && slug[1] && (
          <div className="flex gap-3">
            {editFlag ? (
              <>
                <button
                  onClick={() => setIsOpenModal(true)}
                  className="h-8 flex items-center gap-2 rounded-lg border border-[#343B45] pl-3 pr-5 hover:scale-105 duration-300"
                >
                  <img src="/icons/plus.svg" className="w-4 invert" alt="" />
                  <span className="font-semibold text-xs">Add barometer</span>
                </button>
                <button
                  onClick={handleCancelDash}
                  className="h-8 rounded-lg border border-[#343B45] font-semibold text-xs px-5 hover:scale-105 duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDash}
                  className="bg-[#00DC41] h-8 px-5 rounded-lg font-semibold text-xs text-black hover:scale-105 duration-300"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={handleEditDash}
                className="h-8 bg-gray-border px-5 rounded-lg font-sembold text-xs text-[#FFF] hover:scale-105 duration-300"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        {slug.length && slug[1] && editFlag && (
          <div className="absolute w-full grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 divide-x divide-y divide-dashed divide-[#7B879E] border-r border-dashed border-r-[#7B879E]">
            <div className="w-full aspect-square border-dashed border-t border-l border-l-[#7B879E] border-t-[#7B879E]"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
            <div className="w-full aspect-square"></div>
          </div>
        )}
        {layout.length > 0 ? (
          <GridLayouts
            layout={layout}
            setlayout={setlayout}
            editFlag={editFlag}
          />
        ) : (
          <></>
        )}
      </div>

      <AppModal isOpen={isOpenModal} closeModal={closeModal}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <h2 className="font-semibold text-[28px] leading-9">Barometers</h2>
            <p className="font-medium text-base text-[#626D7C]">
              Add widgets of your choice to a custom dashboard
            </p>
            {/* <div className="relative mr-10">
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
          </div> */}
          </div>
          <BarometerList addWidget={addWidget} layout={layout} />
          <div className="flex justify-center w-full gap-4">
            <button
              onClick={closeModal}
              className="w-full h-12 rounded-lg border border-gray-border font-semibold text-base text-[#343B45]"
            >
              Cancel
            </button>
            <button
              onClick={applyWidgets}
              className="w-full h-12 rounded-lg bg-[#00DC41] font-semibold text-base text-black"
            >
              Save
            </button>
          </div>
        </div>
      </AppModal>
    </div>
  );
}
