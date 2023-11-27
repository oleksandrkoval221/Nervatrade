import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import axios from 'axios';
import { useRouter } from "next/navigation";

const DashboardList = ({ list, setDashboards }: {
  list: any[],
  setDashboards: any
}) => {
  const router = useRouter();

  const handleClickDelete = async (dashboardId: string) => {
    const res = await axios.delete(`/api/dashboard/delete?dash_id=${dashboardId}`);
    try {
      if (res.status === 201) {
        const dashboards = [...list];
        const index = dashboards.findIndex(obj => obj._id === dashboardId);
        if (index !== -1) {
          dashboards.splice(index, 1);
        }
        setDashboards(dashboards);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteRow = (dashboard: any) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='bg-dark-modal rounded-lg p-4 px-5'>
            <h1 className='text-2xl text-green-main'>Are you sure?</h1>
            <p className='py-2'>You want to delete dashboard - `{dashboard.name}`</p>
            <button onClick={onClose} className="bg-red-main rounded px-3 py-1">No</button>
            <button
              onClick={() => {
                handleClickDelete(dashboard?._id);
                onClose();
              }}
              className="bg-green-main rounded px-3 py-1 ml-5 text-black"
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  }

  return (
    <div className="w-full rounded-lg bg-dark-second p-4 mt-4 h-[calc(100vh-140px)] overflow-y-auto">
      {
        list &&
        list.map((dashboard, i) =>
          <div
            key={i}
            onClick={() => router?.push(`/dashboard/${dashboard?._id}`)}
            className={`w-full rounded-lg flex items-center justify-between cursor-pointer p-4 ${i % 2 === 0 && 'bg-dark-main'}`}>
            <div className="flex items-center gap-2">
              <div className="border border-gray-100 rounded px-1">{String(i + 1).padStart(2, '0')}</div>
              {dashboard.name}
            </div>
            <div className="flex items-center gap-4 relative z-50">
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  deleteRow(dashboard)
                }}
                className="rounded-lg py-2 px-4 border border-red-main">Delete</button>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  router?.push(`/dashboard/${dashboard?._id}/edit`)
                }}
                className="rounded-lg py-2 px-4 border border-gray-100">Edit</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default DashboardList;