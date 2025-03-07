'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';

export default function Home() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <ChatInterface messages={messages} setMessages={setMessages} />
    </main>
  );
} 