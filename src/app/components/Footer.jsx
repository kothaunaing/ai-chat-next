"use client";

import React, { useState } from "react";
import { LoaderIcon, SendIcon } from "lucide-react";
import useAppStore from "../store/useAppStore";

const Footer = ({ chatId }) => {
  const [prompt, setPrompt] = useState("");
  const { fetchAIResponse, messages, setMessages, loading } = useAppStore();

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    const newMessagesUser = [...messages, { role: "user", content: prompt }];
    setMessages(newMessagesUser);

    await fetchAIResponse(prompt);
    setPrompt("");
  };

  return (
    <footer className="p-2 w-full flex gap-2 items-center bg-black max-w-3xl mx-auto">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 p-3 h-full border border-slate-400 rounded-lg outline-blue-700 bg-transparent"
        placeholder="Ask anything..."
      />
      <button
        onClick={handleSendMessage}
        disabled={loading}
        className="cursor-pointer font-bold p-1 bg-purple-700 size-10 flex items-center justify-center rounded-full hover:opacity-75"
      >
        {loading ? <LoaderIcon className="animate-spin" /> : <SendIcon />}
      </button>
    </footer>
  );
};

export default Footer;
