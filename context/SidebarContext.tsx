"use client"

import { ReactNode, createContext, useState, useContext } from "react";

interface ContextType {
  sidebarPin: boolean;
  toggleSidebar: ()=>void;
}

export const AppProvider = createContext<ContextType|null>(null);

export const useToggle = () => {
  return useContext(AppProvider);
};

const SidebarContext = ({ children }: {
  children: ReactNode
}) => {
  const [sidebarPin, setSidebarPin] = useState(false);

  const toggleSidebar = () => {
    setSidebarPin(!sidebarPin);
  };


  return (
    <AppProvider.Provider
      value={{
        toggleSidebar,
        sidebarPin,
      }}>
      {children}
    </AppProvider.Provider>
  );
};

export default SidebarContext;
