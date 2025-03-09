"use client";

import React, { useContext } from "react";
import { SideBarContext } from "./SideBar";
import "./ContentWrapper.css";

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const { sideBarOpen } = useContext(SideBarContext);

  return (
    <div className="flex h-full w-full">
      <div
        className={`content-sidebar-padding ${sideBarOpen ? "open" : "closed"}`}
      ></div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
