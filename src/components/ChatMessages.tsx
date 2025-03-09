"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message } from "@/utils/markov";
import "./ChatMessages.css";
import { useChatHistory } from "./ChatHistoryProvider";

// Animated character component
function AnimatedCharacter({ char, index }: { char: string; index: number }) {
  return (
    <span
      key={index}
      className="inline-block opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 20}ms`,
        animationFillMode: "forwards",
      }}
    >
      {char}
    </span>
  );
}

type ChatMessagesProps = {
  messages: Message[];
  isStreaming: boolean;
  generatingText: string;
  autoScroll: boolean;
};

const ChatMessages = ({
  messages,
  isStreaming,
  generatingText,
  autoScroll,
}: ChatMessagesProps) => {
  const generatingTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && generatingTextRef.current) {
      generatingTextRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isStreaming, generatingText, autoScroll]);

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${
            message.role === "user" ? "user" : "assistant"
          }`}
        >
          {message.role === "user" ? "User:" : "MarkovGPT:"}
          <div className="message-content">{message.content}</div>
        </div>
      ))}
      {isStreaming && (
        <div className="generating-text message" ref={generatingTextRef}>
          {"MarkovGPT:"}
          <div className="message-content">{generatingText}</div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
