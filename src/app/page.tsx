import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import { SideBar, SideBarProvider } from "@/components/SideBar";
import { ContentWrapper } from "@/components/ContentWrapper";
import { ChatHistoryProvider } from "@/components/ChatHistoryProvider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SideBarProvider>
        <ChatHistoryProvider>
          <SideBar />
          <ContentWrapper>
            <Header />
            <ChatInterface />
          </ContentWrapper>
        </ChatHistoryProvider>
      </SideBarProvider>
    </main>
  );
}
