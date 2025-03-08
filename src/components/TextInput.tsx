"use client";

import React, { useState } from "react";
import "./TextInput.css";

type TextInputProps = {
  addUserMessage: (message: string) => void;
  disabled: boolean;
};

const TextInput = ({ addUserMessage, disabled }: TextInputProps) => {
  const [text, setText] = useState("");

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (disabled) return;
    addUserMessage(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="text-input-container">
      <form onSubmit={submit}>
        <textarea
          placeholder="Type your message here..."
          value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" disabled={disabled}>
          Send
        </button>
      </form>
    </div>
  );
};

export default TextInput;
