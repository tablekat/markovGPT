"use client";

import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import "./SideBar.css";

export const SideBarContext = createContext<{
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
}>({
  sideBarOpen: true,
  setSideBarOpen: () => {},
});

export const SideBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <SideBarContext.Provider value={{ sideBarOpen, setSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const SideBar = () => {
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);

  return (
    <div
      className={`sidebar fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 overflow-y-auto ${
        sideBarOpen ? "open" : "closed"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <button
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
          onClick={() => setSideBarOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <button
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="New Chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <button className="text-white hover:text-gray-400">Home</button>
        <button className="text-white hover:text-gray-400">Settings</button>
        <button className="text-white hover:text-gray-400">About</button>
      </div>
    </div>
  );
};
