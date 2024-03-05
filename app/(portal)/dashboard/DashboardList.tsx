import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import axios from "axios";
import { useRouter } from "next/navigation";

const DashboardList = ({
  list,
  setDashboards,
}: {
  list: any[];
  setDashboards: any;
}) => {
  const router = useRouter();

  const handleClickDelete = async (dashboardId: string) => {
    const res = await axios.delete(
      `/api/dashboard/delete?dash_id=${dashboardId}`
    );
    try {
      if (res.status === 201) {
        const dashboards = [...list];
        const index = dashboards.findIndex((obj) => obj._id === dashboardId);
        if (index !== -1) {
          dashboards.splice(index, 1);
        }
        setDashboards(dashboards);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRow = (dashboard: any) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-dark-modal rounded-lg p-6">
            <h1 className="font-semibold text-xl leading-7 mb-2 text-center">
              Dashboard deletion
            </h1>
            <p className="text-medium text-sm mb-6 text-center max-w-[306px]">
              Are you sure you want to delete "{dashboard.name}" dashboard?
            </p>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => {
                  handleClickDelete(dashboard?._id);
                  onClose();
                }}
                className="w-[95px] h-8 rounded-lg border border-[#343B45] font-semibold text-xs"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="w-[95px] h-8 rounded-lg bg-[#22262E] font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      },
      overlayClassName: "!bg-black !opacity-80"
    });
  };

  return (
    <div className="w-full overflow-y-auto">
      {list &&
        list.map((dashboard, i) => (
          <div
            key={i}
            className="w-full h-12 flex items-center justify-between px-3 border-b border-b-gray-border"
          >
            <div className="flex items-center font-medium textbase gap-3">
              <span className="text-[#626D7C]">{i + 1}</span>
              <span className="text-white">{dashboard.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  deleteRow(dashboard);
                }}
                className="min-w-[95px] h-8 flex items-center justify-center rounded-lg px-4 border border-[#343B45]"
              >
                <span className="font-semibold text-xs leading-4 text-white">
                  Delete
                </span>
              </button>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  router?.push(`/dashboard/${dashboard?._id}/edit`);
                }}
                className="min-w-[95px] h-8 flex items-center justify-center rounded-lg px-4 border border-[#343B45]"
              >
                <span className="font-semibold text-xs leading-4 text-white">
                  Edit
                </span>
              </button>
              <button
                className="min-w-[95px] h-8 flex items-center justify-center rounded-lg px-4 bg-gray-border"
                onClick={() => router?.push(`/dashboard/${dashboard?._id}`)}
              >
                <span className="font-semibold text-xs leading-4 text-white">
                  Open
                </span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashboardList;
