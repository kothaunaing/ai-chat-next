"use client";

import { MoreHorizontalIcon, PlusIcon, SidebarIcon } from "lucide-react";
import React from "react";
import useAppStore from "../store/useAppStore";
import Link from "next/link";

const Sidebar = ({ className }) => {
  const { setOpenSidebar } = useAppStore();
  const history = [
    {
      id: 1,
      title: "Talking about AI",
    },
    {
      id: 2,
      title: "Summarization Inside Out",
    },
    {
      id: 3,
      title: "Mona Lisa Painting",
    },
  ];

  return (
    <div className={className}>
      <div className="m-2">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg">AI Chat</h1>
          <button
            onClick={() => setOpenSidebar(false)}
            className="cursor-pointer md:hidden"
          >
            <SidebarIcon />
          </button>
        </div>
        <div className="mt-4">
          <Link
            href={"/"}
            className="w-full p-2 flex gap-1 border border-purple-600 rounded-md cursor-pointer bg-black/60 hover:opacity-80"
          >
            <PlusIcon />
            <span>New Chat</span>
          </Link>
        </div>
        <div className="mt-3">
          <h1 className="font-bold text-lg">Chats history</h1>
          <div className="text-sm">Comming soon...</div>
          {/* <div className="mt-2 space-y-1 h-[70vh] overflow-y-auto">
            {history.map((chat) => {
              return (
                <div
                  key={`chat-${chat.id}`}
                  className="p-1 hover:opacity-70 group cursor-pointer flex justify-between border border-transparent transition-[opacity] transition-[border] duration-300 hover:border-purple-600 rounded-md"
                >
                  <Link href={`/c/${chat.id}`}>
                    <p>{chat.title}</p>
                  </Link>
                  <button className="cursor-pointer hidden group-hover:block">
                    <MoreHorizontalIcon className="size-5" />
                  </button>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
