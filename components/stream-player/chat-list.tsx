"use client";
import React from "react";
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">{isHidden ? "Chat is Disabled" : "Welcome to Chat"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((m) => (
        <ChatMessage key={m.timestamp} data={m} />
      ))}
    </div>
  );
};
