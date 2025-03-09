"use client";

import React, {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { generateMarkovText, Message } from "@/utils/markov";
import TextInput from "./TextInput";
import ChatMessages from "./ChatMessages";
import "./ChatInterface.css";

function useGenerateText(onFinish: (text: string) => void) {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const addToken = useCallback(
    (token: string | null) => {
      // Meow: setText((prevText) => [...prevText, token])
      if (token === null) {
        setIsStreaming(false);
      } else {
        setText((prevText) => prevText + token);
      }
    },
    [setText, setIsStreaming]
  );

  useEffect(() => {
    if (!isStreaming && text.length > 0) {
      onFinish(text);
      setText("");
    }
  }, [text, isStreaming, onFinish, setText]);

  const startGenerating = useCallback(
    (userText: string) => {
      setIsStreaming(true);
      generateMarkovText(userText, addToken);
    },
    [addToken, setIsStreaming]
  );

  return { text, isStreaming, startGenerating };
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [enableAutoScroll, setEnableAutoScroll] = useState(true);
  const [isManualScroll, setIsManualScroll] = useState(false);

  const onGenerationFinish = useCallback(
    (text: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: text,
        },
      ]);
    },
    [setMessages]
  );

  const { text, isStreaming, startGenerating } =
    useGenerateText(onGenerationFinish);

  const addUserMessage = useCallback(
    (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random().toString(),
          role: "user",
          content: message,
        },
      ]);

      startGenerating(message);
    },
    [setMessages, startGenerating]
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const threshold = 30; // Pixels from bottom to consider "at bottom"
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      threshold;

    setEnableAutoScroll(isAtBottom);
  };

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setEnableAutoScroll(false);
    setIsManualScroll(true);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsManualScroll(false);
    }, 100);
  };

  return (
    <div
      className="chat-interface-container w-full flex flex-col items-center justify-center"
      onScroll={handleScroll}
      onWheel={handleWheel}
    >
      <ChatMessages
        messages={messages}
        isStreaming={isStreaming}
        generatingText={text}
        autoScroll={!isManualScroll && enableAutoScroll}
      />
      <TextInput addUserMessage={addUserMessage} disabled={isStreaming} />
      <div className="disclaimer">
        MarkovGPT cannot make mistakes. Don't check anything.
      </div>
    </div>
  );
};

export default ChatInterface;
