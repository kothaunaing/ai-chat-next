"use client";

import React from "react";
import useAppStore from "../store/useAppStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import MDEditor from "@uiw/react-md-editor";

const Messages = () => {
  const { getModelById, messages } = useAppStore();

  return (
    <div className="min-h-[500px] m-2">
      {messages.length ? (
        <div>
          {messages.map((message, index) => {
            const model = getModelById(message.model);

            if (message.role === "user") {
              return (
                <div key={index} className=" p-2 flex justify-end">
                  <MDEditor.Markdown
                    className="p-3 rounded-md"
                    source={message.content}
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="p-2">
                  <div className="font-bold">{model.name}</div>

                  <MDEditor.Markdown
                    className="p-3 rounded-md"
                    source={message.content}
                  />
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
