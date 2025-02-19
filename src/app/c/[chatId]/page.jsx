import React from "react";
import ChatPage from "../../components/ChatPage";

const Chat = async ({ params }) => {
  const { chatId } = await params;

  return <ChatPage chatId={chatId} />;
};

export default Chat;
