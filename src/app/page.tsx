
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <ChatInterface />
    </main>
  );
} 