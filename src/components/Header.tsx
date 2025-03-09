"use client";

import React, { useContext } from "react";
import { SideBarContext } from "./SideBar";

const Header = () => {
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);

  return (
    <header className="w-full bg-gray-900 p-4 text-white">
      <div className="container flex items-center justify-between">
        <div className="flex gap-4 items-center" style={{ height: 40 }}>
          {!sideBarOpen && (
            <>
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
            </>
          )}
          <h1 className="text-xl font-bold">MarkovGPT</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
