import React from "react";
import Footer from "./Footer";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Messages from "./Messages";

const ChatPage = ({ chatId }) => {
  return (
    <main className="flex h-screen bg-black text-white">
      <MobileSidebar />

      <Sidebar className="hidden md:block bg-black border-r border-r-gray-500 w-[300px] " />
      <div className="flex flex-col flex-1 max-w-3xl mx-auto">
        <Header />
        <Messages />
        <Footer chatId={chatId} />
      </div>
    </main>
  );
};

export default ChatPage;
