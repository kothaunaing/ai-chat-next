"use client";

import React from "react";
import useAppStore from "../store/useAppStore";

const Messages = () => {
  const { getModelById, messages } = useAppStore();

  return (
    <div className="min-h-[430px] m-2">
      {messages.length ? (
        <div>
          {messages.map((message, index) => {
            const model = getModelById(message.model);

            if (message.role === "user") {
              return (
                <div key={index} className=" p-2 flex justify-end">
                  <div className="bg-slate-600 p-3 rounded-md">
                    {message.content}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="p-2">
                  <div className="font-bold">{model.name}</div>
                  <div className="bg-slate-900 p-3 rounded-md mt-1">
                    {message.content}
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div className="font-bold text-center text-xl">
          Hello, How can I help you?
        </div>
      )}
    </div>
  );
};

export default Messages;
