"use client"

import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

interface ContextType {
  dashboards: any[];
  setDashboards: any;
  userId: string;
  getDashboardName: (dashId:string)=>void;
}

export const AppProvider = createContext<ContextType | null>(null);

export const useToggle = () => {
  return useContext(AppProvider);
};

const DashboardContext = ({ children }: {
  children: ReactNode
}) => {
  const [userId, setUserId] = useState('');
  const [dashboards, setDashboards] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const { user: { _id } }: any = session;
      setUserId(_id)
    }
  }, [session])


  useEffect(() => {
    if (!userId) return;

    axios.get(`/api/dashboard/get-dashboards?user_id=${userId}`)
      .then(res => {
        if (res.status === 200 && res.data) {
          setDashboards(res.data);
        }
      }).catch(err => {
        toast(err?.response?.data, { type: 'error' });
      })
  }, [userId])

  const getDashboardName = (dashId:string) => {
    if(dashboards){
      const res:any = dashboards.find((dash:{_id?:string})=>dash?._id === dashId);
      if (res) return res.name;
      else return "";
    }
  }

  return (
    <AppProvider.Provider
      value={{
        setDashboards,
        dashboards,
        userId,
        getDashboardName
      }}>
      {children}
    </AppProvider.Provider>
  );
};

export default DashboardContext;
