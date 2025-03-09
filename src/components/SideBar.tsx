"use client";

import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import "./SideBar.css";
import { useChatHistory } from "./ChatHistoryProvider";

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
  const [sideBarOpen, setSideBarOpen] = useState(true);

  return (
    <SideBarContext.Provider value={{ sideBarOpen, setSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

const GenerateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-5 h-5"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
      />
    </svg>
  );
};

const ChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
};

export const SideBar = () => {
  const { sideBarOpen, setSideBarOpen } = useContext(SideBarContext);
  const { chatHistoryItems, setSelectedChat } = useChatHistory();

  const timeSplits = [
    { ageSeconds: 5 * 60, title: "Now" },
    { ageSeconds: 30 * 60, title: "1 hour ago" },
    { ageSeconds: 24 * 60 * 60, title: "Today" },
    { ageSeconds: 2 * 24 * 60 * 60, title: "Yesterday" },
    { ageSeconds: 7 * 24 * 60 * 60, title: "This week" },
    { ageSeconds: Infinity, title: "Older" },
  ];

  const timeSplitData = useMemo(() => {
    return timeSplits.map((split, i) => {
      const lastAge = i > 0 ? timeSplits[i - 1].ageSeconds : 0;
      const items = chatHistoryItems.filter((item) => {
        const age = Date.now() - new Date(item.timestamp).getTime();
        return age >= lastAge * 1000 && age < split.ageSeconds * 1000;
      });
      return { ...split, items };
    });
  }, [chatHistoryItems]);

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
          onClick={() => setSelectedChat("")}
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
      <div className="mb-6">
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium mb-2 cursor-pointer"
          onClick={() => setSelectedChat("")}
        >
          <GenerateIcon />
          <span>MarkovGPT</span>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        {timeSplitData.map(({ items, title }) => {
          if (items.length === 0) return null;
          return (
            <div key={title}>
              <h3 className="text-xs uppercase text-gray-400 font-medium px-3 mb-2">
                {title}
              </h3>
              <div className="space-y-1">
                {items.map(({ key, title }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md cursor-pointer text-sm"
                    onClick={() => setSelectedChat(key)}
                  >
                    <ChatIcon />
                    <span className="truncate">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
