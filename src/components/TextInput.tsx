'use client';

import React, { useState } from 'react';
import './TextInput.css';

const TextInput = () => {
  return <div className="text-input-container">
    <textarea placeholder="Type your message here..."></textarea>
    <button>Send</button>
  </div>;
};

export default TextInput;