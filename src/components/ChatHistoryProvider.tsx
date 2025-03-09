"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Message } from "@/utils/markov";

interface ChatHistoryItem {
  key: string;
  title: string;
  timestamp: Date;
}

interface ChatHistoryContextType {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  selectedChat: string;
  setSelectedChat: (key: string) => void;
  chatHistoryItems: ChatHistoryItem[];
  addChatHistoryItem: (item: ChatHistoryItem) => void;
  loadChatHistory: (key: string) => Message[];
  setChatHistory: (key: string, items: Message[]) => void;
  // TODO(kat): Add a way to update chat history item title and update timestamp.
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(
  undefined
);

const useChatHistoryLocalStorage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistoryItems, setChatHistoryItems] = useState<ChatHistoryItem[]>(
    []
  );
  const [selectedChat, setSelectedChat] = useState<string>("");

  const addChatHistoryItem = (item: ChatHistoryItem) => {
    setChatHistoryItems((prev) => [item, ...prev]);
    localStorage.setItem("chatHistory", JSON.stringify(chatHistoryItems));
  };

  const setSelectedChatPrime = (key: string) => {
    if (key === "") {
      setMessages([]);
      const id = Math.random().toString();
      setSelectedChat(id);
      addChatHistoryItem({
        key: id,
        title: "New Chat with id " + id,
        timestamp: new Date(),
      });
    } else {
      setSelectedChat(key);
      setMessages(loadChatHistory(key));
    }
  };

  const loadChatHistory = (key: string) => {
    const storedChatHistory = localStorage.getItem("chatHistory-" + key);
    if (storedChatHistory) {
      return JSON.parse(storedChatHistory);
    }
    return [];
  };

  const setChatHistory = (key: string, items: Message[]) => {
    localStorage.setItem("chatHistory-" + key, JSON.stringify(items));
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("chatHistory") || "[]");
    items.sort((a: ChatHistoryItem, b: ChatHistoryItem) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    setChatHistoryItems(items);
  }, []);

  useEffect(() => {
    setChatHistory(selectedChat, messages);
  }, [messages, selectedChat]);

  useEffect(() => {
    setMessages(loadChatHistory(selectedChat));
  }, [selectedChat]);

  return {
    messages,
    setMessages,
    selectedChat,
    setSelectedChat: setSelectedChatPrime,
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
    messages,
    setMessages,
    selectedChat,
    setSelectedChat,
    chatHistoryItems,
    addChatHistoryItem,
    loadChatHistory,
    setChatHistory,
  } = useChatHistoryLocalStorage();

  return (
    <ChatHistoryContext.Provider
      value={{
        messages,
        setMessages,
        selectedChat,
        setSelectedChat,
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
