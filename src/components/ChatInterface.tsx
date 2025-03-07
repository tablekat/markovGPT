import React, { useState } from 'react';
import { generateMarkovText } from '@/utils/markov';

interface ChatInterfaceProps {
  messages: Array<{role: 'user' | 'assistant', content: string}>;
  setMessages: React.Dispatch<React.SetStateAction<Array<{role: 'user' | 'assistant', content: string}>>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const updatedMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    
    setMessages(updatedMessages);
    setInput('');
    
    // Generate Markov response
    setTimeout(() => {
      const response = generateMarkovText(input);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: response }
      ]);
    }, 500);
  };
  
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[80vh] p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-xl mb-2">Welcome to MarkovGPT!</p>
            <p>Ask me anything and I'll respond with Markov chain-generated text.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-100 ml-10' 
                  : 'bg-gray-100 mr-10'
              }`}
            >
              <p>{message.content}</p>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Ask MarkovGPT something..."
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 