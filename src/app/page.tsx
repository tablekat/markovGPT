import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import { SideBar, SideBarProvider } from "@/components/SideBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SideBarProvider>
        <SideBar />
        <Header />
        <ChatInterface />
      </SideBarProvider>
    </main>
  );
}
