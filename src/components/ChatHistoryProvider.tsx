"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Message } from "@/utils/markov";

interface ChatHistoryItem {
  key: string;
  title: string;
  timestamp: Date;
}

interface ChatHistoryContextType {
  chatHistoryItems: ChatHistoryItem[];
  addChatHistoryItem: (item: ChatHistoryItem) => void;
  loadChatHistory: (key: string) => Message[];
  setChatHistory: (key: string, items: ChatHistoryItem[]) => void;
  // TODO(kat): Add a way to update chat history item title and update timestamp.
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(
  undefined
);

const useChatHistoryLocalStorage = () => {
  const [chatHistoryItems, setChatHistoryItems] = useState<ChatHistoryItem[]>(
    []
  );

  const addChatHistoryItem = (item: ChatHistoryItem) => {
    setChatHistoryItems((prev) => [...prev, item]);
    localStorage.setItem("chatHistory", JSON.stringify(setChatHistoryItems));
  };

  const loadChatHistory = (key: string) => {
    const storedChatHistory = localStorage.getItem("chatHistory-" + key);
    if (storedChatHistory) {
      return JSON.parse(storedChatHistory);
    }
    return [];
  };

  const setChatHistory = (key: string, items: ChatHistoryItem[]) => {
    localStorage.setItem("chatHistory-" + key, JSON.stringify(items));
  };

  useEffect(() => {
    setChatHistoryItems([
      { key: "1", title: "Understanding randomness", timestamp: new Date() },
      {
        key: "2",
        title: "Comparing language models",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
      },
      {
        key: "3",
        title: "Text generation basics",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2),
      },
      {
        key: "4",
        title: "Markov chain explanation",
        timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3),
      },
    ]);
    // setChatHistoryItems(
    //   JSON.parse(localStorage.getItem("chatHistory") || "[]")
    // );
  }, []);

  return {
    chatHistoryItems,
    addChatHistoryItem,
    loadChatHistory,
    setChatHistory,
  };
};

export const ChatHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    chatHistoryItems,
    addChatHistoryItem,
    loadChatHistory,
    setChatHistory,
  } = useChatHistoryLocalStorage();

  return (
    <ChatHistoryContext.Provider
      value={{
        chatHistoryItems,
        addChatHistoryItem,
        loadChatHistory,
        setChatHistory,
      }}
    >
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider");
  }
  return context;
};
