"use client"

import { ReactNode, createContext, useState, useContext } from "react";

interface ContextType {
  dashboards: any[];
  setDashboards: any
}

export const AppProvider = createContext<ContextType | null>(null);

export const useToggle = () => {
  return useContext(AppProvider);
};

const DashboardContext = ({ children }: {
  children: ReactNode
}) => {
  const [dashboards, setDashboards] = useState([]);

  return (
    <AppProvider.Provider
      value={{
        setDashboards,
        dashboards,
      }}>
      {children}
    </AppProvider.Provider>
  );
};

export default DashboardContext;
