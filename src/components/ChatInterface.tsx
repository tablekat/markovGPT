'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import { generateMarkovText } from '@/utils/markov';
import TextInput from './TextInput';
import ChatMessages from './ChatMessages';

const ChatInterface = () => {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1>Chat Interface</h1>
      <ChatMessages />
      <TextInput />
      <div className="disclaimer">
        MarkovGPT cannot make mistakes. Don't check anything.
      </div>
    </div>
  );
};

export default ChatInterface; 