"use client"

import { createContext, useState, useContext } from "react";

export const AppProvider = createContext();

export const useToggle = () => {
  return useContext(AppProvider);
};

const SidebarContext = ({ children }) => {
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
