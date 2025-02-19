import React from "react";
import Footer from "./Footer";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Messages from "./Messages";

const ChatPage = ({ chatId }) => {
  return (
    <main className="min-h-screen bg-black text-white z-10 ">
      <div>
        <MobileSidebar />
        <div className="md:flex">
          <Sidebar className="min-h-screen hidden md:block bg-black border-r border-r-gray-500 w-[300px] " />
          <div className="flex-1 md:max-w-3xl mx-auto">
            <Header />
            <Messages />
            <Footer chatId={chatId} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
